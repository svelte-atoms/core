import { clickAction } from '$svelte-atoms/core/attachments/event.svelte';
import { DISCLOSURE } from '$svelte-atoms/core/shared/capability/models/disclosure.svelte';
import { DialogBond } from './bond.svelte';

export function dialog(callback: (node: HTMLElement, bond?: DialogBond) => void | (() => void)) {
	const bond = DialogBond.get();

	return (node: HTMLElement) => callback(node, bond);
}

// Attachment: close the dialog on click (unless the handler preventDefaults). Mirrors closeDrawer.
export function closeDialog(onclick?: (ev: MouseEvent) => void) {
	const bond = DialogBond.get();
	return clickAction(() => (bond?.surface(DISCLOSURE) ?? bond)?.close(), onclick);
}
