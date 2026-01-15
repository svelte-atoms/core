import { StepBond } from './bond.svelte';

export function step(callback: (node: HTMLElement, bond?: StepBond) => any) {
	const bond = StepBond.get();
	return (node: HTMLElement) => callback(node, bond);
}
