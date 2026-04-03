import type { Snippet } from 'svelte';
import type { Factory } from '$svelte-atoms/core/types';
import type { SidebarBond } from './bond.svelte';
import type { Base, HtmlAtomProps } from '../atom';

export type SidebarRootProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> = Omit<HtmlAtomProps<E, B>, 'children'> & {
		open?: boolean;
		disabled?: boolean;
		width?: string | number;
		factory?: Factory<SidebarBond>;
		children?: Snippet<[{ sidebar: SidebarBond }]>;
	};

export interface SidebarContentProps<E extends keyof HTMLElementTagNameMap, B extends Base = Base>
	extends HtmlAtomProps<E, B> {}
