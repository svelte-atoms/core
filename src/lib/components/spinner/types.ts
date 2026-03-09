import type { Snippet } from 'svelte';
import type { HtmlAtomProps } from '$svelte-atoms/core/components/atom';

/**
 * Extend this interface to add custom spinner properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SpinnerExtendProps {}

export interface SpinnerProps extends HtmlAtomProps<'span'>, SpinnerExtendProps {
	/**
	 * Visual variant of the spinner
	 * @default 'ring'
	 */
	variant?: 'ring' | 'dots' | 'bars' | 'pulse';
	/**
	 * Size of the spinner
	 * @default 'md'
	 */
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	/**
	 * Accessible label for screen readers
	 * @default 'Loading…'
	 */
	label?: string;
	/**
	 * Custom indicator snippet — replaces the entire animated indicator.
	 * Receives `{ variant, size }`.
	 */
	indicatorContent?: Snippet<[{ variant: string; size: string }]>;
	/**
	 * Child content (e.g. loading text rendered next to the spinner)
	 */
	children?: Snippet<[]>;
}
