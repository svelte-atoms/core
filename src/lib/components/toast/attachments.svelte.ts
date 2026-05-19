import { ToastBond } from './bond.svelte';

/**
 * Attachment helper for accessing the nearest ToastBond inside a custom node.
 *
 * @example
 * ```svelte
 * <div {@attach toast((node, bond) => bond?.state.close())} />
 * ```
 */
export function toast<T>(callback: (node: HTMLElement, bond: ToastBond | undefined) => T) {
	const bond = ToastBond.get();
	return (node: HTMLElement) => callback(node, bond);
}
