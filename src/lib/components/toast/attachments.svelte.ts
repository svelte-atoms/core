import { ToastBond } from './bond';

export function toast(callback: (node: HTMLElement, bond?: ToastBond) => any) {
	const bond = ToastBond.get();

	return (node: HTMLElement) => callback(node, bond);
}
