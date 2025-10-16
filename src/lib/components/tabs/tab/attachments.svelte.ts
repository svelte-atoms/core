import { TabsBond } from '../bond.svelte';
import type { TabBond } from './bond.svelte';

export function tab(callback: (node: HTMLElement, tab?: TabBond, tabs?: TabsBond) => any) {
	const bond = TabsBond.get();
	const tabs = bond.tabs;

	return (node: HTMLElement) => callback(node, bond, tabs);
}
