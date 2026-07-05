import { setContext } from 'svelte';
import {
	Bond,
	BondState,
	type Atom,
	bondContextKey,
	type BondStateProps,
	type Capability
} from '$ixirjs/ui/shared/bond';
import {
	adoptStateHost,
	attachAccessor,
	attachMethod,
	attachStateFactory,
	hideAccessor,
	resolveState,
	stateProps,
	warnPartCompositionConflicts
} from '$ixirjs/ui/shared/authoring/define-runtime';

// bond: any lets atoms declare a narrower view without variance errors.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AtomConstructor = new (bond: any) => Atom<any, any>;

export type AtomSpec = AtomConstructor | { atom: AtomConstructor; key?: string; role?: string };

export type AtomInstance<E> = E extends AtomConstructor
	? InstanceType<E>
	: E extends { atom: infer C }
		? C extends AtomConstructor
			? InstanceType<C>
			: never
		: never;

// abstract classes allowed.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type BondBaseClass = abstract new (...args: any[]) => Bond;

// any[] avoids a second inference site that would defeat State inference for generic State classes.
// The precise props type for create() is recovered from the State class via StatePropsOf.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type StateCtor<State extends BondState = BondState> = new (...args: any[]) => State;

export type StatePropsOf<State extends BondState> =
	State extends BondState<infer P> ? P : BondStateProps;

// hand-written bonds satisfy this via a spec getter.
export type FusablePart = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	readonly spec: BondSpec<any, any>;
	readonly CONTEXT_KEY?: string;
	readonly CONTEXT_KEYS?: readonly string[];
};

export interface BondSpec<
	A extends Record<string, AtomSpec>,
	Base extends BondBaseClass = typeof Bond
> {
	// DOM namespace, preset base, and context key (e.g. 'collapsible').
	name: string;
	atoms: A;
	// e.g. ModalOverlay for overlay machinery.
	base?: Base;
	// Registration-home rule: state-owned models register in BondState ctor; stateless policies
	// or overrides register here. Ordering is load-bearing: last registration wins per slot.
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	capabilities?: (state: any) => Capability[];
	// Dotted preset override (e.g. accordion.item).
	preset?: string;
	// Adds static state + create(props), threads the State type from the spec.
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	state?: StateCtor<any>;
	// Generated convenience accessors (`bond.root()`, `bond.trigger()`) can be disabled per bond.
	atomMethods?: boolean;
	// atoms union + capabilities concatenate (later wins); preferred over extends.
	parts?: readonly FusablePart[];
	// Real subclass inheriting CONTEXT_KEY/instanceof/atoms; superseded by parts:.
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	extends?: DefinedBondClass<any, any, any>;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	methods?: Record<string, (this: any, ...args: any[]) => any>;
}

// Generated bond instance: Bond with state re-typed to State, optionally plus atom methods.
type DeprecatedAtomMethod<T> = {
	(): T;
};

type AtomMethodMap<A extends Record<string, AtomSpec>> = {
	[K in keyof A]: DeprecatedAtomMethod<AtomInstance<A[K]>>;
};

type MaybeAtomMethods<
	A extends Record<string, AtomSpec>,
	AtomMethods extends boolean
> = AtomMethods extends false ? Record<never, never> : AtomMethodMap<A>;

export type DefinedBond<
	A extends Record<string, AtomSpec>,
	State extends BondState = BondState,
	Base extends BondBaseClass = typeof Bond,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	M extends Record<string, (...args: any[]) => any> = Record<never, never>,
	AtomMethods extends boolean = true
> = InstanceType<Base> & { readonly state: State } & MaybeAtomMethods<A, AtomMethods> & M;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type BondOf<C extends new (...args: any[]) => Bond> = InstanceType<C>;

// Minimal bond shape for atom type annotations (avoids import cycles).
export type ViewOf<S extends BondState> = Bond & { state: S };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type StateOf<C extends new (state: any) => Bond> = C extends new (state: infer S) => Bond
	? S
	: never;

// Constructible bond class with static context API and its originating spec.
export type DefinedBondClass<
	A extends Record<string, AtomSpec>,
	State extends BondState = BondState,
	Base extends BondBaseClass = typeof Bond,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	M extends Record<string, (...args: any[]) => any> = Record<never, never>,
	AtomMethods extends boolean = true
> = (new (state: State) => DefinedBond<A, State, Base, M, AtomMethods>) & {
	CONTEXT_KEY: string;
	// Transitive context-key list from parts: path; absent on non-composed bonds.
	readonly CONTEXT_KEYS?: readonly string[];
	get(): DefinedBond<A, State, Base, M, AtomMethods> | undefined;
	getOrThrow(message?: string): DefinedBond<A, State, Base, M, AtomMethods>;
	optional(): DefinedBond<A, State, Base, M, AtomMethods> | undefined;
	required(message?: string): DefinedBond<A, State, Base, M, AtomMethods>;
	set(
		bond: DefinedBond<A, State, Base, M, AtomMethods>
	): DefinedBond<A, State, Base, M, AtomMethods>;
	// Absent when the bond is constructed manually.
	readonly state?: StateCtor<State>;
	// Throws if the spec declared no state.
	create(props: StatePropsOf<State>): DefinedBond<A, State, Base, M, AtomMethods>;
	// The seam Fusion composes over.
	readonly spec: BondSpec<A, Base>;
};

export function defineBond<
	A extends Record<string, AtomSpec>,
	State extends BondState<BondStateProps> = BondState,
	Base extends BondBaseClass = typeof Bond,
	PAtoms extends Record<string, AtomSpec> = Record<never, AtomSpec>,
	PState extends BondState = BondState,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	M extends Record<string, (...args: any[]) => any> = Record<never, never>,
	AtomMethods extends boolean = true
>(
	// Omitted then re-added so capabilities is re-typed over THIS bond's State and state is an inference site.
	spec: Omit<
		BondSpec<A, Base>,
		'extends' | 'methods' | 'capabilities' | 'state' | 'atomMethods'
	> & {
		extends?: DefinedBondClass<PAtoms, PState>;
		methods?: M;
		capabilities?: (state: State) => Capability[];
		state?: StateCtor<State>;
		atomMethods?: AtomMethods;
	}
): DefinedBondClass<Omit<PAtoms, keyof A> & A, State, Base, M, AtomMethods> {
	const shouldAttachAtomMethods = spec.atomMethods !== false;

	// ─── Flat composition path (`parts:`) — the compose operator ───
	if (spec.parts && spec.parts.length > 0) {
		warnPartCompositionConflicts(
			spec.name,
			spec.parts,
			spec.atoms,
			spec.methods,
			shouldAttachAtomMethods
		);
		const partsAtoms: Record<string, AtomSpec> = {};
		const partsCapFns: ((state: BondState) => Capability[])[] = [];
		for (const part of spec.parts) {
			Object.assign(partsAtoms, part.spec.atoms);
			if (part.spec.capabilities) partsCapFns.push(part.spec.capabilities);
		}
		const mergedAtoms = { ...partsAtoms, ...spec.atoms };
		// widened to BondState for the seam; runtime instance is always a State.
		const ownCaps = spec.capabilities as ((state: BondState) => Capability[]) | undefined;
		const mergedCapabilities = (state: BondState): Capability[] => [
			...partsCapFns.flatMap((fn) => fn(state)),
			...(ownCaps?.(state) ?? [])
		];

		const BaseClass = (spec.base ?? Bond) as unknown as new (
			props: BondStateProps,
			name?: string
		) => Bond;

		class Composed extends BaseClass {
			// Seam a future parts: [ThisBond] reads.
			static spec = {
				...spec,
				atoms: mergedAtoms,
				capabilities: mergedCapabilities
			} as unknown as BondSpec<Record<string, AtomSpec>>;

			constructor(stateOrProps: State | StatePropsOf<State>) {
				const state = resolveState(stateOrProps, spec.state as StateCtor<State> | undefined);
				super(state ? (state.props as StatePropsOf<State>) : stateProps(stateOrProps), spec.name);
				if (state) adoptStateHost(this, state);
				for (const cap of mergedCapabilities((state ?? this.state) as BondState)) {
					this.capability(cap);
				}
			}

			override get namespace(): string {
				return spec.name;
			}

			override get preset(): string {
				return spec.preset ?? super.preset;
			}
		}

		// Fresh context key — `parts:` is a rebrand, not an extension.
		Object.defineProperty(Composed, 'CONTEXT_KEY', {
			value: bondContextKey(spec.name),
			writable: true,
			configurable: true
		});

		// Transitive keys: a part contributes its full CONTEXT_KEYS, so e.g. a `<Popover.Trigger>`
		// inside a Select still resolves via `PopoverBond.get()`.
		const partContextKeys = [
			// eslint-disable-next-line svelte/prefer-svelte-reactivity
			...new Set(
				spec.parts.flatMap((p) =>
					p.CONTEXT_KEYS ? [...p.CONTEXT_KEYS] : [p.CONTEXT_KEY ?? bondContextKey(p.spec.name)]
				)
			)
		];
		Object.defineProperty(Composed, 'CONTEXT_KEYS', {
			value: [bondContextKey(spec.name), ...partContextKeys],
			writable: true,
			configurable: true
		});
		// `share()` also registers under each part's key so parts' own atom components resolve.
		const proto = Composed.prototype as unknown as { share: () => Bond };
		const baseShare = proto.share;
		Object.defineProperty(proto, 'share', {
			value(this: Bond) {
				baseShare.call(this);
				for (const key of partContextKeys) setContext(key, this);
				return this;
			},
			writable: true,
			configurable: true,
			enumerable: false
		});

		if (shouldAttachAtomMethods) {
			for (const methodName of Object.keys(mergedAtoms)) {
				attachAccessor(Composed.prototype, methodName, mergedAtoms[methodName]!);
			}
		}
		for (const [name, fn] of Object.entries(spec.methods ?? {})) {
			attachMethod(Composed.prototype, name, fn);
		}

		// Attach static state + create(props).
		attachStateFactory(Composed, spec.state as StateCtor | undefined);

		return Composed as unknown as DefinedBondClass<
			Omit<PAtoms, keyof A> & A,
			State,
			Base,
			M,
			AtomMethods
		>;
	}

	// ─── Spec-inheritance path (`extends:`) — a real subclass; kept for the positioned chain ───
	const parent = spec.extends as unknown as
		| (DefinedBondClass<Record<string, AtomSpec>, BondState> & {
				spec: BondSpec<Record<string, AtomSpec>>;
		  })
		| undefined;
	const flattenedAtoms = parent ? { ...parent.spec.atoms, ...spec.atoms } : spec.atoms;
	const BaseClass = (spec.extends ?? spec.base ?? Bond) as unknown as new (
		props: BondStateProps,
		name?: string
	) => Bond;

	class Defined extends BaseClass {
		// Seam fuse / nested extends reads.
		static spec = (parent
			? {
					...spec,
					atoms: flattenedAtoms,
					capabilities: (state: BondState) => [
						...(parent.spec.capabilities?.(state) ?? []),
						...((spec.capabilities as ((s: BondState) => Capability[]) | undefined)?.(state) ?? [])
					]
				}
			: spec) as unknown as BondSpec<Record<string, AtomSpec>>;

		constructor(stateOrProps: State | StatePropsOf<State>) {
			const state = resolveState(stateOrProps, spec.state as StateCtor<State> | undefined);
			// Parent ctor is `(state)` (already registered its capabilities); a raw base takes the name.
			// Either way `name` drives the namespace via the getter, not the ctor arg.
			if (parent) super(stateOrProps as State);
			else {
				super(state ? (state.props as StatePropsOf<State>) : stateProps(stateOrProps), spec.name);
				if (state) adoptStateHost(this, state);
			}
			for (const capability of spec.capabilities?.((state ?? this.state) as State) ?? []) {
				this.capability(capability);
			}
		}

		override get namespace(): string {
			return spec.name;
		}

		override get preset(): string {
			return spec.preset ?? super.preset;
		}
	}

	// Own CONTEXT_KEY only when not extending — a child inherits the parent's, keeping the family unified.
	if (!spec.extends) {
		Object.defineProperty(Defined, 'CONTEXT_KEY', {
			value: bondContextKey(spec.name),
			writable: true,
			configurable: true
		});
	}

	// own atoms only; the parent's are inherited via the prototype.
	if (shouldAttachAtomMethods) {
		for (const methodName of Object.keys(spec.atoms)) {
			attachAccessor(Defined.prototype, methodName, spec.atoms[methodName]!);
		}
	} else if (parent) {
		for (const methodName of Object.keys(flattenedAtoms)) {
			hideAccessor(Defined.prototype, methodName);
		}
	}
	for (const [name, fn] of Object.entries(spec.methods ?? {})) {
		attachMethod(Defined.prototype, name, fn);
	}

	// Self-construction (ADR 0012): static `state` + `create(props)` when the spec declares a state.
	// A child via extends inherits the parent's static create; its own state (if any) wins here.
	attachStateFactory(Defined, spec.state as StateCtor | undefined);

	return Defined as unknown as DefinedBondClass<
		Omit<PAtoms, keyof A> & A,
		State,
		Base,
		M,
		AtomMethods
	>;
}
