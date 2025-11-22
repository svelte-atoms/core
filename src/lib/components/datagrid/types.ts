import type { Snippet } from 'svelte';
import type { DataGridBond } from './bond.svelte';
import type { CheckboxProps } from '../checkbox/types';
import type { Factory } from '$svelte-atoms/core/types';
import type { DataGridTrBond } from './tr/bond.svelte';
import type { DataGridThBond } from './th/bond.svelte';
import type { HtmlAtomProps, Base } from '../atom';
import type { HtmlElementTagName } from '../element';
import type { Override } from '$svelte-atoms/core/types';

/**
 * Extend this interface to add custom datagrid root properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DatagridRootExtendProps {}

/**
 * Extend this interface to add custom datagrid header properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DatagridHeaderExtendProps {}

/**
 * Extend this interface to add custom datagrid body properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DatagridBodyExtendProps {}

/**
 * Extend this interface to add custom datagrid footer properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DatagridFooterExtendProps {}

/**
 * Extend this interface to add custom datagrid th properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DatagridThExtendProps {}

/**
 * Extend this interface to add custom datagrid td properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DatagridTdExtendProps {}

/**
 * Extend this interface to add custom datagrid checkbox properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DatagridCheckboxExtendProps {}

/**
 * Extend this interface to add custom datagrid tr properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DatagridTrExtendProps {}

export interface DatagridContext<T = unknown> extends DataGridBond<T> {
	[key: string]: unknown;
}

export type Direction = 'asc' | 'desc';

export interface Row<T = unknown> {
	value: string;
	data: T;
}

export interface SelectedRows<T = unknown> {
	[id: string]: T;
}

export type SortableType = string | (<T>(d: T) => string | number | boolean | Date);

export interface SortBy {
	id: string;
	direction: Direction;
	by?: SortableType;
}

export interface Column {
	id: string;
	name: () => string;
	index: () => number;
	sortable?: boolean | SortableType;
	direction: Direction;
	screen?: string;
	width?: string;
	hidden: () => boolean;
}

export interface DatagridRootProps<T> extends DatagridRootExtendProps {
	class?: string;
	template?: string;
	fallbackTemplate?: string;
	values?: string[];
	readonly element?: HTMLElement;
	children?: Snippet<[{ context: DatagridContext<T> }]>;
}

export interface DatagridHeaderProps<T> extends DatagridHeaderExtendProps {
	class?: string;
	readonly element?: HTMLElement;
	children?: Snippet<[{ context: DatagridContext<T> }]>;
}

export interface DatagridBodyProps<T, E extends HtmlElementTagName = 'div', B extends Base = Base>
	extends DatagridBodyExtendProps {
	class?: string;
	readonly element?: HTMLElement;
	children?: Snippet<[{ context: DatagridContext<T> }]>;
}

export interface DatagridFooterProps<T> extends DatagridFooterExtendProps {
	class?: string;
	readonly element?: HTMLElement;
	children?: Snippet<[{ context: DatagridContext<T> }]>;
}

export interface DatagridThProps<
	T = unknown,
	E extends HtmlElementTagName = 'div',
	B extends Base = Base
> extends Override<
			HtmlAtomProps<E, B>,
			{
				children?: Snippet<[{ th: DatagridContext<T> }]>;
			}
		>,
		DatagridThExtendProps {
	id?: string;
	class?: string;
	width?: string;
	direction?: Direction;
	screen?: string;
	sortable?: boolean | SortableType;
	hidden?: boolean;
	factory?: () => DataGridThBond<T>;
}

export interface DatagridTdProps<T> extends DatagridTdExtendProps {
	class?: string;
	readonly element?: HTMLElement;
	children?: Snippet<[{ context: DatagridContext<T> }]>;
	onclick?: (ev: Event, options: { context?: DatagridContext<T> }) => void;
}

export interface DatagridCheckboxProps
	extends Omit<CheckboxProps, 'children'>,
		DatagridCheckboxExtendProps {
	readonly element?: HTMLElement;
	children?: Snippet<[{ context: DatagridContext }]>;
}

export interface DatagridTrProps<T, E extends HtmlElementTagName = 'div', B extends Base = Base>
	extends Override<
			HtmlAtomProps<E, B>,
			{
				children?: Snippet<[{ tr: DatagridContext<T> }]>;
			}
		>,
		DatagridTrExtendProps {
	class?: string;
	value?: string;
	rows?: string;
	data?: T;
	factory?: Factory<DataGridTrBond<T>>;
	onclick?: (ev: Event, options: { tr?: DatagridContext<T> }) => void;
}
