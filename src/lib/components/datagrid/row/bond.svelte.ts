import { getContext, setContext } from 'svelte';
import { createAttachmentKey } from 'svelte/attachments';
import { Bond, BondState, type BondStateProps } from '$svelte-atoms/core/shared/bond.svelte';
import { DataGridBond } from '../bond.svelte';
import { getDatagridHeaderContext } from '../context';

export type DataGridTrBondProps<T = unknown> = BondStateProps & {
	value?: string;
	header?: boolean;
	data?: T;
};

export type DataGridTrBondElements = {
	root: HTMLElement;
};

export class DataGridTrBond<
	T = unknown,
	Props extends DataGridTrBondProps<T> = DataGridTrBondProps<T>,
	State extends DataGridTrBondState<T, Props> = DataGridTrBondState<T, Props>,
	Elements extends DataGridTrBondElements = DataGridTrBondElements
> extends Bond<Props, State, Elements> {
	static CONTEXT_KEY = '@atoms/context/datagrid/tr';

	readonly #datagrid: DataGridBond<T>;

	constructor(s: State) {
		super(s);
		const datagrid = DataGridBond.get<T>();
		if (!datagrid) throw new Error('DataGridTrBond must be used within a DataGridBond context.');
		this.#datagrid = datagrid;
	}

	get datagrid(): DataGridBond<T> {
		return this.#datagrid;
	}

	share(): this {
		return DataGridTrBond.set(this) as this;
	}

	mount(): () => void {
		return this.#datagrid.state.mountRow(this.state.id, this);
	}

	root() {
		return {
			'data-kind': 'datagrid-tr',
			'data-header': this.state.isHeader ? 'true' : undefined,
			'data-selected': this.state.isSelected ? 'true' : undefined,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.root = node;
			}
		};
	}

	static get<T = unknown>(): DataGridTrBond<T> | undefined {
		return getContext(DataGridTrBond.CONTEXT_KEY);
	}

	static set<T = unknown>(bond: DataGridTrBond<T>): DataGridTrBond<T> {
		return setContext(DataGridTrBond.CONTEXT_KEY, bond);
	}
}

export class DataGridTrBondState<
	T = unknown,
	Props extends DataGridTrBondProps<T> = DataGridTrBondProps<T>
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
