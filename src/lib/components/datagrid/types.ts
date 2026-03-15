import type { Snippet } from 'svelte';
import type { DataGridBond } from './bond.svelte';
import type { CheckboxProps } from '../checkbox/types';
import type { Factory } from '$svelte-atoms/core/types';
import type { DataGridTrBond } from './tr/bond.svelte';
import type { DataGridThBond } from './th/bond.svelte';
import type { HtmlAtomProps, Base } from '../atom';
import type { HtmlElementTagName } from '../element';
import type { Direction, SortableType, Override } from '$svelte-atoms/core/types';

// ── Augmentation extension points ──────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DatagridRootExtendProps {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DatagridHeaderExtendProps {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DatagridBodyExtendProps {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DatagridFooterExtendProps {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DatagridThExtendProps {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DatagridTdExtendProps {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DatagridCheckboxExtendProps {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DatagridTrExtendProps {}

// ── Shared types ───────────────────────────────────────────────────────────

export type { Direction, SortableType };

export interface SortBy {
	id: string;
	direction: Direction;
	by?: SortableType;
}

// ── Component prop types ───────────────────────────────────────────────────

export interface DatagridRootProps<
	T = unknown,
	E extends HtmlElementTagName = 'div',
	B extends Base = Base
> extends Omit<HtmlAtomProps<E, B>, 'children'>, DatagridRootExtendProps {
	template?: string;
	fallbackTemplate?: string;
	values?: string[];
	factory?: Factory<DataGridBond<T>>;
	children?: Snippet<[{ datagrid: DataGridBond<T> | undefined }]>;
}

export interface DatagridHeaderProps<
	T = unknown,
	E extends HtmlElementTagName = 'div',
	B extends Base = Base
> extends Omit<HtmlAtomProps<E, B>, 'children'>, DatagridHeaderExtendProps {
	children?: Snippet<[{ datagrid: DataGridBond<T> | undefined }]>;
}

export interface DatagridBodyProps<
	T = unknown,
	E extends HtmlElementTagName = 'div',
	B extends Base = Base
> extends Omit<HtmlAtomProps<E, B>, 'children'>, DatagridBodyExtendProps {
	children?: Snippet<[{ datagrid: DataGridBond<T> | undefined }]>;
}

export interface DatagridFooterProps<
	T = unknown,
	E extends HtmlElementTagName = 'div',
	B extends Base = Base
> extends Omit<HtmlAtomProps<E, B>, 'children'>, DatagridFooterExtendProps {
	children?: Snippet<[{ datagrid: DataGridBond<T> | undefined }]>;
}

export interface DatagridThProps<
	T = unknown,
	E extends HtmlElementTagName = 'div',
	B extends Base = Base
>
	extends Override<
			HtmlAtomProps<E, B>,
			{ children?: Snippet<[{ th: DataGridThBond<T> }]> }
		>,
		DatagridThExtendProps {
	id?: string;
	width?: string;
	direction?: Direction;
	screen?: string;
	sortable?: boolean | SortableType;
	hidden?: boolean;
	factory?: () => DataGridThBond<T>;
	onsort?: (event: CustomEvent, options: { field?: SortableType; direction: Direction }) => void;
}

export interface DatagridTdProps<
	T = unknown,
	E extends HtmlElementTagName = 'div',
	B extends Base = Base
>
	extends Omit<HtmlAtomProps<E, B>, 'children'>,
		DatagridTdExtendProps {
	children?: Snippet<[{ td: DataGridBond<T> | undefined }]>;
	onclick?: (ev: Event, options: { td?: DataGridBond<T> }) => void;
}

export interface DatagridCheckboxProps
	extends Omit<CheckboxProps, 'children'>,
		DatagridCheckboxExtendProps {
	children?: Snippet<[{ datagrid?: DataGridBond }]>;
}

export interface DatagridTrProps<
	T = unknown,
	E extends HtmlElementTagName = 'div',
	B extends Base = Base
>
	extends Override<
			HtmlAtomProps<E, B>,
			{ children?: Snippet<[{ tr: DataGridTrBond<T> }]> }
		>,
		DatagridTrExtendProps {
	value?: string;
	rows?: string;
	header?: boolean;
	data?: T;
	factory?: Factory<DataGridTrBond<T>>;
	onclick?: (ev: Event, options: { tr?: DataGridTrBond<T> }) => void;
}
