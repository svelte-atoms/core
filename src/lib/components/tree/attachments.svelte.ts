import { TreeBond } from './bond.svelte';

export function tree(callback: (node: HTMLElement, bond?: TreeBond) => any) {
	const bond = TreeBond.get();

	return (node: HTMLElement) => callback(node, bond);
}
