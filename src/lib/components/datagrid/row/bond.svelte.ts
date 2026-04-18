import { getContext, setContext } from 'svelte';
import {
	Bond,
	BondState,
	BondAtom,
	type BondStateProps
} from '$svelte-atoms/core/shared/bond.svelte';
import { DataGridBond } from '../bond.svelte';
import { getDatagridHeaderContext } from '../context';

export type DataGridRowBondProps<T = unknown> = BondStateProps & {
	value?: string;
	header?: boolean;
	data?: T;
};

export type DataGridRowBondElements = {
	root: HTMLElement;
};

export class DataGridRowRootAtom<T = unknown> extends BondAtom<DataGridRowBond<T>> {
	constructor(bond: DataGridRowBond<T>) {
		super(bond, 'root');
	}

	override get attrs() {
		return {
			...super.attrs,
			'data-kind': 'datagrid-row',
			'data-header': this.bond.state.isHeader ? 'true' : undefined,
			'data-selected': this.bond.state.isSelected ? 'true' : undefined
		};
	}
}

export class DataGridRowBond<
	T = unknown,
	Props extends DataGridRowBondProps<T> = DataGridRowBondProps<T>,
	State extends DataGridRowBondState<T, Props> = DataGridRowBondState<T, Props>,
	Elements extends DataGridRowBondElements = DataGridRowBondElements
> extends Bond<Props, State, Elements> {
	static CONTEXT_KEY = '@atoms/context/datagrid/row';

	readonly #datagrid: DataGridBond<T>;

	constructor(s: State) {
		super(s, 'datagrid-row');
		const datagrid = DataGridBond.get<T>();
		if (!datagrid) throw new Error('DataGridRowBond must be used within a DataGridBond context.');
		this.#datagrid = datagrid;
	}

	get datagrid(): DataGridBond<T> {
		return this.#datagrid;
	}

	share(): this {
		return DataGridRowBond.set(this) as this;
	}

	mount(): () => void {
		return this.#datagrid.state.mountRow(this.state.id, this);
	}

	root() {
		return this.atom('root', () => new DataGridRowRootAtom(this));
	}

	static get<T = unknown>(): DataGridRowBond<T> | undefined {
		return getContext(DataGridRowBond.CONTEXT_KEY);
	}

	static set<T = unknown>(bond: DataGridRowBond<T>): DataGridRowBond<T> {
		return setContext(DataGridRowBond.CONTEXT_KEY, bond);
	}
}

export class DataGridRowBondState<
	T = unknown,
	Props extends DataGridRowBondProps<T> = DataGridRowBondProps<T>
> extends BondState<Props> {
	readonly #datagrid = DataGridBond.get<T>();
	readonly #isHeader: boolean = !!getDatagridHeaderContext();

	constructor(props: () => Props) {
		super(props);
	}

	get id(): string {
		return this.props.value ?? super.id;
	}

	get isSelected(): boolean {
		return this.#datagrid?.state.props.values?.includes(this.id) ?? false;
	}

	get isHeader(): boolean {
		return this.#isHeader;
	}

	get datagrid() {
		return this.#datagrid?.state;
	}

	select(): void {
		this.#datagrid?.state.select([this.id]);
	}

	unselect(): void {
		this.#datagrid?.state.unselect([this.id]);
	}
}

// Backward-compatible aliases for existing imports.
export type DataGridTrBondProps<T = unknown> = DataGridRowBondProps<T>;
export type DataGridTrBondElements = DataGridRowBondElements;
export { DataGridRowBond as DataGridTrBond, DataGridRowBondState as DataGridTrBondState };
