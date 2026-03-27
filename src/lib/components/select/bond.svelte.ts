import { untrack } from 'svelte';
import {
	DropdownMenuBond,
	DropdownMenuBondState,
	DropdownMenuContentAtom,
	DropdownMenuItemAtom,
	type DropdownMenuBondElements,
	type DropdownMenuBondProps
} from '$svelte-atoms/core/components/dropdown-menu/bond.svelte';
import { Atom } from '$svelte-atoms/core/shared/bond.svelte';
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

class SelectItemAtom extends DropdownMenuItemAtom<SelectBond> {
	constructor(bond: SelectBond) {
		super(bond);
	}
	declare protected bond: SelectBond;

	override get attrs() {
		return {
			...super.attrs,
			role: 'option' as const
		};
	}
}

class SelectPlaceholderAtom extends Atom<SelectBond, HTMLElement> {
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
	State extends SelectBondState<Props> = SelectBondState<Props>,
	Elements extends SelectBondElements = SelectBondElements
> extends DropdownMenuBond<Props, State, Elements> {
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
