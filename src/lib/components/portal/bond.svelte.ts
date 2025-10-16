import { createAttachmentKey } from 'svelte/attachments';
import { getContext, setContext } from 'svelte';
import {
	Bond,
	BondState,
	type BondElements,
	type BondStateProps
} from '$svelte-atoms/core/shared/bond.svelte.js';

export type PortalStateProps = BondStateProps & {
	id: string;
};

export type PortalElements = BondElements & {
	root?: HTMLElement;
	inner?: HTMLElement;
};

const PORTAL_ELEMENTS_KIND = {
	root: 'portal-root',
	inner: 'portal-inner'
};

export class PortalBond extends Bond<PortalStateProps, PortalState, PortalElements> {
	static CONTEXT_KEY = '@atoms/context/portal';

	constructor(atom: PortalState) {
		super(atom);
	}

	get targetElement() {
		return this.elements.inner ?? this.elements.root;
	}

	root(props: Record<string, unknown> = {}) {
		return {
			id: this.id,
			'data-kind': PORTAL_ELEMENTS_KIND.root,
			...props,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.root = node;
			}
		};
	}

	inner(props: Record<string, unknown> = {}) {
		return {
			'data-kind': PORTAL_ELEMENTS_KIND.inner,
			...props,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.inner = node;
			}
		};
	}

	share(): this {
		return PortalBond.set(this) as this;
	}

	destroy(): void {
		super.destroy();
		this.elements.inner?.remove();
		this.elements.root?.remove();
	}

	static get(): PortalBond | undefined {
		return getContext(PortalBond.CONTEXT_KEY);
	}

	static set(bond: PortalBond): PortalBond {
		return setContext(PortalBond.CONTEXT_KEY, bond);
	}
}

export class PortalState extends BondState<PortalStateProps> {
	constructor(props: () => PortalStateProps) {
		super(props);
	}
}
