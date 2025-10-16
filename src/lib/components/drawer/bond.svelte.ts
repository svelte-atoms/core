import { createAttachmentKey } from 'svelte/attachments';
import { getContext, setContext } from 'svelte';
import { getElementId } from '$svelte-atoms/core/utils/dom.svelte.js';
import { Bond, BondState, type BondStateProps } from '$svelte-atoms/core/shared/bond.svelte.js';

export type DrawerBondProps<T extends Record<string, unknown> = Record<string, unknown>> =
	BondStateProps & {
		open: boolean;
		disabled: boolean;
		extend: T;
	};

export type DrawerBondElements = {
	root: HTMLElement;
	drawer: HTMLElement;
	content: HTMLElement;
	header: HTMLElement;
	body: HTMLElement;
	footer: HTMLElement;
	title: HTMLElement;
	description: HTMLElement;
	backdrop: HTMLElement;
};

const DRAWER_ELEMENTS_KIND = {
	root: 'drawer-root',
	content: 'drawer-content',
	header: 'drawer-header',
	body: 'drawer-body',
	footer: 'drawer-footer',
	title: 'drawer-title',
	description: 'drawer-description',
	backdrop: 'drawer-backdrop'
};

export class DrawerBond<
	Props extends DrawerBondProps = DrawerBondProps,
	State extends DrawerBondState<Props> = DrawerBondState<Props>
> extends Bond<Props, State, DrawerBondElements> {
	static CONTEXT_KEY = '@atoms/context/drawer';

	constructor(state: State) {
		super(state);
	}

	root(props: Record<string, unknown> = {}) {
		const id = getElementId(this.id, DRAWER_ELEMENTS_KIND.root);
		const drawerHeaderId = getElementId(this.id, DRAWER_ELEMENTS_KIND.header);
		const drawerTitleId = getElementId(this.id, DRAWER_ELEMENTS_KIND.title);

		const haveHeaderElement = !!this.elements.header;
		const haveTitleElement = !!this.elements.title;

		const isOpen = this.state?.props?.open ?? false;
		const isDisabled = this.state?.props?.disabled ?? false;

		const isActive = isOpen && !isDisabled;

		return {
			id: id,
			'aria-expanded': isOpen,
			'aria-disabled': isDisabled,
			'aria-labelledby': haveTitleElement
				? drawerTitleId
				: haveHeaderElement
					? drawerHeaderId
					: undefined,
			'data-active': isActive,
			'data-kind': DRAWER_ELEMENTS_KIND.root,
			...props,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.root = node;
			}
		};
	}

	content(props: Record<string, unknown> = {}) {
		const id = getElementId(this.id, DRAWER_ELEMENTS_KIND.content);
		return {
			id: id,
			'data-kind': DRAWER_ELEMENTS_KIND.content,
			...props,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.content = node;
			}
		};
	}

	body(props: Record<string, unknown> = {}) {
		const id = getElementId(this.id, DRAWER_ELEMENTS_KIND.body);

		return {
			id: id,
			role: 'region',
			'data-kind': DRAWER_ELEMENTS_KIND.body,
			...props,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.body = node;
			}
		};
	}

	header(props: Record<string, unknown> = {}) {
		const id = getElementId(this.id, DRAWER_ELEMENTS_KIND.header);
		return {
			id: id,
			role: 'heading',
			'data-kind': DRAWER_ELEMENTS_KIND.header,
			...props,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.header = node;
			}
		};
	}

	title(props: Record<string, unknown> = {}) {
		const id = getElementId(this.id, DRAWER_ELEMENTS_KIND.title);
		return {
			id: id,
			'data-kind': DRAWER_ELEMENTS_KIND.title,
			...props,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.title = node;
			}
		};
	}

	description(props: Record<string, unknown> = {}) {
		const id = getElementId(this.id, DRAWER_ELEMENTS_KIND.description);
		return {
			id: id,
			'data-kind': DRAWER_ELEMENTS_KIND.description,
			...props,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.description = node;
			}
		};
	}

	footer(props: Record<string, unknown> = {}) {
		const id = getElementId(this.id, DRAWER_ELEMENTS_KIND.footer);
		return {
			id: id,
			'data-kind': DRAWER_ELEMENTS_KIND.footer,
			...props,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.footer = node;
			}
		};
	}

	backdrop() {
		return {
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.backdrop = node;
			}
		};
	}

	share(): this {
		return DrawerBond.set(this);
	}

	static get(): DrawerBond | undefined {
		return getContext(DrawerBond.CONTEXT_KEY);
	}

	static set(bond: DrawerBond): DrawerBond {
		return setContext(DrawerBond.CONTEXT_KEY, bond);
	}
}

export class DrawerBondState<
	Props extends DrawerBondProps = DrawerBondProps
> extends BondState<Props> {
	constructor(props: () => Props) {
		super(props);
	}

	open() {
		this.props.open = true;
	}

	close() {
		this.props.open = false;
	}

	toggle() {
		this.props.open = !this.props.open;
	}
}
