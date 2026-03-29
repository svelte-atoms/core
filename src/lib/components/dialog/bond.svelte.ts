import { getContext, setContext, untrack } from 'svelte';
import { focusTrap, getElementId } from '$svelte-atoms/core/utils/dom.svelte';
import {
	Bond,
	BondState,
	BondAtom,
	type BondStateProps
} from '$svelte-atoms/core/shared/bond.svelte';

export type DialogBondProps = BondStateProps & {
	open: boolean;
	disabled: boolean;
	configs: {
		popovers: {
			strategy: 'fixed' | 'absolute';
		};
	};
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
	trigger?: HTMLElement;
};

export class DialogRootAtom extends BondAtom<DialogBond, HTMLDialogElement> {
	#activeElement: Element | null = null;

	constructor(bond: DialogBond) {
		super(bond, 'root');
	}

	override get attrs() {
		const titleId = getElementId(this.bond.id, 'dialog-title');
		const descriptionId = getElementId(this.bond.id, 'dialog-description');
		const isOpen = untrack(() => this.bond.state.props).open ?? false;

		return {
			...super.attrs,
			role: 'dialog',
			'aria-modal': true,
			'aria-labelledby': titleId,
			'aria-describedby': descriptionId,
			inert: !isOpen ? '' : undefined,
			'data-open': isOpen
		};
	}

	override get handlers() {
		return {
			onkeydown: (ev: KeyboardEvent) => {
				if (ev.key === 'Escape') {
					ev.preventDefault();
					this.bond.state.close();
				}
				focusTrap(ev);
			}
		};
	}

	override onmount(node: HTMLDialogElement) {
		if (this.bond.state.props.open) {
			this.#activeElement = document.activeElement;
			requestAnimationFrame(() => {
				const contentElement = this.bond.elements.content;
				if (!contentElement) return;

				const firstFocusable = contentElement.querySelector<HTMLElement>(
					'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
				);

				if (firstFocusable) {
					firstFocusable.focus();
				} else {
					node.focus();
				}
			});
		} else {
			if (this.#activeElement instanceof HTMLElement) {
				this.#activeElement.focus();
			}
		}
	}
}

export class DialogContentAtom extends BondAtom<DialogBond> {
	constructor(bond: DialogBond) {
		super(bond, 'content');
	}

	override get attrs() {
		return {
			...super.attrs,
			role: 'document'
		};
	}
}

export class DialogHeaderAtom extends BondAtom<DialogBond> {
	constructor(bond: DialogBond) {
		super(bond, 'header');
	}

	override get attrs() {
		return {
			...super.attrs,
			role: 'banner'
		};
	}
}

export class DialogTitleAtom extends BondAtom<DialogBond> {
	constructor(bond: DialogBond) {
		super(bond, 'title');
	}

	override get attrs() {
		return {
			...super.attrs,
			role: 'heading',
			'aria-level': 2
		};
	}
}

export class DialogDescriptionAtom extends BondAtom<DialogBond> {
	constructor(bond: DialogBond) {
		super(bond, 'description');
	}

	override get attrs() {
		return {
			...super.attrs
		};
	}
}

export class DialogBodyAtom extends BondAtom<DialogBond> {
	constructor(bond: DialogBond) {
		super(bond, 'body');
	}

	override get attrs() {
		return {
			...super.attrs,
			role: 'region',
			'aria-live': 'polite'
		};
	}
}

export class DialogFooterAtom extends BondAtom<DialogBond> {
	constructor(bond: DialogBond) {
		super(bond, 'footer');
	}

	override get attrs() {
		return {
			...super.attrs,
			role: 'contentinfo'
		};
	}
}

export class DialogTriggerAtom extends BondAtom<DialogBond> {
	constructor(bond: DialogBond) {
		super(bond, 'trigger');
	}

	override get handlers() {
		return {
			onclick: () => this.bond.state.toggle()
		};
	}
}

export class DialogBond<
	State extends DialogBondState<DialogBondProps> = DialogBondState<DialogBondProps>
> extends Bond<DialogBondProps, State, DialogBondElements> {
	static CONTEXT_KEY = '@atoms/context/dialog';

	constructor(s: State) {
		super(s, 'dialog');
	}

	share(): this {
		return DialogBond.set(this) as this;
	}

	/** Handle for granular access to root attrs, handlers, and attachment */
	root() {
		return this.atom('root', () => new DialogRootAtom(this));
	}

	/** Handle for granular access to content attrs and attachment */
	content() {
		return this.atom('content', () => new DialogContentAtom(this));
	}

	/** Handle for granular access to header attrs and attachment */
	header() {
		return this.atom('header', () => new DialogHeaderAtom(this));
	}

	/** Handle for granular access to title attrs and attachment */
	title() {
		return this.atom('title', () => new DialogTitleAtom(this));
	}

	/** Handle for granular access to description attrs and attachment */
	description() {
		return this.atom('description', () => new DialogDescriptionAtom(this));
	}

	/** Handle for granular access to body attrs and attachment */
	body() {
		return this.atom('body', () => new DialogBodyAtom(this));
	}

	/** Handle for granular access to footer attrs and attachment */
	footer() {
		return this.atom('footer', () => new DialogFooterAtom(this));
	}

	/** Handle for granular access to trigger attrs, handlers, and attachment */
	trigger() {
		return this.atom('trigger', () => new DialogTriggerAtom(this));
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
