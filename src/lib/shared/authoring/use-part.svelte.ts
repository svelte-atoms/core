import type { Atom } from '../bond/atom.svelte';
import type { Bond } from '../bond/bond.svelte';
import { createAtomInstance } from '../bond/use-atom.svelte';
import { mergeAtomProps } from '../bond/presentation-props';
import {
	type AtomConstructor,
	type AtomInstance,
	type AtomsOf,
	type BondSpec,
	type SpecOf
} from './define.svelte';
import { resolveBondPart } from './metadata';

type PartKey<S extends BondSpec> = keyof AtomsOf<S> & string;
type PartAtom<S extends BondSpec, K extends PartKey<S>> = AtomInstance<AtomsOf<S>[K]>;
type AtomCtor<E> = E extends AtomConstructor
	? E
	: E extends { atom: infer C extends AtomConstructor }
		? C
		: never;
type OptionalPartKey<S extends BondSpec> = {
	[K in PartKey<S>]: undefined extends ConstructorParameters<AtomCtor<AtomsOf<S>[K]>>[0]
		? K
		: never;
}[PartKey<S>];

type PartProps = Record<string, unknown>;
type PartPropsInput = PartProps | (() => PartProps);
type PartDefinition = {
	optional(): Bond | undefined;
	required(message?: string): Bond;
};
type DefinitionBond<D extends PartDefinition> = ReturnType<D['required']>;
type OptionalDefinitionBond<D extends PartDefinition> = ReturnType<D['optional']>;

export type UsePartOptions = {
	/** Required context is the default. Optional mode is for explicitly bondless-capable parts. */
	context?: 'required' | 'optional';
	message?: string;
	preset?: () => unknown;
};

export type UsedPart<B, N extends Atom> = {
	readonly bond: B;
	readonly atom: N;
	readonly props: ReturnType<typeof mergeAtomProps>;
};

export function usePart<const D extends PartDefinition, K extends PartKey<SpecOf<D>>>(
	definition: D,
	slot: K,
	restProps: PartPropsInput,
	options?: UsePartOptions & { context?: 'required' }
): UsedPart<DefinitionBond<D>, PartAtom<SpecOf<D>, K>>;
export function usePart<const D extends PartDefinition, K extends OptionalPartKey<SpecOf<D>>>(
	definition: D,
	slot: K,
	restProps: PartPropsInput,
	options: UsePartOptions & { context: 'optional' }
): UsedPart<OptionalDefinitionBond<D>, PartAtom<SpecOf<D>, K>>;
export function usePart(
	definition: object,
	slot: string,
	restProps: PartPropsInput,
	options: UsePartOptions = {}
	// Runtime is intentionally broad; overloads above preserve the definition-derived interface.
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
): UsedPart<any, Atom> {
	const runtimeDefinition = definition as {
		optional(): Bond | undefined;
		required(message?: string): Bond;
	};
	const part = resolveBondPart(definition, slot);
	const optional = options.context === 'optional';
	const bond = optional
		? runtimeDefinition.optional()
		: runtimeDefinition.required(
				options.message ?? `[ixirjs] Bond part "${part.name}.${slot}" requires its root context.`
			);

	const atom = createAtomInstance(part.part, {
		bond,
		required: !optional,
		register: { key: part.part },
		factory: (owner) => {
			const instance = new (part.Ctor as AtomConstructor)(owner);
			return part.role ? instance.role(part.role) : instance;
		}
	});
	const props = $derived(mergeAtomProps(atom, options.preset?.(), resolvePartProps(restProps)));

	return {
		bond,
		atom,
		get props() {
			return props;
		}
	};
}

function resolvePartProps(input: PartPropsInput): PartProps {
	return typeof input === 'function' ? input() : input;
}
