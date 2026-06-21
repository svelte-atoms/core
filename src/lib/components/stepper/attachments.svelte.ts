import { StepperBond } from './bond.svelte';

export function stepper(callback: (node: HTMLElement, bond?: StepperBond) => void | (() => void)) {
	const bond = StepperBond.get();
	return (node: HTMLElement) => callback(node, bond);
}
