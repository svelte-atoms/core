import type { Snippet } from 'svelte';
import type { HtmlAtomProps } from '$svelte-atoms/core/components/atom';

/**
 * Extend this interface to add custom skeleton properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SkeletonExtendProps {}

export interface SkeletonProps extends HtmlAtomProps<'span'>, SkeletonExtendProps {
	/**
	 * Whether the skeleton is in loading state.
	 * When false, renders children instead of the skeleton.
	 * @default true
	 */
	loading?: boolean;
	/**
	 * Custom shimmer snippet — replaces the default animated shimmer layer.
	 */
	shimmerContent?: Snippet<[]>;
	/**
	 * Child content — rendered when `loading` is false.
	 */
	children?: Snippet<[]>;
}
