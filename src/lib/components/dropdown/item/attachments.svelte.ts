import type { DropdownBond } from '../bond.svelte';
import { DropdownItemController } from './controller.svelte';

export function dropdownItem(
	callback: (node: HTMLElement, item?: DropdownItemController, dropdown?: DropdownBond) => any
) {
	const item = DropdownItemController.get();
	const bond = item?.dropdown;

	return (node: HTMLElement) => callback(node, item, bond);
}
