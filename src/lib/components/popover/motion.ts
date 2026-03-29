import { animate, backInOut, circOut, easeInOut } from 'motion';
import { untrack } from 'svelte';
import { PopoverBond } from '.';
import { DURATION } from '$svelte-atoms/core/shared';

export type AnimatePopoverContentParams = {
	duration?: number;
	delay?: number;
	ease?: string;
};

export function animatePopoverContent(params: AnimatePopoverContentParams = {}) {
	let prevOpen: boolean | undefined;

	const bond = PopoverBond.get();

	return (node: HTMLElement) => {
		const { duration = DURATION.quick / 1000, delay = 0, ease = easeInOut } = params;

		const isOpen = bond?.state.props.open ?? false;

		// Read position reactively so the $effect re-runs once position is first computed,
		// but only use open-state change as the gate for triggering the animation.
		const position = bond.state.position;
		const offset = untrack(() => bond.state.props.offset);

		if (!position) {
			return;
		}

		// Skip animation if open state hasn't changed
		if (isOpen === prevOpen) {
			return;
		}

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

			const translateX = offset * -tx;
			const translateY = offset * -ty;

			const c = animate(
				node,
				{
					scaleX: isOpen ? [0.8, 1] : [1, 0.8],
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
				node.style.pointerEvents = 'auto';
			});
		});
	};
}
