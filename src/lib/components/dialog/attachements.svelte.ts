import { DialogBond } from './bond.svelte';

export function dialog(callback: (node: HTMLElement, bond?: DialogBond) => any) {
	const bond = DialogBond.get();

	return (node: HTMLElement) => callback(node, bond);
}

export function closeDialog() {
	const atom = DialogBond.get();

	return (node: HTMLElement) => {};
}
