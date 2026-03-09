import type { Snippet } from 'svelte';
import type { HtmlAtomProps } from '$svelte-atoms/core/components/atom';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TableRootExtendProps {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TableHeaderExtendProps {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TableBodyExtendProps {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TableFooterExtendProps {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TableTrExtendProps {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TableThExtendProps {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TableTdExtendProps {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TableCaptionExtendProps {}

export interface TableRootProps extends HtmlAtomProps<'table'>, TableRootExtendProps {
	children?: Snippet<[]>;
}

/** Wraps <thead> */
export interface TableHeaderProps extends HtmlAtomProps<'thead'>, TableHeaderExtendProps {
	children?: Snippet<[]>;
}

/** Wraps <tbody> */
export interface TableBodyProps extends HtmlAtomProps<'tbody'>, TableBodyExtendProps {
	children?: Snippet<[]>;
}

/** Wraps <tfoot> */
export interface TableFooterProps extends HtmlAtomProps<'tfoot'>, TableFooterExtendProps {
	children?: Snippet<[]>;
}

/** Wraps <tr> */
export interface TableTrProps extends HtmlAtomProps<'tr'>, TableTrExtendProps {
	children?: Snippet<[]>;
}

/** Wraps <th> — column header cell */
export interface TableThProps extends HtmlAtomProps<'th'>, TableThExtendProps {
	/** Column sort state — renders sort indicator icon */
	sort?: 'asc' | 'desc' | 'none' | false;
	children?: Snippet<[]>;
}

/** Wraps <td> — data cell */
export interface TableTdProps extends HtmlAtomProps<'td'>, TableTdExtendProps {
	children?: Snippet<[]>;
}

export interface TableCaptionProps extends HtmlAtomProps<'caption'>, TableCaptionExtendProps {
	children?: Snippet<[]>;
}
