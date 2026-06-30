import { clickAction } from '$svelte-atoms/core/attachments/event.svelte';
import { createBondAttachment } from '$svelte-atoms/core/components/internal/attachments.svelte';
import { DISCLOSURE } from '$svelte-atoms/core/shared/capability/models/disclosure.svelte';
import { SidebarBond } from './bond.svelte';

export const slideover = createBondAttachment<SidebarBond>(SidebarBond);

export function toggleSidebar(onclick?: (ev: MouseEvent) => void) {
	const bond = SidebarBond.get();
	return clickAction(() => (bond?.surface(DISCLOSURE) ?? bond)?.toggle(), onclick);
}
