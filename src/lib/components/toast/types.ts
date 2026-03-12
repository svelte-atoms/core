import type { Snippet } from 'svelte';
import type { HtmlAtomProps, Base } from '$svelte-atoms/core/components/atom';
import type { Override } from '$svelte-atoms/core/types';
import type { ToastBond } from './bond';
import type { ToastPosition } from './manager.svelte';

/**
 * Extend this interface to add custom toast root properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ToastRootExtendProps {}

/**
 * Extend this interface to add custom toast title properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ToastTitleExtendProps {}

/**
 * Extend this interface to add custom toast description properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ToastDescriptionExtendProps {}

/**
 * Extend this interface to add custom toaster properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ToasterExtendProps {}

export interface ToastRootProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
>
	extends
		Override<HtmlAtomProps<E, B>, { children?: Snippet<[{ toast?: ToastBond }]> }>,
		ToastRootExtendProps {
	dismissible?: boolean;
	/** Auto-dismiss duration in ms. Set to 0 to disable auto-dismiss. Default: 4000 */
	duration?: number;
	onclose?: () => void | undefined;
}

export interface ToastTitleProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
>
	extends
		Override<HtmlAtomProps<E, B>, { children?: Snippet<[{ toast: ToastBond }]> }>,
		ToastTitleExtendProps {}

export interface ToastDescriptionProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
>
	extends
		Override<HtmlAtomProps<E, B>, { children?: Snippet<[{ toast?: ToastBond }]> }>,
		ToastDescriptionExtendProps {}

export interface ToasterProps extends HtmlAtomProps<'ol'>, ToasterExtendProps {
	/** Position of the toast stack on screen. Default: 'bottom-right' */
	position?: ToastPosition | undefined;
	/** Gap between toasts in px. Default: 8 */
	gap?: number | undefined;
}

