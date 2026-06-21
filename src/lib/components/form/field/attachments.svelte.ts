import { FieldBond } from './bond.svelte';

export function field(callback: (node: HTMLElement, bond?: FieldBond) => void | (() => void)) {
	const bond = FieldBond.get();
	return (node: HTMLElement) => callback(node, bond);
}
