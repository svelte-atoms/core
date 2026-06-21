import { TabsBond } from './bond.svelte';

export function tabs(callback: (node: HTMLElement, bond?: TabsBond) => void | (() => void)) {
	const bond = TabsBond.get();
	return (node: HTMLElement) => callback(node, bond);
}
