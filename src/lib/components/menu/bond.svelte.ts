import { SvelteMap, SvelteSet } from 'svelte/reactivity';
import {
	PopoverBond,
	PopoverState,
	type PopoverDomElements,
	type PopoverStateProps
} from '$svelte-atoms/core/components/popover/bond.svelte';
import type { MenuItemController } from './item/controller.svelte';

export type MenuBondProps = PopoverStateProps;

export type MenuBondElements = PopoverDomElements;

export class MenuBond<
	Props extends MenuBondProps = MenuBondProps,
	State extends MenuBondState<Props> = MenuBondState<Props>,
	Elements extends MenuBondElements = MenuBondElements
> extends PopoverBond<Props, State, Elements> {
	constructor(state: State) {
		super(state);
	}

	content() {
		const superProps = super.content();
		const onkeydown = superProps.onkeydown;
		const highlightedId = this.state.highlightedId;

		return {
			...superProps,
			role: 'menu',
			'aria-activedescendant': highlightedId ? `item-${highlightedId}` : undefined,
			'aria-orientation': 'vertical' as const,
			onkeydown: (ev: KeyboardEvent) => {
				// Call any additional onkeydown handler
				onkeydown?.(ev);

				if (ev.defaultPrevented) return;

				// Handle arrow key navigation
				if (ev.key === 'ArrowDown') {
					const item = this.state.navigation.next();
					item?.element?.focus();
				} else if (ev.key === 'ArrowUp') {
					const item = this.state.navigation.previous();
					item?.element?.focus();
				}
			}
		};
	}

	item() {
		return {
			role: 'menuitem',
			onkeydown: (ev: KeyboardEvent) => {
				const currentTarget = ev.currentTarget as HTMLElement;
				const disabled =
					currentTarget.getAttribute('disabled') ||
					currentTarget.getAttribute('aria-disabled') === 'true';

				if (disabled) return;

				// Activate on Enter or Space
				if (ev.key === 'Enter' || ev.key === ' ') {
					ev.preventDefault();
					// Call the click handler if provided
					// cast to any to avoid strict event-type mismatch when forwarding

					this?.state.close();
				}
			}
		};
	}

	static get<
		Props extends MenuBondProps = MenuBondProps,
		State extends MenuBondState<Props> = MenuBondState<Props>,
		Elements extends MenuBondElements = MenuBondElements
	>(): MenuBond<Props, State, Elements> | undefined {
		return PopoverBond.get() as MenuBond<Props, State, Elements> | undefined;
	}

	static set<
		Props extends MenuBondProps = MenuBondProps,
		State extends MenuBondState<Props> = MenuBondState<Props>,
		Elements extends MenuBondElements = MenuBondElements
	>(context: MenuBond<Props, State, Elements>): MenuBond<Props, State, Elements> {
		return PopoverBond.set(context) as MenuBond<Props, State, Elements>;
	}
}

export class MenuBondState<
	Props extends MenuBondProps = MenuBondProps
> extends PopoverState<Props> {
	#keys = new SvelteSet<string>();
	#items: Map<string, MenuItemController> = new SvelteMap();
	#itemsAsArray = $derived(Array.from(this.#items.values())) as MenuItemController[];

	#index = $state(-1);

	#highlightedId = $derived(Array.from(this.#items.keys())[this.#index] ?? null) as string | null;

	#highlightedItem = $derived(this.#itemsAsArray[this.#index] ?? null) as MenuItemController | null;

	constructor(props: () => Props) {
		super(props);
	}

	get items() {
		return this.#items;
	}

	get highlightedId() {
		return this.#highlightedId;
	}

	get highlightedItem() {
		return this.#highlightedItem;
	}

	get navigation() {
		return {
			next: () => {
				if (this.#index < 0) {
					this.#index = 0;
					return this.#highlightedItem;
				}

				const length = this.#items.size;
				this.#index = Math.min((this.#index + 1) % length, length - 1);

				return this.#highlightedItem;
			},
			previous: () => {
				if (this.#index <= 0) {
					this.#index = this.#items.size - 1;
					return this.#highlightedItem;
				}

				this.#index = Math.max(this.#index - 1, 0);

				return this.#highlightedItem;
			}
		};
	}

	mountItem(id: string, item: MenuItemController) {
		this.#items.set(id, item);

		return () => this.unmountItem(id);
	}

	unmountItem(id: string) {
		if (this.#keys.has(id)) return; // keep the item if it's still in the data source

		this.#items.delete(id);
	}

	item(id: string) {
		return this.#items.get(id);
	}
}
