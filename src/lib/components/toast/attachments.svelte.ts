import { ToastBond } from './bond.svelte';

// Attachment helper: provides the nearest ToastBond to a custom node callback.
export function toast<T>(callback: (node: HTMLElement, bond: ToastBond | undefined) => T) {
	const bond = ToastBond.get();
	return (node: HTMLElement) => callback(node, bond);
}
