import { setContext } from 'svelte';
import {
	Bond,
	BondState,
	bondContextKey,
	type AtomRegistry,
	type BondAtom,
	type BondStateProps,
	type Capability
} from '../bond/bond.svelte';

// bond: any lets atoms declare a narrower view without variance errors.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AtomConstructor = new (bond: any) => BondAtom<any, any>;

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

// this.state lets subclasses self-construct under their own identity.
function bondCreate(
	this: (new (state: BondState) => Bond) & { state?: StateCtor; name?: string },
	props: BondStateProps
): Bond {
	const StateClass = this.state;
	if (!StateClass) {
		throw new Error(
			`[svelte-atoms] ${this.name ?? 'bond'}.create(): no \`state\` class declared in the bond spec — pass { state } to defineBond/fuse, or construct the bond manually.`
		);
	}
	return new this(new StateClass(props));
}

function attachStateFactory(cls: object, StateClass: StateCtor | undefined): void {
	if (StateClass) {
		Object.defineProperty(cls, 'state', {
			value: StateClass,
			writable: true,
			configurable: true
		});
	}
	Object.defineProperty(cls, 'create', {
		value: bondCreate,
		writable: true,
		configurable: true
	});
}

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
	// atoms union + capabilities concatenate (later wins); preferred over extends.
	parts?: readonly FusablePart[];
	// Real subclass inheriting CONTEXT_KEY/instanceof/atoms; superseded by parts:.
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	extends?: DefinedBondClass<any, any, any>;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	methods?: Record<string, (this: any, ...args: any[]) => any>;
}

// Generated bond instance: Bond with state re-typed to State, plus a cached factory per atom slot.
export type DefinedBond<
	A extends Record<string, AtomSpec>,
	State extends BondState = BondState,
	Base extends BondBaseClass = typeof Bond,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	M extends Record<string, (...args: any[]) => any> = Record<never, never>
> = InstanceType<Base> & { readonly state: State } & {
	[K in keyof A]: () => AtomInstance<A[K]>;
} & M;

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
	M extends Record<string, (...args: any[]) => any> = Record<never, never>
> = (new (state: State) => DefinedBond<A, State, Base, M>) & {
	CONTEXT_KEY: string;
	// Transitive context-key list from parts: path; absent on non-composed bonds.
	readonly CONTEXT_KEYS?: readonly string[];
	get(): DefinedBond<A, State, Base, M> | undefined;
	getOrThrow(message?: string): DefinedBond<A, State, Base, M>;
	set(bond: DefinedBond<A, State, Base, M>): DefinedBond<A, State, Base, M>;
	// Absent when the bond is constructed manually.
	readonly state?: StateCtor<State>;
	// Throws if the spec declared no state.
	create(props: StatePropsOf<State>): DefinedBond<A, State, Base, M>;
	// The seam Fusion composes over.
	readonly spec: BondSpec<A, Base>;
};

function resolveAtomSpec(methodName: string, entry: AtomSpec) {
	const Ctor = typeof entry === 'function' ? entry : entry.atom;
	const key = typeof entry === 'function' ? methodName : (entry.key ?? methodName);
	const role = typeof entry === 'function' ? undefined : entry.role;
	return { Ctor, key, role };
}

function buildAtomRegistry(atomsSpec: Record<string, AtomSpec>): AtomRegistry {
	const registry: AtomRegistry = {};
	for (const methodName of Object.keys(atomsSpec)) {
		const { Ctor, key, role } = resolveAtomSpec(methodName, atomsSpec[methodName]!);
		registry[key] = (bond) => {
			const atom = new Ctor(bond);
			return role ? atom.role(role) : atom;
		};
	}
	return registry;
}

function attachAccessor(proto: object, methodName: string, key: string) {
	Object.defineProperty(proto, methodName, {
		value(this: Bond) {
			return (this as Bond).atom(key);
		},
		writable: true,
		configurable: true,
		enumerable: false
	});
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function attachMethod(proto: object, name: string, fn: (...args: any[]) => any) {
	Object.defineProperty(proto, name, {
		value: fn,
		writable: true,
		configurable: true,
		enumerable: false
	});
}

export function defineBond<
	A extends Record<string, AtomSpec>,
	State extends BondState<BondStateProps> = BondState,
	Base extends BondBaseClass = typeof Bond,
	PAtoms extends Record<string, AtomSpec> = Record<never, AtomSpec>,
	PState extends BondState = BondState,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	M extends Record<string, (...args: any[]) => any> = Record<never, never>
>(
	// Omitted then re-added so capabilities is re-typed over THIS bond's State and state is an inference site.
	spec: Omit<BondSpec<A, Base>, 'extends' | 'methods' | 'capabilities' | 'state'> & {
		extends?: DefinedBondClass<PAtoms, PState>;
		methods?: M;
		capabilities?: (state: State) => Capability[];
		state?: StateCtor<State>;
	}
): DefinedBondClass<Omit<PAtoms, keyof A> & A, State, Base, M> {
	// ─── Flat composition path (`parts:`) — the compose operator ───
	if (spec.parts && spec.parts.length > 0) {
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
			state: BondState,
			name?: string
		) => Bond;

		class Composed extends BaseClass {
			// Seam a future parts: [ThisBond] reads.
			static spec = {
				...spec,
				atoms: mergedAtoms,
				capabilities: mergedCapabilities
			} as unknown as BondSpec<Record<string, AtomSpec>>;

			static atoms: AtomRegistry = {
				...(BaseClass as unknown as typeof Bond).atoms,
				...buildAtomRegistry(mergedAtoms)
			};

			constructor(state: State) {
				super(state, spec.name);
				for (const cap of mergedCapabilities(state)) this.capability(cap);
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

		for (const methodName of Object.keys(mergedAtoms)) {
			const { key } = resolveAtomSpec(methodName, mergedAtoms[methodName]!);
			attachAccessor(Composed.prototype, methodName, key);
		}
		for (const [name, fn] of Object.entries(spec.methods ?? {})) {
			attachMethod(Composed.prototype, name, fn);
		}

		// Attach static state + create(props).
		attachStateFactory(Composed, spec.state as StateCtor | undefined);

		return Composed as unknown as DefinedBondClass<Omit<PAtoms, keyof A> & A, State, Base, M>;
	}

	// ─── Spec-inheritance path (`extends:`) — a real subclass; kept for the positioned chain ───
	const parent = spec.extends as unknown as
		| (DefinedBondClass<Record<string, AtomSpec>, BondState> & {
				spec: BondSpec<Record<string, AtomSpec>>;
		  })
		| undefined;
	const BaseClass = (spec.extends ?? spec.base ?? Bond) as unknown as new (
		state: BondState,
		name?: string
	) => Bond;

	class Defined extends BaseClass {
		// Seam fuse / nested extends reads.
		static spec = (parent
			? {
					...spec,
					atoms: { ...parent.spec.atoms, ...spec.atoms },
					capabilities: (state: BondState) => [
						...(parent.spec.capabilities?.(state) ?? []),
						...((spec.capabilities as ((s: BondState) => Capability[]) | undefined)?.(state) ?? [])
					]
				}
			: spec) as unknown as BondSpec<Record<string, AtomSpec>>;

		static atoms: AtomRegistry = {
			...(BaseClass as unknown as typeof Bond).atoms,
			...buildAtomRegistry(spec.atoms)
		};

		constructor(state: State) {
			// Parent ctor is `(state)` (already registered its capabilities); a raw base takes the name.
			// Either way `name` drives the namespace via the getter, not the ctor arg.
			if (parent) super(state);
			else super(state, spec.name);
			for (const capability of spec.capabilities?.(state) ?? []) this.capability(capability);
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
	for (const methodName of Object.keys(spec.atoms)) {
		const { key } = resolveAtomSpec(methodName, spec.atoms[methodName]!);
		attachAccessor(Defined.prototype, methodName, key);
	}
	for (const [name, fn] of Object.entries(spec.methods ?? {})) {
		attachMethod(Defined.prototype, name, fn);
	}

	// Self-construction (ADR 0012): static `state` + `create(props)` when the spec declares a state.
	// A child via extends inherits the parent's static create; its own state (if any) wins here.
	attachStateFactory(Defined, spec.state as StateCtor | undefined);

	return Defined as unknown as DefinedBondClass<Omit<PAtoms, keyof A> & A, State, Base, M>;
}
