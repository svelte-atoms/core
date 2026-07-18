import { setContext } from 'svelte';
import {
	Bond,
	BondState,
	type Atom,
	bondContextKey,
	type BondStateProps,
	type Capability,
	type NodeCardinality
} from '$ixirjs/ui/shared/bond';
import {
	adoptStateHost,
	attachMethod,
	attachStateFactory,
	resolveState,
	stateProps,
	warnPartCompositionConflicts
} from '$ixirjs/ui/shared/authoring/define-runtime';
import { getBondSpec, setBondSpec } from './metadata';

// bond: any lets atoms declare a narrower view without variance errors.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AtomConstructor = new (bond: any) => Atom<any, any>;

// `part` names the declarative slot. Atom identity stays owned by its constructor and
// registration is owned by createAtomInstance({ register }); neither is overloaded here.
export type AtomSpec =
	| AtomConstructor
	| {
			atom: AtomConstructor;
			part?: string;
			role?: string;
			/** Registration policy belongs to the declared part, not its Svelte call site. */
			cardinality?: NodeCardinality;
	  };
type AtomMap = Record<string, AtomSpec>;

export type AtomInstance<E> = E extends AtomConstructor
	? InstanceType<E>
	: E extends { atom: infer C }
		? C extends AtomConstructor
			? InstanceType<C>
			: never
		: never;

// Abstract classes allowed. Omit makes the constraint structural: declaration emit expands
// inferred root `getBond()` returns, where Bond's private fields cannot be named across packages.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type BondBaseClass = abstract new (...args: any[]) => Omit<Bond, never>;

// any[] avoids a second inference site that would defeat State inference for generic State classes.
// The precise props type for create() is recovered from the State class via StatePropsOf.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type StateCtor<State extends BondState = BondState> = new (...args: any[]) => State;

export type StatePropsOf<State extends BondState> =
	State extends BondState<infer P> ? P : BondStateProps;

// Definitions carry composition metadata in an internal WeakMap. Consumers cannot inspect it.
export type FusablePart = {
	readonly CONTEXT_KEY?: string;
	readonly CONTEXT_KEYS?: readonly string[];
};

/** The sole authoring input to defineBond. All output types are extracted from this value. */
export interface BondSpec<A extends AtomMap = AtomMap, Base extends BondBaseClass = BondBaseClass> {
	name: string;
	atoms: A;
	base?: Base;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	capabilities?: (state: any) => Capability[];
	preset?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	state?: StateCtor<any>;
	parts?: readonly FusablePart[];
	extends?: FusablePart;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	methods?: Record<string, (this: any, ...args: any[]) => any>;
}

// This symbol exists only in the type system. Runtime composition remains private in metadata.ts.
declare const definitionSpec: unique symbol;
declare const definitionAtoms: unique symbol;
type DefinitionPhantom<S extends BondSpec = BondSpec, A extends AtomMap = AtomMap> = {
	readonly [definitionSpec]?: S;
	readonly [definitionAtoms]?: A;
};

/** Recovers a definition's source spec without exposing a runtime `.spec` property. */
export type SpecOf<D> = D extends DefinitionPhantom<infer S> ? S : never;
export type BaseOf<S> = S extends { base: infer Base extends BondBaseClass } ? Base : typeof Bond;
export type PartsOf<S> = S extends { parts: infer Parts extends readonly FusablePart[] }
	? Parts
	: [];
export type ExtendsOf<S> = S extends { extends: infer Parent extends FusablePart } ? Parent : never;
export type StateOf<S> = S extends { state: infer C extends StateCtor }
	? InstanceType<C>
	: [SpecOf<ExtendsOf<S>>] extends [never]
		? BondState
		: StateOf<SpecOf<ExtendsOf<S>>>;
export type PropsOf<S> = S extends { state: infer C extends StateCtor }
	? StatePropsOf<InstanceType<C>>
	: BaseInstance<S> extends Bond<infer P>
		? P
		: BondStateProps;
export type MethodsOf<S> = S extends {
	methods: infer Methods extends Record<string, (...args: never[]) => unknown>;
}
	? Methods
	: Record<never, never>;
type StateMembersOf<S> = S extends { state: infer C extends StateCtor }
	? Omit<InstanceType<C>, keyof BondState>
	: Record<never, never>;

type Override<Old, New> = Omit<Old, keyof New> & New;
type OwnAtomsOf<S> = S extends { atoms: infer A extends AtomMap } ? A : Record<never, never>;
type PartAtomsOf<Part> = [Part] extends [never]
	? Record<never, never>
	: Part extends DefinitionPhantom<BondSpec, infer A>
		? A
		: Record<never, never>;
type MergePartAtoms<
	Parts extends readonly FusablePart[],
	Merged extends AtomMap = Record<never, never>
> = Parts extends readonly [infer Head, ...infer Tail]
	? Tail extends readonly FusablePart[]
		? MergePartAtoms<Tail, Override<Merged, PartAtomsOf<Head>>>
		: Override<Merged, PartAtomsOf<Head>>
	: Merged;

/** Atom slots after ordered parts/extends composition; later definitions win per slot. */
export type AtomsOf<S> =
	PartsOf<S> extends []
		? Override<PartAtomsOf<ExtendsOf<S>>, OwnAtomsOf<S>>
		: Override<MergePartAtoms<PartsOf<S>>, OwnAtomsOf<S>>;

type BaseClassOf<S> =
	PartsOf<S> extends []
		? [SpecOf<ExtendsOf<S>>] extends [never]
			? BaseOf<S>
			: ExtendsOf<S> extends BondBaseClass
				? ExtendsOf<S>
				: BaseOf<S>
		: BaseOf<S>;
type BaseInstance<S> = InstanceType<BaseClassOf<S>>;

/** The instance produced by a spec, including base, adopted state members, and authored methods. */
export type DefinedBond<S extends BondSpec> = BaseInstance<S> & StateMembersOf<S> & MethodsOf<S>;

// Minimal bond shape for atom type annotations (avoids import cycles).
export type ViewOf<S extends BondState> = Bond & Omit<S, keyof BondState>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type BondOf<C extends new (...args: any[]) => Bond> = InstanceType<C>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type StateOfClass<C extends new (state: any) => Bond> = C extends new (
	state: infer S
) => Bond
	? S
	: never;

/** Constructible definition facade. Its spec is type-only; no runtime metadata is public. */
export type DefinedBondClass<S extends BondSpec> = (new (
	stateOrProps: StateOf<S> | PropsOf<S>
) => DefinedBond<S>) &
	DefinitionPhantom<S, AtomsOf<S>> & {
		CONTEXT_KEY: string;
		readonly CONTEXT_KEYS?: readonly string[];
		get(): DefinedBond<S> | undefined;
		getOrThrow(message?: string): DefinedBond<S>;
		optional(): DefinedBond<S> | undefined;
		required(message?: string): DefinedBond<S>;
		set(bond: DefinedBond<S>): DefinedBond<S>;
		readonly state?: StateCtor<StateOf<S>>;
		create(props: PropsOf<S>): DefinedBond<S>;
	};

export function defineBond<const S extends BondSpec>(spec: S): DefinedBondClass<S> {
	// ─── Flat composition path (`parts:`) — the compose operator ───
	if (spec.parts && spec.parts.length > 0) {
		warnPartCompositionConflicts(spec.name, spec.parts, spec.atoms);
		const partsAtoms: Record<string, AtomSpec> = {};
		const partsCapFns: ((state: BondState) => Capability[])[] = [];
		for (const part of spec.parts) {
			const partSpec = getBondSpec(part);
			Object.assign(partsAtoms, partSpec.atoms);
			if (partSpec.capabilities) partsCapFns.push(partSpec.capabilities);
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

			constructor(stateOrProps: StateOf<S> | PropsOf<S>) {
				const state = resolveState(stateOrProps, spec.state as StateCtor<StateOf<S>> | undefined);
				super(
					state ? (state.props as StatePropsOf<StateOf<S>>) : stateProps(stateOrProps),
					spec.name
				);
				if (state) adoptStateHost(this, state);
				for (const cap of mergedCapabilities((state ?? this) as BondState)) {
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
				spec.parts.flatMap((p) => {
					const partSpec = getBondSpec(p);
					return p.CONTEXT_KEYS
						? [...p.CONTEXT_KEYS]
						: [p.CONTEXT_KEY ?? bondContextKey(partSpec.name)];
				})
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

		for (const [name, fn] of Object.entries(spec.methods ?? {})) {
			attachMethod(Composed.prototype, name, fn);
		}

		// Attach static state + create(props).
		attachStateFactory(Composed, spec.state as StateCtor | undefined);
		setBondSpec(Composed, {
			...spec,
			atoms: mergedAtoms,
			capabilities: mergedCapabilities
		} as unknown as BondSpec<Record<string, AtomSpec>>);

		return Composed as unknown as DefinedBondClass<S>;
	}

	// ─── Spec-inheritance path (`extends:`) — a real subclass; kept for the positioned chain ───
	const parent = spec.extends as DefinedBondClass<BondSpec> | undefined;
	const parentSpec = parent ? getBondSpec(parent) : undefined;
	const flattenedAtoms = parentSpec ? { ...parentSpec.atoms, ...spec.atoms } : spec.atoms;
	const BaseClass = (spec.extends ?? spec.base ?? Bond) as unknown as new (
		props: BondStateProps,
		name?: string
	) => Bond;

	class Defined extends BaseClass {
		constructor(stateOrProps: StateOf<S> | PropsOf<S>) {
			const state = resolveState(stateOrProps, spec.state as StateCtor<StateOf<S>> | undefined);
			// Parent ctor is `(state)` (already registered its capabilities); a raw base takes the name.
			// Either way `name` drives the namespace via the getter, not the ctor arg.
			if (parent) super(stateOrProps as StateOf<S>);
			else {
				super(
					state ? (state.props as StatePropsOf<StateOf<S>>) : stateProps(stateOrProps),
					spec.name
				);
				if (state) adoptStateHost(this, state);
			}
			for (const capability of spec.capabilities?.((state ?? this) as StateOf<S>) ?? []) {
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

	for (const [name, fn] of Object.entries(spec.methods ?? {})) {
		attachMethod(Defined.prototype, name, fn);
	}

	// Self-construction (ADR 0012): static `state` + `create(props)` when the spec declares a state.
	// A child via extends inherits the parent's static create; its own state (if any) wins here.
	attachStateFactory(Defined, spec.state as StateCtor | undefined);
	setBondSpec(
		Defined,
		(parentSpec
			? {
					...spec,
					atoms: flattenedAtoms,
					capabilities: (state: BondState) => [
						...(parentSpec.capabilities?.(state) ?? []),
						...((spec.capabilities as ((s: BondState) => Capability[]) | undefined)?.(state) ?? [])
					]
				}
			: spec) as unknown as BondSpec<Record<string, AtomSpec>>
	);

	return Defined as unknown as DefinedBondClass<S>;
}
