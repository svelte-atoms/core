import { untrack } from 'svelte';
import { SvelteMap } from 'svelte/reactivity';
import {
	DropdownMenuBond,
	DropdownMenuBondState,
	DropdownMenuContentAtom,
	// DropdownMenuItemAtom,
	type DropdownMenuBondElements,
	type DropdownMenuBondProps
} from '$svelte-atoms/core/components/dropdown-menu/bond.svelte';
import { BondAtom } from '$svelte-atoms/core/shared/bond.svelte';
import type { SelectItemAtom } from './item/bond.svelte';

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

class SelectContentAtom extends DropdownMenuContentAtom {
	constructor(bond: SelectBond) {
		super(bond);
	}
	declare protected bond: SelectBond;

	override get attrs() {
		const isMultiselect = untrack(() => this.bond.state.props).multiple ?? false;
		const highlightedId = this.bond.state.highlightedItem?.id;

		return {
			...super.attrs,
			role: 'listbox' as const,
			'aria-multiselectable': isMultiselect,
			'aria-activedescendant': highlightedId ? `item-${highlightedId}` : undefined,
			'aria-orientation': 'vertical' as const
		};
	}
}

// class SelectItemAtom extends DropdownMenuItemAtom<SelectBond> {
// 	constructor(bond: SelectBond) {
// 		super(bond);
// 	}
// 	declare protected bond: SelectBond;

// 	override get attrs() {
// 		return {
// 			...super.attrs,
// 			role: 'option' as const
// 		};
// 	}
// }

class SelectPlaceholderAtom extends BondAtom<SelectBond, HTMLElement> {
	constructor(bond: SelectBond) {
		super(bond, 'placeholder');
	}
	override get attrs() {
		return {
			...super.attrs,
			role: 'group' as const
		};
	}
}

export class SelectBond<
	Props extends SelectStateProps = SelectStateProps,
	State extends SelectBondState<Props, any> = SelectBondState<Props, any>,
	Elements extends SelectBondElements = SelectBondElements,
	ItemData = unknown
> extends DropdownMenuBond<Props, State, Elements> {
	declare state: State & SelectBondState<Props, ItemData>;

	constructor(state: State) {
		super(state);
	}

	override content() {
		return this.atom('content', () => new SelectContentAtom(this));
	}

	override item() {
		return this.atom('item', () => new SelectItemAtom(this));
	}

	placeholder() {
		return this.atom('placeholder', () => new SelectPlaceholderAtom(this));
	}

	static get<
		Props extends SelectStateProps = SelectStateProps,
		State extends SelectBondState<Props, any> = SelectBondState<Props, any>,
		Elements extends SelectBondElements = SelectBondElements,
		ItemData = unknown
	>(): SelectBond<Props, State, Elements, ItemData> | undefined {
		return DropdownMenuBond.get() as SelectBond<Props, State, Elements, ItemData> | undefined;
	}

	static set<
		Props extends SelectStateProps = SelectStateProps,
		State extends SelectBondState<Props, any> = SelectBondState<Props, any>,
		Elements extends SelectBondElements = SelectBondElements,
		ItemData = unknown
	>(
		context: SelectBond<Props, State, Elements, ItemData>
	): SelectBond<Props, State, Elements, ItemData> {
		return DropdownMenuBond.set(context) as SelectBond<Props, State, Elements, ItemData>;
	}
}

export class SelectBondState<
	Props extends SelectStateProps = SelectStateProps,
	ItemData = unknown
> extends DropdownMenuBondState<Props> {
	#selectItems: Map<string, SelectItemAtom<ItemData>> = new SvelteMap();

	#selections = $derived(
		this.props.values?.map((value) => this.#selectItems.get(value)).filter(Boolean) ?? []
	) as SelectItemAtom<ItemData>[];

	constructor(props: () => Props) {
		super(props);
	}

	get selections() {
		return this.#selections;
	}

	registerItem(value: string, atom: SelectItemAtom<ItemData>) {
		this.#selectItems.set(value, atom);
	}

	unregisterItem(value: string) {
		this.#selectItems.delete(value);
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

		this.updateLabels();
	}

	unselect(ids: string[]) {
		// eslint-disable-next-line svelte/prefer-svelte-reactivity
		const sequence = new Set(untrack(() => this.props.values ?? []));

		for (const v of ids) {
			sequence.delete(v);
		}

		this.props.values = [...sequence];

		this.updateLabels();
	}

	protected updateLabels() {
		const labels = this.#selections.map((s) => s.label);
		this.props.labels = labels;
		this.props.label = labels[0] ?? '';
	}
}
