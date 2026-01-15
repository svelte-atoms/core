import type { HtmlAtomProps, Base } from '$svelte-atoms/core/components/atom';
import type { Snippet } from 'svelte';

/**
 * Extend this interface to add custom root properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface RootExtendProps {}

export interface RootProps<E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base>
	extends HtmlAtomProps<E, B>, RootExtendProps {
	/**
	 * Main content to render inside the root component.
	 */
	children?: Snippet;

	/**
	 * Custom portal configuration snippet.
	 */
	portals?: Snippet;

	/**
	 * Custom L0 portal snippet (z-10 layer for popovers).
	 */
	l0portal?: Snippet;

	/**
	 * Custom L1 portal snippet (z-12 layer).
	 */
	l1portal?: Snippet;
}
