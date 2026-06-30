import type { ComputePositionReturn } from '@floating-ui/dom';
import type { Atom } from '$svelte-atoms/core/shared/bond';
import { overlayIsOpen } from '$svelte-atoms/core/components/portal/host/policies/overlay-view';
import type { OverlayView } from '$svelte-atoms/core/components/portal/host';

type PopoverLegacyStateSurface = {
	position?: ComputePositionReturn;
	tracking?: boolean | undefined;
	computed?: Promise<ComputePositionReturn>;
	shouldTrackPosition?: boolean;
	notifyComputed?: (position: ComputePositionReturn) => void;
};

type PopoverBondSurface = PopoverLegacyStateSurface;

function popoverBondSurface(bond: OverlayView): PopoverBondSurface {
	return bond as unknown as PopoverBondSurface;
}

function popoverStateSurface(bond: OverlayView): PopoverLegacyStateSurface {
	return (bond.state ?? {}) as PopoverLegacyStateSurface;
}

export function getPopoverPosition(bond: OverlayView): ComputePositionReturn | undefined {
	return popoverBondSurface(bond).position ?? popoverStateSurface(bond).position;
}

export function setPopoverTracking(bond: OverlayView, tracking: boolean | undefined): void {
	if ('tracking' in bond) {
		popoverBondSurface(bond).tracking = tracking;
		return;
	}
	popoverStateSurface(bond).tracking = tracking;
}

export function shouldTrackPopoverPosition(bond: OverlayView): boolean {
	const bondValue = popoverBondSurface(bond).shouldTrackPosition;
	return bondValue ?? popoverStateSurface(bond).shouldTrackPosition ?? overlayIsOpen(bond);
}

export function notifyPopoverComputed(bond: OverlayView, position: ComputePositionReturn): void {
	const bondNotify = popoverBondSurface(bond).notifyComputed;
	if (bondNotify) {
		bondNotify.call(bond, position);
		return;
	}
	popoverStateSurface(bond).notifyComputed?.(position);
}

export function popoverNode<N extends Atom = Atom>(bond: OverlayView, key: string): N | undefined {
	return bond.node<N>(key);
}
