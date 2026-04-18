import { SvelteMap } from 'svelte/reactivity';
import { getContext, setContext } from 'svelte';
import {
	Bond,
	BondState,
	BondAtom,
	type BondStateProps
} from '$svelte-atoms/core/shared/bond.svelte';
import { nanoid } from 'nanoid';
import type { DataGridRowBond } from './row/bond.svelte';
import type { DataGridColumnBond } from './column/bond.svelte';

export type DataGridStateProps<T> = BondStateProps & {
	multiple?: boolean;
	template?: string;
	values?: string[];
	selection?: T[];
};

export type DataGridElements = {
	root: HTMLElement;
	header: HTMLElement;
	body: HTMLElement;
	footer: HTMLElement;
};

class DataGridRootAtom<T = unknown> extends BondAtom<DataGridBond<T>, HTMLElement> {
	constructor(bond: DataGridBond<T>) {
		super(bond, 'root');
	}
}

class DataGridHeaderAtom<T = unknown> extends BondAtom<DataGridBond<T>, HTMLElement> {
	constructor(bond: DataGridBond<T>) {
		super(bond, 'header');
	}
}

class DataGridBodyAtom<T = unknown> extends BondAtom<DataGridBond<T>, HTMLElement> {
	constructor(bond: DataGridBond<T>) {
		super(bond, 'body');
	}
}

class DataGridFooterAtom<T = unknown> extends BondAtom<DataGridBond<T>, HTMLElement> {
	constructor(bond: DataGridBond<T>) {
		super(bond, 'footer');
	}
}

export class DataGridBond<T = unknown> extends Bond<
	DataGridStateProps<T>,
	DataGridBondState<T>,
	DataGridElements
> {
	static CONTEXT_KEY = '@atoms/context/datagrid';

	constructor(s: DataGridBondState<T>) {
		super(s, 'datagrid');
	}

	get id() {
		return this.state.id;
	}

	share(): this {
		return DataGridBond.set(this) as this;
	}

	root() {
		return this.atom('root', () => new DataGridRootAtom(this));
	}

	header() {
		return this.atom('header', () => new DataGridHeaderAtom(this));
	}

	body() {
		return this.atom('body', () => new DataGridBodyAtom(this));
	}

	footer() {
		return this.atom('footer', () => new DataGridFooterAtom(this));
	}

	static get<T = unknown>(): DataGridBond<T> | undefined {
		return getContext(DataGridBond.CONTEXT_KEY);
	}

	static set<T = unknown>(bond: DataGridBond<T>): DataGridBond<T> {
		return setContext(DataGridBond.CONTEXT_KEY, bond);
	}
}

export class DataGridBondState<T> extends BondState<DataGridStateProps<T>> {
	readonly #id: string = nanoid();

	#rows: SvelteMap<string, DataGridRowBond<T>> = new SvelteMap();
	#columns: SvelteMap<string, DataGridColumnBond<T>> = new SvelteMap();

	#selectedRows = $derived(
		(this.props.values ?? [])
			.map((value) => this.#rows.get(value))
			.filter((r): r is DataGridRowBond<T> => r !== undefined)
	);

	#sortableColumns = $derived(
		[...this.#columns.values()].filter((col) => col.state.props.sortable)
	);

	#template = $derived(
		this.props.template ||
			[...this.#columns.values()].map((col) => col.state.props.width ?? '1fr').join(' ')
	);

	constructor(props: () => DataGridStateProps<T>) {
		super(props);
	}

	get id() {
		return this.#id;
	}

	get rows(): ReadonlyMap<string, DataGridRowBond<T>> {
		return this.#rows;
	}

	get columns(): ReadonlyMap<string, DataGridColumnBond<T>> {
		return this.#columns;
	}

	get selectedRows(): readonly DataGridRowBond<T>[] {
		return this.#selectedRows;
	}

	get sortableColumns(): readonly DataGridColumnBond<T>[] {
		return this.#sortableColumns;
	}

	get template(): string {
		return this.#template;
	}

	mountColumn(id: string, item: DataGridColumnBond<T>): () => void {
		this.#columns.set(id, item);
		return () => this.#columns.delete(id);
	}

	mountRow(id: string, item: DataGridRowBond<T>): () => void {
		this.#rows.set(id, item);
		return () => this.#rows.delete(id);
	}

	select(ids: string[]): void {
		this.props.values = [...(this.props.values ?? []), ...ids].filter(
			(value, index, array) => array.indexOf(value) === index
		);
	}

	unselect(ids: string[]): void {
		this.props.values = (this.props.values ?? []).filter((value) => !ids.includes(value));
	}
}
