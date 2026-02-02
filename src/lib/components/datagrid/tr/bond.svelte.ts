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

const DATAGRID_TR_ELEMENTS_KIND = {
	root: 'datagrid-tr'
};

export class DataGridTrBond<
	T,
	Props extends DataGridTrBondProps<T> = DataGridTrBondProps<T>,
	State extends DataGridTrBondState<T, Props> = DataGridTrBondState<T, Props>,
	Elements extends DataGridTrBondElements = DataGridTrBondElements
> extends Bond<Props, State, Elements> {
	static CONTEXT_KEY = '@atoms/context/datagrid/tr';

	constructor(s: DataGridTrBondState<T, Props>) {
		super(s);
	}

	get datagrid() {
		const bond = DataGridBond.get();

		if (!bond) {
			throw new Error('DataGridTrBond must be used within a DataGridBond context.');
		}

		return bond;
	}

	share(): this {
		return DataGridTrBond.set(this) as this;
	}

	mount() {
		return this.datagrid.state.mountRow(this.state.id, this);
	}

	unmount() {
		// do not unmount if keys are used and this row is selected
		if (this.datagrid.state.props.keys && this.state.isSelected) {
			return;
		}

		return this.datagrid.state.unmountRow(this.state.id);
	}

	root() {
		return {
			'data-kind': DATAGRID_TR_ELEMENTS_KIND.root,
			'data-header': this.state.isHeader ? 'true' : undefined,
			'data-selected': this.state.isSelected ? 'true' : undefined,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.root = node;
			}
		};
	}

	static get(): DataGridTrBond | undefined {
		return getContext(DataGridTrBond.CONTEXT_KEY);
	}

	static set(bond: DataGridTrBond): DataGridTrBond {
		return setContext(DataGridTrBond.CONTEXT_KEY, bond);
	}
}

export class DataGridTrBondState<
	T,
	Props extends DataGridTrBondProps<T> = DataGridTrBondProps<T>
> extends BondState<Props> {
	static CONTEXT_KEY = '@atoms/context/datagrid/tr';

	#datagrid = DataGridBond.get();
	#isHeader: boolean = $state(!!getDatagridHeaderContext());

	constructor(props: () => Props) {
		super(props);
	}

	get id() {
		return this.props.value || super.id;
	}

	get isSelected() {
		return this.datagrid?.props.values?.some((id) => id === this.id);
	}

	get isHeader() {
		return this.#isHeader;
	}

	get datagrid() {
		return this.#datagrid?.state;
	}

	select() {
		this.datagrid?.select([this.id]);
	}

	unselect() {
		this.datagrid?.unselect([this.id]);
	}
}
