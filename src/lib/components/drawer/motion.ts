import { animate, type Easing, type Spring } from 'motion';
import { DURATION } from '$svelte-atoms/core/shared';
import { DrawerBond } from '.';
import { untrack } from 'svelte';

export type DrawerSide = 'left' | 'right' | 'top' | 'bottom';

type EasingOption = Easing | Easing[] | Spring;

export type DrawerSide = 'left' | 'right' | 'top' | 'bottom';

type EasingOption = Easing | Easing[] | Spring;

type AnimateDrawerContentParams = {
	duration?: number;
	delay?: number;
	easeOpen?: EasingOption;
	easeClose?: EasingOption;
	ease?: EasingOption; // overrides both if set
	side?: DrawerSide;
	inert?: boolean; // whether to set inert during animation (defaults to true)
};

/**
 * Returns the hidden (offscreen) translate values for each side.
 * The panel slides in from its edge — e.g. left panel starts at -100% x.
 */
function getHiddenTransform(side: DrawerSide): { x: string; y: string } {
	switch (side) {
		case 'left':
			return { x: '-100%', y: '0%' };
		case 'right':
			return { x: '100%', y: '0%' };
		case 'top':
			return { x: '0%', y: '-100%' };
		case 'bottom':
			return { x: '0%', y: '100%' };
	}
}

/**
 * Returns the CSS positioning properties to anchor the panel to its side.
 */
function getSidePosition(
	side: DrawerSide
): Partial<Record<'top' | 'bottom' | 'left' | 'right' | 'height' | 'width', string>> {
	switch (side) {
		case 'left':
			return { top: '0', bottom: '0', left: '0', right: 'unset' };
		case 'right':
			return { top: '0', bottom: '0', right: '0', left: 'unset' };
		case 'top':
			return { top: '0', left: '0', right: '0', bottom: 'unset' };
		case 'bottom':
			return { bottom: '0', left: '0', right: '0', top: 'unset' };
	}
}

export function animateDrawerContent(params: AnimateDrawerContentParams = {}) {
	const {
		duration = DURATION.smooth / 1000,
		delay = 0,
		ease,
		easeOpen = [0.22, 1, 0.36, 1], // ease-out-quint: gentle deceleration on enter
		easeClose = [0.32, 0.72, 0, 1], // ease-in-out-quart: snappy on exit
		side = 'right',
		inert = false
	} = params;

	const bond = untrack(() => DrawerBond.get());
	const position = getSidePosition(side);
	const hidden = getHiddenTransform(side);

	return (node: HTMLElement) => {
		const isOpen = bond?.state.props.open ?? false;
		const resolvedEase = ease ?? (isOpen ? easeOpen : easeClose);

		node.inert = true;

		const controller = animate(
			node,
			{
				x: isOpen ? '0%' : hidden.x,
				y: isOpen ? '0%' : hidden.y,
				...position
			},
			{
				duration,
				ease: resolvedEase,
				delay,
				onComplete: () => {
					node.inert = inert;
				}
			}
		);

		return () => {
			controller.stop();
			node.inert = inert;
		};
	};
}

/**
 * Convenience wrappers for each side — use as `animate` + `initial` on Drawer.Content.
 *
 * @example
 * <Drawer.Content animate={animateDrawerContentFromRight()} initial={animateDrawerContentFromRight({ duration: 0 })} />
 */
export function animateDrawerContentFromLeft(params: AnimateDrawerContentParams = {}) {
	return animateDrawerContent({ ...params, side: 'left' });
}

export function animateDrawerContentFromRight(params: AnimateDrawerContentParams = {}) {
	return animateDrawerContent({ ...params, side: 'right' });
}

export function animateDrawerContentFromTop(params: AnimateDrawerContentParams = {}) {
	return animateDrawerContent({ ...params, side: 'top' });
}

export function animateDrawerContentFromBottom(params: AnimateDrawerContentParams = {}) {
	return animateDrawerContent({ ...params, side: 'bottom' });
}

type AnimateDrawerRootParams = {
	duration?: number;
	delay?: number;
	ease?: EasingOption;
};

export function animateDrawerRoot(params: AnimateDrawerRootParams = {}) {
	const { duration = DURATION.smooth / 1000, delay = 0, ease = 'easeInOut' } = params;

	return (node: HTMLElement) => {
		const bond = DrawerBond.get();
		const isOpen = bond?.state.props.open ?? false;

		animate(node, { opacity: +isOpen }, { duration, ease, delay });
	};
}
