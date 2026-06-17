import type { Capability } from '$svelte-atoms/core/shared/bond.svelte';
import type { OverlayView, EscapeOutcome } from '../types';

export type { EscapeOutcome };

// Handler signature passed to escapePolicy.
export type EscapeHandler = (bond: OverlayView, ev: KeyboardEvent) => void;

// Low-level factory: gates `onEscape` behind the key check, `enabled` flag, and `isDisabled`, then projects onto `'surface'`.
// Prefer the pre-built constants below for common cases.
export function escapePolicy(
	onEscape: EscapeHandler,
	opts: { enabled?: boolean; requires?: readonly string[] } = {}
): Capability<EscapeHandler> {
	const enabled = opts.enabled !== false;
	return {
		slot: 'escape',
		surface: onEscape,
		...(opts.requires ? { requires: opts.requires } : {}),
		behavior(role) {
			if (role !== 'surface') return undefined;
			return {
				handlers: (bond) => ({
					onkeydown: (ev: Event) => {
						const e = ev as KeyboardEvent;
						if (e.key !== 'Escape') return;
						if (!enabled) return;
						if ((bond as OverlayView).state.isDisabled) return;
						e.preventDefault();
						onEscape(bond as OverlayView, e);
					}
				})
			};
		}
	};
}

// Close the overlay on Escape. The common default.
export const closeOnEscape: Capability<EscapeHandler> = escapePolicy((bond) => {
	bond.state.close();
});

// Ignore Escape — for non-dismissible overlays.
export const ignoreEscape: Capability<EscapeHandler> = escapePolicy(() => {
	// no-op: Escape is still prevented but the overlay stays open.
});

// First Escape clears the overlay's `'input'` capability; second Escape closes. Used by Combobox and Select.
export const clearThenClose: Capability<EscapeHandler> = escapePolicy(
	(bond) => {
		const input = bond.capability('input')?.surface;
		if (input?.clear()) return;
		bond.state.close();
	},
	{ requires: ['input'] }
);
