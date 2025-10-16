import { SvelteMap } from 'svelte/reactivity';
import {
	PopoverBond,
	PopoverState,
	type PopoverDomElements,
	type PopoverStateProps
} from '$svelte-atoms/core/components/popover/bond.svelte';
import type { DropdownItemBond } from './item/bond.svelte';
import { untrack } from 'svelte';
import { createAttachmentKey } from 'svelte/attachments';

export type DropdownStateProps = PopoverStateProps & {
	values?: string[];
	value?: string;
	multiple?: boolean;
	keys?: string[];
	onquerychange?: (query: string) => void;
};

export type DropdownBondElements = PopoverDomElements & {
	placeholder?: HTMLElement;
};

const DROPDOWN_ELEMENTS_KIND: Record<keyof DropdownBondElements, string> = {
	placeholder: 'dropdown-placeholder',
	arrow: 'popover-arrow',
	overlay: 'popover-overlay',
	trigger: 'popover-trigger'
};

export class DropdownBond<
	Props extends DropdownStateProps = DropdownStateProps,
	State extends DropdownBondState<Props> = DropdownBondState<Props>,
	Elements extends DropdownBondElements = DropdownBondElements
> extends PopoverBond<Props, State, Elements> {
	constructor(state: State) {
		super(state);
	}

	content(props?: Record<string, unknown>) {
		const isMultiselect = this.state.props.multiple ?? false;

		return super.content({
			'aria-multiselectable': isMultiselect,
			...props
		});
	}

	placeholder() {
		const id = [DROPDOWN_ELEMENTS_KIND.placeholder, this.id].join('-');

		return {
			id,
			role: 'group',
			'data-atom': 'dropdown',
			'data-kind': 'placeholder',
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.placeholder = node;
			}
		};
	}

	// static get = getDropdownContext;
	// static set = setDropdownContext;

	static getContext<
		Props extends DropdownStateProps = DropdownStateProps,
		State extends DropdownBondState<Props> = DropdownBondState<Props>,
		Elements extends PopoverDomElements = PopoverDomElements
	>(): DropdownBond<Props, State, Elements> | undefined {
		return PopoverBond.get() as DropdownBond<Props, State, Elements> | undefined;
	}

	static setContext<
		Props extends DropdownStateProps = DropdownStateProps,
		State extends DropdownBondState<Props> = DropdownBondState<Props>,
		Elements extends PopoverDomElements = PopoverDomElements
	>(context: DropdownBond<Props, State, Elements>): DropdownBond<Props, State, Elements> {
		return PopoverBond.set(context) as DropdownBond<Props, State, Elements>;
	}
}

export class DropdownBondState<
	Props extends DropdownStateProps = DropdownStateProps
> extends PopoverState<Props> {
	// eslint-disable-next-line svelte/prefer-svelte-reactivity
	#keys = new Set<string>();
	#items: Map<string, DropdownItemBond<unknown>> = new SvelteMap();
	#selectedItems = $derived(
		this.props.values?.map((value) => this.#items.get(value)).filter(Boolean) ?? []
	) as DropdownItemBond<unknown>[];

	#index = $state(-1);
	#highlightedItem = $derived(
		this.#items.values().toArray()[this.#index] ?? null
	) as DropdownItemBond<unknown> | null;

	#query = $state('');

	constructor(props: () => DropdownStateProps) {
		super(props);

		$effect(() => {
			this.#keys.clear();
			for (const key of this.props.keys ?? []) {
				this.#keys.add(key);
			}
		});
	}

	get selectedItems() {
		return this.#selectedItems;
	}

	get highlightedItem() {
		return this.#highlightedItem;
	}

	get query() {
		return this.#query;
	}
	set query(value: string) {
		this.#query = value;
		this.props.onquerychange?.(value);
	}

	mountItem<I>(id: string, item: DropdownItemBond<I>) {
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

	select(ids: string[]) {
		if (untrack(() => this.props.multiple)) {
			// eslint-disable-next-line svelte/prefer-svelte-reactivity
			const sequence = new Set(untrack(() => [...ids, ...(this.props.values ?? [])]));

			this.props.values = [...sequence];
		} else {
			this.props.values = [ids[0]].filter(Boolean);
		}
	}

	unselect(ids: string[]) {
		// eslint-disable-next-line svelte/prefer-svelte-reactivity
		const sequence = new Set(untrack(() => this.props.values ?? []));

		for (const v of ids) {
			sequence.delete(v);
		}

		this.props.values = [...sequence];
	}

	highlightNextItem() {
		const length = this.#items.size;
		this.#index = Math.min((this.#index + 1) % length, length - 1);
	}

	highlightPreviousItem() {
		if (this.#index <= 0) {
			this.#index = this.#items.size - 1;
			return;
		}

		this.#index = Math.max(this.#index - 1, 0);
	}
}
