import type { Snippet } from 'svelte';
import type { MenuItemProps } from '$svelte-atoms/core/components/menu/item/types';
import type { DropdownItemController } from './controller.svelte';

export interface DropdownItemProps<T = unknown> extends Omit<
	MenuItemProps,
	'factory' | 'children' | 'preset'
> {
	/**
	 * Preset key for styling
	 * @default 'dropdown.item'
	 */
	preset?: string;

	/**
	 * The value of the dropdown item
	 * @default nanoid()
	 */
	value?: string;

	/**
	 * Custom data associated with the item
	 */
	data?: T;

	/**
	 * Factory function to create a custom DropdownItemController instance
	 */
	factory?: () => DropdownItemController<T>;

	/**
	 * Render prop for children
	 */
	children?: Snippet<[{ dropdownItem: DropdownItemController<T> }]>;
}
