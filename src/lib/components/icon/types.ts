import type { Component, Snippet } from 'svelte';
import type { HtmlAtomProps, Base } from '$svelte-atoms/core/components/atom';

/**
 * Extend this interface to add custom icon properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IconExtendProps {}

export interface IconProps<
	Src extends Component = Component,
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B>,
		IconExtendProps {
	src?: Src;
	children?: Snippet;
}
