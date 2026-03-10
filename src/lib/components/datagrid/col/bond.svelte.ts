import { getContext, setContext } from 'svelte';
import { createAttachmentKey } from 'svelte/attachments';
import type { Direction, SortableType } from '$svelte-atoms/core/types';
import { DataGridBond, type DataGridBondState } from '../bond.svelte';
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

export class DataGridThBond<T = unknown> extends Bond<
	DataGridThBondProps,
	DataGridThBondState<T>,
	DataGridThElements
> {
	static CONTEXT_KEY = '@atoms/context/datagrid/th';

	readonly #datagrid: DataGridBond<T>;

	constructor(s: DataGridThBondState<T>) {
		super(s);
		this.#datagrid = DataGridBond.get() as DataGridBond<T>;
	}

	get isHidden(): boolean {
		const el = this.elements.root;
		return el.hidden || getComputedStyle(el).display === 'none';
	}

	get index(): number {
		const el = this.elements.root;
		return el ? Array.from(el.parentElement?.children ?? []).indexOf(el) : -1;
	}

	get text(): string {
		return this.elements.root?.innerText ?? '';
	}

	get datagrid(): DataGridBond<T> {
		return this.#datagrid;
	}

	share(): this {
		return DataGridThBond.set(this) as this;
	}

	mount(): () => void {
		return this.#datagrid.state.mountColumn(this.state.id, this);
	}

	attachment() {
		return {
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.root = node;
			}
		};
	}

	static get<T = unknown>(): DataGridThBond<T> | undefined {
		return getContext(DataGridThBond.CONTEXT_KEY);
	}

	static set<T = unknown>(bond: DataGridThBond<T>): DataGridThBond<T> {
		return setContext(DataGridThBond.CONTEXT_KEY, bond);
	}
}

export class DataGridThBondState<T = unknown> extends BondState<DataGridThBondProps> {
	readonly #datagrid: DataGridBondState<T>;

	constructor(props: () => DataGridThBondProps) {
		super(props);

		const datagrid = DataGridBond.get<T>();
		if (!datagrid) {
			throw new Error('DataGridThBond must be used within a DataGridBond context.');
		}
		this.#datagrid = datagrid.state;
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
