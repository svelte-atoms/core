import type { AtomSpec, BondSpec } from './define.svelte';

// Composition is authoring-runtime metadata, not a definition's public contract.
type InternalSpec = BondSpec<Record<string, AtomSpec>>;
const specs = new WeakMap<object, InternalSpec>();

export function setBondSpec(definition: object, spec: InternalSpec): void {
	specs.set(definition, spec);
}

export function getBondSpec(definition: object): InternalSpec {
	const spec = specs.get(definition);
	if (!spec) throw new Error('[ixirjs] Bond definition has no authoring metadata.');
	return spec;
}

export function resolveBondPart(definition: object, slot: string) {
	const spec = getBondSpec(definition);
	const entry = spec.atoms[slot];
	if (!entry) {
		throw new Error(`[ixirjs] Bond("${spec.name}") has no declared part "${slot}".`);
	}

	return {
		name: spec.name,
		Ctor: typeof entry === 'function' ? entry : entry.atom,
		part: typeof entry === 'function' ? slot : (entry.part ?? slot),
		role: typeof entry === 'function' ? undefined : entry.role
	};
}
