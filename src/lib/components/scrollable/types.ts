import type { Snippet } from 'svelte';
import type { HtmlAtomProps, Base } from '$svelte-atoms/core/components/atom';
import type { Factory, Override } from '$svelte-atoms/core/types';
import type { ScrollableBond } from './bond.svelte';

/**
 * Extend this interface to add custom scrollable root properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ScrollableExtendProps {}

/**
 * Extend this interface to add custom scrollable container properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ScrollableContainerExtendProps {}

/**
 * Extend this interface to add custom scrollable content properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ScrollableContentExtendProps {}

/**
 * Extend this interface to add custom scrollable track properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ScrollableTrackExtendProps {}

/**
 * Extend this interface to add custom scrollable thumb properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ScrollableThumbExtendProps {}

export interface ScrollableRootProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends Override<HtmlAtomProps<E, B>, { children?: Snippet<[{ scrollable: ScrollableBond }]> }>,
		ScrollableExtendProps {
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
> extends Override<HtmlAtomProps<E, B>, { children?: Snippet }>,
		ScrollableContainerExtendProps {}

export interface ScrollableContentProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends Override<HtmlAtomProps<E, B>, { children?: Snippet }>,
		ScrollableContentExtendProps {}

export interface ScrollableTrackProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends Override<HtmlAtomProps<E, B>, { children?: Snippet }>,
		ScrollableTrackExtendProps {
	orientation: 'horizontal' | 'vertical';
}

export interface ScrollableThumbProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends Override<HtmlAtomProps<E, B>, { children?: Snippet }>,
		ScrollableThumbExtendProps {
	orientation: 'horizontal' | 'vertical';
}
