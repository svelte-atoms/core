import { LayerBond } from './bond.svelte';

export function layer(callback: (node: HTMLElement, bond?: LayerBond) => any) {
	const bond = LayerBond.get();
	return (node: HTMLElement) => callback(node, bond);
}
