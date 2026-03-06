import { SvelteMap, SvelteSet } from 'svelte/reactivity';
import {
	PopoverBond,
	PopoverState,
	type PopoverDomElements,
	type PopoverStateProps
} from '$svelte-atoms/core/components/popover/bond.svelte';
import type { DropdownMenuItemControllerInterface } from './item/controller.svelte';

export type DropdownMenuBondProps = PopoverStateProps;

export type DropdownMenuBondElements = PopoverDomElements;

export class DropdownMenuBond<
	Props extends DropdownMenuBondProps = DropdownMenuBondProps,
	State extends DropdownMenuBondState<Props> = DropdownMenuBondState<Props>,
	Elements extends DropdownMenuBondElements = DropdownMenuBondElements
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
					this.state.navigation.next();
				}

				if (ev.key === 'ArrowUp') {
					this.state.navigation.previous();
				}
			}
		};
	}

	trigger() {
		const superProps = super.trigger();

		return {
			...superProps,
			'aria-haspopup': 'menu' as const,
			onkeydown: (ev: KeyboardEvent) => {
				if (ev.key === 'ArrowDown') {
					this.state.navigation.next();
				}

				if (ev.key === 'ArrowUp') {
					this.state.navigation.previous();
				}

				if (
					(ev.key === 'Enter' || ev.key === ' ') &&
					this.state.props.open &&
					this.state.highlightedItem
				) {
					if (ev.key === ' ') {
						ev.preventDefault();
					}

					this.state.highlightedItem?.element?.click();
				}

				// Call any additional onkeydown handler
				superProps.onkeydown?.(ev);
			}
		};
	}

	item() {
		return {
			role: 'menuitem',
			onkeyup: (ev: KeyboardEvent) => {
				const currentTarget = ev.currentTarget as HTMLElement;
				const disabled =
					currentTarget.getAttribute('disabled') ||
					currentTarget.getAttribute('aria-disabled') === 'true';

				if (disabled) return;

				// Activate on Enter or Space
				if (ev.key === 'Enter' || ev.key === ' ') {
					ev.preventDefault();
					this?.state.close();
				}
			}
		};
	}

	static get<
		Props extends DropdownMenuBondProps = DropdownMenuBondProps,
		State extends DropdownMenuBondState<Props> = DropdownMenuBondState<Props>,
		Elements extends DropdownMenuBondElements = DropdownMenuBondElements
	>(): DropdownMenuBond<Props, State, Elements> | undefined {
		return PopoverBond.get() as DropdownMenuBond<Props, State, Elements> | undefined;
	}

	static set<
		Props extends DropdownMenuBondProps = DropdownMenuBondProps,
		State extends DropdownMenuBondState<Props> = DropdownMenuBondState<Props>,
		Elements extends DropdownMenuBondElements = DropdownMenuBondElements
	>(context: DropdownMenuBond<Props, State, Elements>): DropdownMenuBond<Props, State, Elements> {
		return PopoverBond.set(context) as DropdownMenuBond<Props, State, Elements>;
	}
}

export class DropdownMenuBondState<
	Props extends DropdownMenuBondProps = DropdownMenuBondProps
> extends PopoverState<Props> {
	#keys = new SvelteSet<string>();
	#items: Map<string, DropdownMenuItemControllerInterface<Record<string, any>>> = new SvelteMap();
	#itemsAsArray = $derived(
		Array.from(this.#items.values())
	) as DropdownMenuItemControllerInterface<Record<string, any>>[];

	#index = $state(-1);

	#highlightedId = $derived(
		Array.from(this.#items.keys())[this.#index] ?? null
	) as string | null;

	#highlightedItem = $derived(
		this.#itemsAsArray[this.#index] ?? null
	) as DropdownMenuItemControllerInterface<Record<string, any>> | null;

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

	mountItem(id: string, item: DropdownMenuItemControllerInterface<Record<string, any>>) {
		this.#items.set(id, item);

		return () => this.unmountItem(id);
	}

	unmountItem(id: string) {
		if (this.#keys.has(id)) return;

		this.#items.delete(id);
	}

	item(id: string) {
		return this.#items.get(id);
	}
}
