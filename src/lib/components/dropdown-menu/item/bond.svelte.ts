import { BondAtom } from '$svelte-atoms/core/shared/bond.svelte';
import { nanoid } from 'nanoid';
import type { DropdownMenuBond } from '../bond.svelte';

export type DropdownMenuItemAtomProps = {
	id: string;
	disabled?: boolean;
};

export class DropdownMenuItemAtom<B extends DropdownMenuBond = DropdownMenuBond> extends BondAtom<
	B,
	HTMLElement
> {
	#id: string;
	#props: () => DropdownMenuItemAtomProps;
	#menuBond: B;
	// eslint-disable-next-line svelte/prefer-svelte-reactivity
	#createdAt = new Date();

	constructor(props: () => DropdownMenuItemAtomProps, menuBond: B) {
		super(menuBond, `item-${props().id}`);
		this.#props = props;
		this.#menuBond = menuBond;
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

	get isHighlighted() {
		return this.#menuBond.state.highlightedId === this.id;
	}

	override get attrs() {
		const itemId = `menu-item-${this.id}`;
		return {
			...super.attrs,
			id: itemId,
			role: 'menuitem',
			'data-highlighted': this.isHighlighted,
			'aria-disabled': this.#props().disabled ? true : undefined,
			tabIndex: this.#props().disabled ? -1 : 0
		};
	}

	override get handlers() {
		return {
			onclick: () => {
				this.#menuBond?.state.close();
			}
		};
	}

	close() {
		this.#menuBond?.state.close();
	}

	onmount() {
		this.#menuBond?.state?.mountItem?.(this.id, this as any);

		return () => {
			this.#menuBond?.state?.unmountItem?.(this.id);
		};
	}
}
