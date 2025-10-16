import { getContext, setContext } from 'svelte';
import { Bond, BondState, type BondStateProps } from '$svelte-atoms/core/shared/bond.svelte';
import { DataGridBond, DataGridBondState } from '../bond.svelte';
import type { Direction, SortableType } from '$svelte-atoms/core/types';

export type DataGridTdBondProps<T = unknown> = BondStateProps & {
	width?: string;
	screen?: string;
	sortable?: boolean | SortableType;
	direction: Direction;
	data?: T;
};

export type DataGridTdElements = {
	root: HTMLElement;
};

export class DataGridTdBond<T> extends Bond<
	DataGridTdBondProps<T>,
	DataGridTdBondState<T>,
	DataGridTdElements
> {
	static CONTEXT_KEY = '@atoms/context/datagrid/td';

	#datagrid: DataGridBond<T>;

	constructor(s: DataGridTdBondState<T>) {
		super(s);
		this.#datagrid = DataGridBond.get() as DataGridBond<T>;
	}

	share(): this {
		return DataGridTdBond.set(this) as this;
	}

	mount() {
		// TD doesn't mount as a row, it's part of a TR
		return () => {};
	}

	unmount() {
		return this.#datagrid.state.unmountRow(this.state.id);
	}

	static get(): DataGridTdBond | undefined {
		return getContext(DataGridTdBond.CONTEXT_KEY);
	}

	static set(bond: DataGridTdBond): DataGridTdBond {
		return setContext(DataGridTdBond.CONTEXT_KEY, bond);
	}
}

export class DataGridTdBondState<T> extends BondState<DataGridTdBondProps<T>> {
	#datagrid?: DataGridBondState<T>;

	constructor(props: () => DataGridTdBondProps<T>) {
		super(props);

		this.#datagrid = DataGridBond.get().state as DataGridBondState<T>;
	}

	get datagrid() {
		if (!this.#datagrid) {
			throw new Error('DataGridTdBond must be used within a DataGridBond context.');
		}
		return this.#datagrid;
	}
}
