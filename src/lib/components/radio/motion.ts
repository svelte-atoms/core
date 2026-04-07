import type { TransitionConfig, EasingFunction } from 'svelte/transition';
import { cubicOut, cubicIn } from 'svelte/easing';
import type { TransitionFunction } from '../element';

export type AnimateRadioIndicatorParams = {
	/** Animation duration in milliseconds (default: 200 for in, 150 for out) */
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
 * Enter transition for radio indicator (check)
 * Smooth scale and fade in
 *
 * Respects prefers-reduced-motion by using instant transition
 */
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

/**
 * Exit transition for radio indicator (uncheck)
 * Quick scale and fade out
 *
 * Respects prefers-reduced-motion by using instant transition
 */
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
