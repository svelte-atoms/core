import { SelectBond } from './bond.svelte';

export function select(callback: (node: HTMLElement, bond?: SelectBond) => void | (() => void)) {
	const bond = SelectBond.get();

	return (node: HTMLElement) => callback(node, bond as SelectBond);
}
