import { createAttachmentKey } from 'svelte/attachments';
import { getContext, setContext } from 'svelte';
import { getElementId } from '$svelte-atoms/core/utils/dom.svelte';
import { Bond, BondState, type BondStateProps } from '$svelte-atoms/core/shared/bond.svelte';

export type DialogBondProps = BondStateProps & {
	open: boolean;
	disabled: boolean;
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

	root(props: Record<string, unknown>) {
		const id = getElementId(this.id, DIALOG_ELEMENTS_KIND.root);
		const titleId = getElementId(this.id, DIALOG_ELEMENTS_KIND.title);
		const descriptionId = getElementId(this.id, DIALOG_ELEMENTS_KIND.description);

		const idOpened = this.state.props.open ?? false;
		const isDisabled = this.state.props.disabled ?? false;

		return {
			id,
			role: 'dialog',
			'aria-modal': true,
			'aria-labelledby': titleId,
			'aria-describedby': descriptionId,
			'aria-opened': idOpened,
			'aria-disabled': isDisabled,
			'data-kind': DIALOG_ELEMENTS_KIND.root,
			...props,
			[createAttachmentKey()]: (node: HTMLDialogElement) => {
				this.elements.root = node;
			}
		};
	}

	content(props: Record<string, unknown>) {
		const id = getElementId(this.id, DIALOG_ELEMENTS_KIND.content);
		return {
			id,
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
			'data-kind': DIALOG_ELEMENTS_KIND.header,
			...props,
			[createAttachmentKey()]: (node) => {
				this.elements.header = node;
			}
		};
	}

	title(props: Record<string, unknown>) {
		const id = getElementId(this.id, DIALOG_ELEMENTS_KIND.title);
		return {
			id,
			'data-kind': DIALOG_ELEMENTS_KIND.title,
			...props,
			[createAttachmentKey()]: (node) => {
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
			[createAttachmentKey()]: (node) => {
				this.elements.description = node;
			}
		};
	}

	body(props: Record<string, unknown>) {
		const id = getElementId(this.id, DIALOG_ELEMENTS_KIND.body);
		return {
			id,
			'data-kind': DIALOG_ELEMENTS_KIND.body,
			...props,
			[createAttachmentKey()]: (node) => {
				this.elements.body = node;
			}
		};
	}

	footer(props: Record<string, unknown>) {
		const id = getElementId(this.id, DIALOG_ELEMENTS_KIND.footer);
		return {
			id,
			'data-kind': DIALOG_ELEMENTS_KIND.footer,
			...props,
			[createAttachmentKey()]: (node) => {
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
