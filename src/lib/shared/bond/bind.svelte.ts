import { onDestroy, untrack } from 'svelte';
import type { Bond } from './bond.svelte';
import type { BondStateProps } from './types';
import { defineProperty, defineState, type StateDefiner } from '../../utils/state';
import type { PresetKey } from '../../preset/types';

// Extracts the props type from a Bond; props-owned defineBond bases are inferred directly.
type PropsOf<B extends Bond> = B extends { readonly __props?: infer P }
	? P
	: B extends { readonly props: infer P }
		? P
		: B extends Bond<infer P>
			? P
			: BondStateProps;

// Builds a bond from its assembled props cell object (the component's factory).
export type BondFactory<B extends Bond> = (props: PropsOf<B>) => B;

type Getter<V> = () => V;
type Setter<V> = (value: V) => void;

// Optional Object.defineProperty descriptor flags for a cell (rarely needed).
export type CellConfig = Pick<PropertyDescriptor, 'enumerable' | 'configurable'>;

// One reactive prop cell: () => V (read-only), [getter, setter] (read/write), or [getter, setter, CellConfig].
export type PropCell<V> = Getter<V> | [Getter<V>, Setter<V>] | [Getter<V>, Setter<V>, CellConfig];

// Per-field accessor spec for a bond's props: each field is a PropCell wired to $state/$bindable.
export type PropsSpec<P extends object> = {
	[K in keyof P]?: PropCell<P[K]>;
};

export type BondBindingOptions<B extends Bond = Bond> = {
	// Getter for the component's preset prop; wins over atom.preset when non-nullish.
	preset?: () => PresetKey | undefined;
	// Static defaults / restProps spread once into the props base. Reactive props belong in the props spec (see ADR 0002).
	base?: () => Partial<PropsOf<B>>;
};

// Fold a PropsSpec object into the defineProperty cell-definers it represents.
function specToDefiners<P extends object>(spec: PropsSpec<P>): StateDefiner<Partial<P>>[] {
	return Object.entries(spec)
		.filter(([, cell]) => cell != null)
		.map(([key, cell]) => {
			const [get, set, config] = (Array.isArray(cell) ? cell : [cell]) as [
				Getter<unknown>,
				Setter<unknown>?,
				CellConfig?
			];
			return defineProperty(key, get, set, config) as StateDefiner<Partial<P>>;
		});
}

// Assembles props and builds the bond in untrack; spreading atomProps + restProps gives preset→spread→rest precedence.
export class BondBinding<B extends Bond = Bond> {
	readonly bond: B;
	readonly #props: PropsOf<B>;
	readonly #presetGetter: (() => PresetKey | undefined) | undefined;

	constructor(
		factory: BondFactory<B>,
		props: PropsSpec<PropsOf<B>>,
		options?: BondBindingOptions<B>
	) {
		const assembled = defineState<PropsOf<B>>(specToDefiners(props), options?.base);
		this.#props = assembled;
		this.bond = untrack(() => factory(assembled));
		this.#presetGetter = options?.preset;

		// bindBond assembles props and owns activation/destruction. The component explicitly
		// publishes the Bond with binding.bond.share() at its context boundary.
		this.bond.activateCapabilities(this.bond);
		onDestroy(() => this.bond.destroy());
	}

	get preset() {
		return this.#presetGetter?.();
	}

	get props() {
		const preset = this.preset;
		return { preset, bond: this.bond, ...this.#props };
	}

	get stateProps() {
		return { bond: this.bond, ...this.#props };
	}
}

export function bindBond<B extends Bond>(
	factory: BondFactory<B>,
	props: PropsSpec<PropsOf<B>>,
	options?: BondBindingOptions<B>
): BondBinding<B> {
	return new BondBinding(factory, props, options);
}
