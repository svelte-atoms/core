import type { TransitionConfig, EasingFunction } from 'svelte/transition';
import { cubicOut, cubicIn } from 'svelte/easing';
import type { TransitionFunction } from '../element';

export type AnimateRadioIndicatorParams = {
	// ms (default: 200 in, 150 out)
	duration?: number;
	// ms (default: 0)
	delay?: number;
	// default: cubicOut in, cubicIn out
	easing?: EasingFunction;
};

function prefersReducedMotion(): boolean {
	if (typeof window === 'undefined') return false;
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Scale+fade-in for the radio indicator; instant if reduced-motion.
export function animateRadioIndicatorIn(
	params: AnimateRadioIndicatorParams = {}
): TransitionFunction<HTMLElement> {
	const { duration = 200, delay = 0, easing = cubicOut } = params;
	return () => {
		if (prefersReducedMotion()) {
			return {
				duration: 0,
				delay: 0,
				css: () => ''
			};
		}

		return () => ({
			duration,
			delay,
			easing,
			css: (t) => `transform: scale(${t}); opacity: ${t};`
		});
	};
}

// Scale+fade-out for the radio indicator; instant if reduced-motion.
export function animateRadioIndicatorOut(
	params: AnimateRadioIndicatorParams = {}
): TransitionFunction<HTMLElement> {
	const { duration = 150, delay = 0, easing = cubicIn } = params;
	return () => {
		if (prefersReducedMotion()) {
			return {
				duration: 0,
				delay: 0,
				css: () => ''
			};
		}

		return () => ({
			duration,
			delay,
			easing,
			css: (t) => `transform: scale(${t}); opacity: ${t};`
		});
	};
}
