import {
	type PopoverDomElements,
	type PopoverStateProps
} from '$svelte-atoms/core/components/popover/bond.svelte';
import {
	DropdownBond,
	DropdownBondState
} from '$svelte-atoms/core/components/dropdown/bond.svelte';
import { createAttachmentKey } from 'svelte/attachments';

export type ComboboxBondProps = PopoverStateProps & {
	value?: string;
	query?: string;
	text?: string;
};

export type ComboboxBondElements = PopoverDomElements & {
	input: HTMLInputElement;
};

export class ComboboxBond<T = unknown> extends DropdownBond<
	ComboboxBondProps,
	ComboboxBondState<T>,
	ComboboxBondElements
> {
	constructor(s: ComboboxBondState<T>) {
		super(s);
	}

	input(props: Record<string, unknown> = {}) {
		return {
			'data-atom': `trigger-${this.id}`,
			'data-kind': 'combobox-input',
			role: 'combobox',
			'aria-autocomplete': 'list',
			'aria-expanded': this.state.props.open ?? false,
			'aria-controls': `overlay-${this.id}`,
			'aria-activedescendant': this.state.selectedItems.at(0)?.id
				? `item-${this.state.selectedItems.at(0)?.id}`
				: undefined,
			'aria-disabled': this.state.props.disabled ?? false,
			'aria-label': props['aria-label'] ?? 'Choose an option',
			tabindex: this.state.props.disabled ? -1 : 0,
			...props,
			oninput: (ev: Event) => {
				const target = ev.target as HTMLInputElement;
				this.state.props.query = target.value;
			},
			onkeydown: (ev: KeyboardEvent) => {
				if (this.state.props.disabled) return;
				if (ev.key === 'ArrowDown' || ev.key === 'ArrowUp') {
					ev.preventDefault();
					if (document.activeElement === this.elements.input) {
						this.state.open();

						if (ev.key === 'ArrowDown') {
							this.state.highlightNextItem();
						} else if (ev.key === 'ArrowUp') {
							this.state.highlightPreviousItem();
						}
					}
				}
				if (ev.key === 'Escape') {
					ev.preventDefault();
					if (document.activeElement === this.elements.input) {
						this.state.close();
					}
				}
				if (ev.key === 'Enter') {
					this.state.highlightedItem?.elements.root?.click();
				}
			},
			[createAttachmentKey()]: (node: HTMLInputElement) => {
				this.elements.input = node;
			}
		};
	}

	static get = DropdownBond.getContext;
	static set = DropdownBond.setContext;
}

export class ComboboxBondState<T> extends DropdownBondState<ComboboxBondProps> {
	// #items: Map<string, DropdownItemAtom<T>> = new SvelteMap();
	// #selectedItems = $derived(
	// 	this.props.values?.map((id) => this.#items.get(id)).filter(Boolean) ?? []
	// ) as DropdownItemAtom<T>[];

	// #value: string = $state('');
	// #query: string = $state('');

	constructor(props: () => ComboboxBondProps) {
		super(props);
	}

	// get value() {
	// 	return this.#value ?? '';
	// }
	// set value(value: string) {
	// 	this.#value = value;
	// }

	// get query() {
	// 	return this.#query ?? '';
	// }
	// set query(query: string) {
	// 	this.#query = query;
	// }
}
