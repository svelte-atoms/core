import { createAttachmentKey } from 'svelte/attachments';
import { getContext, setContext } from 'svelte';
import {
	Bond,
	BondState,
	type BondElements,
	type BondStateProps
} from '$svelte-atoms/core/shared/bond.svelte.js';

export type LayerBondProps = BondStateProps & {
	readonly rest?: Record<string, unknown>;
};

export type LayerBondElements = BondElements & {
	root?: HTMLElement;
	inner?: HTMLElement;
};

const LAYER_ELEMENTS_KIND = {
	root: 'layer-root',
	inner: 'layer-inner'
};

export class LayerBond extends Bond<LayerBondProps, LayerBondState, LayerBondElements> {
	static CONTEXT_KEY = '@atoms/context/layer';

	constructor(atom: LayerBondState) {
		super(atom);
	}

	get targetElement() {
		return this.elements.inner ?? this.elements.root;
	}

	root(props: Record<string, unknown> = {}) {
		return {
			'data-kind': LAYER_ELEMENTS_KIND.root,
			...props,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.root = node;
			}
		};
	}

	inner(props: Record<string, unknown> = {}) {
		return {
			'data-kind': LAYER_ELEMENTS_KIND.inner,
			...props,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.inner = node;
			}
		};
	}

	share(): this {
		return LayerBond.set(this) as this;
	}

	static get(): LayerBond | undefined {
		return getContext(LayerBond.CONTEXT_KEY);
	}

	static set(bond: LayerBond): LayerBond {
		return setContext(LayerBond.CONTEXT_KEY, bond);
	}
}

export class LayerBondState extends BondState<LayerBondProps> {
	constructor(props: () => LayerBondProps) {
		super(props);
	}
}
