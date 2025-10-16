import { CardBond } from './bond.svelte';

export function card(callback: (node: HTMLElement, bond?: CardBond) => any) {
	const bond = CardBond.get();

	return (node: HTMLElement) => callback(node, bond);
}
