import { FieldBond } from './bond.svelte';

export function field(callback: (node: HTMLElement, bond?: FieldBond) => any) {
	const bond = FieldBond.get();
	return (node: HTMLElement) => callback(node, bond);
}
