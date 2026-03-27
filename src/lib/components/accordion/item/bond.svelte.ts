import { getContext, setContext, untrack } from 'svelte';
import { AccordionBond, AccordionState } from '../bond.svelte.js';
import { Bond, BondState, Atom, type BondStateProps } from '$svelte-atoms/core/shared/bond.svelte.js';
import { isBrowser } from '$svelte-atoms/core/utils/dom.svelte.js';

export type AccordionItemBondProps = BondStateProps & {
	value: string;
	disabled: boolean;
	multiple: boolean;
	collapsible: boolean;
};

export type AccordionItemBondElements = {
	root: HTMLElement;
	header: HTMLElement;
	body: HTMLElement;
	indicator: HTMLElement;
};

export class AccordionItemRootAtom extends Atom<AccordionItemBond> {
	constructor(bond: AccordionItemBond) {
		super(bond, 'root');
	}

	override get attrs() {
		return {
			...super.attrs,
		};
	}
}

export class AccordionItemHeaderAtom extends Atom<AccordionItemBond> {
	constructor(bond: AccordionItemBond) {
		super(bond, 'header');
	}

	override get attrs() {
		const isButtonElement = isBrowser()
			? this.element instanceof HTMLButtonElement
			: false;

		const props = untrack(() => this.bond.state?.props);
		const isDisabled = props?.disabled ?? false;
		const isOpen = this.bond.state?.isOpen ?? false;
		const isActive = this.bond.state?.isActive ?? false;

		return {
			...super.attrs,
			'aria-controls': `accordion-body-${this.bond.id}`,
			'data-kind': 'accordion-header',
			'aria-disabled': isDisabled,
			'aria-expanded': isOpen,
			'aria-selected': isActive,
			role: isButtonElement ? undefined : 'button',
			tabindex: isActive ? 0 : -1,
			disabled: isButtonElement ? isDisabled : undefined
		};
	}

	override get handlers() {
		const props = untrack(() => this.bond.state?.props);
		const isDisabled = props?.disabled ?? false;
		const isMultiple = props?.multiple ?? false;
		const isCollapsible = props?.collapsible ?? false;

		return {
			onpointerdown: (ev: PointerEvent) => {
				if (isDisabled) return;
				if (ev.defaultPrevented) return;

				if (isMultiple) {
					this.bond.state.toggle();
				} else {
					if (isCollapsible) {
						const values = untrack(() => this.bond.state.accordion?.props)?.values ?? [];
						const isActive = this.bond.state.isActive;
						this.bond.state.accordion?.close(values);
						if (!isActive) {
							this.bond.state.open();
						}
					} else {
						this.bond.state.open();
					}
				}
			}
		};
	}
}

export class AccordionItemBodyAtom extends Atom<AccordionItemBond> {
	constructor(bond: AccordionItemBond) {
		super(bond, 'body');
	}

	override get attrs() {
		return {
			...super.attrs,
			'aria-labelledby': `accordion-header-${this.bond.id}`,
			'aria-hidden': !this.bond.state?.isOpen,
			role: 'region'
		};
	}
}

export class AccordionItemIndicatorAtom extends Atom<AccordionItemBond> {
	constructor(bond: AccordionItemBond) {
		super(bond, 'indicator');
	}

	override get attrs() {
		return {
			...super.attrs,
			'data-controled-by': this.bond.state?.accordionId ?? '',
		};
	}
}

export class AccordionItemBond extends Bond<
	AccordionItemBondProps,
	AccordionItemBondState,
	AccordionItemBondElements
> {
	constructor(state: AccordionItemBondState) {
		super(state, 'accordion-item');
	}

	share() {
		return AccordionItemBond.set(this) as this;
	}

	/** Handle for granular access to root attrs and attachment */
	root() {
		return this.atom('root', () => new AccordionItemRootAtom(this));
	}

	/** Handle for granular access to header attrs, handlers, and attachment */
	header() {
		return this.atom('header', () => new AccordionItemHeaderAtom(this));
	}

	/** Handle for granular access to body attrs and attachment */
	body() {
		return this.atom('body', () => new AccordionItemBodyAtom(this));
	}

	/** Handle for granular access to indicator attrs and attachment */
	indicator() {
		return this.atom('indicator', () => new AccordionItemIndicatorAtom(this));
	}

	static get(): AccordionItemBond | undefined {
		return getContext(AccordionItemBond.CONTEXT_KEY);
	}
	static set(bond: AccordionItemBond): AccordionItemBond {
		return setContext(AccordionItemBond.CONTEXT_KEY, bond);
	}
}

export class AccordionItemBondState extends BondState<AccordionItemBondProps> {
	static CONTEXT_KEY = '@atoms/context/accordion/item';

	#accordion?: AccordionState;

	constructor(props: () => AccordionItemBondProps) {
		super(props);
		this.#accordion = AccordionBond.get()?.state;
		if (!this.#accordion) {
			throw new Error('AccordionItemAtom must be used within an AccordionAtom context.');
		}
	}

	get id() {
		return this.props.value ?? super.id;
	}

	get accordionId() {
		return this.accordion?.id;
	}

	get isOpen() {
		return this.accordion?.props.values.includes(this.id);
	}

	get isActive() {
		return (
			!this.props.disabled &&
			!this.accordion?.props?.disabled &&
			this.accordion?.props?.values.includes(this.id)
		);
	}

	get accordion() {
		return this.#accordion;
	}

	mount() {
		this.accordion?.mountItem(this.id, {});

		return this.unmount;
	}

	unmount() {
		this.accordion?.unmountItem(this.id);
	}

	open() {
		this.accordion?.open([this.id]);
	}

	close() {
		this.accordion?.close([this.id]);
	}

	toggle() {
		this.accordion?.toggle(this.id);
	}
}
