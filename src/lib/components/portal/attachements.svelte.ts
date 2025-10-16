import { PortalBond } from './bond.svelte';

export function portal(callback: (node: HTMLElement, bond?: PortalBond) => any) {
	const bond = PortalBond.get();
	return (node: HTMLElement) => callback(node, bond);
}
