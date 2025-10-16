import { popover } from '$svelte-atoms/core/components/popover/attachments.svelte';
import { PopoverBond } from '$svelte-atoms/core/components/popover/bond.svelte';

export function menu(callback: (node: HTMLElement, bond?: PopoverBond) => any) {
	return popover(callback);
}
