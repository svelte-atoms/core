import type { Snippet } from 'svelte';
import type { Override } from '$svelte-atoms/core/types';
import type { Factory } from '$svelte-atoms/core/types';
import type { SidebarBond } from './bond.svelte';
import type { Base, HtmlAtomProps } from '../atom';

export type SlideoverRootProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> = Override<
	HtmlAtomProps<E, B>,
	{
		children?: Snippet<[{ sidebar?: SidebarBond }]>;
	}
> & {
	open?: boolean;
	disabled?: boolean;
	factory?: Factory<SidebarBond>;
};

export type SlideoverContentProps<
	E extends keyof HTMLElementTagNameMap,
	B extends Base = Base
> = Override<
	HtmlAtomProps<E, B>,
	{
		children?: Snippet<[{ sidebar?: SidebarBond<any> }]>;
	}
>;
