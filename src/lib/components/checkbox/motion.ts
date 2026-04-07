import type { TransitionConfig, EasingFunction } from 'svelte/transition';
import { cubicOut, cubicIn } from 'svelte/easing';
import type { TransitionFunction } from '../element';

export type AnimateCheckboxIndicatorParams = {
	/** Animation duration in milliseconds (default: 150 for in, 120 for out) */
	duration?: number;
	/** Delay before animation starts in milliseconds (default: 0) */
	delay?: number;
	/** Custom easing function (default: cubicOut for in, cubicIn for out) */
	easing?: EasingFunction;
};

/**
 * Check if user prefers reduced motion
 */
function prefersReducedMotion(): boolean {
	if (typeof window === 'undefined') return false;
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Enter transition for checkbox indicator (check/indeterminate)
 * Smooth scale and fade in
 *
 * Respects prefers-reduced-motion by using instant transition
 */
export function animateCheckboxIndicatorIn(
	params: AnimateCheckboxIndicatorParams = {}
): TransitionFunction<HTMLElement> {
	const { duration = 100, delay = 0, easing = cubicOut } = params;

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

/**
 * Exit transition for checkbox indicator (uncheck/clear indeterminate)
 * Quick scale and fade out
 *
 * Respects prefers-reduced-motion by using instant transition
 */
export function animateCheckboxIndicatorOut(
	params: AnimateCheckboxIndicatorParams = {}
): TransitionFunction<HTMLElement> {
	const { duration = 120, delay = 0, easing = cubicIn } = params;
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
