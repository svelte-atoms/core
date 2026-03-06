import { animate, circOut } from 'motion';
import { untrack } from 'svelte';
import { PopoverBond } from '.';
import { DURATION } from '$svelte-atoms/core/shared';
import { is } from 'date-fns/locale';

export type AnimatePopoverContentParams = {
	duration?: number;
	delay?: number;
	ease?: string;
};

export function animatePopoverContent(params: AnimatePopoverContentParams = {}) {
	let prevX: number | undefined;
	let prevY: number | undefined;
	let prevOpen: boolean | undefined;

	let isDirty = false;

	return (node: HTMLElement) => {
		const bond = PopoverBond.get();

		const { duration = DURATION.fast / 1000, delay = 0, ease = circOut } = params;

		const isOpen = bond?.state.props.open ?? false;

		// Track only x and y reactively; read the rest without registering dependencies
		const posX = bond.state.position?.x ?? 0;
		const posY = bond.state.position?.y ?? 0;
		const position = untrack(() => bond.state.position);

		if (!position) {
			return;
		}

		// Skip animation if neither open state nor x/y position actually changed
		if (posX === prevX && posY === prevY && isOpen === prevOpen) {
			return;
		}

		prevX = posX;
		prevY = posY;
		prevOpen = isOpen;

		node.style.transform = '';

		const triggerElement = bond.elements.trigger;

		if (!triggerElement) {
			return;
		}

		const triggerRect = triggerElement.getBoundingClientRect();
		const nodeRect = node.getBoundingClientRect();

		const scaleX = triggerRect.width / nodeRect.width;
		const scaleY = triggerRect.height / nodeRect.height;

		const x = triggerRect.x - nodeRect.x;
		const y = triggerRect.y - nodeRect.y;

		const placement = position.placement;

		const dy = placement?.startsWith('top') ? -1 : placement?.startsWith('bottom') ? 1 : 0;
		const dx = placement?.startsWith('left') ? -1 : placement?.startsWith('right') ? 1 : 0;

		const openAsNumber = +isOpen;

		// const transformOriginX = dx >= 0 ? 'left' : 'right';

		const transformOriginY = dy >= 0 ? 'top' : 'bottom';
		const transformOriginX = dx === 0 || scaleX === 1 ? 'center' : dx > 0 ? 'left' : 'right';

		node.style.transformOrigin = `${transformOriginX} ${transformOriginY}`;
		node.style.pointerEvents = 'none';

		let c;
		if (!isDirty) {
			c = animate(
				node,
				{
					scaleX: [0, +isOpen],
					scaleY: [0, +isOpen],
					translateX: ['0px', `${x}px`],
					translateY: ['0px', `${y}px`],
					opacity: openAsNumber
				},
				{
					duration: 0
				}
			);
		} else {
			c = animate(
				node,
				{
					scaleX: +isOpen,
					scaleY: isOpen ? 1 : scaleY,
					translateX: isOpen ? '0px' : `${x}px`,
					translateY: isOpen ? '0px' : `${y}px`,
					opacity: openAsNumber
				},
				{
					duration,
					easing: ease,
					delay
				}
			);
		}

		c.then(() => {
			node.style.pointerEvents = '';
		});

		isDirty = true;
		// resolve({ duration, delay, controller: c });
	};
}
