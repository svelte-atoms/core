import { BondAtom } from '$svelte-atoms/core/shared/bond.svelte';
import { nanoid } from 'nanoid';
import type { MenuBond } from '../bond.svelte';

export type MenuItemAtomProps = {
	id: string;
	disabled?: boolean;
};

export class MenuItemAtom<B extends MenuBond = MenuBond> extends BondAtom<B, HTMLElement> {
	#id: string;
	#props: () => MenuItemAtomProps;
	#menuBond: B;
	// eslint-disable-next-line svelte/prefer-svelte-reactivity
	#createdAt = new Date();

	constructor(props: () => MenuItemAtomProps, menuBond: B) {
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
		return this.#menuBond.state.highlightedId === this.#id;
	}

	override get attrs() {
		const itemId = `menu-item-${this.#id}`;
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

	mount() {
		return this.#menuBond?.state?.mountItem?.(this.#id, this as any);
	}

	unmount() {
		// Items are unregistered via unmount hook
	}
}
