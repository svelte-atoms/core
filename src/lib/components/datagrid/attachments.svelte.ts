import { DataGridBond } from './bond.svelte';

export function datagrid(callback: (node: HTMLElement, bond?: DataGridBond) => any) {
	const bond = DataGridBond.get();

	return (node: HTMLElement) => callback(node, bond);
}
