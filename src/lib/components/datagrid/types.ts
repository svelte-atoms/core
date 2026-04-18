import type { Snippet } from 'svelte';
import type { DataGridBond } from './bond.svelte';
import type { CheckboxProps } from '../checkbox/types';
import type { Factory } from '$svelte-atoms/core/types';
import type { DataGridRowBond } from './row/bond.svelte';
import type { DataGridColumnBond } from './column/bond.svelte';
import type { HtmlAtomProps, Base, SnippetProps } from '../atom';
import type { HtmlElementTagName } from '../element';
import type { Direction, SortableType, Override } from '$svelte-atoms/core/types';

// ── Shared types ────────────────────────────────────────────────────────────

export type { Direction, SortableType };

export interface SortBy {
	id: string;
	direction: Direction;
	by?: SortableType;
}

// ============================================================================
// Datagrid Snippet Props (Extensible)
// ============================================================================

export interface DatagridSnippetProps<T = unknown> extends SnippetProps {
	datagrid: DataGridBond<T> | undefined;
}

export type DatagridChildren<T = unknown> = Snippet<[DatagridSnippetProps<T>]>;

export interface DatagridColumnSnippetProps<T = unknown> extends SnippetProps {
	column: DataGridColumnBond<T>;
}

export type DatagridColumnChildren<T = unknown> = Snippet<[DatagridColumnSnippetProps<T>]>;

export interface DatagridRowSnippetProps<T = unknown> extends SnippetProps {
	row: DataGridRowBond<T>;
}

export type DatagridRowChildren<T = unknown> = Snippet<[DatagridRowSnippetProps<T>]>;

// Backward-compatible snippet aliases.
export interface DatagridThSnippetProps<T = unknown> extends DatagridColumnSnippetProps<T> {
	th: DataGridColumnBond<T>;
}

export type DatagridThChildren<T = unknown> = DatagridColumnChildren<T>;

export interface DatagridTrSnippetProps<T = unknown> extends DatagridRowSnippetProps<T> {
	tr: DataGridRowBond<T>;
}

export type DatagridTrChildren<T = unknown> = DatagridRowChildren<T>;

// ── Component prop types ────────────────────────────────────────────────────

export interface DatagridRootProps<
	T = unknown,
	E extends HtmlElementTagName = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B, DatagridChildren<T>> {
	template?: string;
	fallbackTemplate?: string;
	values?: string[];
	factory?: Factory<DataGridBond<T>>;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DatagridHeaderProps<
	T = unknown,
	E extends HtmlElementTagName = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B, DatagridChildren<T>> {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DatagridBodyProps<
	T = unknown,
	E extends HtmlElementTagName = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B, DatagridChildren<T>> {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DatagridFooterProps<
	T = unknown,
	E extends HtmlElementTagName = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B, DatagridChildren<T>> {}

export interface DatagridThProps<
	T = unknown,
	E extends HtmlElementTagName = 'div',
	B extends Base = Base
> extends Override<
	HtmlAtomProps<E, B, DatagridColumnChildren<T>>,
	{ children?: DatagridColumnChildren<T> }
> {
	id?: string;
	width?: string;
	direction?: Direction;
	screen?: string;
	sortable?: boolean | SortableType;
	hidden?: boolean;
	factory?: () => DataGridColumnBond<T>;
	onsort?: (event: CustomEvent, options: { field?: SortableType; direction: Direction }) => void;
}

export interface DatagridTdProps<
	T = unknown,
	E extends HtmlElementTagName = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B, DatagridChildren<T>> {
	onclick?: (ev: Event, options: { td?: DataGridBond<T> }) => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DatagridCheckboxProps extends Omit<CheckboxProps, 'children'> {}

export interface DatagridTrProps<
	T = unknown,
	E extends HtmlElementTagName = 'div',
	B extends Base = Base
> extends Override<
	HtmlAtomProps<E, B, DatagridRowChildren<T>>,
	{ children?: DatagridRowChildren<T> }
> {
	value?: string;
	rows?: string;
	header?: boolean;
	data?: T;
	factory?: Factory<DataGridRowBond<T>>;
	onclick?: (ev: Event, options: { row?: DataGridRowBond<T> }) => void;
}

// ── Semantic type aliases — preferred going forward ───────────────────────
// DatagridHeaderProps and DatagridFooterProps already have canonical names.
/** Preferred alias for DatagridTrProps */
export type DatagridRowProps<
	T,
	E extends HtmlElementTagName = 'div',
	B extends Base = Base
> = DatagridTrProps<T, E, B>;
/** Preferred alias for DatagridThProps */
export type DatagridColumnProps<
	T,
	E extends HtmlElementTagName = 'div',
	B extends Base = Base
> = DatagridThProps<T, E, B>;
/** Preferred alias for DatagridTdProps */
export type DatagridCellProps<T> = DatagridTdProps<T>;
