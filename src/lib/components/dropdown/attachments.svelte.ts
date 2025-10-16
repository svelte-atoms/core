import { DropdownBond } from './bond.svelte';

export function dropdown(callback: (node: HTMLElement, bond?: DropdownBond) => any) {
	const bond = DropdownBond.get();

	return (node: HTMLElement) => callback(node, bond);
}
