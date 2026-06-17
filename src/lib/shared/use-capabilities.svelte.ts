import { onDestroy } from 'svelte';
import type { Bond } from './bond.svelte';

// Run every registered capability's setup() once, at root component init, and aggregate their
// teardowns into onDestroy. The single home for whole-bond effects (focus restore, document
// listeners, subscriptions) that no individual atom owns. Call once from a bond's root component,
// after the bond is constructed. Capabilities without a setup() are skipped. (#5)
export function useCapabilities(bond: Bond | undefined): void {
	if (!bond) return;

	const cleanups: Array<() => void> = [];
	for (const capability of bond.capabilities) {
		const cleanup = capability.setup?.(bond);
		if (cleanup) cleanups.push(cleanup);
	}

	if (cleanups.length > 0) {
		onDestroy(() => {
			for (const cleanup of cleanups) cleanup();
		});
	}
}
