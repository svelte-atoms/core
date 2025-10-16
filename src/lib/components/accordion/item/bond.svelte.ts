import { createAttachmentKey } from 'svelte/attachments';
import { getContext, setContext } from 'svelte';
import { AccordionBond, AccordionState } from '../bond.svelte.js';
import { Bond, BondState, type BondStateProps } from '$svelte-atoms/core/shared/bond.svelte.js';
import { isBrowser } from '$svelte-atoms/core/utils/dom.svelte.js';

export type AccordionItemBondProps = BondStateProps & {
	value: string;
	disabled: boolean;
};

export type AccordionItemBondElements = {
	root: HTMLElement;
	header: HTMLElement;
	body: HTMLElement;
	indicator: HTMLElement;
};

export class AccordionItemBond extends Bond<
	AccordionItemBondProps,
	AccordionItemBondState,
	AccordionItemBondElements
> {
	constructor(state: AccordionItemBondState) {
		super(state);
	}

	share() {
		return AccordionItemBond.set(this) as this;
	}

	root(props: Record<string, unknown> = {}) {
		return {
			'data-accordion': this.state?.accordionId ?? '',
			'data-atom': this.id ?? '',
			'data-kind': 'accordion-item',
			...props,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.root = node;
			}
		};
	}

	header(props: Record<string, unknown> = {}) {
		const isButtonElement = isBrowser() ? this.elements.header instanceof HTMLButtonElement : false;

		return {
			'aria-controls': `accordion-body-${this.id}`,
			'data-kind': 'accordion-header',
			'aria-disabled': this.state?.props?.disabled ?? false,
			'aria-expanded': this.state?.isOpen ?? false,
			'aria-selected': this.state?.isActive ?? false,
			role: isButtonElement ? undefined : 'button',
			tabindex: this.state?.isActive ? 0 : -1, // Make focusable if active
			id: `accordion-header-${this.id}`,
			'data-atom': this.id ?? '',
			disabled: isButtonElement ? this.state?.props.disabled : undefined,
			onpointerdown: (ev: PointerEvent) => {
				if (this.state.props.disabled) return;

				props?.onpointerdown?.(ev, { accordionItem: this });

				if (ev.defaultPrevented) {
					return;
				}

				if (this.state.accordion?.props.multiple) {
					this?.state.toggle();
				} else {
					if (this.state.accordion?.props.collapsible) {
						const isActive = this.state.isActive;
						// accordionAtom?.state.close(accordionAtom.state.props.values);
						this.state.accordion.close(this.state.accordion.props.values ?? []);
						if (!isActive) {
							this?.state.open();
						}
					} else {
						this?.state.open();
					}
				}
			},
			...props,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.header = node;
			}
		};
	}

	body(props: Record<string, unknown> = {}) {
		return {
			'aria-labelledby': `accordion-header-${this.id}`,
			'aria-hidden': !this.state?.isOpen, // Hide when closed
			role: 'region', // Announce as a region
			'data-atom': this.id ?? '',
			'data-kind': 'accordion-body',
			id: `accordion-body-${this.id}`,
			...props,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.body = node;
			}
		};
	}

	indicator(props: Record<string, unknown> = {}) {
		return {
			'data-controled-by': this.state?.accordionId ?? '',
			'data-kind': 'accordion-indicator',
			...props,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.indicator = node;
			}
		};
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
