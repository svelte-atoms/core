import { getContext, setContext } from 'svelte';
import { createAttachmentKey } from 'svelte/attachments';
import { nanoid } from 'nanoid';
import { MenuBond, MenuBondState, type MenuBondProps } from '../bond.svelte';

export type MenuItemControllerProps = {
	id?: string;
};

export class MenuItemController {
	static CONTEXT_KEY = '@atoms/context/menu/item';

	#id: string;
	#props: () => MenuItemControllerProps;
	#element: HTMLElement | null = null;
	#menu: MenuBond<MenuBondProps, MenuBondState<MenuBondProps>> | undefined;

	#unmount?: () => void;

	// eslint-disable-next-line svelte/prefer-svelte-reactivity
	#createdAt = new Date();

	constructor(props: () => MenuItemControllerProps = () => ({})) {
		this.#props = props;
		this.#id = this.props.id ?? nanoid();
		this.#menu = MenuBond.get() as
			| MenuBond<MenuBondProps, MenuBondState<MenuBondProps>>
			| undefined;

		if (!this.#menu) {
			throw new Error('MenuItem must be used within a Menu context');
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

	get menu() {
		return this.#menu;
	}

	get isHighlighted() {
		return this.#menu?.state.highlightedId === this.#id;
	}

	mount() {
		this.#unmount = this.#menu?.state?.mountItem?.(this.#id, this) ?? undefined;

		return this.unmount;
	}

	unmount() {
		this.#unmount?.();
	}

	destroy() {
		this.unmount();
	}

	share() {
		return MenuItemController.set(this);
	}

	elementProps() {
		const itemId = `item-${this.id}`;
		return {
			id: itemId,
			role: 'menuitem',
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

	static get(): MenuItemController | undefined {
		return getContext(MenuItemController.CONTEXT_KEY);
	}

	static set(item: MenuItemController): MenuItemController {
		return setContext(MenuItemController.CONTEXT_KEY, item);
	}
}
