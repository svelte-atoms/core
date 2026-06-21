import { ScrollableBond } from './bond.svelte';

export function scrollable(
	callback: (node: HTMLElement, bond?: ScrollableBond) => void | (() => void)
) {
	const bond = ScrollableBond.get();
	return (node: HTMLElement) => callback(node, bond);
}
