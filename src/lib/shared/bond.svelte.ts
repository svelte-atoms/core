import { nanoid } from 'nanoid';
import { getContext, setContext } from 'svelte';
import { getElementId } from '../utils/dom.svelte';
import { createAttachmentKey } from 'svelte/attachments';
import { SvelteMap } from 'svelte/reactivity';
import type { VirtualElement } from '@floating-ui/dom';
import { Collection } from './collection.svelte';
import { collectionCapability, collectionSlot } from './capabilities/collection.svelte';
import type { SelectionModel } from './capabilities/selection.svelte';
import type { RovingFocus } from './capabilities/roving-focus.svelte';
import type { InputModel } from './capabilities/input.svelte';
import type { Disclosure } from './capabilities/disclosure.svelte';

export type BondVirtualElement = VirtualElement;

export type BondStateProps = { id?: string };
export type BondElements = Record<string, Element | BondVirtualElement | undefined>;

// Static-side shape of a Bond subclass — types the polymorphic static get/set.
export type BondClass<T extends Bond> = { prototype: T; CONTEXT_KEY: string };

// Lazy builder for a single atom given its owning bond — the value side of AtomRegistry.
export type AtomFactory<
	B extends Bond = Bond,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	A extends BondAtom<any, any> = BondAtom<any, any>
> = (bond: B) => A;

// key → factory map; the key is what Bond.atom() caches and looks up.
export type AtomRegistry<B extends Bond = Bond> = Record<string, AtomFactory<B>>;

// Composable behavior unit folded into BondAtom.spread: attrs merge (last wins), handlers chain, onmount runs alongside.
export interface Behavior<
	B extends Bond = Bond,
	E extends Element | BondVirtualElement = Element | BondVirtualElement
> {
	attrs?(bond: B): Record<string, unknown>;
	handlers?(bond: B): Record<string, unknown>;
	onmount?(node: E, bond: B): void | (() => void);
}

// Slot → surface-type registry, so `capability(slot)` returns a typed surface without a cast.
// Augmentable: consumer libraries `declare module` to add their own slots. Policy slots whose
// surfaces live outside this layer (focus/escape) are intentionally absent — retrieve with an explicit type.
export interface CapabilitySurfaces {
	selection: SelectionModel<unknown>;
	roving: RovingFocus;
	input: InputModel;
	'trigger-content': Disclosure;
}
// Slots known to the type system; plain strings (e.g. `collection:<kind>`, policy slots) stay valid.
export type KnownSlot = keyof CapabilitySurfaces & string;

// Role → ctx-type contract. `item`/`input` carry a string identifier; structural roles carry nothing.
// `.role()` enforces this; unknown (consumer) roles fall through to an optional `unknown` ctx.
export interface RoleContexts {
	item: string;
	input: string;
	container: void;
	content: void;
	surface: void;
	trigger: void;
	label: void;
	description: void;
	control: void;
}
export type KnownRole = keyof RoleContexts & string;
// The ctx argument tuple a role requires: none for `void` roles, one for ctx-bearing roles,
// optional-unknown for custom roles — so `.role('item')` is a compile error but `.role('custom')` is fine.
export type RoleCtxArgs<R extends string> = R extends KnownRole
	? RoleContexts[R] extends void
		? [ctx?: undefined]
		: [ctx: RoleContexts[R]]
	: [ctx?: unknown];

// The behavior-axis brick (dual of the atom). slot = fusion key, surface = consumer API, behavior() decorates by role. §4.2.
export interface Capability<Surface = unknown> {
	readonly slot: string;
	// Present on stateful models (Disclosure, SelectionModel…); omitted on stateless policies.
	readonly surface?: Surface;
	// Sibling slots this capability reads at projection/setup time; validated at registration (DEV).
	readonly requires?: readonly string[];
	behavior?(role: string, ctx?: unknown): Behavior | undefined;
	// Run once when the bond goes live (driven by useCapabilities at root init); returns optional teardown.
	// The home for whole-bond effects (focus restore, document listeners) that no single atom owns.
	setup?(bond: Bond): (() => void) | void;
}

// Introspection snapshot of one registered capability — for tests, devtools, and docs.
export interface CapabilityInfo {
	slot: string;
	hasSurface: boolean;
	requires: readonly string[];
	hasSetup: boolean;
}

// Reactive key→value map with microtask-deferred writes (avoids state_unsafe_mutation in $derived).
// stage() buffers to plain Map; flush commits to SvelteMap; get() reads committed first then pending.
class StagedMap<V> {
	#pending = new Map<string, V>();
	#committed = new SvelteMap<string, V>();
	#flushScheduled = false;

	// Flush pending buffer into the reactive map on a microtask.
	#scheduleFlush() {
		if (this.#flushScheduled) return;
		this.#flushScheduled = true;
		queueMicrotask(() => {
			this.#flushScheduled = false;
			for (const [key, value] of this.#pending) this.#committed.set(key, value);
			this.#pending.clear();
		});
	}

	get(key: string): V | undefined {
		// Read #committed first to register the dependency, else the flush won't re-trigger.
		const committed = this.#committed.get(key);
		return this.#pending.get(key) ?? committed;
	}

	has(key: string): boolean {
		return this.#pending.has(key) || this.#committed.has(key);
	}

	// Non-keyed lookup: scans committed (registers dependency) then pending; finds a just-staged value synchronously.
	find(predicate: (value: V, key: string) => boolean): V | undefined {
		for (const [key, value] of this.#committed) if (predicate(value, key)) return value;
		for (const [key, value] of this.#pending) if (predicate(value, key)) return value;
		return undefined;
	}

	stage(key: string, value: V): void {
		this.#pending.set(key, value);
		this.#scheduleFlush();
	}

	clear(): void {
		this.#pending.clear();
		this.#committed.clear();
	}

	forEach(cb: (key: string, value: V) => void): void {
		// Committed first, then pending so a re-staged key's newest value wins.
		for (const [key, value] of this.#committed) cb(key, value);
		for (const [key, value] of this.#pending) cb(key, value);
	}
}

// Cross-copy identity brand (Symbol.for survives deduplication/HMR). Forgeable by design — guards forks, not adversaries. ADR 0005 D4.
const BOND_BRAND: unique symbol = Symbol.for('@svelte-atoms/bond:brand');

// OrdinaryHasInstance: exact prototype semantics for subclass checks, bypassed only at base Bond.
function ordinaryHasInstance(ctor: unknown, value: unknown): boolean {
	if (typeof ctor !== 'function') return false;
	const proto = (ctor as { prototype?: unknown }).prototype;
	if (proto === null || typeof proto !== 'object') return false;
	return (
		value !== null &&
		(typeof value === 'object' || typeof value === 'function') &&
		(proto as object).isPrototypeOf(value as object)
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

	// Cross-copy identity brand; read by static [Symbol.hasInstance]. ADR 0005 D4.
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

	// Bonds print as [object <name>] in consoles and Object.prototype.toString. ADR 0005 D1.
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

	// Register a per-instance atom factory under key, resolved ahead of the shared registry.
	protected registerAtom(key: string, factory: AtomFactory): void {
		(this.#instanceAtoms ??= {})[key] = factory;
	}

	// Publish this bond into Svelte context under its family's CONTEXT_KEY.
	share(): this {
		setContext((this.constructor as typeof Bond).CONTEXT_KEY, this);
		return this;
	}

	// Lazily build and cache the atom for key: #instanceAtoms → Bond.atoms → DefaultAtom.
	atom(key: string): BondAtom {
		const existing = this.#queue.get(key);
		if (existing) return existing;

		const registered =
			this.#instanceAtoms?.[key] ?? (this.constructor as typeof Bond).atoms[key];
		const newAtom = registered ? registered(this) : new DefaultAtom(this, key);
		this.#queue.stage(key, newAtom);
		return newAtom;
	}

	// Find the atom playing role (e.g. for aria-controls cross-references). §11.3.
	atomByRole(role: string): BondAtom | undefined {
		const atom = this.#queue.find((a) => a.hasRole(role));
		if (import.meta.env?.DEV && !atom) {
			console.warn(`[svelte-atoms] Bond("${this.name}").atomByRole("${role}"): no atom plays this role.`);
		}
		return atom;
	}

	element<T extends Element | BondVirtualElement = Element | BondVirtualElement>(
		key: string
	): T | undefined {
		return this.atom(key)?.element as T | undefined;
	}

	// Register a Capability (delegates to BondState, single home per ADR 0001 §11.1).
	capability<C extends Capability>(capability: C): C;
	// Retrieve a known slot with its typed surface (no cast).
	capability<K extends KnownSlot>(slot: K): Capability<CapabilitySurfaces[K]> | undefined;
	// Retrieve any slot (dynamic/custom); surface type unknown unless supplied.
	capability<S = unknown>(slot: string): Capability<S> | undefined;
	capability<C extends Capability, S = unknown>(
		capabilityOrSlot: C | string
	): C | Capability<S> | undefined {
		if (typeof capabilityOrSlot === 'string') return this.#state.capability<S>(capabilityOrSlot);
		return this.#state.capability(capabilityOrSlot);
	}

	// All registered capabilities, in registration order; drives setup() and introspection.
	get capabilities(): readonly Capability[] {
		return this.#state.capabilities;
	}

	// Introspection snapshot of registered capabilities — for tests, devtools, and docs.
	describeCapabilities(): CapabilityInfo[] {
		return this.#state.describeCapabilities();
	}

	destroy() {
		this.#queue.clear();
	}

	// This family's bond from context; polymorphic this so FooBond.get() returns Foo | undefined.
	static get<T extends Bond>(this: BondClass<T>): T | undefined {
		return getContext(this.CONTEXT_KEY);
	}

	// Imperative counterpart of share(), keyed off the concrete subclass.
	static set<T extends Bond>(this: BondClass<T>, bond: T): T {
		return setContext(this.CONTEXT_KEY, bond);
	}

	// x instanceof Bond via BOND_BRAND (survives duplicate copies); subclass checks stay prototype-based. ADR 0005 D4.
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
	// Single home — BondState owns logic (ADR 0001 §11.1); the bond delegates here.
	// Collections live here too, registered at slot `collection:<kind>` (see `collection`).
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

	// Get or create the typed children collection for kind (cached), registered at slot collection:<kind>. CONTEXT.md §Collection.
	collection<T>(kind: string): Collection<T> {
		const slot = collectionSlot(kind);
		// Read the registry directly (not via `capability(slot)`) so a first, cache-priming
		// access doesn't trip the "no capability at this slot" DEV warning.
		const existing = this.#capabilities.find((c) => c.slot === slot);
		if (existing) return existing.surface as Collection<T>;
		const cap = collectionCapability<T>(kind);
		this.capability(cap);
		return cap.surface;
	}

	// Register a Capability in its single home (this state). §11.1.
	capability<C extends Capability>(capability: C): C;
	// Retrieve a known slot with its typed surface (no cast).
	capability<K extends KnownSlot>(slot: K): Capability<CapabilitySurfaces[K]> | undefined;
	// Retrieve any slot (dynamic/custom).
	capability<S = unknown>(slot: string): Capability<S> | undefined;
	capability<C extends Capability, S = unknown>(
		capabilityOrSlot: C | string
	): C | Capability<S> | undefined {
		if (typeof capabilityOrSlot === 'string') {
			const found = this.#capabilities.find((c) => c.slot === capabilityOrSlot) as
				| Capability<S>
				| undefined;
			if (import.meta.env?.DEV && !found) {
				console.warn(`[svelte-atoms] BondState.capability("${capabilityOrSlot}"): no capability registered at this slot in "${this.id}".`);
			}
			return found;
		}
		// Last-wins-per-slot: re-registering a slot replaces the prior holder (lets a spec override a
		// base default; `fuse` and the overlay capability stacks rely on it). DEV-logs the replacement
		// so order-dependent overrides aren't silent (#4).
		const i = this.#capabilities.findIndex((c) => c.slot === capabilityOrSlot.slot);
		if (i >= 0) {
			if (import.meta.env?.DEV) {
				console.debug(`[svelte-atoms] capability slot "${capabilityOrSlot.slot}" replaced in "${this.id}" (last-wins).`);
			}
			this.#capabilities[i] = capabilityOrSlot;
		} else {
			this.#capabilities.push(capabilityOrSlot);
		}
		return capabilityOrSlot;
	}

	// All registered capabilities, in registration order; drives setup() and introspection.
	get capabilities(): readonly Capability[] {
		return this.#capabilities;
	}

	// Snapshot of registered capabilities — slots, surface presence, deps, setup. For tests/devtools/docs.
	describeCapabilities(): CapabilityInfo[] {
		return this.#capabilities.map((c) => ({
			slot: c.slot,
			hasSurface: c.surface !== undefined,
			requires: c.requires ?? [],
			hasSetup: typeof c.setup === 'function'
		}));
	}

	// DEV: warn once if any capability declares a `requires` slot that never registered. Deferred to
	// first projection so the whole constructor-time registration order is complete before checking (#3).
	#requiresChecked = false;
	#checkRequires() {
		const slots = new Set(this.#capabilities.map((c) => c.slot));
		for (const cap of this.#capabilities) {
			for (const need of cap.requires ?? []) {
				if (!slots.has(need)) {
					console.warn(`[svelte-atoms] capability "${cap.slot}" requires slot "${need}", which is not registered in "${this.id}".`);
				}
			}
		}
	}

	// Every capability's Behavior projection for role; consumed by BondAtom.role().
	behaviorsForRole(role: string, ctx?: unknown): Behavior[] {
		if (import.meta.env?.DEV && !this.#requiresChecked) {
			this.#requiresChecked = true;
			this.#checkRequires();
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
	// Roles this atom plays (declared via role()); the bond resolves cross-atom id refs by finding the player.
	// Plain Set: written once at declaration; reactivity rides the queue, not this set.
	// eslint-disable-next-line svelte/prefer-svelte-reactivity
	#roles = new Set<string>();
	protected bond: B;
	protected key: string;

	constructor(bond: B, key: string) {
		this.bond = bond;
		this.key = key;
	}

	// Compose a Behavior onto this atom; chainable, layered in order and folded into spread.
	behavior(behavior: Behavior<B, E>): this {
		this.#behaviors.push(behavior);
		return this;
	}

	// Declare the role this atom plays; folds in capability projections for that role. §4.2.
	// Typed per role: `item`/`input` require their string ctx, structural roles take none; custom
	// string roles still accepted with an optional ctx (see RoleContexts).
	role<R extends string>(role: R, ...args: RoleCtxArgs<R>): this {
		const ctx = args[0] as unknown;
		// Record the role (so a sibling resolves our id via bond.atomByRole), then fold in projections.
		this.#roles.add(role);
		const behaviors = this.bond.state.behaviorsForRole(role, ctx);
		if (import.meta.env?.DEV && behaviors.length === 0) {
			console.warn(`[svelte-atoms] BondAtom("${this.bond.name}/${this.name}").role("${role}"): no capability responds to this role. If intentional, ignore.`);
		}
		for (const b of behaviors) this.behavior(b as Behavior<B, E>);
		return this;
	}

	// Whether this atom plays role — how Bond.atomByRole() finds the player.
	hasRole(role: string): boolean {
		return this.#roles.has(role);
	}

	get id() {
		return this.#id;
	}

	get element() {
		return this.#element;
	}

	// The atom's short name (e.g. 'arrow'); combined with namespace for kind/preset.
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
		return {
			[createAttachmentKey()]: (node: E) => {
				this.setElement(node);

				const cleanup = this.onmount(node);

				return () => {
					cleanup?.();
					this.ondestroy?.();
				};
			}
		};
	}

	get spread(): Record<string | symbol, unknown> {
		if (this.#behaviors.length === 0) {
			return { ...this.attrs, ...this.handlers, ...this.attachments };
		}

		let attrs: Record<string, unknown> = { ...this.attrs };
		let handlers: Record<string, unknown> = { ...this.handlers };
		const behaviorAttachments: Record<symbol, (node: E) => void | (() => void)> = {};

		for (const behavior of this.#behaviors) {
			if (behavior.attrs) attrs = { ...attrs, ...behavior.attrs(this.bond) };
			if (behavior.handlers) handlers = composeHandlers(handlers, behavior.handlers(this.bond));
			if (behavior.onmount) {
				const onmount = behavior.onmount;
				behaviorAttachments[createAttachmentKey()] = (node: E) => onmount(node, this.bond);
			}
		}

		return { ...attrs, ...handlers, ...this.attachments, ...behaviorAttachments };
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	onmount(node: E): void | (() => void){
		void node;
	}
	ondestroy?(): void {}

	protected setElement(element: E | undefined) {
		this.#element = element;
	}
}

// Fallback atom with no overrides, used by Bond.atom() for any unregistered key.
export class DefaultAtom extends BondAtom {}

// Canonical context key for a bond family: @svelte-atoms/context/<segments>.
export function bondContextKey(...segments: string[]): string {
	return `@svelte-atoms/context/${segments.join('/')}`;
}

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
