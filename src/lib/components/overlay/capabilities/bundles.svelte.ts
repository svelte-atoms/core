import type { Capability } from '$svelte-atoms/core/shared/bond/bond.svelte';
import type { OverlayKnobs } from '../types';
import { clickTrigger } from '../policies/trigger.svelte';
import { trappedFocus, focusOnOpen } from '../policies/focus.svelte';
import { closeOnEscape } from '../policies/escape.svelte';

// Individual slots can be overridden via last-wins registration.

export function modalCapabilities(knobs: Pick<OverlayKnobs, 'ariaHasPopup'> = {}): Capability[] {
	return [
		clickTrigger({ ariaHasPopup: knobs.ariaHasPopup ?? 'dialog' }),
		trappedFocus({ restoreFocus: 'previous', captureFocusOnOpen: true }),
		closeOnEscape
	];
}

export function positionedCapabilities(
	knobs: Pick<OverlayKnobs, 'ariaHasPopup'> = {}
): Capability[] {
	return [
		clickTrigger({ ariaHasPopup: knobs.ariaHasPopup ?? 'dialog' }),
		focusOnOpen({ restoreFocus: 'trigger', captureFocusOnOpen: false }),
		closeOnEscape
	];
}
