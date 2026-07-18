import type { VirtualElement } from '@floating-ui/dom';
import type { Bond } from './bond.svelte';
import type { Atom } from './atom.svelte';

export type BondVirtualElement = VirtualElement;

export type BondStateProps = { id?: string };
export type BondElements = Record<string, Element | BondVirtualElement | undefined>;

// Types the polymorphic static get/set.
export type BondClass<T extends Bond> = { prototype: T; CONTEXT_KEY: string };

export type NodeCardinality = 'single' | 'many';

export type NodeRegistrationOptions = {
	key?: string;
	cardinality?: NodeCardinality;
};

export type NodeRegistration<N extends Atom = Atom> = {
	id: string;
	key: string;
	cardinality: NodeCardinality;
	node: N;
};

/** Deliberate public view; registration and lifecycle administration stay internal-ready. */
export type BondHandle = Pick<
	Bond,
	| 'id'
	| 'name'
	| 'namespace'
	| 'preset'
	| 'nodeByPart'
	| 'nodesByPart'
	| 'nodeByRole'
	| 'get'
	| 'require'
>;

/** Deliberate public view of a rendered part. */
export type AtomHandle<E extends Element | BondVirtualElement = Element | BondVirtualElement> =
	Pick<Atom<Bond, E>, 'id' | 'name' | 'kind' | 'preset' | 'element' | 'spread' | 'hasRole'>;
