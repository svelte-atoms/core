import type { Snippet } from 'svelte';

export interface VirtualListViewportProps<T> {
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
