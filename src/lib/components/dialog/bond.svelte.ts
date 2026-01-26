import { createAttachmentKey } from 'svelte/attachments';
import { getContext, setContext } from 'svelte';
import { focusTrap, getElementId } from '$svelte-atoms/core/utils/dom.svelte';
import { Bond, BondState, type BondStateProps } from '$svelte-atoms/core/shared/bond.svelte';

export type DialogBondProps = BondStateProps & {
	open: boolean;
	disabled: boolean;
	readonly rest?: Record<string, unknown>;
};

export type DialogBondElements = {
	root: HTMLDialogElement;
	content: HTMLElement;
	header: HTMLElement;
	title: HTMLElement;
	description: HTMLElement;
	body: HTMLElement;
	footer: HTMLElement;
};

const DIALOG_ELEMENTS_KIND = {
	root: 'dialog-root',
	content: 'dialog-content',
	header: 'dialog-header',
	title: 'dialog-title',
	description: 'dialog-description',
	body: 'dialog-body',
	footer: 'dialog-footer'
};

export class DialogBond<
	State extends DialogBondState<DialogBondProps> = DialogBondState<DialogBondProps>
> extends Bond<DialogBondProps, State, DialogBondElements> {
	static CONTEXT_KEY = '@atoms/context/dialog';

	constructor(s: State) {
		super(s);
	}

	share(): this {
		return DialogBond.set(this) as this;
	}

	root() {
		const id = getElementId(this.id, DIALOG_ELEMENTS_KIND.root);
		const titleId = getElementId(this.id, DIALOG_ELEMENTS_KIND.title);
		const descriptionId = getElementId(this.id, DIALOG_ELEMENTS_KIND.description);

		const isOpen = this.state.props.open ?? false;
		const isDisabled = this.state.props.disabled ?? false;

		// Focus trap handler
		const focusManager = (ev: KeyboardEvent) => {
			focusTrap(ev);
		};

		let previousActiveElement: Element | null = null;

		return {
			id,
			role: 'dialog',
			'aria-modal': true,
			'aria-labelledby': titleId,
			'aria-describedby': descriptionId,
			inert: !isOpen ? '' : undefined,
			'data-kind': DIALOG_ELEMENTS_KIND.root,
			'data-open': isOpen,
			onclick: (ev: MouseEvent) => {
				// Close on backdrop click (clicking outside content)
				if (ev.target === ev.currentTarget && !isDisabled) {
					this.state.close();
				}
			},
			onkeydown: (ev: KeyboardEvent) => {
				// Close on Escape key
				if (ev.key === 'Escape') {
					ev.preventDefault();
					this.state.close();
				}
				focusManager(ev);
			},
			[createAttachmentKey()]: (node: HTMLDialogElement) => {
				this.elements.root = node;

				if (this.state.props.open) {
					// Store current focus
					previousActiveElement = document.activeElement;

					// Focus first focusable element or dialog itself
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
					console.log('restoring focus to', previousActiveElement);
					// Restore focus to previous element
					if (previousActiveElement instanceof HTMLElement) {
						previousActiveElement.focus();
					}
				}
			}
		};
	}

	content(props: Record<string, unknown>) {
		const id = getElementId(this.id, DIALOG_ELEMENTS_KIND.content);
		return {
			id,
			role: 'document',
			'data-kind': DIALOG_ELEMENTS_KIND.content,
			...props,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.content = node;
			}
		};
	}

	header(props: Record<string, unknown>) {
		const id = getElementId(this.id, DIALOG_ELEMENTS_KIND.header);
		return {
			id,
			role: 'banner',
			'data-kind': DIALOG_ELEMENTS_KIND.header,
			...props,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.header = node;
			}
		};
	}

	title(props: Record<string, unknown>) {
		const id = getElementId(this.id, DIALOG_ELEMENTS_KIND.title);
		return {
			id,
			role: 'heading',
			'aria-level': 2,
			'data-kind': DIALOG_ELEMENTS_KIND.title,
			...props,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.title = node;
			}
		};
	}

	description(props: Record<string, unknown>) {
		const id = getElementId(this.id, DIALOG_ELEMENTS_KIND.description);
		return {
			id,
			'data-kind': DIALOG_ELEMENTS_KIND.description,
			...props,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.description = node;
			}
		};
	}

	body(props: Record<string, unknown>) {
		const id = getElementId(this.id, DIALOG_ELEMENTS_KIND.body);
		return {
			id,
			role: 'region',
			'aria-live': 'polite',
			'data-kind': DIALOG_ELEMENTS_KIND.body,
			...props,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.body = node;
			}
		};
	}

	footer(props: Record<string, unknown>) {
		const id = getElementId(this.id, DIALOG_ELEMENTS_KIND.footer);
		return {
			id,
			role: 'contentinfo',
			'data-kind': DIALOG_ELEMENTS_KIND.footer,
			...props,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.footer = node;
			}
		};
	}

	static get(): DialogBond | undefined {
		return getContext(DialogBond.CONTEXT_KEY);
	}

	static set(bond: DialogBond): DialogBond {
		return setContext(DialogBond.CONTEXT_KEY, bond);
	}
}

export class DialogBondState<Props extends DialogBondProps> extends BondState<Props> {
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
