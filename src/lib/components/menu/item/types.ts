import type { Snippet } from 'svelte';
import type { MenuItemController } from './controller.svelte';
import type { ClassValue } from '$svelte-atoms/core/utils';
import type { Base, HtmlAtomProps, SnippetProps } from '../../atom';

// ============================================================================
// MenuItem Snippet Props (Extensible)
// ============================================================================

export interface MenuItemSnippetProps extends SnippetProps {
	menuItem: MenuItemController;
}

export type MenuItemChildren = Snippet<[MenuItemSnippetProps]>;

export interface MenuItemProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B, MenuItemChildren> {
	/**
	 * Custom CSS class(es) to apply to the menu item
	 */
	class?: ClassValue;

	/**
	 * Preset key for styling
	 * @default 'menu.item'
	 */
	preset?: string;

	/**
	 * Whether the menu item is disabled
	 */
	disabled?: boolean;

	/**
	 * Click event handler
	 */
	onclick?: (event: MouseEvent) => void;

	/**
	 * Mount lifecycle callback
	 */
	onmount?: (this: MenuItemController) => void;

	/**
	 * Destroy lifecycle callback
	 */
	ondestroy?: (this: MenuItemController) => void;

	/**
	 * Animation configuration
	 */
	animate?: (this: MenuItemController) => any;

	/**
	 * Enter animation configuration
	 */
	enter?: (this: MenuItemController) => any;

	/**
	 * Exit animation configuration
	 */
	exit?: (this: MenuItemController) => any;

	/**
	 * Initial state configuration
	 */
	initial?: (this: MenuItemController) => any;

	/**
	 * Factory function to create a custom MenuItemController instance
	 */
	factory?: () => MenuItemController;

	/**
	 * Render prop for children
	 */
}
