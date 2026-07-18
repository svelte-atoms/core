import type { Capability } from '../bond';
import {
	defineBond,
	type AtomSpec,
	type AtomsOf,
	type BondBaseClass,
	type BondSpec,
	type DefinedBondClass,
	type FusablePart,
	type StateCtor
} from './define.svelte';

// Compatibility extraction aliases. `AtomsOf` now understands composition itself.
export type AtomsOfPart<P> =
	P extends DefinedBondClass<infer S> ? AtomsOf<S> : Record<never, never>;
export type MergeAtoms<Parts extends readonly FusablePart[]> = AtomsOf<{
	name: string;
	atoms: Record<never, never>;
	parts: Parts;
}>;

/** A convenient `parts:`-only spelling of defineBond. */
export interface FuseSpec<
	Parts extends readonly FusablePart[] = readonly FusablePart[],
	Own extends Record<string, AtomSpec> = Record<never, never>
> {
	name: string;
	parts: Parts;
	atoms?: Own;
	capabilities?: (state: unknown) => Capability[];
	preset?: string;
	base?: BondBaseClass;
	state?: StateCtor;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- inference-only callable constraint
type AnyCapabilityFactory = (state: any) => Capability[];

type NormalizeFuse<S extends FuseSpec> = Omit<
	S,
	'atoms' | 'base' | 'capabilities' | 'state' | 'preset'
> & {
	atoms: S extends { atoms: infer A extends Record<string, AtomSpec> } ? A : Record<never, never>;
} & (S extends { base: infer Base extends BondBaseClass } ? { base: Base } : Record<never, never>) &
	(S extends { capabilities: infer Capabilities extends AnyCapabilityFactory }
		? { capabilities: Capabilities }
		: Record<never, never>) &
	(S extends { state: infer State extends StateCtor } ? { state: State } : Record<never, never>) &
	(S extends { preset: infer Preset extends string } ? { preset: Preset } : Record<never, never>);

export function fuse<const S extends FuseSpec>(spec: S): DefinedBondClass<NormalizeFuse<S>> {
	return defineBond({
		...spec,
		atoms: spec.atoms ?? {}
	} as unknown as BondSpec) as unknown as DefinedBondClass<NormalizeFuse<S>>;
}
