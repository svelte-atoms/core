import { ScrollableBond } from './bond.svelte';

export function scrollable(callback: (node: HTMLElement, bond?: ScrollableBond) => any) {
	const bond = ScrollableBond.get();
	return (node: HTMLElement) => callback(node, bond);
}
