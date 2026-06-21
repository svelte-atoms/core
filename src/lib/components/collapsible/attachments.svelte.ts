import { CollapsibleBond } from './bond.svelte';

export function collapsible(
	callback: (node: HTMLElement, bond?: CollapsibleBond) => void | (() => void)
) {
	const bond = CollapsibleBond.get();

	return (node: HTMLElement) => callback(node, bond);
}
