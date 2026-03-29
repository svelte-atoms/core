import { BondAtom } from '$svelte-atoms/core/shared/bond.svelte';
import { nanoid } from 'nanoid';
import type { SelectBond } from '../bond.svelte';

export type SelectItemAtomProps<T = unknown> = {
	value: string;
	label?: string;
	data?: T;
	id?: string;
};

export class SelectItemAtom<Data = unknown, B extends SelectBond = SelectBond> extends BondAtom<
	B,
	HTMLElement
> {
	#id: string;
	#props: () => SelectItemAtomProps<Data>;
	#selectBond: B;
	// eslint-disable-next-line svelte/prefer-svelte-reactivity
	#createdAt = new Date();

	constructor(props: () => SelectItemAtomProps<Data>, selectBond: B) {
		super(selectBond, `item-${props().value}`);
		this.#props = props;
		this.#selectBond = selectBond;
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
		return this.#selectBond.state.highlightedItem?.id === this.id;
	}

	get isSelected() {
		return this.#selectBond.state.props.values?.includes(this.value) ?? false;
	}

	override get attrs() {
		const itemId = `select-item-${this.id}`;
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
		return {};
	}

	select() {
		this.#selectBond?.state.select([this.value]);
	}

	unselect() {
		this.#selectBond?.state.unselect([this.value]);
	}

	toggle() {
		if (this.isSelected) {
			this.unselect();
		} else {
			this.select();
		}
	}

	close() {
		this.#selectBond?.state.close();
	}

	onmount() {
		this.#selectBond?.state?.mountItem?.(this.value, this as any);
		return () => {
			this.#selectBond?.state?.unmountItem?.(this.value);
		};
	}
}
