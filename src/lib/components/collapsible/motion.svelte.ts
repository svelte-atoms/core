import { animate, type Easing } from '$ixirjs/ui/shared';
import { CollapsibleBond } from '.';
import { DURATION } from '$ixirjs/ui/shared';

export type AnimateCollapsibleBodyParams = {
	duration?: number;
	delay?: number;
	ease?: Easing | Easing[];
};

export function animateCollapsibleBody(params: AnimateCollapsibleBodyParams = {}) {
	const bond = CollapsibleBond.get();
	return (node: HTMLElement) => {
		const { duration = DURATION.fast / 1000, delay = 0, ease } = params;

		const isOpen = bond?.isOpen ?? false;

		animate(
			node,
			{
				opacity: +isOpen,
				height: isOpen ? 'auto' : 0
			},
			{ duration, delay, ...(ease ? { ease } : {}) }
		);
	};
}
