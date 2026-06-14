import type { EasingFunction } from 'svelte/transition';
import { cubicIn } from 'svelte/easing';
import type { TransitionFunction } from '../element';

export type AnimateCheckboxIndicatorParams = {
	// Animation duration in milliseconds.
	duration?: number;
	// Delay before animation starts in milliseconds (default: 0).
	delay?: number;
	// Custom easing function (default: cubicIn).
	easing?: EasingFunction;
};

// Returns true if the user has requested reduced motion.
function prefersReducedMotion(): boolean {
	if (typeof window === 'undefined') return false;
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Exit transition for the checkbox indicator (scale + fade out). Instant when prefers-reduced-motion is set.
export function animateCheckboxIndicator(
	params: AnimateCheckboxIndicatorParams = {}
): TransitionFunction<HTMLElement> {
	const { duration = 100, delay = 0, easing = cubicIn } = params;
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
