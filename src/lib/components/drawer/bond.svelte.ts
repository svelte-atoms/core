import { getContext, setContext, untrack } from 'svelte';
import { getElementId } from '$svelte-atoms/core/utils/dom.svelte';
import {
	Bond,
	BondState,
	BondAtom,
	type BondStateProps
} from '$svelte-atoms/core/shared/bond.svelte';

export type DrawerBondProps<T extends Record<string, unknown> = Record<string, unknown>> =
	BondStateProps & {
		open: boolean;
		disabled: boolean;
		side?: 'left' | 'right' | 'top' | 'bottom';
		extend: T;
		readonly rest?: Record<string, unknown>;
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

export class DrawerRootAtom extends BondAtom<DrawerBond> {
	#previousActiveElement: Element | null = null;

	constructor(bond: DrawerBond) {
		super(bond, 'root');
	}

	override get attrs() {
		const drawerTitleId = getElementId(this.bond.id, 'drawer-title');
		const drawerDescriptionId = getElementId(this.bond.id, 'drawer-description');

		const haveDescriptionElement = !!this.bond.elements.description;
		const haveTitleElement = !!this.bond.elements.title;

		const isOpen = untrack(() => this.bond.state?.props)?.open ?? false;
		const isDisabled = untrack(() => this.bond.state?.props)?.disabled ?? false;
		const isActive = isOpen && !isDisabled;

		return {
			...super.attrs,
			role: 'dialog',
			'aria-modal': true,
			'aria-labelledby': haveTitleElement ? drawerTitleId : undefined,
			'aria-describedby': haveDescriptionElement ? drawerDescriptionId : undefined,
			'aria-hidden': !isActive,
			inert: !isActive ? '' : undefined,
			tabindex: -1,
			'data-active': isActive,
			'data-open': isOpen
		};
	}

	override get handlers() {
		const isDisabled = this.bond.state?.props?.disabled ?? false;

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

		return {
			onkeydown: (ev: KeyboardEvent) => {
				focusTrap(ev);
				if (ev.key === 'Escape' && !isDisabled) {
					ev.preventDefault();
					this.bond.state.close();
				}
			}
		};
	}

	override onmount(node: HTMLElement) {
		const isOpen = untrack(() => this.bond.state.props)?.open ?? false;

		if (isOpen) {
			this.#previousActiveElement = document.activeElement;
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
			if (this.#previousActiveElement instanceof HTMLElement) {
				this.#previousActiveElement.focus();
			}
		}
	}
}

export class DrawerContentAtom extends BondAtom<DrawerBond> {
	constructor(bond: DrawerBond) {
		super(bond, 'content');
	}

	override get attrs() {
		return {
			...super.attrs,
			role: 'document'
		};
	}
}

export class DrawerBodyAtom extends BondAtom<DrawerBond> {
	constructor(bond: DrawerBond) {
		super(bond, 'body');
	}

	override get attrs() {
		return {
			...super.attrs,
			role: 'region'
		};
	}
}

export class DrawerHeaderAtom extends BondAtom<DrawerBond> {
	constructor(bond: DrawerBond) {
		super(bond, 'header');
	}

	override get attrs() {
		return {
			...super.attrs,
			role: 'banner'
		};
	}
}

export class DrawerTitleAtom extends BondAtom<DrawerBond> {
	constructor(bond: DrawerBond) {
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

export class DrawerDescriptionAtom extends BondAtom<DrawerBond> {
	constructor(bond: DrawerBond) {
		super(bond, 'description');
	}

	override get attrs() {
		return {
			...super.attrs
		};
	}
}

export class DrawerFooterAtom extends BondAtom<DrawerBond> {
	constructor(bond: DrawerBond) {
		super(bond, 'footer');
	}

	override get attrs() {
		return {
			...super.attrs,
			role: 'contentinfo'
		};
	}
}

export class DrawerBackdropAtom extends BondAtom<DrawerBond> {
	constructor(bond: DrawerBond) {
		super(bond, 'backdrop');
	}

	override get attrs() {
		return {
			...super.attrs,
			role: 'presentation',
			'aria-hidden': true
		};
	}

	override get handlers() {
		return {
			onclick: () => {
				if (!(this.bond.state?.props?.disabled ?? false)) {
					this.bond.state.close();
				}
			}
		};
	}
}

export class DrawerBond<
	Props extends DrawerBondProps = DrawerBondProps,
	State extends DrawerBondState<Props> = DrawerBondState<Props>
> extends Bond<Props, State, DrawerBondElements> {
	static CONTEXT_KEY = '@atoms/context/drawer';

	constructor(state: State) {
		super(state, 'drawer');
	}

	/** Handle for granular access to root attrs, handlers, and attachment */
	root() {
		return this.atom('root', () => new DrawerRootAtom(this));
	}

	/** Handle for granular access to content attrs and attachment */
	content() {
		return this.atom('content', () => new DrawerContentAtom(this));
	}

	/** Handle for granular access to body attrs and attachment */
	body() {
		return this.atom('body', () => new DrawerBodyAtom(this));
	}

	/** Handle for granular access to header attrs and attachment */
	header() {
		return this.atom('header', () => new DrawerHeaderAtom(this));
	}

	/** Handle for granular access to title attrs and attachment */
	title() {
		return this.atom('title', () => new DrawerTitleAtom(this));
	}

	/** Handle for granular access to description attrs and attachment */
	description() {
		return this.atom('description', () => new DrawerDescriptionAtom(this));
	}

	/** Handle for granular access to footer attrs and attachment */
	footer() {
		return this.atom('footer', () => new DrawerFooterAtom(this));
	}

	/** Handle for granular access to backdrop attrs, handlers, and attachment */
	backdrop() {
		return this.atom('backdrop', () => new DrawerBackdropAtom(this));
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
