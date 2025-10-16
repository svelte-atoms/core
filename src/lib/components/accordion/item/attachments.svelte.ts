import type { AccordionBond } from '../bond.svelte';
import { AccordionItemBond } from './bond.svelte';

export function accordionItem(
	callback: (node: HTMLElement, item?: AccordionItemBond, accordion?: AccordionBond) => any
) {
	const item = AccordionItemBond.get();
	const accordion = item?.accordion;

	return (node: HTMLElement) => callback(node, item, accordion);
}
