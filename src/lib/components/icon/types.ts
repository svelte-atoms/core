import type { Component, Snippet } from 'svelte';
import type { HtmlAtomProps, Base } from '$svelte-atoms/core/components/atom';

export interface IconProps<
	Src extends Component = Component,
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
>
	extends HtmlAtomProps<E, B> {
	src?: Src;
	children?: Snippet;
}
