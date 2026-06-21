import { PopoverBond } from '$svelte-atoms/core/components/popover/bond.svelte';

export function input(callback: (node: HTMLElement, bond?: PopoverBond) => void | (() => void)) {
	const bond = PopoverBond.get();
	return (node: HTMLElement) => callback(node, bond);
}
