import type { Snippet } from 'svelte';
import type { HtmlAtomProps } from '$svelte-atoms/core/components/atom';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BannerRootExtendProps {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BannerActionsExtendProps {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BannerCloseExtendProps {}

export type BannerPosition = 'top' | 'bottom' | 'inline';

export interface BannerRootProps extends HtmlAtomProps<'div'>, BannerRootExtendProps {
	/**
	 * Where to render the banner
	 * - 'top'    sticky below nothing, fixed to top of viewport
	 * - 'bottom' fixed to bottom of viewport
	 * - 'inline' flow layout — no fixed/sticky positioning
	 * @default 'top'
	 */
	position?: BannerPosition;
	/**
	 * Whether the banner is visible (bindable)
	 * @default true
	 */
	open?: boolean;
	/**
	 * Show a close button
	 * @default true
	 */
	dismissible?: boolean;
	/**
	 * Called when banner is dismissed
	 */
	ondismiss?: () => void;
	children?: Snippet<[{ dismiss: () => void }]>;
}

export interface BannerActionsProps extends HtmlAtomProps<'div'>, BannerActionsExtendProps {
	children?: Snippet<[]>;
}

export interface BannerCloseProps extends HtmlAtomProps<'button'>, BannerCloseExtendProps {
	children?: Snippet<[]>;
}
