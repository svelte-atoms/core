import type { Snippet } from 'svelte';
import type { HtmlAtomProps } from '$svelte-atoms/core/components/atom';

/**
 * Extend this interface to add custom skeleton root properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SkeletonRootExtendProps {}

/**
 * Extend this interface to add custom skeleton block properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SkeletonBlockExtendProps {}

export interface SkeletonRootProps extends HtmlAtomProps<'div'>, SkeletonRootExtendProps {
	/**
	 * Whether the skeleton is in loading state.
	 * When true renders the `skeleton` snippet; when false renders `children`.
	 * @default true
	 */
	loading?: boolean;
	/**
	 * The skeleton layout to show while loading.
	 * Build it freely using Skeleton.Block.
	 */
	skeleton?: Snippet<[]>;
	/**
	 * Real content — rendered when `loading` is false.
	 */
	children?: Snippet<[]>;
}

export interface SkeletonBlockProps extends HtmlAtomProps<'span'>, SkeletonBlockExtendProps {
	/**
	 * Custom shimmer snippet — replaces the default animated shimmer layer.
	 */
	shimmerContent?: Snippet<[]>;
}
