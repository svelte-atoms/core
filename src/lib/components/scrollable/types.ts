import type { Snippet } from 'svelte';
import type { HtmlAtomProps, Base } from '$svelte-atoms/core/components/atom';
import type { Factory, Override } from '$svelte-atoms/core/types';
import type { ScrollableBond } from './bond.svelte';

export interface ScrollableRootProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
>
	extends
		Override<HtmlAtomProps<E, B>, { children?: Snippet<[{ scrollable: ScrollableBond }]> }> {
	factory?: Factory<ScrollableBond>;
	scrollX?: number;
	scrollY?: number;
	scrollWidth?: number;
	scrollHeight?: number;
	clientWidth?: number;
	clientHeight?: number;
	disabled?: boolean;
	open?: boolean;
}

export interface ScrollableContainerProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
>
	extends Override<HtmlAtomProps<E, B>, { children?: Snippet }> {}

export interface ScrollableContentProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
>
	extends Override<HtmlAtomProps<E, B>, { children?: Snippet }> {}

export interface ScrollableTrackProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
>
	extends Override<HtmlAtomProps<E, B>, { children?: Snippet }> {
	orientation: 'horizontal' | 'vertical';
}

export interface ScrollableThumbProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
>
	extends Override<HtmlAtomProps<E, B>, { children?: Snippet }> {
	orientation: 'horizontal' | 'vertical';
}
