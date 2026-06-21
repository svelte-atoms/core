import { ComboboxBond } from './bond.svelte';

export function combobox(
	callback: (node: HTMLElement, bond?: ComboboxBond) => void | (() => void)
) {
	const bond = ComboboxBond.get();

	return (node: HTMLElement) => callback(node, bond);
}
