import { nanoid } from 'nanoid';
import { getContext, setContext } from 'svelte';
import { getElementId } from '../../utils/dom.svelte';
import { createAttachmentKey } from 'svelte/attachments';
import { Collection } from './collection.svelte';
import { collectionCapability, collectionSlot } from '../capability/models/collection.svelte';
import { StagedMap } from './staged-map.svelte';
import { bondContextKey } from './context';
import { slotName } from '../capability/capability';
import type {
	AtomFactory,
	AtomRegistry,
	BondClass,
	BondStateProps,
	BondVirtualElement
} from './types';
import type {
	Behavior,
	Capability,
	CapabilityInfo,
	CapabilityKey,
	RoleCtxArgs,
	RoleProjectionInfo
} from '../capability/capability';

// Re-exports so bond.svelte stays the single import surface; implementations live in sibling modules.
export { bondContextKey } from './context';
export type {
	BondVirtualElement,
	BondStateProps,
	BondElements,
	BondClass,
	AtomFactory,
	AtomRegistry
} from './types';
export {
	capabilityKey,
	sharedCapabilityKey,
	defineCapability,
	decorateCapability,
	type Behavior,
	type CapabilityKey,
	type SurfaceOf,
	type RoleContexts,
	type KnownRole,
	type RoleCtxArgs,
	type Capability,
	type RoleCtx,
	type CapabilityRoleMap,
	type CapabilityConfig,
	type CapabilityInfo,
	type RoleProjectionInfo,
	type CapabilityDecoration
} from '../capability/capability';

// Symbol.for survives duplicate copies and HMR; forgeable by design, guards forks not adversaries.
const BOND_BRAND: unique symbol = Symbol.for('@svelte-atoms/bond:brand');

// OrdinaryHasInstance: exact prototype semantics for subclass checks, bypassed only at base Bond.
function ordinaryHasInstance(ctor: unknown, value: unknown): boolean {
	if (typeof ctor !== 'function') return false;
	const proto = (ctor as { prototype?: unknown }).prototype;
	if (proto === null || typeof proto !== 'object') return false;
	return (
		value !== null &&
		(typeof value === 'object' || typeof value === 'function') &&
		Object.prototype.isPrototypeOf.call(proto, value as object)
	);
}

export abstract class Bond<
	Props extends BondStateProps = BondStateProps,
	State extends BondState<Props> = BondState<Props>
> {
	static CONTEXT_KEY = bondContextKey('bond');

	// Class-level registry of fixed atom factories, shared by the family.
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	static atoms: AtomRegistry<any> = {};

	#state: State;
	#queue = new StagedMap<BondAtom>();
	#name: string;

	// Cross-copy identity brand; read by static [Symbol.hasInstance].
	readonly [BOND_BRAND] = true;

	constructor(state: State, name?: string) {
		this.#state = state;
		this.#name = name ?? '';
	}

	get elements() {
		const obj: Record<string, Element | BondVirtualElement | undefined> = {};
		this.#queue.forEach((key, atom) => (obj[key] = atom.element));
		return obj;
	}

	get id() {
		return this.state.id;
	}

	get state() {
		return this.#state;
	}

	get name() {
		return this.#name;
	}

	// Bonds print as [object <name>] in consoles and Object.prototype.toString.
	get [Symbol.toStringTag]() {
		return this.name;
	}

	// DOM-identity namespace (data-bond, kind, ids); hyphenated, defaults to name.
	get namespace(): string {
		return this.name;
	}

	// Dotted preset path (e.g. accordion.item), source of truth for atom preset keys; defaults to namespace.
	get preset(): string {
		return this.namespace;
	}

	// Per-instance atom factories (dynamic atoms + overrides), checked before the shared class registry.
	#instanceAtoms?: AtomRegistry;

	protected registerAtom(key: string, factory: AtomFactory): void {
		(this.#instanceAtoms ??= {})[key] = factory;
	}

	share(): this {
		setContext((this.constructor as typeof Bond).CONTEXT_KEY, this);
		return this;
	}

	// Resolution order: #instanceAtoms → Bond.atoms → DefaultAtom.
	atom(key: string): BondAtom {
		const existing = this.#queue.get(key);
		if (existing) return existing;

		const registered = this.#instanceAtoms?.[key] ?? (this.constructor as typeof Bond).atoms[key];
		const newAtom = registered ? registered(this) : new DefaultAtom(this, key);
		this.#queue.stage(key, newAtom);
		return newAtom;
	}

	// Find the atom playing role (e.g. for aria-controls cross-references).
	atomByRole(role: string): BondAtom | undefined {
		const atom = this.#queue.find((a) => a.hasRole(role));
		if (import.meta.env?.DEV && !atom) {
			console.warn(
				`[svelte-atoms] Bond("${this.name}").atomByRole("${role}"): no atom plays this role.`
			);
		}
		return atom;
	}

	element<T extends Element | BondVirtualElement = Element | BondVirtualElement>(
		key: string
	): T | undefined {
		return this.atom(key)?.element as T | undefined;
	}

	// Surface type travels with the key (no cast, no parallel slot→type map).
	capability<C extends Capability>(capability: C): C;
	capability<S>(key: CapabilityKey<S>): Capability<S> | undefined;
	capability<S = unknown>(
		capabilityOrKey: Capability | CapabilityKey<S>
	): Capability<S> | undefined {
		return this.#state.capability(capabilityOrKey as CapabilityKey<S>);
	}

	surface<S>(key: CapabilityKey<S>): S | undefined {
		return this.#state.surface(key);
	}

	// For hard dependencies; throws with the slot name instead of returning undefined.
	requireCapability<S>(key: CapabilityKey<S>): Capability<S> {
		return this.#state.requireCapability(key);
	}

	requireSurface<S>(key: CapabilityKey<S>): S {
		return this.#state.requireSurface(key);
	}

	// Called by useCapabilities() when it runs setups — silences the DEV "setup() never ran" guard.
	markSetupConsumed(): void {
		this.#state.markSetupConsumed();
	}

	get capabilities(): readonly Capability[] {
		return this.#state.capabilities;
	}

	describeCapabilities(): CapabilityInfo[] {
		return this.#state.describeCapabilities();
	}

	// Answers "why does this atom have these attrs/handlers" — projection otherwise scatters across the chain.
	explainRole(role: string, ctx?: unknown): RoleProjectionInfo[] {
		const out: RoleProjectionInfo[] = [];
		for (const cap of this.capabilities) {
			const b = cap.behavior?.(role, ctx);
			if (!b) continue;
			out.push({
				slot: cap.slot,
				description: cap.slot.description,
				...(b.attrs ? { attrs: b.attrs(this) } : {}),
				...(b.handlers ? { handlers: b.handlers(this) } : {}),
				hasOnmount: typeof b.onmount === 'function'
			});
		}
		return out;
	}

	destroy() {
		this.#queue.clear();
	}

	// Polymorphic this: FooBond.get() returns Foo | undefined.
	static get<T extends Bond>(this: BondClass<T>): T | undefined {
		return getContext(this.CONTEXT_KEY);
	}

	// Returns a non-optional bond — call sites stay narrowed inside closures/$derived. Pass a component-specific message.
	static getOrThrow<T extends Bond>(this: BondClass<T>, message?: string): T {
		const bond = getContext<T | undefined>(this.CONTEXT_KEY);
		if (!bond) {
			throw new Error(
				message ??
					'[svelte-atoms] Bond context missing: component must be used within its provider.'
			);
		}
		return bond;
	}

	static set<T extends Bond>(this: BondClass<T>, bond: T): T {
		return setContext(this.CONTEXT_KEY, bond);
	}

	// x instanceof Bond via BOND_BRAND (survives duplicate copies); subclass checks stay prototype-based.
	static [Symbol.hasInstance](this: unknown, value: unknown): boolean {
		if (this === Bond) {
			return value != null && typeof value === 'object' && BOND_BRAND in value;
		}
		return ordinaryHasInstance(this, value);
	}
}

export abstract class BondState<S extends BondStateProps = BondStateProps> {
	#id: string;
	#props: S;
	// Single home for capabilities; collections also live here at slot collection:<kind>.
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	#capabilities: Capability<any>[] = [];

	constructor(props: S, id: string = nanoid(8)) {
		this.#props = props;
		this.#id = id;
	}

	get id() {
		return this.props?.id ?? this.#id;
	}

	get props() {
		return this.#props;
	}

	collection<T>(kind: string): Collection<T> {
		const slot = collectionSlot(kind);
		// Read the registry directly (not via `capability(slot)`) so a first, cache-priming
		// access doesn't trip the "no capability at this slot" DEV warning.
		const existing = this.#findCapability(slot);
		if (existing) return existing.surface as Collection<T>;
		const cap = collectionCapability<T>(kind);
		this.capability(cap);
		return cap.surface;
	}

	capability<C extends Capability>(capability: C): C;
	capability<S>(key: CapabilityKey<S>): Capability<S> | undefined;
	capability<S = unknown>(
		capabilityOrKey: Capability | CapabilityKey<S>
	): Capability<S> | undefined {
		if (typeof capabilityOrKey === 'symbol') {
			const found = this.#findCapability(capabilityOrKey) as Capability<S> | undefined;
			if (import.meta.env?.DEV && !found) {
				console.warn(
					`[svelte-atoms] BondState.capability("${slotName(capabilityOrKey)}"): no capability registered at this slot in "${this.id}".`
				);
			}
			return found;
		}
		// Last-wins-per-slot: re-registering a slot replaces the prior holder (lets a spec override a
		// base default; `fuse` and the overlay capability stacks rely on it). A holder carrying a
		// `compose` hook instead WRAPS the prior — the registry hands it the capability it supersedes
		// so it can delegate (decorateCapability). DEV-logs either way so overrides aren't silent.
		// Slot identity is by symbol, not string.
		const i = this.#capabilities.findIndex((c) => c.slot === capabilityOrKey.slot);
		if (i >= 0) {
			const prior = this.#capabilities[i]!;
			const next = capabilityOrKey.compose ? capabilityOrKey.compose(prior) : capabilityOrKey;
			if (import.meta.env?.DEV) {
				const verb = capabilityOrKey.compose ? 'decorated' : 'replaced';
				console.debug(
					`[svelte-atoms] capability slot "${slotName(capabilityOrKey.slot)}" ${verb} in "${this.id}" (last-wins).`
				);
			}
			this.#capabilities[i] = next;
		} else {
			this.#capabilities.push(capabilityOrKey);
		}
		return capabilityOrKey as Capability<S>;
	}

	// Bare registry lookup by slot identity — no DEV warn. Shared by capability()/collection()/require*.
	#findCapability(slot: symbol): Capability | undefined {
		return this.#capabilities.find((c) => c.slot === slot);
	}

	surface<S>(key: CapabilityKey<S>): S | undefined {
		return this.capability(key)?.surface;
	}

	// Throws with the slot name (skips the DEV warn).
	requireCapability<S>(key: CapabilityKey<S>): Capability<S> {
		const found = this.#findCapability(key) as Capability<S> | undefined;
		if (!found) {
			throw new Error(
				`[svelte-atoms] required capability "${slotName(key)}" is not registered in "${this.id}".`
			);
		}
		return found;
	}

	requireSurface<S>(key: CapabilityKey<S>): S {
		const cap = this.requireCapability(key);
		if (cap.surface === undefined) {
			throw new Error(
				`[svelte-atoms] capability "${slotName(key)}" has no surface in "${this.id}".`
			);
		}
		return cap.surface;
	}

	// Set by useCapabilities() once it has run the registered setups.
	#setupConsumed = false;
	markSetupConsumed(): void {
		this.#setupConsumed = true;
	}

	get capabilities(): readonly Capability[] {
		return this.#capabilities;
	}

	describeCapabilities(): CapabilityInfo[] {
		return this.#capabilities.map((c) => ({
			slot: c.slot,
			description: c.slot.description,
			hasSurface: c.surface !== undefined,
			requires: c.requires ?? [],
			hasSetup: typeof c.setup === 'function'
		}));
	}

	// Deferred to first projection so the full constructor-time registration order is complete.
	// Checks: (a) requires slots are registered, (b) useCapabilities ran if any cap has setup().
	// Timing: real roots call useCapabilities before children project, so (b) only fires when genuinely missing.
	#validated = false;
	#validate() {
		// Plain local Set: built once for membership lookup below, never reactive state.
		// eslint-disable-next-line svelte/prefer-svelte-reactivity
		const slots = new Set(this.#capabilities.map((c) => c.slot));
		for (const cap of this.#capabilities) {
			for (const need of cap.requires ?? []) {
				if (!slots.has(need)) {
					console.warn(
						`[svelte-atoms] capability "${slotName(cap.slot)}" requires slot "${slotName(need)}", which is not registered in "${this.id}".`
					);
				}
			}
		}
		if (!this.#setupConsumed && this.#capabilities.some((c) => c.setup)) {
			console.warn(
				`[svelte-atoms] "${this.id}" registered capabilities with setup() (focus/escape/…) but useCapabilities(bond) was never called — their whole-bond effects will not run.`
			);
		}
	}

	behaviorsForRole(role: string, ctx?: unknown): Behavior[] {
		if (import.meta.env?.DEV && !this.#validated) {
			this.#validated = true;
			this.#validate();
		}
		const out: Behavior[] = [];
		for (const capability of this.#capabilities) {
			const behavior = capability.behavior?.(role, ctx);
			if (behavior) out.push(behavior);
		}
		return out;
	}
}

export class BondAtom<
	B extends Bond<BondStateProps, BondState<BondStateProps>> = Bond,
	E extends Element | BondVirtualElement = Element | BondVirtualElement
> {
	#id = $derived.by(() => getElementId(this.bond.id, this.kind));
	#element = $state<E | undefined>();
	#behaviors: Behavior<B, E>[] = [];
	// Minted ONCE: Svelte keys attachments by symbol identity, so a fresh key per spread access would re-fire onmount/ondestroy.
	#attachKey = createAttachmentKey();
	// Pre-bound under stable keys at behavior() time — same reasoning as #attachKey.
	#behaviorAttachments: Record<symbol, (node: E) => void | (() => void)> = {};
	// Bound once: a fresh closure under a stable key still re-runs. Dispatches to this.onmount/ondestroy so overrides win.
	#ownAttach = (node: E): void | (() => void) => {
		this.setElement(node);
		const cleanup = this.onmount(node);
		return () => {
			cleanup?.();
			this.ondestroy?.();
		};
	};
	// Written once at declaration; reactivity rides the queue, not this set.
	// eslint-disable-next-line svelte/prefer-svelte-reactivity
	#roles = new Set<string>();
	protected bond: B;
	protected key: string;

	constructor(bond: B, key: string) {
		this.bond = bond;
		this.key = key;
	}

	behavior(behavior: Behavior<B, E>): this {
		this.#behaviors.push(behavior);
		if (behavior.onmount) {
			const onmount = behavior.onmount;
			// Bound here, not in the spread getter — Svelte keys attachments by symbol, so a new key per read re-runs the attachment.
			this.#behaviorAttachments[createAttachmentKey()] = (node: E) => onmount(node, this.bond);
		}
		return this;
	}

	// item/input require a string ctx; structural roles take none; custom roles accept optional unknown.
	role<R extends string>(role: R, ...args: RoleCtxArgs<R>): this {
		const ctx = args[0] as unknown;
		this.#roles.add(role);
		const behaviors = this.bond.state.behaviorsForRole(role, ctx);
		if (import.meta.env?.DEV && behaviors.length === 0) {
			console.warn(
				`[svelte-atoms] BondAtom("${this.bond.name}/${this.name}").role("${role}"): no capability responds to this role. If intentional, ignore.`
			);
		}
		for (const b of behaviors) this.behavior(b as Behavior<B, E>);
		return this;
	}

	hasRole(role: string): boolean {
		return this.#roles.has(role);
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
		return `${this.bond.namespace}-${this.name}`;
	}

	// Default preset key: root → bare bond.preset, others append name. Read as: preset ?? atom.preset.
	get preset(): string {
		const base = this.bond.preset;
		return this.name === 'root' ? base : `${base}.${this.name}`;
	}

	get attrs(): Record<string, unknown> {
		return {
			id: this.id,
			'data-bond': this.bond.namespace,
			'data-kind': this.kind
		};
	}

	get handlers(): Record<string, unknown> {
		return {};
	}

	get attachments(): Record<string, (node: E) => void | (() => void)> {
		return { [this.#attachKey]: this.#ownAttach };
	}

	get spread(): Record<string | symbol, unknown> {
		if (this.#behaviors.length === 0) {
			return { ...this.attrs, ...this.handlers, ...this.attachments };
		}

		let attrs: Record<string, unknown> = { ...this.attrs };
		let handlers: Record<string, unknown> = { ...this.handlers };

		for (const behavior of this.#behaviors) {
			if (behavior.attrs) attrs = { ...attrs, ...behavior.attrs(this.bond) };
			if (behavior.handlers) handlers = composeHandlers(handlers, behavior.handlers(this.bond));
		}

		return { ...attrs, ...handlers, ...this.attachments, ...this.#behaviorAttachments };
	}

	onmount(node: E): void | (() => void) {
		void node;
	}
	ondestroy?(): void {}

	protected setElement(element: E | undefined) {
		this.#element = element;
	}
}

// Fallback atom with no overrides, used by Bond.atom() for any unregistered key.
export class DefaultAtom extends BondAtom {}

// Merge two handler maps: chain colliding functions (base then extra), last-wins for non-functions.
function composeHandlers(
	base: Record<string, unknown>,
	extra: Record<string, unknown>
): Record<string, unknown> {
	const out: Record<string, unknown> = { ...base };
	for (const key in extra) {
		const a = out[key];
		const b = extra[key];
		if (typeof a === 'function' && typeof b === 'function') {
			out[key] = (...args: unknown[]) => {
				(a as (...a: unknown[]) => unknown)(...args);
				(b as (...a: unknown[]) => unknown)(...args);
			};
		} else {
			out[key] = b;
		}
	}
	return out;
}
