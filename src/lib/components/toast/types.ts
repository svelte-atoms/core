import type { Snippet } from 'svelte';
import type { HtmlAtomProps, Base } from '$svelte-atoms/core/components/atom';
import type { Override } from '$svelte-atoms/core/types';
import type { ToastBond } from './bond';

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

export interface ToastRootProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
>
	extends
		Override<HtmlAtomProps<E, B>, { children?: Snippet<[{ toast?: ToastBond }]> }>,
		ToastRootExtendProps {
	dismissible?: boolean;
	duration?: number;
	onclose?: () => void;
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
