import { PopoverBond } from '$svelte-atoms/core/components/popover/bond.svelte';

export function tooltip(callback: (node: HTMLElement, tab?: PopoverBond) => void | (() => void)) {
	const bond = PopoverBond.get();

	return (node: HTMLElement) => callback(node, bond);
}
