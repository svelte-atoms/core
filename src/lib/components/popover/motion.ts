import { animate } from 'motion';
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

		const { duration = DURATION.quick / 1000, delay = 0, ease = 'easeInOut' } = params;

		const isOpen = bond?.state.props.open ?? false;

		const position = bond.state.position;

		if (!position) {
			return;
		}

		const placement = position.placement;

		const dy = placement?.startsWith('top') ? -1 : placement?.startsWith('bottom') ? 1 : 0;
		const dx = placement?.startsWith('left') ? -1 : placement?.startsWith('right') ? 1 : 0;

		const offset = bond.state.props.offset;

		const xOffset = dx * offset;
		const yOffset = dy * offset;

		const openAsNumber = +isOpen;

		const arrowClientWidth = bond?.elements.arrow?.clientWidth ?? 0;
		const arrowClientHeight = bond?.elements.arrow?.clientHeight ?? 0;

		const getTransformOrigin = () => {
			switch (placement) {
				case 'top':
				case 'top-start':
				case 'top-end':
					return 'bottom';
				case 'bottom':
				case 'bottom-start':
				case 'bottom-end':
					return 'top';
				case 'left':
				case 'left-start':
				case 'left-end':
					return 'right';
				case 'right':
				case 'right-start':
				case 'right-end':
					return 'left';
				default:
					return 'center';
			}
		};

		const transformOrigin = getTransformOrigin();

		const s0 = 0.9;
		const s1 = 1;

		const from = isOpen ? s1 : s0;

		animate(
			node,
			{
				opacity: openAsNumber,
				y: dy * (!isOpen ? -1 : 0) * (arrowClientHeight + yOffset),
				x: dx * (!isOpen ? -1 : 0) * (arrowClientWidth + xOffset),
				scaleY: dy ? (isOpen ? [from, s1] : [s1, from]) : undefined,
				scaleX: dx ? (isOpen ? [from, s1] : [s1, from]) : undefined,
				transformOrigin
			},
			{ duration, delay, ease }
		);
	};
}
