import type { TransitionConfig, EasingFunction } from 'svelte/transition';
import { cubicOut, cubicIn } from 'svelte/easing';
import type { TransitionFunction } from '../element';

export type AnimateRadioIndicatorParams = {
	// Duration in ms (default: 200 for in, 150 for out).
	duration?: number;
	// Delay in ms before animation starts (default: 0).
	delay?: number;
	// Easing function (default: cubicOut for in, cubicIn for out).
	easing?: EasingFunction;
};

// Returns true if the user prefers reduced motion.
function prefersReducedMotion(): boolean {
	if (typeof window === 'undefined') return false;
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Enter transition for the radio indicator — scale+fade in; instant if reduced-motion.
export function animateRadioIndicatorIn(
	params: AnimateRadioIndicatorParams = {}
): TransitionFunction<HTMLElement> {
	const { duration = 200, delay = 0, easing = cubicOut } = params;
	return () => {
		// If user prefers reduced motion, use instant transition
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

// Exit transition for the radio indicator — scale+fade out; instant if reduced-motion.
export function animateRadioIndicatorOut(
	params: AnimateRadioIndicatorParams = {}
): TransitionFunction<HTMLElement> {
	const { duration = 150, delay = 0, easing = cubicIn } = params;
	return () => {
		// If user prefers reduced motion, use instant transition
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
