import { getContext, setContext } from 'svelte';
import { createAttachmentKey } from 'svelte/attachments';
import { DropdownBond, DropdownBondState, type DropdownStateProps } from '../bond.svelte';
import { MenuItemController } from '../../menu';

export type DropdownItemProps<T = unknown> = {
	id?: string;
	value: string;
	data?: T;
};

export class DropdownItemController<T = unknown> extends MenuItemController {
	static CONTEXT_KEY = '@atoms/context/dropdown/item';

	#element: HTMLElement | null = null;
	#dropdown: DropdownBond<DropdownStateProps, DropdownBondState<DropdownStateProps>> | undefined;
	#unmount?: () => void;

	constructor(props: () => DropdownItemProps<T>) {
		super(props);

		this.#dropdown = DropdownBond.get() as
			| DropdownBond<DropdownStateProps, DropdownBondState<DropdownStateProps>>
			| undefined;

		if (!this.#dropdown) {
			throw new Error('DropdownItem must be used within a Dropdown context');
		}
	}

	get value() {
		return this.props?.value;
	}

	get data() {
		return this.props?.data;
	}

	get element() {
		return this.#element;
	}

	get dropdown() {
		return this.#dropdown;
	}

	get label() {
		const element = (this.#element?.querySelector('[data-label]') ?? this.#element) as
			| HTMLElement
			| undefined
			| null;
		return element?.innerText ?? '';
	}

	get isHighlighted() {
		return this.#dropdown?.state.highlightedItem?.id === this.id;
	}

	get isSelected() {
		return this.#dropdown?.state.props.values?.includes(this.value) ?? false;
	}

	select() {
		this.#dropdown?.state.select([this.value]);
	}

	unselect() {
		this.#dropdown?.state.unselect([this.value]);
	}

	toggle() {
		if (this.isSelected) {
			this.unselect();
		} else {
			this.select();
		}
	}

	close() {
		this.#dropdown?.state.close();
	}

	share() {
		return DropdownItemController.set(this);
	}

	elementProps() {
		const itemId = `item-${this.id}`;
		return {
			id: itemId,
			role: 'option',
			'aria-selected': this.isSelected,
			'data-selected': this.isSelected,
			'data-highlighted': this.isHighlighted,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.#element = node;
				return () => {
					this.#unmount?.();
					this.#element = null;
				};
			}
		};
	}

	static get<T = unknown>(): DropdownItemController<T> | undefined {
		return getContext(DropdownItemController.CONTEXT_KEY);
	}

	static set<T = unknown>(item: DropdownItemController<T>): DropdownItemController<T> {
		return setContext(DropdownItemController.CONTEXT_KEY, item);
	}
}
