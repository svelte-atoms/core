import type { Snippet } from 'svelte';
import type { HtmlAtomProps } from '$svelte-atoms/core/components/atom';

/**
 * Extend this interface to add custom spinner properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SpinnerExtendProps {}

export interface SpinnerProps extends HtmlAtomProps<'span'>, SpinnerExtendProps {
	/**
	 * Accessible label for screen readers
	 * @default 'Loading…'
	 */
	label?: string;
	/**
	 * Custom indicator snippet — replaces the default spinning ring.
	 */
	indicatorContent?: Snippet<[]>;
	/**
	 * Child content (e.g. loading text rendered next to the spinner)
	 */
	children?: Snippet<[]>;
}
