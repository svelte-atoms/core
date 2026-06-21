import { DataGridBond } from './bond.svelte';

export function datagrid(
	callback: (node: HTMLElement, bond?: DataGridBond) => void | (() => void)
) {
	const bond = DataGridBond.get();

	return (node: HTMLElement) => callback(node, bond);
}
