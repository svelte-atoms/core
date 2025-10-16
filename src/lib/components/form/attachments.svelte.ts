import { FormBond } from './bond.svelte';

export function form(callback: (node: HTMLElement, bond?: FormBond) => any) {
	const bond = FormBond.get();
	return (node: HTMLElement) => callback(node, bond);
}
