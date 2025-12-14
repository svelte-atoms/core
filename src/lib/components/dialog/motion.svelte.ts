import { DURATION } from '$svelte-atoms/core/shared';
import { animate } from 'motion';
import { DialogBond } from './bond.svelte';

type AnimateDialogRootParams = {
	duration?: number;
	delay?: number;
	ease?: string;
};

export function animateDialogRoot(params: AnimateDialogRootParams = {}) {
	const { duration = DURATION.fast / 1000, delay = 0, ease = 'anticipate' } = params;

	return (node: HTMLElement) => {
		const bond = DialogBond.get();
		const isOpen = bond?.state.props.open ?? false;

		if (node instanceof HTMLDialogElement) {
			node.show();
		}

		animate(
			node,
			{
				opacity: +isOpen
			},
			{
				duration,
				delay,
				ease
			}
		);
	};
}

type AnimateDialogContentParams = {
	duration?: number;
	delay?: number;
	ease?: string;
};

export function animateDialogContent(params: AnimateDialogContentParams = {}) {
	const { duration = DURATION.fast / 1000, delay = 0, ease = 'anticipate' } = params;

	const bond = DialogBond.get();

	return (node: HTMLElement) => {
		const isOpen = bond?.state.props.open ?? false;

		if (!bond?.elements.root.open) {
			if (node instanceof HTMLDialogElement) {
				node.show();
			}
		}

		animate(
			node,
			{ scale: 0.9 + 0.1 * +isOpen, opacity: +isOpen },
			{
				duration,
				easing: ease,
				delay,
				onComplete: () => {
					if (!isOpen) {
						if (node instanceof HTMLDialogElement) {
							node.close();
						}
					}
				}
			}
		);
	};
}
