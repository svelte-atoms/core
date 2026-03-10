import { getContext, setContext } from 'svelte';
import { Bond, BondState, type BondStateProps } from '$svelte-atoms/core/shared/bond.svelte';
import { DataGridBond } from '../bond.svelte';
import type { Direction, SortableType } from '$svelte-atoms/core/types';

export type DataGridTdBondProps<T = unknown> = BondStateProps & {
	data?: T;
};

export type DataGridTdElements = {
	root: HTMLElement;
};

export class DataGridTdBond<T = unknown> extends Bond<
	DataGridTdBondProps<T>,
	DataGridTdBondState<T>,
	DataGridTdElements
> {
	static CONTEXT_KEY = '@atoms/context/datagrid/td';

	constructor(s: DataGridTdBondState<T>) {
		super(s);
	}

	share(): this {
		return DataGridTdBond.set(this) as this;
	}

	static get<T = unknown>(): DataGridTdBond<T> | undefined {
		return getContext(DataGridTdBond.CONTEXT_KEY);
	}

	static set<T = unknown>(bond: DataGridTdBond<T>): DataGridTdBond<T> {
		return setContext(DataGridTdBond.CONTEXT_KEY, bond);
	}
}

export class DataGridTdBondState<T = unknown> extends BondState<DataGridTdBondProps<T>> {
	readonly #datagrid = DataGridBond.get<T>();

	constructor(props: () => DataGridTdBondProps<T>) {
		super(props);
	}

	get datagrid() {
		return this.#datagrid?.state;
	}
}
