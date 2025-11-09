import type { Snippet } from 'svelte';

/**
 * Extend this interface to add custom virtual list properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface VirtualListViewportExtendProps {}

export interface VirtualListViewportProps<T> extends VirtualListViewportExtendProps {
	class?: string;
	data: T[];
	itemHeight?: number; // Optional for dynamic heights
	overscan?: number; // Buffer items to render above/below viewport
	onScroll?: (scrollTop: number) => void;
	scrollToIndex?: number; // Scroll to specific item
	header?: Snippet;
	children: Snippet<
		[
			{
				items: { index: number; data: T }[];
			}
		]
	>;
}
