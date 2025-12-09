import { animate } from 'motion';
import { DURATION } from '$svelte-atoms/core/shared';
import { DrawerBond } from '.';

type AnimateDrawerContentParams = {
	duration?: number;
	delay?: number;
	ease?: string;
	side?: 'left' | 'right' | 'top' | 'bottom';
};

export function animateDrawerContent(params: AnimateDrawerContentParams) {
	const { duration = DURATION.fast / 1000, delay = 0, ease = 'easeInOut', side = 'left' } = params;

	const bond = DrawerBond.get();
	const isOpen = bond?.state.props.open ?? false;

	const mainProp = side === 'left' || side === 'right' ? 'x' : 'y';
	const crossProp = mainProp === 'x' ? 'y' : 'x';

	const d = side === 'left' || side === 'top' ? -1 : 1;

	return (node: HTMLElement) => {
		animate(
			node,
			{
				[mainProp]: isOpen ? 0 : d * 100 + '%',
				[crossProp]: 0,
				left: 'unset',
				right: 'unset',

				[side]: 0
			},
			{ duration, easing: ease, delay }
		);
	};
}

type AnimateDrawerRootParams = {
	duration?: number;
	delay?: number;
	ease?: string;
};
export function animateDrawerRoot(params: AnimateDrawerRootParams = {}) {
	const { duration = DURATION.fast / 1000, delay = 0, ease = 'easeInOut' } = params;

	return (node: HTMLElement) => {
		const bond = DrawerBond.get();
		const isOpen = bond?.state.props.open ?? false;

		animate(node, { opacity: +isOpen }, { duration, ease, delay });
	};
}
