import { clickout } from '$svelte-atoms/core/attachments/clickout.svelte';
import { clickAction } from '$svelte-atoms/core/attachments/event.svelte';
import { createBondAttachment } from '$svelte-atoms/core/components/internal/attachments.svelte';
import { DISCLOSURE } from '$svelte-atoms/core/shared/capability/models/disclosure.svelte';
import { containsTarget } from '$svelte-atoms/core/utils/dom.svelte';
import { DrawerBond } from './bond.svelte';

export const drawer = createBondAttachment<DrawerBond>(DrawerBond);

export function toggleDrawer(onclick?: (ev: MouseEvent) => void) {
	const bond = DrawerBond.get();
	return clickAction(() => (bond?.surface(DISCLOSURE) ?? bond)?.toggle(), onclick);
}

export function openDrawer(onclick?: (ev: MouseEvent) => void) {
	const bond = DrawerBond.get();
	return clickAction(() => (bond?.surface(DISCLOSURE) ?? bond)?.open(), onclick);
}

export function closeDrawer(onclick?: (ev: MouseEvent) => void) {
	const bond = DrawerBond.get();
	return clickAction(() => (bond?.surface(DISCLOSURE) ?? bond)?.close(), onclick);
}

export function clickoutDrawer(onclickout?: (ev: PointerEvent, bond?: DrawerBond) => void) {
	const bond = DrawerBond.get();

	return clickout(
		(ev: PointerEvent) => {
			if (!bond) return;

			if (!bond.props.open) {
				return;
			}

			if (containsTarget(bond.elements.content, ev.target)) {
				return;
			}

			onclickout?.(ev, bond);

			if (ev.defaultPrevented) {
				return;
			}

			bond.close();
		},
		{
			capture: true,
			passive: true
		}
	);
}
