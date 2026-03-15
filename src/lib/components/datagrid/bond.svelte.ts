import { SvelteMap } from 'svelte/reactivity';
import { getContext, setContext } from 'svelte';
import { Bond, BondState, type BondStateProps } from '$svelte-atoms/core/shared/bond.svelte';
import { nanoid } from 'nanoid';
import type { DataGridTrBond } from './tr/bond.svelte';
import type { DataGridThBond } from './th/bond.svelte';

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

export class DataGridBond<T = unknown> extends Bond<
	DataGridStateProps<T>,
	DataGridBondState<T>,
	DataGridElements
> {
	static CONTEXT_KEY = '@atoms/context/datagrid';

	constructor(s: DataGridBondState<T>) {
		super(s);
	}

	get id() {
		return this.state.id;
	}

	share(): this {
		return DataGridBond.set(this) as this;
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

	#rows: SvelteMap<string, DataGridTrBond<T>> = new SvelteMap();
	#columns: SvelteMap<string, DataGridThBond<T>> = new SvelteMap();

	#selectedRows = $derived(
		(this.props.values ?? [])
			.map((value) => this.#rows.get(value))
			.filter((r): r is DataGridTrBond<T> => r !== undefined)
	);

	#sortableColumns = $derived(
		[...this.#columns.values()].filter((col) => col.state.props.sortable)
	);

	#template = $derived(
		this.props.template ||
		[...this.#columns.values()]
			.map((col) => col.state.props.width ?? '1fr')
			.join(' ')
	);

	constructor(props: () => DataGridStateProps<T>) {
		super(props);
	}

	get id() {
		return this.#id;
	}

	get rows(): ReadonlyMap<string, DataGridTrBond<T>> {
		return this.#rows;
	}

	get columns(): ReadonlyMap<string, DataGridThBond<T>> {
		return this.#columns;
	}

	get selectedRows(): readonly DataGridTrBond<T>[] {
		return this.#selectedRows;
	}

	get sortableColumns(): readonly DataGridThBond<T>[] {
		return this.#sortableColumns;
	}

	get template(): string {
		return this.#template;
	}

	mountColumn(id: string, item: DataGridThBond<T>): () => void {
		this.#columns.set(id, item);
		return () => this.#columns.delete(id);
	}

	mountRow(id: string, item: DataGridTrBond<T>): () => void {
		this.#rows.set(id, item);
		return () => this.#rows.delete(id);
	}

	select(ids: string[]): void {
		const next = new Set(this.props.values ?? []);
		for (const id of ids) next.add(id);
		this.props.values = [...next];
	}

	unselect(ids: string[]): void {
		const next = new Set(this.props.values ?? []);
		for (const id of ids) next.delete(id);
		this.props.values = [...next];
	}
}
