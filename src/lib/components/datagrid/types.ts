import type { Snippet } from 'svelte';
import type { DataGridBond } from './bond.svelte';
import type { CheckboxProps } from '../checkbox/types';

export type DatagridContext<T = unknown> = DataGridBond<T> | { [key: string]: unknown };

export type Direction = 'asc' | 'desc';

export type Row<T = unknown> = {
	value: string;
	data: T;
};

export type SelectedRows<T = unknown> = {
	[id: string]: T;
};

export type SortableType = string | (<T>(d: T) => string | number | boolean | Date);

export type SortBy = {
	id: string;
	direction: Direction;
	by?: SortableType;
};

export type Column = {
	id: string;
	name: () => string;
	index: () => number;
	sortable?: boolean | SortableType;
	direction: Direction;
	screen?: string;
	width?: string;
	hidden: () => boolean;
};

export type DatagridRootProps<T> = {
	class?: string;
	template?: string;
	values?: string[];
	data?: T[];
	readonly element?: HTMLElement;
	children?: Snippet<[{ context: DatagridContext<T> }]>;
};

export type DatagridHeaderProps<T> = {
	class?: string;
	readonly element?: HTMLElement;
	children?: Snippet<[{ context: DatagridContext<T> }]>;
};

export type DatagridBodyProps<T> = {
	class?: string;
	readonly element?: HTMLElement;
	children?: Snippet<[{ context: DatagridContext<T> }]>;
};

export type DatagridFooterProps<T> = {
	class?: string;
	readonly element?: HTMLElement;
	children?: Snippet<[{ context: DatagridContext<T> }]>;
};

export type DatagridThProps<T> = {
	class?: string;
	width?: string;
	direction?: Direction;
	screen?: string;
	sortable?: boolean | SortableType;
	readonly element?: HTMLElement;
	children?: Snippet<
		[
			{
				context: DatagridContext<T>;
			}
		]
	>;
};

export type DatagridTdProps<T> = {
	class?: string;
	readonly element?: HTMLElement;
	children?: Snippet<[{ context: DatagridContext<T> }]>;
	onclick?: (ev: Event, options: { context?: DatagridContext<T> }) => void;
};

export type DatagridCheckboxProps = CheckboxProps & {
	readonly element?: HTMLElement;
	children?: Snippet<[{ context: DatagridContext }]>;
};

export type DatagridTrProps<T> = {
	class?: string;
	value?: string;
	rows?: string;
	data?: T;
	readonly element?: HTMLElement;
	children?: Snippet<[{ context: DatagridContext<T> }]>;
	onclick?: (ev: Event, options: { context?: DatagridContext<T> }) => void;
};
