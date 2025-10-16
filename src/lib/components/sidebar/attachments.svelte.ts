import { SidebarBond } from './bond.svelte';

export function slideover(callback: (node: HTMLElement, bond?: SidebarBond) => any) {
	const bond = SidebarBond.get();
	return (node: HTMLElement) => callback(node, bond);
}

export function toggleSidebar(onclick?: (ev: MouseEvent) => any) {
	const atom = SidebarBond.get();

	return (node: HTMLElement) => {
		const _onclick = (ev: MouseEvent) => {
			onclick?.(ev);

			if (ev.defaultPrevented) {
				return;
			}

			atom?.state.toggle();
		};

		node.addEventListener('click', _onclick);

		return () => {
			node.removeEventListener('click', _onclick);
		};
	};
}
