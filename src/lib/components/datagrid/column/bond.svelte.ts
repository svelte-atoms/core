import { getContext, setContext } from 'svelte';
import type { Direction, SortableType } from '$svelte-atoms/core/types';
import { DataGridBond } from '../bond.svelte';
import {
	Bond,
	BondState,
	BondAtom,
	type BondStateProps
} from '$svelte-atoms/core/shared/bond.svelte';

export type DataGridColumnBondProps = BondStateProps & {
	id: string;
	width?: string;
	screen?: string;
	sortable?: boolean | SortableType;
	hidden?: boolean;
	direction: Direction;
};

export type DataGridColumnElements = {
	root: HTMLElement;
};

export class DataGridColumnRootAtom<T = unknown> extends BondAtom<DataGridColumnBond<T>> {
	constructor(bond: DataGridColumnBond<T>) {
		super(bond, 'root');
	}

	override get attrs() {
		const props = this.bond.state.props;
		return {
			...super.attrs,
			'data-kind': 'datagrid-column',
			'data-sortable': props.sortable ? 'true' : undefined,
			'data-direction': props.direction
		};
	}
}

export class DataGridColumnBond<T = unknown> extends Bond<
	DataGridColumnBondProps,
	DataGridColumnBondState<T>,
	DataGridColumnElements
> {
	static CONTEXT_KEY = '@atoms/context/datagrid/column';

	readonly #datagrid: DataGridBond<T>;

	constructor(s: DataGridColumnBondState<T>) {
		super(s, 'datagrid-column');
		this.#datagrid = DataGridBond.get() as DataGridBond<T>;
	}

	get isHidden(): boolean {
		const el = this.elements.root;
		if (!(el instanceof HTMLElement)) return false;
		return Boolean(el.hidden) || getComputedStyle(el).display === 'none';
	}

	get index(): number {
		const el = this.elements.root;
		return el ? Array.from(el.parentElement?.children ?? []).indexOf(el) : -1;
	}

	get text(): string {
		const el = this.elements.root;
		return el instanceof HTMLElement ? el.innerText : '';
	}

	get datagrid(): DataGridBond<T> {
		return this.#datagrid;
	}

	share(): this {
		return DataGridColumnBond.set(this) as this;
	}

	mount(): () => void {
		return this.#datagrid.state.mountColumn(this.state.id, this);
	}

	root() {
		return this.atom('root', () => new DataGridColumnRootAtom(this));
	}

	static get<T = unknown>(): DataGridColumnBond<T> | undefined {
		return getContext(DataGridColumnBond.CONTEXT_KEY);
	}

	static set<T = unknown>(bond: DataGridColumnBond<T>): DataGridColumnBond<T> {
		return setContext(DataGridColumnBond.CONTEXT_KEY, bond);
	}
}

export class DataGridColumnBondState<T = unknown> extends BondState<DataGridColumnBondProps> {
	constructor(props: () => DataGridColumnBondProps) {
		super(props);

		const datagrid = DataGridBond.get<T>();
		if (!datagrid) {
			throw new Error('DataGridColumnBond must be used within a DataGridBond context.');
		}
	}

	get isSortable(): boolean | SortableType | undefined {
		return this.props.sortable;
	}

	asc(): void {
		this.props.direction = 'asc';
	}

	desc(): void {
		this.props.direction = 'desc';
	}
}

// Backward-compatible aliases for existing imports.
export type DataGridThBondProps = DataGridColumnBondProps;
export type DataGridThElements = DataGridColumnElements;
export { DataGridColumnBond as DataGridThBond, DataGridColumnBondState as DataGridThBondState };
