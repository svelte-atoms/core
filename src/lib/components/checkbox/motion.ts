import type { EasingFunction } from 'svelte/transition';
import { cubicIn } from 'svelte/easing';
import type { TransitionFunction } from '../element';

export type AnimateCheckboxIndicatorParams = {
	// ms
	duration?: number;
	// ms (default: 0)
	delay?: number;
	// default: cubicIn
	easing?: EasingFunction;
};

function prefersReducedMotion(): boolean {
	if (typeof window === 'undefined') return false;
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Scale + fade transition for the checkbox indicator; instant when prefers-reduced-motion is set.
export function animateCheckboxIndicator(
	params: AnimateCheckboxIndicatorParams = {}
): TransitionFunction<HTMLElement> {
	const { duration = 100, delay = 0, easing = cubicIn } = params;
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
