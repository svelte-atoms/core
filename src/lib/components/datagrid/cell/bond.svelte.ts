import { getContext, setContext } from 'svelte';
import {
	Bond,
	BondState,
	BondAtom,
	type BondStateProps
} from '$svelte-atoms/core/shared/bond.svelte';
import { DataGridBond } from '../bond.svelte';

export type DataGridCellBondProps<T = unknown> = BondStateProps & {
	data?: T;
};

export type DataGridCellElements = {
	root: HTMLElement;
};

export class DataGridCellRootAtom<T = unknown> extends BondAtom<DataGridCellBond<T>> {
	constructor(bond: DataGridCellBond<T>) {
		super(bond, 'root');
	}

	override get attrs() {
		return {
			...super.attrs,
			'data-kind': 'datagrid-cell'
		};
	}
}

export class DataGridCellBond<T = unknown> extends Bond<
	DataGridCellBondProps<T>,
	DataGridCellBondState<T>,
	DataGridCellElements
> {
	static CONTEXT_KEY = '@atoms/context/datagrid/cell';

	constructor(s: DataGridCellBondState<T>) {
		super(s, 'datagrid-cell');
	}

	share(): this {
		return DataGridCellBond.set(this) as this;
	}

	root() {
		return this.atom('root', () => new DataGridCellRootAtom(this));
	}

	static get<T = unknown>(): DataGridCellBond<T> | undefined {
		return getContext(DataGridCellBond.CONTEXT_KEY);
	}

	static set<T = unknown>(bond: DataGridCellBond<T>): DataGridCellBond<T> {
		return setContext(DataGridCellBond.CONTEXT_KEY, bond);
	}
}

export class DataGridCellBondState<T = unknown> extends BondState<DataGridCellBondProps<T>> {
	readonly #datagrid = DataGridBond.get<T>();

	constructor(props: () => DataGridCellBondProps<T>) {
		super(props);
	}

	get datagrid() {
		return this.#datagrid?.state;
	}
}

// Backward-compatible aliases for existing imports.
export type DataGridTdBondProps<T = unknown> = DataGridCellBondProps<T>;
export type DataGridTdElements = DataGridCellElements;
export { DataGridCellBond as DataGridTdBond, DataGridCellBondState as DataGridTdBondState };
