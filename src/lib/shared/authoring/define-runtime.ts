import { DEV } from 'esm-env';
import { Bond, BondState, type BondStateProps } from '$ixirjs/ui/shared/bond';
import type {
	AtomSpec,
	FusablePart,
	StateCtor,
	StatePropsOf
} from '$ixirjs/ui/shared/authoring/define.svelte';

// this.state lets subclasses self-construct under their own identity.
function bondCreate(
	this: (new (stateOrProps: BondState | BondStateProps) => Bond) & {
		state?: StateCtor;
		name?: string;
	},
	props: BondStateProps
): Bond {
	return new this(props);
}

export function attachStateFactory(cls: object, StateClass: StateCtor | undefined): void {
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

export function attachAccessor(proto: object, methodName: string, entry: AtomSpec) {
	const { Ctor, role } = resolveAtomSpec(methodName, entry);
	Object.defineProperty(proto, methodName, {
		value(this: Bond) {
			const atom = new Ctor(this);
			return role ? atom.role(role) : atom;
		},
		writable: true,
		configurable: true,
		enumerable: false
	});
}

export function hideAccessor(proto: object, methodName: string) {
	Object.defineProperty(proto, methodName, {
		value: undefined,
		writable: true,
		configurable: true,
		enumerable: false
	});
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function attachMethod(proto: object, name: string, fn: (...args: any[]) => any) {
	Object.defineProperty(proto, name, {
		value: fn,
		writable: true,
		configurable: true,
		enumerable: false
	});
}

export function stateProps<State extends BondState>(
	stateOrProps: State | StatePropsOf<State>
): StatePropsOf<State> {
	return isStateHost<State>(stateOrProps)
		? (stateOrProps.props as StatePropsOf<State>)
		: stateOrProps;
}

export function resolveState<State extends BondState>(
	stateOrProps: State | StatePropsOf<State>,
	StateClass: StateCtor<State> | undefined
): State | undefined {
	if (isStateHost<State>(stateOrProps)) return stateOrProps;
	return StateClass ? new StateClass(stateOrProps) : undefined;
}

export function adoptStateHost(target: Bond, state: BondState): void {
	for (const capability of state.capabilities) target.capability(capability);
	copyPublicMembers(state, target);
}

export function warnPartCompositionConflicts(
	bondName: string,
	parts: readonly FusablePart[],
	ownAtoms: Record<string, AtomSpec>,
	methods: Record<string, unknown> | undefined,
	atomMethods: boolean
): void {
	if (!DEV) return;

	// Plain Maps: local DEV-only bookkeeping, not reactive state.
	// eslint-disable-next-line svelte/prefer-svelte-reactivity
	const atomMethodSources = new Map<string, string>();
	// eslint-disable-next-line svelte/prefer-svelte-reactivity
	const atomKeys = new Map<string, string>();

	const noteAtom = (methodName: string, entry: AtomSpec, source: string): void => {
		const { key } = resolveAtomSpec(methodName, entry);
		if (atomMethods) {
			const priorMethod = atomMethodSources.get(methodName);
			if (priorMethod)
				warnCompositionConflict(bondName, 'atom method', methodName, priorMethod, source);
			atomMethodSources.set(methodName, source);
		}

		const priorKey = atomKeys.get(key);
		if (priorKey) warnCompositionConflict(bondName, 'atom key', key, priorKey, source);
		atomKeys.set(key, source);
	};

	for (const part of parts) {
		const source = `part "${part.spec.name}"`;
		for (const methodName of Object.keys(part.spec.atoms)) {
			noteAtom(methodName, part.spec.atoms[methodName]!, source);
		}
	}
	for (const methodName of Object.keys(ownAtoms)) {
		noteAtom(methodName, ownAtoms[methodName]!, `bond "${bondName}"`);
	}
	if (!atomMethods) return;
	for (const methodName of Object.keys(methods ?? {})) {
		const prior = atomMethodSources.get(methodName);
		if (prior) warnCompositionConflict(bondName, 'method', methodName, prior, `bond "${bondName}"`);
	}
}

function resolveAtomSpec(methodName: string, entry: AtomSpec) {
	const Ctor = typeof entry === 'function' ? entry : entry.atom;
	const key = typeof entry === 'function' ? methodName : (entry.key ?? methodName);
	const role = typeof entry === 'function' ? undefined : entry.role;
	return { Ctor, key, role };
}

function isStateHost<State extends BondState>(value: State | StatePropsOf<State>): value is State {
	return value != null && typeof value === 'object' && 'props' in value;
}

function copyPublicMembers(source: object, target: object): void {
	for (const key of Reflect.ownKeys(source)) {
		if (key === 'props') continue;
		if (key in target) continue;
		const descriptor = Object.getOwnPropertyDescriptor(source, key);
		if (descriptor) defineForwardedMember(target, key, descriptor, source);
	}

	let proto = Object.getPrototypeOf(source);
	while (proto && proto !== Object.prototype) {
		for (const key of Reflect.ownKeys(proto)) {
			if (key === 'constructor' || key in target) continue;
			const descriptor = Object.getOwnPropertyDescriptor(proto, key);
			if (!descriptor) continue;
			if (typeof descriptor.value === 'function') {
				Object.defineProperty(target, key, {
					value: descriptor.value.bind(source),
					writable: true,
					configurable: true
				});
			} else {
				defineForwardedMember(target, key, descriptor, source);
			}
		}
		proto = Object.getPrototypeOf(proto);
	}
}

function defineForwardedMember(
	target: object,
	key: PropertyKey,
	descriptor: PropertyDescriptor,
	source: object
): void {
	if ('value' in descriptor && typeof descriptor.value === 'function') {
		Object.defineProperty(target, key, {
			value: descriptor.value.bind(source),
			writable: true,
			configurable: true
		});
		return;
	}

	if (descriptor.get || descriptor.set) {
		const forwarded: PropertyDescriptor = { configurable: true };
		if (descriptor.get) forwarded.get = () => descriptor.get!.call(source);
		if (descriptor.set) forwarded.set = (value) => descriptor.set!.call(source, value);
		if (descriptor.enumerable !== undefined) forwarded.enumerable = descriptor.enumerable;
		Object.defineProperty(target, key, forwarded);
		return;
	}

	const forwarded: PropertyDescriptor = {
		get: () => Reflect.get(source, key),
		set: (value) => {
			Reflect.set(source, key, value);
		},
		configurable: true
	};
	if (descriptor.enumerable !== undefined) forwarded.enumerable = descriptor.enumerable;
	Object.defineProperty(target, key, forwarded);
}

function warnCompositionConflict(
	bondName: string,
	kind: 'atom method' | 'atom key' | 'method',
	name: string,
	prior: string,
	next: string
): void {
	if (!DEV) return;
	console.warn(
		`[ixirjs] defineBond("${bondName}") parts composition has duplicate ${kind} "${name}" from ${prior} and ${next}; later definition wins.`
	);
}
