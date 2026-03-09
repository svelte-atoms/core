import type { Snippet } from 'svelte';
import type { HtmlAtomProps } from '$svelte-atoms/core/components/atom';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TimelineRootExtendProps {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TimelineItemExtendProps {}

export type TimelineOrientation = 'vertical' | 'horizontal';
export type TimelineAlign = 'left' | 'right' | 'alternate';

export interface TimelineRootProps extends HtmlAtomProps<'ol'>, TimelineRootExtendProps {
	/**
	 * Layout direction — default 'vertical'
	 */
	orientation?: TimelineOrientation;
	/**
	 * Content alignment (vertical only) — default 'left'
	 * - 'left'      content always on the right of the line
	 * - 'right'     content always on the left of the line
	 * - 'alternate' odd items left, even items right
	 */
	align?: TimelineAlign;
	children?: Snippet<[]>;
}

export interface TimelineItemProps extends HtmlAtomProps<'li'>, TimelineItemExtendProps {
	/** Marks this item as completed */
	completed?: boolean;
	/** Marks this item as active/current */
	active?: boolean;
	/** Custom dot/icon snippet — receives { completed, active } */
	dotContent?: Snippet<[{ completed: boolean; active: boolean }]>;
	/** Content to the left of the line (only used in alternate/right align) */
	oppositeContent?: Snippet<[]>;
	children?: Snippet<[]>;
}
