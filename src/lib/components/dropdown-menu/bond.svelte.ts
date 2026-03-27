import { SvelteMap, SvelteSet } from 'svelte/reactivity';
import {
	PopoverBond,
	PopoverState,
	PopoverContentAtom,
	PopoverTriggerAtom,
	type PopoverDomElements,
	type PopoverStateProps
} from '$svelte-atoms/core/components/popover/bond.svelte';
import { Atom } from '$svelte-atoms/core/shared/bond.svelte';
import type { DropdownMenuItemControllerInterface } from './item/controller.svelte';

export type DropdownMenuBondProps = PopoverStateProps;

export type DropdownMenuBondElements = PopoverDomElements;

export class DropdownMenuContentAtom extends PopoverContentAtom {
	constructor(bond: DropdownMenuBond) {
		super(bond);
	}
	declare protected bond: DropdownMenuBond;

	override get attrs() {
		const highlightedId = this.bond.state.highlightedId;
		return {
			...super.attrs,
			role: 'menu' as const,
			'aria-activedescendant': highlightedId ? `item-${highlightedId}` : undefined,
			'aria-orientation': 'vertical' as const
		};
	}

	override get handlers() {
		const superHandlers = super.handlers;
		return {
			...superHandlers,
			onkeydown: (ev: KeyboardEvent) => {
				superHandlers.onkeydown?.(ev);

				if (ev.defaultPrevented) return;

				if (ev.key === 'ArrowDown') {
					this.bond.state.navigation.next();
				}

				if (ev.key === 'ArrowUp') {
					this.bond.state.navigation.previous();
				}
			}
		};
	}
}

export class DropdownMenuTriggerAtom extends PopoverTriggerAtom {
	constructor(bond: DropdownMenuBond) {
		super(bond);
	}
	declare protected bond: DropdownMenuBond;

	override get attrs() {
		return {
			...super.attrs,
			'aria-haspopup': 'menu' as const
		};
	}

	override get handlers() {
		const superHandlers = super.handlers;
		
		return {
			...superHandlers,
			onkeydown: (ev: KeyboardEvent) => {
				if (ev.key === 'ArrowDown') {
					this.bond.state.navigation.next();
				}

				if (ev.key === 'ArrowUp') {
					this.bond.state.navigation.previous();
				}

				if (
					(ev.key === 'Enter' || ev.key === ' ') &&
					this.bond.state.props.open &&
					this.bond.state.highlightedItem
				) {
					if (ev.key === ' ') {
						ev.preventDefault();
					}

					this.bond.state.highlightedItem?.element?.click();
				}

				superHandlers.onkeydown?.(ev);
			}
		};
	}
}

export class DropdownMenuItemAtom<B extends DropdownMenuBond = DropdownMenuBond> extends Atom<B> {
	constructor(bond: B) {
		super(bond, 'item');
	}
	override get attrs() {
		return {
			...super.attrs,
			role: 'menuitem' as const
		};
	}

	override get handlers() {
		return {
			onkeyup: (ev: KeyboardEvent) => {
				const currentTarget = ev.currentTarget as HTMLElement;
				const disabled =
					currentTarget.getAttribute('disabled') ||
					currentTarget.getAttribute('aria-disabled') === 'true';

				if (disabled) return;

				if (ev.key === 'Enter' || ev.key === ' ') {
					ev.preventDefault();
					this.bond?.state.close();
				}
			}
		};
	}
}

export class DropdownMenuBond<
	Props extends DropdownMenuBondProps = DropdownMenuBondProps,
	State extends DropdownMenuBondState<Props> = DropdownMenuBondState<Props>,
	Elements extends DropdownMenuBondElements = DropdownMenuBondElements
> extends PopoverBond<Props, State, Elements> {
	constructor(state: State) {
		super(state);
	}

	override content() {
		return this.atom('content', () => new DropdownMenuContentAtom(this)) as DropdownMenuContentAtom;
	}

	override trigger() {
		return this.atom('trigger', () => new DropdownMenuTriggerAtom(this)) as DropdownMenuTriggerAtom;
	}

	item() {
		return this.atom('item', () => new DropdownMenuItemAtom(this));
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
