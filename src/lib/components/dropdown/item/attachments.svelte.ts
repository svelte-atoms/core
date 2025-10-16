import type { DropdownBond } from '../bond.svelte';
import { DropdownItemBond } from './bond.svelte';

export function dropdownItem(
	callback: (node: HTMLElement, item?: DropdownItemBond, dropdown?: DropdownBond) => any
) {
	const item = DropdownItemBond.get();
	const bond = item?.dropdown;

	return (node: HTMLElement) => callback(node, item, bond);
}
