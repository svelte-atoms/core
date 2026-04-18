import type { Snippet } from 'svelte';
import type { Factory } from '$svelte-atoms/core/types';
import type { SidebarBond } from './bond.svelte';
import type { Base, HtmlAtomProps, SnippetProps } from '../atom';

// ============================================================================
// Sidebar Snippet Props (Extensible)
// ============================================================================

export interface SidebarSnippetProps extends SnippetProps {
	sidebar: SidebarBond;
}

export type SidebarChildren = Snippet<[SidebarSnippetProps]>;

export type SidebarRootProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> = HtmlAtomProps<E, B, SidebarChildren> & {
	"z-index"?: number;
	open?: boolean;
	disabled?: boolean;
	width?: string | number;
	factory?: (props: any) => SidebarBond;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SidebarContentProps<
	E extends keyof HTMLElementTagNameMap,
	B extends Base = Base
> extends HtmlAtomProps<E, B, SidebarChildren> {}
