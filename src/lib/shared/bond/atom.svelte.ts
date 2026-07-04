import { createAttachmentKey } from 'svelte/attachments';
import { nanoid } from 'nanoid';
import { DEV } from 'esm-env';
import { getElementId } from '../../utils/dom.svelte';
import type { Bond } from './bond.svelte';
import type { BondVirtualElement } from './types';
import { mergeAttributeLayer, mergeHandlerLayer } from './merge';
import { slotName } from '../capability/capability';
import type {
	AtomBehavior,
	AtomCapability,
	AtomCapabilityInfo,
	Behavior,
	CapabilityKey,
	CapabilitySetupResult,
	RoleCtxArgs
} from '../capability/capability';

type AtomAttachment<E extends Element | BondVirtualElement> = (node: E) => void | (() => void);
type AtomSpread<E extends Element | BondVirtualElement> = Record<string | symbol, unknown> & {
	[symbol: symbol]: AtomAttachment<E>;
};
type RoleApplication = { role: string; ctx: unknown };
type NodeCapabilityAttachment<E extends Element | BondVirtualElement> = {
	key: symbol;
	attachment: AtomAttachment<E>;
};

export type AtomOptions = {
	namespace?: string;
	preset?: string;
	id?: string;
};

export class Atom<
	B extends Bond = Bond,
	E extends Element | BondVirtualElement = Element | BondVirtualElement
> {
	protected bond: B;
	protected key: string;
	#options: AtomOptions;
	#standaloneId: string;

	// Identity and node state.
	readonly #id = $derived.by(() => getElementId(this.#ownerId, this.kind));
	#element = $state<E | undefined>();

	// Behavior projection.
	#behaviors: Behavior<B, E>[] = [];
	#capabilities: AtomCapability<unknown, Atom<B, E>, B, E>[] = [];
	// eslint-disable-next-line svelte/prefer-svelte-reactivity
	#capabilitySlots = new Map<symbol, number>();
	#setupConsumed = false;
	#validated = false;
	#setupTeardowns: Array<() => void> = [];
	// Keeps role projection idempotent for cached atoms.
	#roleApplications: RoleApplication[] = [];
	// Written once at declaration; reactivity rides the queue, not this set.
	// eslint-disable-next-line svelte/prefer-svelte-reactivity
	#roles = new Set<string>();

	// Stable attachment keys. Svelte keys attachments by symbol identity, so these must not be
	// minted while computing spread.
	readonly #attachKey = createAttachmentKey();
	#behaviorAttachments: Record<symbol, AtomAttachment<E>> = {};
	// eslint-disable-next-line svelte/prefer-svelte-reactivity
	#capabilityAttachments = new Map<
		AtomCapability<unknown, Atom<B, E>, B, E>,
		NodeCapabilityAttachment<E>
	>();
	readonly #ownAttach: AtomAttachment<E> = (node) => this.#mount(node);

	constructor(bond: B | undefined, key: string, options: AtomOptions = {}) {
		this.bond = bond as B;
		this.key = key;
		this.#options = options;
		this.#standaloneId = options.id ?? nanoid(8);
	}

	get id() {
		return this.#id;
	}

	get element() {
		return this.#element;
	}

	get name() {
		return this.key;
	}

	get kind() {
		return `${this.#namespace}-${this.name}`;
	}

	// Default preset key: root → bare bond.preset, others append name. Read as: preset ?? atom.preset.
	get preset(): string {
		const base = this.bond?.preset ?? this.#options.preset ?? this.#namespace;
		return this.name === 'root' ? base : `${base}.${this.name}`;
	}

	behavior(behavior: Behavior<B, E>): this {
		if (DEV && !this.bond) {
			console.warn(
				`[svelte-atoms] Atom("${this.name}").behavior(...) was registered without a Bond. Bond-dependent behavior will be skipped until the node is bonded.`
			);
		}
		this.#behaviors.push(behavior);
		this.#registerBehaviorAttachment(behavior);
		return this;
	}

	capability<C extends AtomCapability<unknown, Atom<B, E>, B, E>>(capability: C): C;
	capability<S>(key: CapabilityKey<S>): AtomCapability<S, Atom<B, E>, B, E> | undefined;
	capability<S = unknown>(
		capabilityOrKey: AtomCapability<unknown, Atom<B, E>, B, E> | CapabilityKey<S>
	): AtomCapability<S, Atom<B, E>, B, E> | undefined {
		if (typeof capabilityOrKey === 'symbol') {
			const found = this.#findCapability(capabilityOrKey) as
				| AtomCapability<S, Atom<B, E>, B, E>
				| undefined;
			if (DEV && !found) {
				console.warn(
					`[svelte-atoms] Atom("${this.name}").capability("${slotName(capabilityOrKey)}"): no atom capability registered.`
				);
			}
			return found;
		}

		return this.#registerCapability(capabilityOrKey) as AtomCapability<S, Atom<B, E>, B, E>;
	}

	get<S>(key: CapabilityKey<S>): S | undefined {
		return this.capability(key)?.surface;
	}

	surface<S>(key: CapabilityKey<S>): S | undefined {
		return this.get(key);
	}

	require<S>(key: CapabilityKey<S>): S {
		const surface = this.get(key);
		if (surface === undefined) {
			throw new Error(
				`[svelte-atoms] required atom capability "${slotName(key)}" has no surface on Atom("${this.name}").`
			);
		}
		return surface;
	}

	get capabilities(): readonly AtomCapability<unknown, Atom<B, E>, B, E>[] {
		return this.#capabilities;
	}

	describeCapabilities(): AtomCapabilityInfo[] {
		return this.#capabilities.map((capability) => ({
			slot: capability.slot,
			description: capability.slot?.description,
			...(capability.meta ? { meta: capability.meta } : {}),
			hasSurface: capability.surface !== undefined,
			requires: capability.requires ?? [],
			hasBehavior: Boolean(capability.behavior),
			hasSetup: typeof capability.setup === 'function'
		}));
	}

	setupCapabilities(bond: B | undefined = this.bond): (() => void) | undefined {
		if (this.#setupConsumed) return undefined;
		this.#setupConsumed = true;
		this.#validateCapabilities();

		try {
			for (const capability of this.#capabilities) {
				const live = capability.setup?.(this, bond);
				if (live) this.#setupTeardowns.push(toTeardown(live));
			}
		} catch (error) {
			this.teardownCapabilities();
			throw error;
		}

		return this.#setupTeardowns.length > 0 ? () => this.teardownCapabilities() : undefined;
	}

	teardownCapabilities(): void {
		for (let i = this.#setupTeardowns.length - 1; i >= 0; i--) this.#setupTeardowns[i]!();
		this.#setupTeardowns = [];
	}

	// item/input require a string ctx; structural roles take none; custom roles accept optional unknown.
	role<R extends string>(role: R, ...args: RoleCtxArgs<R>): this {
		const ctx = args[0] as unknown;
		if (this.#hasProjectedRole(role, ctx)) {
			this.#debugDuplicateRole(role);
			return this;
		}

		this.#roleApplications.push({ role, ctx });
		this.#roles.add(role);

		if (!this.bond) return this;

		const behaviors = this.bond.behaviorsForRole(role, ctx);
		this.#warnIfRoleHasNoBehavior(role, behaviors);
		for (const behavior of behaviors) this.behavior(behavior as Behavior<B, E>);
		return this;
	}

	hasRole(role: string): boolean {
		return this.#roles.has(role);
	}

	get attrs(): Record<string, unknown> {
		return this.bond
			? {
					id: this.id,
					'data-bond': this.bond.namespace,
					'data-kind': this.kind
				}
			: {
					id: this.id,
					'data-kind': this.kind
				};
	}

	get handlers(): Record<string, unknown> {
		return {};
	}

	get attachments(): Record<string, (node: E) => void | (() => void)> {
		return { [this.#attachKey]: this.#ownAttach };
	}

	get spread(): AtomSpread<E> {
		this.#validateCapabilities();
		const nodeBehaviors = this.#nodeBehaviors();
		if (this.#behaviors.length === 0 && nodeBehaviors.length === 0) {
			return this.#baseSpread();
		}

		const nodeSpread = mergeNodeBehaviors(
			this,
			this.bond,
			this.attrs,
			this.handlers,
			nodeBehaviors
		);
		const projectedSpread =
			this.bond && this.#behaviors.length > 0
				? mergeBehaviors(this.bond, nodeSpread.attrs, nodeSpread.handlers, this.#behaviors)
				: nodeSpread;

		return {
			...projectedSpread.attrs,
			...projectedSpread.handlers,
			...this.attachments,
			...this.#behaviorAttachments,
			...this.#capabilityAttachmentRecord()
		};
	}

	onmount(node: E): void | (() => void) {
		void node;
	}

	ondestroy?(): void {}

	protected setElement(element: E | undefined) {
		this.#element = element;
	}

	get #namespace(): string {
		return this.bond?.namespace ?? this.#options.namespace ?? 'atom';
	}

	get #ownerId(): string {
		return this.bond?.id ?? this.#standaloneId;
	}

	#registerCapability(
		capability: AtomCapability<unknown, Atom<B, E>, B, E>
	): AtomCapability<unknown, Atom<B, E>, B, E> {
		if (!capability.slot) {
			this.#validated = false;
			this.#capabilities.push(capability);
			this.#registerCapabilityAttachment(capability);
			return capability;
		}

		const existing = this.#capabilitySlots.get(capability.slot);
		if (existing !== undefined) {
			const prior = this.#capabilities[existing]!;
			const next = capability.compose ? capability.compose(prior) : capability;
			this.#capabilityAttachments.delete(prior);
			this.#capabilities[existing] = next;
			this.#registerCapabilityAttachment(next);
			this.#validated = false;
			if (DEV) {
				const verb = capability.compose ? 'decorated' : 'replaced';
				console.debug(
					`[svelte-atoms] Atom("${this.name}") atom capability "${slotName(capability.slot)}" ${verb}.`
				);
			}
			return next;
		}

		this.#validated = false;

		this.#capabilitySlots.set(capability.slot, this.#capabilities.length);
		this.#capabilities.push(capability);
		this.#registerCapabilityAttachment(capability);
		return capability;
	}

	#findCapability(slot: symbol): AtomCapability<unknown, Atom<B, E>, B, E> | undefined {
		const i = this.#capabilitySlots.get(slot);
		return i === undefined ? undefined : this.#capabilities[i];
	}

	#validateCapabilities(): void {
		if (!DEV || this.#validated) return;
		this.#validated = true;
		for (const message of atomCapabilityValidationMessages(
			this.#capabilities,
			this.name,
			this.#setupConsumed
		)) {
			console.warn(message);
		}
	}

	#nodeBehaviors(): AtomBehavior<Atom<B, E>, B, E>[] {
		return this.#capabilities
			.map((capability) => capability.behavior)
			.filter((behavior): behavior is AtomBehavior<Atom<B, E>, B, E> => Boolean(behavior));
	}

	#baseSpread(): AtomSpread<E> {
		return { ...this.attrs, ...this.handlers, ...this.attachments };
	}

	#mount(node: E): void | (() => void) {
		this.setElement(node);
		const cleanup = this.onmount(node);
		return () => {
			cleanup?.();
			this.ondestroy?.();
			this.setElement(undefined);
		};
	}

	#registerBehaviorAttachment(behavior: Behavior<B, E>): void {
		if (!behavior.onmount) return;
		const onmount = behavior.onmount;
		// Bound here, not in the spread getter — Svelte keys attachments by symbol, so a new key per read re-runs the attachment.
		this.#behaviorAttachments[createAttachmentKey()] = (node: E) => {
			if (!this.bond) return;
			return onmount(node, this.bond);
		};
	}

	#registerCapabilityAttachment(capability: AtomCapability<unknown, Atom<B, E>, B, E>): void {
		const onmount = capability.behavior?.onmount;
		if (!onmount) return;
		this.#capabilityAttachments.set(capability, {
			key: createAttachmentKey(),
			attachment: (element: E) => onmount(element, this, this.bond)
		});
	}

	#capabilityAttachmentRecord(): Record<symbol, AtomAttachment<E>> {
		const attachments: Record<symbol, AtomAttachment<E>> = {};
		for (const { key, attachment } of this.#capabilityAttachments.values()) {
			attachments[key] = attachment;
		}
		return attachments;
	}

	#hasProjectedRole(role: string, ctx: unknown): boolean {
		return this.#roleApplications.some((a) => a.role === role && Object.is(a.ctx, ctx));
	}

	#debugDuplicateRole(role: string): void {
		if (!DEV) return;
		const owner = this.bond ? `${this.bond.name}/${this.name}` : this.name;
		console.debug(
			`[svelte-atoms] Atom("${owner}").role("${role}") was already projected for this context; skipping duplicate projection.`
		);
	}

	#warnIfRoleHasNoBehavior(role: string, behaviors: readonly Behavior<B, E>[]): void {
		if (!DEV || behaviors.length > 0) return;
		const owner = this.bond ? `${this.bond.name}/${this.name}` : this.name;
		console.warn(
			`[svelte-atoms] Atom("${owner}").role("${role}"): no capability responds to this role. If intentional, ignore.`
		);
	}
}

// Generated atom class helpers.

export type DefineAtomSetup<N extends Atom, B> = (atom: N, bond: B) => void;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyAtomClass = new (bond: any) => Atom<any, any>;

export function defineAtom<
	B extends Bond = Bond,
	E extends Element | BondVirtualElement = Element | BondVirtualElement
>(
	key: string,
	setup?: <T extends B>(atom: Atom<T, E>, bond: T) => void
): { new <T extends B = B>(bond: T): Atom<T, E> };
export function defineAtom<C extends AnyAtomClass>(
	Base: C,
	setup?: DefineAtomSetup<InstanceType<C>, ConstructorParameters<C>[0]>
): C;
export function defineAtom(
	keyOrBase: string | AnyAtomClass,
	setup?: DefineAtomSetup<Atom, unknown>
): AnyAtomClass {
	if (typeof keyOrBase === 'string') {
		const key = keyOrBase;
		return class GeneratedAtomClass extends Atom {
			constructor(bond: Bond) {
				super(bond, key);
				setup?.(this, bond);
			}
		} as AnyAtomClass;
	}

	const Base = keyOrBase;
	return class GeneratedAtomClass extends Base {
		constructor(bond: ConstructorParameters<typeof Base>[0]) {
			super(bond);
			setup?.(this as unknown as Atom, bond);
		}
	} as AnyAtomClass;
}

// Atom capability validation.

type RuntimeAtomCapability<
	N,
	B extends Bond,
	E extends Element | BondVirtualElement
> = AtomCapability<unknown, N, B, E>;

type SlottedRuntimeAtomCapability<
	N,
	B extends Bond,
	E extends Element | BondVirtualElement
> = RuntimeAtomCapability<N, B, E> & { readonly slot: symbol };

function atomCapabilityValidationMessages<
	N,
	B extends Bond,
	E extends Element | BondVirtualElement
>(
	capabilities: readonly RuntimeAtomCapability<N, B, E>[],
	atomName: string,
	setupConsumed: boolean
): string[] {
	const slots = atomCapabilitySlots(capabilities);
	const slotOwners = atomCapabilitySlotOwners(capabilities);
	const projectOwners = atomCapabilityProjectOwners(capabilities);
	const messages: string[] = [];

	for (const capability of capabilities) {
		messages.push(
			...atomCapabilityRequirementMessages(capability, slots, atomName),
			...atomCapabilityConflictMessages(capability, slotOwners, projectOwners, atomName)
		);
	}

	if (!setupConsumed && capabilities.some((capability) => capability.setup)) {
		messages.push(
			`[svelte-atoms] Atom("${atomName}") registered atom capabilities with setup() but setupCapabilities() was never called — their atom setup effects will not run.`
		);
	}

	return messages;
}

function atomCapabilitySlots<N, B extends Bond, E extends Element | BondVirtualElement>(
	capabilities: readonly RuntimeAtomCapability<N, B, E>[]
): Set<symbol> {
	// Plain Set: built per validation pass for membership lookup, never reactive state.
	// eslint-disable-next-line svelte/prefer-svelte-reactivity
	return new Set(capabilities.filter(hasAtomCapabilitySlot).map((capability) => capability.slot));
}

function atomCapabilitySlotOwners<N, B extends Bond, E extends Element | BondVirtualElement>(
	capabilities: readonly RuntimeAtomCapability<N, B, E>[]
): Map<symbol, SlottedRuntimeAtomCapability<N, B, E>> {
	// Plain Map: built per validation pass for diagnostics, never reactive state.
	// eslint-disable-next-line svelte/prefer-svelte-reactivity
	return new Map(
		capabilities.filter(hasAtomCapabilitySlot).map((capability) => [capability.slot, capability])
	);
}

function atomCapabilityProjectOwners<N, B extends Bond, E extends Element | BondVirtualElement>(
	capabilities: readonly RuntimeAtomCapability<N, B, E>[]
): Map<string, RuntimeAtomCapability<N, B, E>[]> {
	// Plain Map: built per validation pass for diagnostics, never reactive state.
	// eslint-disable-next-line svelte/prefer-svelte-reactivity
	let owners = new Map<string, RuntimeAtomCapability<N, B, E>[]>();
	for (const capability of capabilities) {
		for (const project of capability.meta?.projects ?? []) {
			owners = mapWithValue(owners, project, capability);
		}
	}
	return owners;
}

function atomCapabilityRequirementMessages<
	N,
	B extends Bond,
	E extends Element | BondVirtualElement
>(
	capability: RuntimeAtomCapability<N, B, E>,
	slots: ReadonlySet<symbol>,
	atomName: string
): string[] {
	const messages: string[] = [];
	for (const need of capability.requires ?? []) {
		if (!slots.has(need)) {
			messages.push(
				`[svelte-atoms] Atom("${atomName}") capability "${atomCapabilityLabel(capability)}" requires slot "${slotName(need)}", which is not registered.`
			);
		}
	}
	return messages;
}

function atomCapabilityConflictMessages<N, B extends Bond, E extends Element | BondVirtualElement>(
	capability: RuntimeAtomCapability<N, B, E>,
	slotOwners: ReadonlyMap<symbol, RuntimeAtomCapability<N, B, E>>,
	projectOwners: ReadonlyMap<string, RuntimeAtomCapability<N, B, E>[]>,
	atomName: string
): string[] {
	const messages: string[] = [];
	for (const conflict of capability.meta?.conflicts ?? []) {
		messages.push(
			...(typeof conflict === 'symbol'
				? atomCapabilitySlotConflictMessages(capability, conflict, slotOwners, atomName)
				: atomCapabilityProjectConflictMessages(capability, conflict, projectOwners, atomName))
		);
	}
	return messages;
}

function atomCapabilitySlotConflictMessages<
	N,
	B extends Bond,
	E extends Element | BondVirtualElement
>(
	capability: RuntimeAtomCapability<N, B, E>,
	conflict: symbol,
	slotOwners: ReadonlyMap<symbol, RuntimeAtomCapability<N, B, E>>,
	atomName: string
): string[] {
	const owner = slotOwners.get(conflict);
	if (!owner || owner === capability) return [];
	return [
		`[svelte-atoms] Atom("${atomName}") capability "${atomCapabilityLabel(capability)}" conflicts with registered atom capability slot "${slotName(conflict)}".`
	];
}

function atomCapabilityProjectConflictMessages<
	N,
	B extends Bond,
	E extends Element | BondVirtualElement
>(
	capability: RuntimeAtomCapability<N, B, E>,
	conflict: string,
	projectOwners: ReadonlyMap<string, RuntimeAtomCapability<N, B, E>[]>,
	atomName: string
): string[] {
	const owners = projectOwners.get(conflict)?.filter((owner) => owner !== capability) ?? [];
	if (owners.length === 0) return [];
	const ownerNames = owners.map((owner) => `"${atomCapabilityLabel(owner)}"`).join(', ');
	return [
		`[svelte-atoms] Atom("${atomName}") capability "${atomCapabilityLabel(capability)}" conflicts with projection "${conflict}" from ${ownerNames}.`
	];
}

function hasAtomCapabilitySlot<N, B extends Bond, E extends Element | BondVirtualElement>(
	capability: RuntimeAtomCapability<N, B, E>
): capability is SlottedRuntimeAtomCapability<N, B, E> {
	return capability.slot !== undefined;
}

function atomCapabilityLabel<N, B extends Bond, E extends Element | BondVirtualElement>(
	capability: RuntimeAtomCapability<N, B, E>
): string {
	return capability.slot ? slotName(capability.slot) : '<slotless>';
}

function mapWithValue<K, V>(map: ReadonlyMap<K, readonly V[]>, key: K, value: V): Map<K, V[]> {
	// Plain Map: cloned from a local diagnostic map, never reactive state.
	// eslint-disable-next-line svelte/prefer-svelte-reactivity
	const next = new Map<K, V[]>(Array.from(map, ([entryKey, values]) => [entryKey, [...values]]));
	next.set(key, [...(next.get(key) ?? []), value]);
	return next;
}

// Spread merging.

function mergeBehaviors<B extends Bond, E extends Element | BondVirtualElement>(
	bond: B,
	baseAttrs: Record<string, unknown>,
	baseHandlers: Record<string, unknown>,
	behaviors: readonly Behavior<B, E>[]
): { attrs: Record<string, unknown>; handlers: Record<string, unknown> } {
	let attrs: Record<string, unknown> = { ...baseAttrs };
	let handlers: Record<string, unknown> = { ...baseHandlers };

	for (const behavior of behaviors) {
		if (behavior.attrs) {
			attrs = mergeAttributeLayer(attrs, behavior.attrs(bond), {
				source: 'bond behavior',
				nextSource: 'capability behavior'
			});
		}
		if (behavior.handlers) {
			handlers = mergeHandlerLayer(handlers, behavior.handlers(bond), {
				source: 'bond behavior',
				nextSource: 'capability behavior'
			});
		}
	}

	return { attrs, handlers };
}

function toTeardown(live: Exclude<CapabilitySetupResult, void>): () => void {
	if (typeof live === 'function') return live;
	return () => live[Symbol.dispose]();
}

function mergeNodeBehaviors<
	N extends Atom<B, E>,
	B extends Bond,
	E extends Element | BondVirtualElement
>(
	node: N,
	bond: B | undefined,
	baseAttrs: Record<string, unknown>,
	baseHandlers: Record<string, unknown>,
	behaviors: readonly AtomBehavior<N, B, E>[]
): { attrs: Record<string, unknown>; handlers: Record<string, unknown> } {
	let attrs: Record<string, unknown> = { ...baseAttrs };
	let handlers: Record<string, unknown> = { ...baseHandlers };

	for (const behavior of behaviors) {
		if (behavior.attrs) {
			attrs = mergeAttributeLayer(attrs, behavior.attrs(node, bond), {
				source: 'atom behavior',
				nextSource: 'atom capability'
			});
		}
		if (behavior.handlers) {
			handlers = mergeHandlerLayer(handlers, behavior.handlers(node, bond), {
				source: 'atom behavior',
				nextSource: 'atom capability'
			});
		}
	}

	return { attrs, handlers };
}
