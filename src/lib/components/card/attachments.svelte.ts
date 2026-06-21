import { CardBond } from './bond.svelte';

export function card(callback: (node: HTMLElement, bond?: CardBond) => void | (() => void)) {
	const bond = CardBond.get();

	return (node: HTMLElement) => callback(node, bond);
}
