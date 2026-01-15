import type { Factory } from '$svelte-atoms/core/types';
import type { SidebarBond } from './bond.svelte';
import type { Base, HtmlAtomProps } from '../atom';

/**
 * Extend this interface to add custom slideover root properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SidebarRootExtendProps {}

/**
 * Extend this interface to add custom slideover content properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SidebarContentExtendProps {}

export interface SidebarRootProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
>
	extends HtmlAtomProps<E, B>, SidebarRootExtendProps {
	open?: boolean;
	disabled?: boolean;
	width?: string | number;
	factory?: Factory<SidebarBond>;
}

export interface SidebarContentProps<E extends keyof HTMLElementTagNameMap, B extends Base = Base>
	extends HtmlAtomProps<E, B>, SidebarContentExtendProps {}
