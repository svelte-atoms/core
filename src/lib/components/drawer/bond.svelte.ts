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

	root() {
		const id = getElementId(this.id, DRAWER_ELEMENTS_KIND.root);
		const drawerTitleId = getElementId(this.id, DRAWER_ELEMENTS_KIND.title);
		const drawerDescriptionId = getElementId(this.id, DRAWER_ELEMENTS_KIND.description);

		const haveDescriptionElement = !!this.elements.description;
		const haveTitleElement = !!this.elements.title;

		const isOpen = this.state?.props?.open ?? false;
		const isDisabled = this.state?.props?.disabled ?? false;
		const isActive = isOpen && !isDisabled;

		// Focus trap handler
		const focusTrap = (ev: KeyboardEvent) => {
			const node = ev.currentTarget as HTMLElement;

			if (ev.key === 'Tab') {
				const focusableElements = node.querySelectorAll<HTMLElement>(
					'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
				);
				const firstElement = focusableElements[0];
				const lastElement = focusableElements[focusableElements.length - 1];

				if (focusableElements.length === 0) return;

				if (ev.shiftKey && document.activeElement === firstElement) {
					ev.preventDefault();
					lastElement?.focus();
				} else if (!ev.shiftKey && document.activeElement === lastElement) {
					ev.preventDefault();
					firstElement?.focus();
				}
			}
		};

		let previousActiveElement: Element | null = null;

		return {
			id: id,
			role: 'dialog',
			'aria-modal': true,
			'aria-labelledby': haveTitleElement ? drawerTitleId : undefined,
			'aria-describedby': haveDescriptionElement ? drawerDescriptionId : undefined,
			'aria-hidden': !isActive,
			inert: !isActive ? '' : undefined,
			tabindex: -1,
			'data-active': isActive,
			'data-open': isOpen,
			'data-kind': DRAWER_ELEMENTS_KIND.root,
			onkeydown: (ev: KeyboardEvent) => {
				focusTrap(ev);

				// Close on Escape key
				if (ev.key === 'Escape' && !isDisabled) {
					ev.preventDefault();
					this.state.close();
				}
			},
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.root = node;

				if (this.state.props.open) {
					// Store current focus
					previousActiveElement = document.activeElement;

					// Focus first focusable element or drawer itself
					setTimeout(() => {
						const firstFocusable = node.querySelector<HTMLElement>(
							'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
						);
						if (firstFocusable) {
							firstFocusable.focus();
						} else {
							node.focus();
						}
					}, 0);
				} else {
					// Restore focus to previous element
					if (previousActiveElement instanceof HTMLElement) {
						previousActiveElement.focus();
					}
				}
			}
		};
	}

	content() {
		const id = getElementId(this.id, DRAWER_ELEMENTS_KIND.content);
		return {
			id: id,
			role: 'document',
			'data-kind': DRAWER_ELEMENTS_KIND.content,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.content = node;
			}
		};
	}

	body() {
		const id = getElementId(this.id, DRAWER_ELEMENTS_KIND.body);

		return {
			id: id,
			role: 'region',
			'data-kind': DRAWER_ELEMENTS_KIND.body,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.body = node;
			}
		};
	}

	header() {
		const id = getElementId(this.id, DRAWER_ELEMENTS_KIND.header);
		return {
			id: id,
			role: 'banner',
			'data-kind': DRAWER_ELEMENTS_KIND.header,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.header = node;
			}
		};
	}

	title() {
		const id = getElementId(this.id, DRAWER_ELEMENTS_KIND.title);
		return {
			id: id,
			role: 'heading',
			'aria-level': 2,
			'data-kind': DRAWER_ELEMENTS_KIND.title,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.title = node;
			}
		};
	}

	description() {
		const id = getElementId(this.id, DRAWER_ELEMENTS_KIND.description);
		return {
			id: id,
			'data-kind': DRAWER_ELEMENTS_KIND.description,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.description = node;
			}
		};
	}

	footer() {
		const id = getElementId(this.id, DRAWER_ELEMENTS_KIND.footer);
		return {
			id: id,
			role: 'contentinfo',
			'data-kind': DRAWER_ELEMENTS_KIND.footer,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.footer = node;
			}
		};
	}

	backdrop() {
		const isDisabled = this.state?.props?.disabled ?? false;

		return {
			role: 'presentation',
			'aria-hidden': true,
			'data-kind': DRAWER_ELEMENTS_KIND.backdrop,
			onclick: (ev: MouseEvent) => {
				// Close drawer on backdrop click
				if (!isDisabled) {
					this.state.close();
				}
			},
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.backdrop = node;
			}
		};
	}

	share(): this {
		return DrawerBond.set(this) as this;
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
