import { DURATION } from '$svelte-atoms/core/shared';
import { animate } from 'motion';
import { DialogBond } from './bond.svelte';
import { promiseWithResolvers } from '$svelte-atoms/core/utils/promise.svelte';

type AnimateDialogRootParams = {
	duration?: number;
	delay?: number;
	ease?: string;
};

export function animateDialogRoot(params: AnimateDialogRootParams = {}) {
	const { duration = DURATION.smooth / 1000, delay = 0, ease = 'anticipate' } = params;

	return (node: HTMLElement) => {
		const bond = DialogBond.get();
		const isOpen = bond?.state.props.open ?? false;

		if (node instanceof HTMLDialogElement) {
			node.show();
		}

		const promise = bond?.animationPromises.content;

		if (!isOpen && promise) {
			promise.then(({ duration: dr = 0, delay: dl = 0 }) => {
				animate(
					node,
					{
						opacity: +isOpen
					},
					{
						duration,
						delay:
							duration + delay < dr + dl ? delay + Math.abs(dr + dl - (duration + delay)) : delay,
						ease
					}
				);
			});
		} else {
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
		}
	};
}

type AnimateDialogContentParams = {
	duration?: number;
	delay?: number;
	ease?: string;
};

export function animateDialogContent(params: AnimateDialogContentParams = {}) {
	const { duration = DURATION.normal / 1000, delay = 0, ease = 'anticipate' } = params;

	const bond = DialogBond.get();

	return (node: HTMLElement) => {
		const { resolve, promise } = promiseWithResolvers<{
			duration: number;
			delay: number;
			controller?: any;
		}>();

		if (bond) {
			bond.animationPromises.content = promise;
		}

		const isOpen = bond?.state.props.open ?? false;

		if (!bond?.elements.root) {
			if (bond?.elements.root instanceof HTMLDialogElement) {
				bond?.elements.root.show();
			}
		}

		const triggerElement = bond?.elements.trigger;

		if (triggerElement) {
			node.style.transform = '';

			const triggerRect = triggerElement.getBoundingClientRect();
			const nodeRect = node.getBoundingClientRect();

			const scaleX = triggerRect.width / nodeRect.width;
			const scaleY = triggerRect.height / nodeRect.height;

			const x = triggerRect.x - nodeRect.x;
			const y = triggerRect.y - nodeRect.y;

			const transformOriginX = triggerRect.x < nodeRect.x + nodeRect.width / 2 ? 'left' : 'right';

			node.style.transformOrigin = `${transformOriginX} top`;

			const c = animate(
				node,
				{
					scaleX: isOpen ? [scaleX, 1] : [1, scaleX],
					scaleY: isOpen ? [scaleY, 1] : [1, scaleY],
					translateX: isOpen ? [`${x}px`, '0px'] : ['0px', `${x}px`],
					translateY: isOpen ? [`${y}px`, '0px'] : ['0px', `${y}px`],
					opacity: +isOpen
				},
				{
					duration,
					easing: ease,
					delay
				}
			);

			resolve({ duration, delay, controller: c });
		} else {
			animate(
				node,
				{ scale: 0.9 + 0.1 * +isOpen, opacity: +isOpen },
				{
					duration,
					easing: ease,
					delay
				}
			);
		}
	};
}
