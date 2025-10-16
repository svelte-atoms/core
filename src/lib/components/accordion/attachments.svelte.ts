import { AccordionBond } from './bond.svelte';

export function accordion(callback: (node: HTMLElement, bond?: AccordionBond) => any) {
	const bond = AccordionBond.get();

	return (node: HTMLElement) => callback(node, bond);
}
