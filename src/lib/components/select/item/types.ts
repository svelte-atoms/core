import type { Snippet } from 'svelte';
import type { DropdownMenuItemProps } from '$svelte-atoms/core/components/dropdown-menu/item/types';
import type { SelectItemController } from './controller.svelte';

export interface SelectItemProps<T = unknown>
	extends Omit<DropdownMenuItemProps, 'factory' | 'children' | 'preset'> {
	/**
	 * Preset key for styling
	 * @default 'select.item'
	 */
	preset?: string;

	/**
	 * The value of the select item
	 * @default nanoid()
	 */
	value?: string;

	/**
	 * Custom data associated with the item
	 */
	data?: T;

	/**
	 * Factory function to create a custom SelectItemController instance
	 */
	factory?: () => SelectItemController<T>;

	/**
	 * Render prop for children
	 */
	children?: Snippet<[{ selectItem: SelectItemController<T> }]>;
}
