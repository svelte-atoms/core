import type { PopoverStateProps } from '$svelte-atoms/core/components/popover/bond.svelte';
import { getContext, setContext } from 'svelte';
import { Bond, BondState, type BondStateProps } from '$svelte-atoms/core/shared/bond.svelte';
import { DropdownBond, DropdownBondState } from '../bond.svelte';

export type DropdownItemBondProps<T> = BondStateProps & {
	value: string;
	selected?: string;
	data: T;
};

export type DropdownItemBondElements = {
	root: HTMLElement;
};

export class DropdownItemBond<T = unknown> extends Bond<
	DropdownItemBondProps<T>,
	DropdownItemBondState<T>,
	DropdownItemBondElements
> {
	static CONTEXT_KEY = '@atoms/context/dropdown/item';

	#dropdown: DropdownBond<DropdownBondState<PopoverStateProps>> | undefined;

	constructor(state: DropdownItemBondState<T>) {
		super(state);
		this.#dropdown = DropdownBond.get() as
			| DropdownBond<DropdownBondState<PopoverStateProps>>
			| undefined;

		if (!this.#dropdown) {
			throw new Error('DropdownItemAtom must be used within a DropdownAtom context');
		}
	}

	get value() {
		return this.state.value;
	}

	get text() {
		const element = (this.elements?.root?.querySelector('[data-text]') ?? this.elements?.root) as
			| HTMLElement
			| undefined
			| null;
		return element?.innerText ?? '';
	}

	get dropdown() {
		return this.#dropdown;
	}

	mount() {
		this.dropdown?.state.mountItem(this.state.value, this);

		return () => this.unmount();
	}
	unmount() {
		this.dropdown?.state.unmountItem(this.state.value);
	}

	share() {
		return DropdownItemBond.set<T>(this) as this;
	}

	static get(): DropdownItemBond | undefined {
		return getContext(DropdownItemBond.CONTEXT_KEY);
	}

	static set(bond: DropdownItemBond): DropdownItemBond {
		return setContext(DropdownItemBond.CONTEXT_KEY, bond);
	}
}

export class DropdownItemBondState<T> extends BondState<DropdownItemBondProps<T>> {
	#dropdown: DropdownBond<DropdownBondState<PopoverStateProps>> | undefined;

	constructor(props: () => DropdownItemBondProps<T>) {
		super(props);
		this.#dropdown = DropdownBond.get() as
			| DropdownBond<DropdownBondState<PopoverStateProps>>
			| undefined;

		if (!this.#dropdown) {
			throw new Error('DropdownItemState must be used within a DropdownAtom context');
		}
	}

	get value() {
		return this.props.value;
	}

	get data() {
		return this.props.data;
	}

	get isSelected() {
		return this.dropdown?.props.values?.includes(this.props.value) ?? false;
	}

	set isSelected(val: boolean) {
		if (val) {
			this.dropdown?.select([this.props.value]);
		} else {
			this.dropdown?.unselect([this.props.value]);
		}
	}

	get isHighlighted() {
		return this.dropdown?.highlightedItem?.id === this.id;
	}

	get dropdown() {
		return this.#dropdown?.state;
	}

	select() {
		this.dropdown?.select([this.value]);
	}

	unselect() {
		this.dropdown?.unselect([this.value]);
	}

	toggle() {
		if (this.isSelected) {
			this.unselect();
		} else {
			this.select();
		}
	}

	close() {
		this.dropdown?.close();
	}
}
