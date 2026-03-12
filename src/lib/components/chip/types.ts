import type { HtmlAtomProps } from '$svelte-atoms/core/components/atom/types';
import type { Snippet } from 'svelte';

/**
 * Extend this interface to add custom chip properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ChipExtendProps {}

/**
 * Extend this interface to add custom chip close button properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ChipCloseButtonExtendProps {}

export interface ChipProps extends HtmlAtomProps<'div'>, ChipExtendProps {
	children?: Snippet<[]>;
	/** Custom icon rendered inside the default close button */
	icon?: Snippet<[]> | undefined;
	/** Fully replace the close button with a custom snippet */
	closeButton?: Snippet<[]> | undefined;
	/** Called when the default close button is clicked */
	onclose?: ((ev: MouseEvent) => void) | undefined;
}

export interface ChipCloseButtonProps extends HtmlAtomProps<'button'>, ChipCloseButtonExtendProps {
	/** Custom icon to render inside the close button */
	icon?: Snippet<[]> | undefined;
	onclick?: ((ev: MouseEvent) => void) | undefined;
}
