import type { Snippet } from 'svelte';
import type { HtmlAtomProps } from '$svelte-atoms/core/components/atom';

/**
 * Extend this interface to add custom pagination root properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PaginationRootExtendProps {}

/**
 * Extend this interface to add custom pagination item properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PaginationItemExtendProps {}

/**
 * Extend this interface to add custom pagination ellipsis properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PaginationEllipsisExtendProps {}

/**
 * Extend this interface to add custom pagination previous properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PaginationPrevExtendProps {}

/**
 * Extend this interface to add custom pagination next properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PaginationNextExtendProps {}

export interface PaginationRootProps extends HtmlAtomProps<'nav'>, PaginationRootExtendProps {
	/**
	 * Current active page (1-indexed)
	 */
	page?: number;
	/**
	 * Total number of pages
	 */
	total?: number;
	/**
	 * Number of sibling pages shown on each side of current page
	 * @default 1
	 */
	siblings?: number;
	/**
	 * Change handler — called when a page item is clicked
	 */
	onchange?: (page: number) => void;
	/**
	 * Children — receives pagination context
	 */
	children?: Snippet<[PaginationContext]>;
}

export interface PaginationContext {
	page: number;
	total: number;
	pages: (number | 'ellipsis')[];
	isFirst: boolean;
	isLast: boolean;
	prev: () => void;
	next: () => void;
	goto: (p: number) => void;
}

export interface PaginationItemProps extends HtmlAtomProps<'button'>, PaginationItemExtendProps {
	/**
	 * Page number this item represents
	 */
	page?: number;
	/**
	 * Whether this item is the currently active page
	 */
	active?: boolean;
	/**
	 * Click handler
	 */
	onclick?: (ev?: MouseEvent) => void;
	/**
	 * Child content
	 */
	children?: Snippet<[]>;
}

export interface PaginationEllipsisProps extends HtmlAtomProps<'span'>, PaginationEllipsisExtendProps {
	/**
	 * Custom ellipsis content snippet
	 */
	indicatorContent?: Snippet<[]>;
}

export interface PaginationPrevProps extends HtmlAtomProps<'button'>, PaginationPrevExtendProps {
	/**
	 * Whether the previous button is disabled
	 */
	disabled?: boolean;
	/**
	 * Click handler
	 */
	onclick?: (ev?: MouseEvent) => void;
	/**
	 * Custom content snippet
	 */
	indicatorContent?: Snippet<[]>;
	children?: Snippet<[]>;
}

export interface PaginationNextProps extends HtmlAtomProps<'button'>, PaginationNextExtendProps {
	/**
	 * Whether the next button is disabled
	 */
	disabled?: boolean;
	/**
	 * Click handler
	 */
	onclick?: (ev?: MouseEvent) => void;
	/**
	 * Custom content snippet
	 */
	indicatorContent?: Snippet<[]>;
	children?: Snippet<[]>;
}
