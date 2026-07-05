import { PopoverBond } from '$ixirjs/ui/components/popover/bond.svelte';

export function input(callback: (node: HTMLElement, bond?: PopoverBond) => any) {
	const bond = PopoverBond.get();
	return (node: HTMLElement) => callback(node, bond);
}
