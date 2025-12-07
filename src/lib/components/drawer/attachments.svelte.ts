import { on } from '$svelte-atoms/core/attachments/event.svelte';
import { clickout } from '$svelte-atoms/core/attachments/clickout.svelte';
import { DrawerBond } from './bond.svelte';

export function drawer(callback: (node: HTMLElement, bond?: DrawerBond) => any) {
	const bond = DrawerBond.get();
	return (node: HTMLElement) => callback(node, bond);
}

export function toggleDrawer(onclick?: (ev: MouseEvent) => void) {
	const bond = DrawerBond.get();

	return (node: HTMLElement) => {
		const clickHandler = (ev: MouseEvent) => {
			onclick?.(ev, bond);

			if (ev.defaultPrevented) {
				return;
			}

			bond?.state.toggle();
		};

		node.addEventListener('click', clickHandler);

		return () => {
			node.removeEventListener('click', clickHandler);
		};
	};
}

export function openDrawer(onclick?: (ev: MouseEvent) => void) {
	const bond = DrawerBond.get();

	return (node: HTMLElement) => {
		const clickHandler = (ev: MouseEvent) => {
			onclick?.(ev);

			if (ev.defaultPrevented) {
				return;
			}

			bond?.state.open();
		};

		node.addEventListener('click', clickHandler);

		return () => {
			node.removeEventListener('click', clickHandler);
		};
	};
}

export function closeDrawer(onclick?: (ev: MouseEvent) => void) {
	const bond = DrawerBond.get();

	return (node: HTMLElement) => {
		if (!bond) {
			return;
		}
		const clickHandler = (ev: MouseEvent) => {
			onclick?.(ev);

			if (ev.defaultPrevented) {
				return;
			}

			bond?.state.open();
		};

		node.addEventListener('click', clickHandler);

		return () => {
			node.removeEventListener('click', clickHandler);
		};
	};
}

export function clickoutDrawer(onclickout?: (ev: PointerEvent) => void) {
	const bond = DrawerBond.get();

	return clickout(
		(ev: PointerEvent) => {
			if (!bond) return;

			if (!bond.state.props.open) {
				return;
			}

			const target = ev.target as Element;

			if (bond.elements.content?.contains(target)) {
				return;
			}

			console.log('clickoutDrawer invoked', bond.state.props.open);

			onclickout?.(ev);

			if (ev.defaultPrevented) {
				return;
			}

			bond.state.close();
		},
		{
			capture: true,
			passive: true
		}
	);
}
