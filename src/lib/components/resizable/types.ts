import type { Snippet } from 'svelte';
import type { HtmlAtomProps } from '$svelte-atoms/core/components/atom';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ResizableRootExtendProps {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ResizablePanelExtendProps {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ResizableHandleExtendProps {}

export type ResizableDirection = 'horizontal' | 'vertical';

export interface ResizableRootProps extends HtmlAtomProps<'div'>, ResizableRootExtendProps {
	/**
	 * Split direction — default 'horizontal'
	 */
	direction?: ResizableDirection;
	children?: Snippet<[]>;
}

export interface ResizablePanelProps extends HtmlAtomProps<'div'>, ResizablePanelExtendProps {
	/**
	 * Initial size as a percentage of the container — default 50
	 */
	defaultSize?: number;
	/**
	 * Minimum size in percentage — default 10
	 */
	minSize?: number;
	/**
	 * Maximum size in percentage — default 90
	 */
	maxSize?: number;
	children?: Snippet<[]>;
}

export interface ResizableHandleProps extends HtmlAtomProps<'div'>, ResizableHandleExtendProps {
	/**
	 * Custom drag handle content snippet
	 */
	handleContent?: Snippet<[]>;
}
