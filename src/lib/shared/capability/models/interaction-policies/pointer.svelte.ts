import {
	definePolicyCapability,
	sharedCapabilityKey,
	type Capability
} from '$ixirjs/ui/shared/capability/capability';
import type { Bond } from '$ixirjs/ui/shared/bond';
import {
	capturePointer,
	dragDetail,
	shouldSkipPolicy,
	trackPressDetail,
	type DragAxis,
	type DragPolicyDetail,
	type PolicyGuard,
	type TrackPressDetail
} from '$ixirjs/ui/shared/capability/models/interaction-policies/shared';

export const THUMB_DRAG_POLICY = sharedCapabilityKey<void>('@ixirjs/cap:thumb-drag');
export const TRACK_PRESS_POLICY = sharedCapabilityKey<void>('@ixirjs/cap:track-press');
export const RESIZE_HANDLE_POLICY = sharedCapabilityKey<void>('@ixirjs/cap:resize-handle');

export interface ThumbDragPolicyOptions {
	role?: string;
	axis?: DragAxis;
	disabled?: PolicyGuard;
	onStart?: (detail: DragPolicyDetail, bond: Bond, event: PointerEvent) => void;
	onDrag: (detail: DragPolicyDetail, bond: Bond, event: PointerEvent) => void;
	onEnd?: (detail: DragPolicyDetail, bond: Bond, event: PointerEvent) => void;
}

export function thumbDragPolicy(options: ThumbDragPolicyOptions): Capability<void> {
	const role = options.role ?? 'thumb';
	return pointerDragPolicy({
		slot: THUMB_DRAG_POLICY,
		role,
		axis: options.axis,
		disabled: options.disabled,
		docs: 'Pointer drag policy for moving a thumb along a track.',
		onStart: options.onStart,
		onMove: options.onDrag,
		onEnd: options.onEnd
	});
}

export interface TrackPressPolicyOptions {
	role?: string;
	disabled?: PolicyGuard;
	preventDefault?: boolean;
	onPress: (detail: TrackPressDetail, bond: Bond, event: PointerEvent) => void;
}

export function trackPressPolicy(options: TrackPressPolicyOptions): Capability<void> {
	const role = options.role ?? 'track';
	const preventDefault = options.preventDefault ?? true;

	return definePolicyCapability<void>({
		slot: TRACK_PRESS_POLICY,
		meta: {
			projects: [role],
			docs: 'Pointer press policy for moving a value or scroll position from track presses.'
		},
		behavior: (projectedRole) =>
			projectedRole === role
				? {
						handlers: (bond) => ({
							onpointerdown: (event: PointerEvent) => {
								if (shouldSkipPolicy(options.disabled, bond, event)) return;
								if (preventDefault) event.preventDefault();
								options.onPress(trackPressDetail(event), bond, event);
							}
						})
					}
				: undefined
	});
}

export interface ResizeHandlePolicyOptions {
	role?: string;
	axis?: DragAxis;
	disabled?: PolicyGuard;
	onStart?: (detail: DragPolicyDetail, bond: Bond, event: PointerEvent) => void;
	onResize: (detail: DragPolicyDetail, bond: Bond, event: PointerEvent) => void;
	onEnd?: (detail: DragPolicyDetail, bond: Bond, event: PointerEvent) => void;
}

export function resizeHandlePolicy(options: ResizeHandlePolicyOptions): Capability<void> {
	const role = options.role ?? 'handle';
	return pointerDragPolicy({
		slot: RESIZE_HANDLE_POLICY,
		role,
		axis: options.axis,
		disabled: options.disabled,
		docs: 'Pointer drag policy for resizing from a handle.',
		onStart: options.onStart,
		onMove: options.onResize,
		onEnd: options.onEnd
	});
}

type PointerDragConfig = {
	slot: symbol;
	role: string;
	axis?: DragAxis | undefined;
	disabled?: PolicyGuard | undefined;
	docs: string;
	onStart?: ((detail: DragPolicyDetail, bond: Bond, event: PointerEvent) => void) | undefined;
	onMove: (detail: DragPolicyDetail, bond: Bond, event: PointerEvent) => void;
	onEnd?: ((detail: DragPolicyDetail, bond: Bond, event: PointerEvent) => void) | undefined;
};

function pointerDragPolicy(config: PointerDragConfig): Capability<void> {
	let start: { pointerId: number; x: number; y: number } | undefined;

	return definePolicyCapability<void>({
		slot: config.slot,
		meta: {
			projects: [config.role],
			docs: config.docs
		},
		behavior: (projectedRole) =>
			projectedRole === config.role
				? {
						handlers: (bond) => ({
							onpointerdown: (event: PointerEvent) => {
								if (shouldSkipPolicy(config.disabled, bond, event)) return;
								start = { pointerId: event.pointerId, x: event.clientX, y: event.clientY };
								capturePointer(event);
								const detail = dragDetail(start, event, config.axis);
								config.onStart?.(detail, bond, event);
							},
							onpointermove: (event: PointerEvent) => {
								if (!start || event.pointerId !== start.pointerId) return;
								if (shouldSkipPolicy(config.disabled, bond, event)) return;
								config.onMove(dragDetail(start, event, config.axis), bond, event);
							},
							onpointerup: (event: PointerEvent) => {
								if (!start || event.pointerId !== start.pointerId) return;
								const detail = dragDetail(start, event, config.axis);
								start = undefined;
								config.onEnd?.(detail, bond, event);
							},
							onpointercancel: (event: PointerEvent) => {
								if (!start || event.pointerId !== start.pointerId) return;
								const detail = dragDetail(start, event, config.axis);
								start = undefined;
								config.onEnd?.(detail, bond, event);
							}
						})
					}
				: undefined
	});
}
