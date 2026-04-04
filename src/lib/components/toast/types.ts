import type { Snippet } from 'svelte';
import type { HtmlAtomProps, Base, SnippetProps } from '$svelte-atoms/core/components/atom';
import type { Override } from '$svelte-atoms/core/types';
import type { ToastBond } from './bond';
import type { ToastPosition } from './manager.svelte';

// ============================================================================
// Toast Snippet Props (Extensible)
// ============================================================================

export interface ToastSnippetProps extends SnippetProps {
	toast: ToastBond | undefined;
}

export type ToastChildren = Snippet<[ToastSnippetProps]>;

export interface ToastRootProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends Override<HtmlAtomProps<E, B, ToastChildren>, { children?: ToastChildren }> {
	dismissible?: boolean;
	/** Auto-dismiss duration in ms. Set to 0 to disable auto-dismiss. Default: 4000 */
	duration?: number;
	onclose?: () => void | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ToastTitleProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends Override<HtmlAtomProps<E, B, ToastChildren>, { children?: ToastChildren }> {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ToastDescriptionProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends Override<HtmlAtomProps<E, B, ToastChildren>, { children?: ToastChildren }> {}

export interface ToasterProps extends HtmlAtomProps<'ol'> {
	/** Position of the toast stack on screen. Default: 'bottom-right' */
	position?: ToastPosition | undefined;
	/** Gap between toasts in px. Default: 8 */
	gap?: number | undefined;
}
