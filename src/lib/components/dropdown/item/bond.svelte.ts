import { BondAtom } from '$svelte-atoms/core/shared/bond.svelte';
import { nanoid } from 'nanoid';
import type { DropdownBond } from '../bond.svelte';

export type DropdownItemAtomProps<T = unknown> = {
	id: string;
	value: string;
	label?: string;
	data?: T;
};

export class DropdownItemAtom<T = unknown, B extends DropdownBond = DropdownBond> extends BondAtom<
	B,
	HTMLElement
> {
	#id: string;
	#props: () => DropdownItemAtomProps<T>;
	#dropdownBond: B;
	// eslint-disable-next-line svelte/prefer-svelte-reactivity
	#createdAt = new Date();

	constructor(props: () => DropdownItemAtomProps<T>, dropdownBond: B) {
		super(dropdownBond, `item-${props().value}`);
		this.#props = props;
		this.#dropdownBond = dropdownBond;
		this.#id = props().id ?? nanoid();
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

	get value() {
		return this.props.value;
	}

	get data() {
		return this.props.data;
	}

	get label() {
		const element = (this.element?.querySelector('[data-label]') ?? this.element) as
			| HTMLElement
			| undefined
			| null;
		return element?.innerText ?? this.#props().label ?? '';
	}

	get isHighlighted() {
		return this.#dropdownBond.state.highlightedItem?.id === this.id;
	}

	get isSelected() {
		return this.#dropdownBond.state.props.values?.includes(this.value) ?? false;
	}

	override get attrs() {
		const itemId = `dropdown-item-${this.id}`;
		return {
			...super.attrs,
			id: itemId,
			role: 'option',
			'aria-selected': this.isSelected,
			'data-selected': this.isSelected,
			'data-highlighted': this.isHighlighted
		};
	}

	override get handlers() {
		return {
			onclick: () => {
				this.toggle();
				if (this.#dropdownBond?.state) {
					(this.#dropdownBond.state as any).query = '';
				}
				this.close();
			}
		};
	}

	select() {
		this.#dropdownBond?.state.select([this.value]);
	}

	unselect() {
		this.#dropdownBond?.state.unselect([this.value]);
	}

	toggle() {
		if (this.isSelected) {
			this.unselect();
		} else {
			this.select();
		}
	}

	close() {
		this.#dropdownBond?.state.close();
	}

	mount() {
		return this.#dropdownBond?.state?.mountItem?.(this.#id, this as any);
	}

	unmount() {
		// Items are unregistered via unmount hook
	}
}
