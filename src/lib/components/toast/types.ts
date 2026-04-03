import type { Snippet } from 'svelte';
import type { HtmlAtomProps, Base } from '$svelte-atoms/core/components/atom';
import type { Override } from '$svelte-atoms/core/types';
import type { ToastBond } from './bond';
import type { ToastPosition } from './manager.svelte';

export interface ToastRootProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
>
	extends
		Override<HtmlAtomProps<E, B>, { children?: Snippet<[{ toast?: ToastBond }]> }> {
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
		Override<HtmlAtomProps<E, B>, { children?: Snippet<[{ toast: ToastBond }]> }> {}

export interface ToastDescriptionProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
>
	extends
		Override<HtmlAtomProps<E, B>, { children?: Snippet<[{ toast?: ToastBond }]> }> {}

export interface ToasterProps extends HtmlAtomProps<'ol'> {
	/** Position of the toast stack on screen. Default: 'bottom-right' */
	position?: ToastPosition | undefined;
	/** Gap between toasts in px. Default: 8 */
	gap?: number | undefined;
}

