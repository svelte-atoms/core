import type { HtmlAtomProps } from '$svelte-atoms/core/components/atom';
import type { Snippet } from 'svelte';
import type { BadgeVariantProps } from './variants';

/**
 * Extend this interface to add custom badge properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BadgeExtendProps {}

export interface BadgeProps extends HtmlAtomProps<'span'>, BadgeVariantProps, BadgeExtendProps {
	children?: Snippet<[]>;
}
