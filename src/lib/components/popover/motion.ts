import { animate, circOut } from 'motion';
import { PopoverBond } from '.';
import { DURATION } from '$svelte-atoms/core/shared';

export type AnimatePopoverContentParams = {
	duration?: number;
	delay?: number;
	ease?: string;
};

export function animatePopoverContent(params: AnimatePopoverContentParams = {}) {
	return (node: HTMLElement) => {
		const bond = PopoverBond.get();

		const { duration = DURATION.fast / 1000, delay = 0, ease = circOut } = params;

		const isOpen = bond?.state.props.open ?? false;

		const position = bond.state.position;

		if (!position) {
			return;
		}

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

		node.style.transformOrigin = `center ${transformOriginY}`;

		node.style.pointerEvents = 'none';

		const c = animate(
			node,
			{
				scaleX: isOpen ? [0, 1] : [1, 0],
				scaleY: isOpen ? [scaleY, 1] : [1, scaleY],
				translateX: isOpen ? [`${x}px`, '0px'] : ['0px', `${x}px`],
				translateY: isOpen ? [`${y}px`, '0px'] : ['0px', `${y}px`],
				opacity: openAsNumber
			},
			{
				duration,
				easing: ease,
				delay
			}
		);

		c.then(() => {
			node.style.pointerEvents = '';
		});

		// resolve({ duration, delay, controller: c });
	};
}
