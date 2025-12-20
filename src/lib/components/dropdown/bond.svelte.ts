import { untrack } from 'svelte';
import { createAttachmentKey } from 'svelte/attachments';
import {
	MenuBond,
	MenuBondState,
	type MenuBondElements,
	type MenuBondProps
} from '$svelte-atoms/core/components/menu/bond.svelte';
import type { DropdownItemController } from './item/controller.svelte';

export type DropdownStateProps = MenuBondProps & {
	values?: string[];
	value?: string;
	multiple?: boolean;
	keys?: string[];
	onquerychange?: (query: string) => void;
};

export type DropdownBondElements = MenuBondElements & {
	placeholder?: HTMLElement;
};

const DROPDOWN_ELEMENTS_KIND: Record<keyof DropdownBondElements, string> = {
	placeholder: 'dropdown-placeholder',
	arrow: 'popover-arrow',
	trigger: 'popover-trigger',
	content: 'popover-content',
	indicator: 'popover-indicator'
};

export class DropdownBond<
	Props extends DropdownStateProps = DropdownStateProps,
	State extends DropdownBondState<Props> = DropdownBondState<Props>,
	Elements extends DropdownBondElements = DropdownBondElements
> extends MenuBond<Props, State, Elements> {
	constructor(state: State) {
		super(state);
	}

	content() {
		const isMultiselect = this.state.props.multiple ?? false;

		return {
			...super.content(),
			role: 'listbox',
			'aria-multiselectable': isMultiselect
		};
	}

	item() {
		return {
			...super.item(),
			role: 'option'
		};
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

	static get<
		Props extends DropdownStateProps = DropdownStateProps,
		State extends DropdownBondState<Props> = DropdownBondState<Props>,
		Elements extends DropdownBondElements = DropdownBondElements
	>(): DropdownBond<Props, State, Elements> | undefined {
		return MenuBond.get() as DropdownBond<Props, State, Elements> | undefined;
	}

	static set<
		Props extends DropdownStateProps = DropdownStateProps,
		State extends DropdownBondState<Props> = DropdownBondState<Props>,
		Elements extends DropdownBondElements = DropdownBondElements
	>(context: DropdownBond<Props, State, Elements>): DropdownBond<Props, State, Elements> {
		return MenuBond.set(context) as DropdownBond<Props, State, Elements>;
	}
}

export class DropdownBondState<
	Props extends DropdownStateProps = DropdownStateProps
> extends MenuBondState<Props> {
	#selectedItems = $derived(
		this.props.values
			?.map((value) => this.items.get(value) as unknown as DropdownItemController<unknown>)
			.filter(Boolean) ?? []
	) as DropdownItemController<unknown>[];

	#query = $state('');

	constructor(props: () => Props) {
		super(props);
	}

	get selectedItems() {
		return this.#selectedItems;
	}

	get query() {
		return this.#query;
	}
	set query(value: string) {
		this.#query = value;
		this.props.onquerychange?.(value);
	}

	select(ids: string[]) {
		if (untrack(() => this.props.multiple)) {
			// eslint-disable-next-line svelte/prefer-svelte-reactivity
			const sequence = new Set(untrack(() => [...ids, ...(this.props.values ?? [])]));

			this.props.values = [...sequence];
		} else {
			const value = ids[0];
			this.props.values = value ? [value] : [];
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
}
