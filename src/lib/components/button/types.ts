import type { HtmlAtomProps } from '$svelte-atoms/core/components/atom/types';
import type { Snippet } from 'svelte';
import type { ButtonVariantProps } from './variants';

/**
 * Extend this interface to add custom button properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ButtonExtendProps {}

export interface ButtonProps extends HtmlAtomProps<'button'>, ButtonVariantProps, ButtonExtendProps {
	type?: 'button' | 'submit' | 'reset';
	children?: Snippet<[]>;
}
