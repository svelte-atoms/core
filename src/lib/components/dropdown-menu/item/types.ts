import type { Snippet } from 'svelte';
import type { DropdownMenuItemController } from './controller.svelte';
import type { ClassValue } from '$svelte-atoms/core/utils';
import type { Base, HtmlAtomProps } from '../../atom';

export interface DropdownMenuItemProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B> {
	/**
	 * Custom CSS class(es) to apply to the menu item
	 */
	class?: ClassValue;

	/**
	 * Preset key for styling
	 * @default 'dropdown-menu.item'
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
	onmount?: (this: DropdownMenuItemController) => void;

	/**
	 * Destroy lifecycle callback
	 */
	ondestroy?: (this: DropdownMenuItemController) => void;

	/**
	 * Animation configuration
	 */
	animate?: (this: DropdownMenuItemController) => any;

	/**
	 * Enter animation configuration
	 */
	enter?: (this: DropdownMenuItemController) => any;

	/**
	 * Exit animation configuration
	 */
	exit?: (this: DropdownMenuItemController) => any;

	/**
	 * Initial state configuration
	 */
	initial?: (this: DropdownMenuItemController) => any;

	/**
	 * Factory function to create a custom DropdownMenuItemController instance
	 */
	factory?: () => DropdownMenuItemController;

	/**
	 * Render prop for children
	 */
	children?: Snippet<[{ menuItem: DropdownMenuItemController }]>;
}
