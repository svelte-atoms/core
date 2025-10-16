import type { TransitionConfig } from 'svelte/transition';

export function toTransitionConfig(tween: gsap.core.Tween): TransitionConfig {
	const ease = tween.vars.ease;

	return {
		delay: tween.delay() * 1000,
		duration: tween.duration() * 1000,
		easing: typeof ease === 'function' ? ease : undefined
	};
}
