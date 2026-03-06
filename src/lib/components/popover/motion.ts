import { animate, backInOut, circOut } from 'motion';
import { untrack } from 'svelte';
import { PopoverBond } from '.';
import { DURATION } from '$svelte-atoms/core/shared';

export type AnimatePopoverContentParams = {
	duration?: number;
	delay?: number;
	ease?: string;
};

export function animatePopoverContent(params: AnimatePopoverContentParams = {}) {
	let prevX: number | undefined;
	let prevY: number | undefined;
	let prevOpen: boolean | undefined;

	return (node: HTMLElement) => {
		const bond = PopoverBond.get();

		const { duration = DURATION.fast / 1000, delay = 0, ease = backInOut } = params;

		const isOpen = bond?.state.props.open ?? false;

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

		const triggerElement = bond.elements.trigger;

		if (!triggerElement) {
			return;
		}

		requestAnimationFrame(() => {
			const triggerRect = triggerElement.getBoundingClientRect();
			const nodeRect = node.parentElement?.getBoundingClientRect();

			if (!nodeRect) {
				return;
			}

			const scaleX = triggerRect.width / nodeRect.width;
			const scaleY = triggerRect.height / nodeRect.height;

			const placement = untrack(() => position.placement);
			const [side, alignment] = placement?.split('-') ?? [];

			const dy =
				(side === 'left' || side === 'right') && !alignment
					? 0
					: side === 'top'
						? -1
						: side === 'bottom'
							? 1
							: undefined;
			const dx =
				(side === 'top' || side === 'bottom') && !alignment
					? 0
					: side === 'left'
						? -1
						: side === 'right'
							? 1
							: undefined;

			const tx = Math.sign(dx ?? 0);
			const ty = Math.sign(dy ?? 0);

			const getTransformOrigin = (side: string, alignment: string) => {
				const calcXOrigin = (alignment: string, side: string) => {
					if (!alignment) return 'center';

					if (side === 'top' || side === 'bottom') {
						if (alignment === 'start') return 'left';
						return 'right';
					}

					if (side === 'left' || side === 'right') {
						if (alignment === 'start') return 'top';
						return 'bottom';
					}

					return 'center';
				};
				const x = calcXOrigin(alignment, side);

				const calcYOrigin = (side: string) => {
					switch (side) {
						case 'top':
							return 'bottom';
						case 'bottom':
							return 'top';
						case 'left':
							return 'right';
						case 'right':
							return 'left';
						default:
							return 'center';
					}
				};

				const y = calcYOrigin(side);

				return `${x} ${y}`;
			};

			const transformOrigin = getTransformOrigin(side, alignment);

			node.style.transformOrigin = transformOrigin;
			node.style.pointerEvents = 'none';

			const translateX = triggerRect.width * -tx;
			const translateY = triggerRect.height * -ty;

			const c = animate(
				node,
				{
					scaleX: isOpen ? [0, 1] : [1, 0],
					scaleY: isOpen ? [scaleY, 1] : [1, scaleY],
					translateX: isOpen ? [`${translateX}px`, '0px'] : ['0px', `${translateX}px`],
					translateY: isOpen ? [`${translateY}px`, '0px'] : ['0px', `${translateY}px`],
					opacity: isOpen ? [0, 1] : [1, 0]
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
		});
	};
}
