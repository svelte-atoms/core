import { getContext, setContext } from 'svelte';
import { createAttachmentKey } from 'svelte/attachments';
import { nanoid } from 'nanoid';
import { DropdownBond, DropdownBondState, type DropdownStateProps } from '../bond.svelte';
import type { MenuItemControllerInterface } from '../../menu/item/controller.svelte';

export type DropdownItemProps<T = unknown> = {
	readonly id: string;
	readonly value: string;
	readonly label?: string;
	readonly data?: T;
};

export class DropdownItemController<T = unknown> implements MenuItemControllerInterface<
	DropdownItemProps<T>
> {
	static CONTEXT_KEY = '@atoms/context/dropdown/item';

	#id: string;
	#props: () => DropdownItemProps<T>;
	#element: HTMLElement | null = null;
	#dropdown: DropdownBond<DropdownStateProps, DropdownBondState<DropdownStateProps>> | undefined;

	#unmount?: (() => void) | undefined;

	// eslint-disable-next-line svelte/prefer-svelte-reactivity
	#createdAt = new Date();

	constructor(props: () => DropdownItemProps<T>) {
		this.#props = props;
		this.#id = this.props.id ?? nanoid();

		this.#dropdown = DropdownBond.get() as
			| DropdownBond<DropdownStateProps, DropdownBondState<DropdownStateProps>>
			| undefined;

		if (!this.#dropdown) {
			throw new Error('DropdownItem must be used within a Dropdown context');
		}
	}

	get id() {
		return this.#id;
	}

	get createdAt() {
		return this.#createdAt;
	}

	get props() {
		return this.#props();
	}

	get element() {
		return this.#element;
	}

	get value() {
		return this.props?.value;
	}

	get data() {
		return this.props?.data;
	}

	get dropdown() {
		return this.#dropdown;
	}

	get label() {
		const element = (this.#element?.querySelector('[data-label]') ?? this.#element) as
			| HTMLElement
			| undefined
			| null;
		return element?.innerText ?? this.props?.label ?? '';
	}

	get isHighlighted() {
		return this.#dropdown?.state.highlightedItem?.id === this.id;
	}

	get isSelected() {
		return this.#dropdown?.state.props.values?.includes(this.value) ?? false;
	}

	mount() {
		this.#unmount = this.dropdown?.state?.mountItem?.(this.#id, this) ?? undefined;

		return this.unmount;
	}

	unmount() {
		this.#unmount?.();
	}

	destroy() {
		this.unmount();
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
		const itemId = `dropdown-item-${this.id}`;
		return {
			id: itemId,
			role: 'option',
			'aria-selected': this.isSelected,
			'data-selected': this.isSelected,
			'data-highlighted': this.isHighlighted,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.#element = node;
				return () => {
					// this.#unmount?.();
					this.#element = null;
				};
			}
		} as const;
	}

	static get<T = unknown>(): DropdownItemController<T> | undefined {
		return getContext(DropdownItemController.CONTEXT_KEY);
	}

	static set<T = unknown>(item: DropdownItemController<T>): DropdownItemController<T> {
		return setContext(DropdownItemController.CONTEXT_KEY, item);
	}
}
