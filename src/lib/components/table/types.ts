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
export interface TableHeaderExtendProps {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TableCellExtendProps {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TableCaptionExtendProps {}

export interface TableRootProps extends HtmlAtomProps<'table'>, TableRootExtendProps {
	children?: Snippet<[]>;
}

export interface TableHeadProps extends HtmlAtomProps<'thead'>, TableHeadExtendProps {
	children?: Snippet<[]>;
}

export interface TableBodyProps extends HtmlAtomProps<'tbody'>, TableBodyExtendProps {
	children?: Snippet<[]>;
}

export interface TableFootProps extends HtmlAtomProps<'tfoot'>, TableFootExtendProps {
	children?: Snippet<[]>;
}

export interface TableRowProps extends HtmlAtomProps<'tr'>, TableRowExtendProps {
	children?: Snippet<[]>;
}

export interface TableHeaderProps extends HtmlAtomProps<'th'>, TableHeaderExtendProps {
	/** Column sort state — renders sort indicator icon */
	sort?: 'asc' | 'desc' | 'none' | false;
	children?: Snippet<[]>;
}

export interface TableCellProps extends HtmlAtomProps<'td'>, TableCellExtendProps {
	children?: Snippet<[]>;
}

export interface TableCaptionProps extends HtmlAtomProps<'caption'>, TableCaptionExtendProps {
	children?: Snippet<[]>;
}
