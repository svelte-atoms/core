import type { Snippet } from 'svelte';
import type { HtmlAtomProps } from '$svelte-atoms/core/components/atom';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TableRootExtendProps {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TableHeadExtendProps {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TableBodyExtendProps {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TableFootExtendProps {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TableRowExtendProps {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TableColExtendProps {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TableCellExtendProps {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TableCaptionExtendProps {}

export interface TableRootProps extends HtmlAtomProps<'table'>, TableRootExtendProps {
	children?: Snippet<[]>;
}

/** Wraps <thead> */
export interface TableHeadProps extends HtmlAtomProps<'thead'>, TableHeadExtendProps {
	children?: Snippet<[]>;
}

/** Wraps <tbody> */
export interface TableBodyProps extends HtmlAtomProps<'tbody'>, TableBodyExtendProps {
	children?: Snippet<[]>;
}

/** Wraps <tfoot> */
export interface TableFootProps extends HtmlAtomProps<'tfoot'>, TableFootExtendProps {
	children?: Snippet<[]>;
}

/** Wraps <tr> */
export interface TableRowProps extends HtmlAtomProps<'tr'>, TableRowExtendProps {
	children?: Snippet<[]>;
}

/** Wraps <th> — column header cell */
export interface TableColProps extends HtmlAtomProps<'th'>, TableColExtendProps {
	/** Column sort state — renders sort indicator icon */
	sort?: 'asc' | 'desc' | 'none' | false;
	children?: Snippet<[]>;
}

/** Wraps <td> — data cell */
export interface TableCellProps extends HtmlAtomProps<'td'>, TableCellExtendProps {
	children?: Snippet<[]>;
}

export interface TableCaptionProps extends HtmlAtomProps<'caption'>, TableCaptionExtendProps {
	children?: Snippet<[]>;
}

// ── Deprecated aliases (will be removed in a future major version) ─────────
/** @deprecated Use TableHeadProps */
export type TableHeaderProps = TableHeadProps;
/** @deprecated Use TableFootProps */
export type TableFooterProps = TableFootProps;
/** @deprecated Use TableRowProps */
export type TableTrProps = TableRowProps;
/** @deprecated Use TableColProps */
export type TableThProps = TableColProps;
/** @deprecated Use TableCellProps */
export type TableTdProps = TableCellProps;
