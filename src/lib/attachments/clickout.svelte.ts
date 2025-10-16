import { on } from 'svelte/events';

export function clickout<T extends Element>(onclick?: (ev: PointerEvent, node?: T) => void) {
	return (node: T) => {
		const handler = (ev: PointerEvent) => {
			const target = ev.target as T;

			if (!node.contains(target)) {
				onclick?.(ev, node);
			}
		};

		const cleanup = on(window, 'click', handler);

		return () => {
			cleanup();
		};
	};
}
