import type { Snippet } from 'svelte';
import type { MenuItemController } from './controller.svelte';
import type { ClassValue } from '$svelte-atoms/core/utils';
import type { Base, HtmlAtomProps } from '../../atom';

/**
 * Extend this interface to add custom menu list properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface MenuItemExtendProps {}

export interface MenuItemProps<E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base>
	extends HtmlAtomProps<E, B>, MenuItemExtendProps {
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
	children?: Snippet<[{ menuItem: MenuItemController }]>;
}
