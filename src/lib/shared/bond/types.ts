import type { VirtualElement } from '@floating-ui/dom';
import type { Bond, BondAtom } from './bond.svelte';

export type BondVirtualElement = VirtualElement;

export type BondStateProps = { id?: string };
export type BondElements = Record<string, Element | BondVirtualElement | undefined>;

// Types the polymorphic static get/set.
export type BondClass<T extends Bond> = { prototype: T; CONTEXT_KEY: string };

export type AtomFactory<
	B extends Bond = Bond,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	A extends BondAtom<any, any> = BondAtom<any, any>
> = (bond: B) => A;

export type AtomRegistry<B extends Bond = Bond> = Record<string, AtomFactory<B>>;
