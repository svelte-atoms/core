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

	static get(): DataGridBond | undefined {
		return getContext(DataGridBond.CONTEXT_KEY);
	}

	static set(bond: DataGridBond): DataGridBond {
		return setContext(DataGridBond.CONTEXT_KEY, bond);
	}
}

export class DataGridBondState<T> extends BondState<DataGridStateProps<T>> {
	#id: string = nanoid();

	#rows: Map<string, DataGridTrBond<T>> = new SvelteMap();
	#columns: Map<string, DataGridThBond<T>> = new SvelteMap();

	#sortableColumns = $derived(this.#columns.values().filter((d) => d.state.props.sortable));

	#selectedRows = $derived(
		(this.props.values ?? [])
			.map((value) => this.#rows.get(value))
			.filter(Boolean) as DataGridTrBond<T>[]
	);

	constructor(props: () => DataGridStateProps<T>) {
		super(props);
	}

	get id() {
		return this.#id;
	}

	get rows() {
		return new Map(this.#rows);
	}

	get columns() {
		return new Map(this.#columns);
	}

	get selectedRows() {
		return this.#selectedRows;
	}

	get sortableColumns() {
		return this.#sortableColumns;
	}

	get template() {
		return (
			this.props.template ||
			this.#columns
				.values()
				.map((col) => col.state.props.width)
				.toArray()
				.join(' ')
		);
	}

	mountColumn(id: string, item: DataGridThBond<T>) {
		this.#columns.set(id, item);

		return () => this.unmountColumn(id);
	}

	unmountColumn(id: string) {
		this.#columns.delete(id);
	}

	mountRow(id: string, item: DataGridTrBond<T>) {
		if (this.#rows.size && !this.props.value) {
			this.props.value = item.state.props.value;
		}

		this.#rows.set(id, item);

		return () => this.unmountRow(id);
	}

	unmountRow(id: string) {
		this.#rows.delete(id);
	}

	select(ids: string[]) {
		const sequence = new Set(this.props.values ?? []);

		for (const id of ids) {
			sequence.add(id);
		}

		this.props.values = sequence.values().toArray();
	}

	unselect(ids: string[]) {
		const sequence = new Set(this.props.values ?? []);

		for (const id of ids) {
			sequence.delete(id);
		}

		this.props.values = sequence.values().toArray();
	}
}
