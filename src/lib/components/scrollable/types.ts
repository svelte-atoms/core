import type { Snippet } from 'svelte';
import type { HtmlAtomProps, Base, SnippetProps } from '$svelte-atoms/core/components/atom';
import type { Factory, Override } from '$svelte-atoms/core/types';
import type { ScrollableBond } from './bond.svelte';

// ============================================================================
// Scrollable Snippet Props (Extensible)
// ============================================================================

export interface ScrollableSnippetProps extends SnippetProps {
	scrollable: ScrollableBond;
}

export type ScrollableChildren = Snippet<[ScrollableSnippetProps]>;

export interface ScrollableRootProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends Override<HtmlAtomProps<E, B, ScrollableChildren>, { children?: ScrollableChildren }> {
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

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ScrollableContainerProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends Override<HtmlAtomProps<E, B, ScrollableChildren>, { children?: Snippet }> {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ScrollableContentProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends Override<HtmlAtomProps<E, B, ScrollableChildren>, { children?: Snippet }> {}

export interface ScrollableTrackProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends Override<HtmlAtomProps<E, B, ScrollableChildren>, { children?: Snippet }> {
	orientation: 'horizontal' | 'vertical';
}

export interface ScrollableThumbProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends Override<HtmlAtomProps<E, B, ScrollableChildren>, { children?: Snippet }> {
	orientation: 'horizontal' | 'vertical';
}
