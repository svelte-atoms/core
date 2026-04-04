import type { HtmlAtomProps, Base, SnippetProps } from '$svelte-atoms/core/components/atom';
import type { Snippet } from 'svelte';

// ============================================================================
// Root Snippet Props (Extensible)
// ============================================================================

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface RootSnippetProps extends SnippetProps {}

export type RootChildren = Snippet<[RootSnippetProps]>;

export interface RootProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B, RootChildren> {
	/**
	 * Main content to render inside the root component.
	 */

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
