import type { Snippet } from 'svelte';
import type { Override } from '$svelte-atoms/core/types';
import type { Factory } from '$svelte-atoms/core/types';
import type { SidebarBond } from './bond.svelte';
import type { Base, HtmlAtomProps } from '../atom';

/**
 * Extend this interface to add custom slideover root properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SlideoverRootExtendProps {}

/**
 * Extend this interface to add custom slideover content properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SlideoverContentExtendProps {}

export interface SlideoverRootProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends Override<
			HtmlAtomProps<E, B>,
			{
				children?: Snippet<[{ sidebar?: SidebarBond }]>;
			}
		>,
		SlideoverRootExtendProps {
	open?: boolean;
	disabled?: boolean;
	factory?: Factory<SidebarBond>;
}

export interface SlideoverContentProps<E extends keyof HTMLElementTagNameMap, B extends Base = Base>
	extends Override<
			HtmlAtomProps<E, B>,
			{
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				children?: Snippet<[{ sidebar?: SidebarBond<any> }]>;
			}
		>,
		SlideoverContentExtendProps {}
