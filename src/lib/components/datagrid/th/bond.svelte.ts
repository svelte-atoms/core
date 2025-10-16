import { createAttachmentKey } from 'svelte/attachments';
import { getContext, setContext } from 'svelte';
import type { Direction, SortableType } from '$svelte-atoms/core/types';
import { DataGridBond, DataGridBondState } from '../bond.svelte';
import { Bond, BondState, type BondStateProps } from '$svelte-atoms/core/shared/bond.svelte';

export type DataGridThBondProps = BondStateProps & {
	id: string;
	width?: string;
	screen?: string;
	sortable?: boolean | SortableType;
	hidden?: boolean;
	direction: Direction;
};

export type DataGridThElements = {
	root: HTMLElement;
};

export class DataGridThBond<T> extends Bond<
	DataGridThBondProps,
	DataGridThBondState<T>,
	DataGridThElements
> {
	static CONTEXT_KEY = '@atoms/context/datagrid/th';

	#datagrid: DataGridBond<T>;

	constructor(s: DataGridThBondState<T>) {
		super(s);
		this.#datagrid = DataGridBond.get() as DataGridBond<T>;
	}

	get isHidden() {
		return this.elements.root.hidden || getComputedStyle(this.elements.root)?.display === 'none';
	}

	get index() {
		const parent = this.elements.root?.parentElement;
		return Array.from(parent?.children ?? []).indexOf(this.elements.root);
	}

	get text() {
		return this.elements.root.innerText;
	}

	get datagrid() {
		return this.#datagrid;
	}

	share(): this {
		return DataGridThBond.set(this) as this;
	}

	mount() {
		return this.#datagrid.state.mountColumn(this.state.id, this);
	}

	unmount() {
		return this.#datagrid.state.unmountColumn(this.state.id);
	}

	props() {
		return {
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.root = node;
			}
		};
	}

	static get(): DataGridThBond | undefined {
		return getContext(DataGridThBond.CONTEXT_KEY);
	}

	static set(bond: DataGridThBond): DataGridThBond {
		return setContext(DataGridThBond.CONTEXT_KEY, bond);
	}
}

export class DataGridThBondState<T> extends BondState<DataGridThBondProps> {
	#datagrid: DataGridBondState<T>;

	constructor(props: () => DataGridThBondProps) {
		super(props);

		this.#datagrid = DataGridBond.get().state as DataGridBondState<T>;

		if (!this.#datagrid) {
			throw new Error('DataGridThBond must be used within a DataGridBond context.');
		}
	}

	get isSortable() {
		return this.props.sortable;
	}

	asc() {
		this.props.direction = 'asc';
	}

	desc() {
		this.props.direction = 'desc';
	}
}
