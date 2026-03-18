import { untrack } from 'svelte';
import { createAttachmentKey } from 'svelte/attachments';
import {
	DropdownMenuBond,
	DropdownMenuBondState,
	type DropdownMenuBondElements,
	type DropdownMenuBondProps
} from '$svelte-atoms/core/components/dropdown-menu/bond.svelte';
import type { SelectItemController } from './item/controller.svelte';

export type SelectStateProps = DropdownMenuBondProps & {
	values?: string[];
	value?: string;
	labels?: string[];
	label?: string;
	multiple?: boolean;
	keys?: string[];
	readonly rest?: Record<string, unknown>;
};

export type SelectBondElements = DropdownMenuBondElements & {
	placeholder?: HTMLElement;
};

const SELECT_ELEMENTS_KIND: Record<keyof SelectBondElements, string> = {
	placeholder: 'select-placeholder',
	arrow: 'popover-arrow',
	trigger: 'popover-trigger',
	content: 'popover-content',
	indicator: 'popover-indicator'
};

export class SelectBond<
	Props extends SelectStateProps = SelectStateProps,
	State extends SelectBondState<Props> = SelectBondState<Props>,
	Elements extends SelectBondElements = SelectBondElements
> extends DropdownMenuBond<Props, State, Elements> {
	constructor(state: State) {
		super(state);
	}

	content() {
		const isMultiselect = this.state.props.multiple ?? false;
		const highlightedId = this.state.highlightedItem?.id;

		return {
			...super.content(),
			role: 'listbox',
			'aria-multiselectable': isMultiselect,
			'aria-activedescendant': highlightedId ? `item-${highlightedId}` : undefined,
			'aria-orientation': 'vertical' as const
		};
	}

	item() {
		return {
			...super.item(),
			role: 'option'
		};
	}

	placeholder() {
		const id = [SELECT_ELEMENTS_KIND.placeholder, this.id].join('-');

		return {
			id,
			role: 'group',
			'data-atom': 'select',
			'data-kind': 'placeholder',
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.placeholder = node;
			}
		};
	}

	static get<
		Props extends SelectStateProps = SelectStateProps,
		State extends SelectBondState<Props> = SelectBondState<Props>,
		Elements extends SelectBondElements = SelectBondElements
	>(): SelectBond<Props, State, Elements> | undefined {
		return DropdownMenuBond.get() as SelectBond<Props, State, Elements> | undefined;
	}

	static set<
		Props extends SelectStateProps = SelectStateProps,
		State extends SelectBondState<Props> = SelectBondState<Props>,
		Elements extends SelectBondElements = SelectBondElements
	>(context: SelectBond<Props, State, Elements>): SelectBond<Props, State, Elements> {
		return DropdownMenuBond.set(context) as SelectBond<Props, State, Elements>;
	}
}

export class SelectBondState<
	Props extends SelectStateProps = SelectStateProps
> extends DropdownMenuBondState<Props> {
	#selections = $derived(
		this.props.values
			?.map((value) => this.items.get(value) as unknown as SelectItemController<unknown>)
			.filter(Boolean) ?? []
	) as SelectItemController<unknown>[];

	constructor(props: () => Props) {
		super(props);
	}

	get selections() {
		return this.#selections;
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
