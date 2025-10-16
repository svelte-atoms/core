import { AlertBond } from './bond.svelte';

export function alert(callback: (node: HTMLElement, bond?: AlertBond) => any) {
	const bond = AlertBond.get();

	return (node: HTMLElement) => callback(node, bond);
}
