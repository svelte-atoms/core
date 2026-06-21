import { AccordionBond } from './bond.svelte';

export function accordion(
	callback: (node: HTMLElement, bond?: AccordionBond) => void | (() => void)
) {
	const bond = AccordionBond.get();

	return (node: HTMLElement) => callback(node, bond);
}
