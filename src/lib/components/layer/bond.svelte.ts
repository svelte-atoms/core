import { createAttachmentKey } from 'svelte/attachments';
import {
	bondContextKey,
	Bond,
	BondState,
	type BondElements,
	type BondStateProps
} from '$svelte-atoms/core/shared/bond.svelte';

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

export class LayerBond extends Bond<LayerBondProps, LayerBondState> {
	static CONTEXT_KEY = bondContextKey('layer');

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
}

export class LayerBondState extends BondState<LayerBondProps> {
	constructor(props: LayerBondProps) {
		super(props);
	}
}
