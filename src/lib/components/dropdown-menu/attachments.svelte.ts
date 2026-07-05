import { popover } from '$ixirjs/ui/components/popover/attachments.svelte';
import { PopoverBond } from '$ixirjs/ui/components/popover/bond.svelte';

export function dropdownMenu(callback: (node: HTMLElement, bond?: PopoverBond) => any) {
	return popover(callback);
}
