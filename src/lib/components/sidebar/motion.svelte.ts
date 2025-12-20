import { animate, type Easing } from 'motion';
import { DURATION } from '$svelte-atoms/core/shared';
import { SidebarBond } from '.';

type AnimateSidebarContentParams = {
	duration?: number;
	delay?: number;
	ease?: Easing | Easing[];
	axis?: 'x' | 'y';
	0?: number | string;
	1?: number | string;
};

export function animateSidebarContent(params: AnimateSidebarContentParams) {
	const {
		duration = DURATION.fast / 1000,
		delay = 0,
		ease = 'easeInOut',
		axis = 'x',
		'0': collapsedSize = '96px',
		'1': expandedSize = 'auto'
	} = params;
	const bond = SidebarBond.get();

	return (node: HTMLElement) => {
		const isOpen = bond?.state.props.open ?? false;

		const collapsedProp = axis === 'x' ? 'min-width' : 'min-height';
		const prop = axis === 'x' ? 'width' : 'height';

		animate(
			node,
			{
				[prop]: isOpen ? expandedSize : collapsedSize,
				[collapsedProp]: collapsedSize
			},
			{ duration, ease, delay }
		);
	};
}
