/**
 * A rune that tracks the user's motion preferences via the `prefers-reduced-motion` media query.
 *
 * @returns An object with a `current` getter that returns `true` if the user prefers reduced motion, `false` otherwise.
 *
 * @example
 * ```svelte
 * <script>
 *   import { reducedMotion } from '@svelte-atoms/core';
 *
 *   const motion = reducedMotion();
 * </script>
 *
 * {#if motion.current}
 *   <div>Animations disabled</div>
 * {:else}
 *   <div class="animated">Animations enabled</div>
 * {/if}
 * ```
 */
export function reducedMotion() {
	let prefersReduced = $state<boolean>(false);

	$effect(() => {
		if (typeof window === 'undefined') return;

		const handleChange = (ev: MediaQueryListEvent) => {
			prefersReduced = ev.matches;
		};

		const media = window.matchMedia('(prefers-reduced-motion: reduce)');
		media.addEventListener('change', handleChange);

		prefersReduced = media.matches;

		return () => {
			media.removeEventListener('change', handleChange);
		};
	});

	return {
		get current() {
			return prefersReduced;
		}
	};
}
