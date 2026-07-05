import {
	defineEffectCapability,
	sharedCapabilityKey,
	type Capability
} from '$ixirjs/ui/shared/capability/capability';
import type { Bond } from '$ixirjs/ui/shared/bond';
import {
	clamp,
	isEnabled,
	isWindow,
	listen,
	noop,
	resolveDocument,
	type DocumentSource,
	type EffectGuard,
	type ElementSource,
	type WindowSource
} from '$ixirjs/ui/shared/capability/models/whole-bond-effects/shared';

export const SCROLL_MEASUREMENT = sharedCapabilityKey<ScrollMeasurementSurface>(
	'@ixirjs/cap:scroll-measurement'
);
export const VIRTUAL_WINDOW = sharedCapabilityKey<VirtualWindowSurface>(
	'@ixirjs/cap:virtual-window'
);
export const DOCUMENT_DRAG = sharedCapabilityKey<DocumentDragSurface>(
	'@ixirjs/cap:document-drag'
);
export const PORTAL_LAYER = sharedCapabilityKey<PortalLayerSurface>(
	'@ixirjs/cap:portal-layer'
);

export interface ScrollGeometry {
	x: number;
	y: number;
	width: number;
	height: number;
	scrollWidth: number;
	scrollHeight: number;
}

export interface ScrollMeasurementCapabilityOptions {
	target?: ElementSource | WindowSource;
	enabled?: EffectGuard;
	onMeasure?: (measurement: ScrollGeometry, bond: Bond) => void;
}

export interface ScrollMeasurementSurface extends ScrollGeometry {
	measure(): ScrollGeometry;
}

export function scrollMeasurementCapability(
	options: ScrollMeasurementCapabilityOptions = {}
): Capability<ScrollMeasurementSurface> {
	let measurement = $state<ScrollGeometry>({
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		scrollWidth: 0,
		scrollHeight: 0
	});
	const surface: ScrollMeasurementSurface = {
		get x() {
			return measurement.x;
		},
		get y() {
			return measurement.y;
		},
		get width() {
			return measurement.width;
		},
		get height() {
			return measurement.height;
		},
		get scrollWidth() {
			return measurement.scrollWidth;
		},
		get scrollHeight() {
			return measurement.scrollHeight;
		},
		measure() {
			return measurement;
		}
	};

	return defineEffectCapability<ScrollMeasurementSurface>({
		slot: SCROLL_MEASUREMENT,
		surface,
		meta: {
			docs: 'Maintains scroll position and scrollable geometry for a target.'
		},
		setup: (bond) => {
			const target = resolveScrollTarget(options.target, bond);
			if (!target) return;
			const update = () => {
				if (!isEnabled(options.enabled, bond)) return;
				measurement = measureScrollTarget(target);
				options.onMeasure?.(measurement, bond);
			};
			update();
			const offScroll = listen(target, 'scroll', update, { passive: true });
			const resizeTarget = target instanceof Window ? target : target.ownerDocument.defaultView;
			const offResize = resizeTarget
				? listen(resizeTarget, 'resize', update, { passive: true })
				: noop;
			return () => {
				offResize();
				offScroll();
			};
		}
	});
}

export interface VirtualWindowRange {
	start: number;
	end: number;
	overscanStart: number;
	overscanEnd: number;
	offsetBefore: number;
	offsetAfter: number;
}

export interface VirtualWindowCapabilityOptions {
	count: number | (() => number);
	itemSize: number | ((index: number) => number);
	overscan?: number;
	scroll?: ScrollMeasurementSurface;
	onRange?: (range: VirtualWindowRange, bond: Bond) => void;
}

export interface VirtualWindowSurface extends VirtualWindowRange {
	recalculate(): VirtualWindowRange;
}

export function virtualWindowCapability(
	options: VirtualWindowCapabilityOptions
): Capability<VirtualWindowSurface> {
	let bondRef: Bond | undefined;
	let range = $state<VirtualWindowRange>(emptyRange());
	const surface: VirtualWindowSurface = {
		get start() {
			return range.start;
		},
		get end() {
			return range.end;
		},
		get overscanStart() {
			return range.overscanStart;
		},
		get overscanEnd() {
			return range.overscanEnd;
		},
		get offsetBefore() {
			return range.offsetBefore;
		},
		get offsetAfter() {
			return range.offsetAfter;
		},
		recalculate() {
			range = calculateVirtualRange(options);
			if (bondRef) options.onRange?.(range, bondRef);
			return range;
		}
	};

	return defineEffectCapability<VirtualWindowSurface>({
		slot: VIRTUAL_WINDOW,
		surface,
		meta: {
			docs: 'Maintains the visible and overscanned item range for virtualized collections.'
		},
		setup: (bond) => {
			bondRef = bond;
			surface.recalculate();
		}
	});
}

export interface DocumentDragDetail {
	start: PointerEvent;
	current: PointerEvent;
	deltaX: number;
	deltaY: number;
}

export interface DocumentDragCallbacks {
	move?: (detail: DocumentDragDetail, bond: Bond) => void;
	end?: (detail: DocumentDragDetail, bond: Bond) => void;
}

export interface DocumentDragCapabilityOptions {
	document?: DocumentSource;
	onMove?: (detail: DocumentDragDetail, bond: Bond) => void;
	onEnd?: (detail: DocumentDragDetail, bond: Bond) => void;
}

export interface DocumentDragSurface {
	readonly active: boolean;
	start(event: PointerEvent, callbacks?: DocumentDragCallbacks): void;
	cancel(): void;
}

export function documentDragCapability(
	options: DocumentDragCapabilityOptions = {}
): Capability<DocumentDragSurface> {
	let bondRef: Bond | undefined;
	let active = $state(false);
	let cleanup = noop;
	let startEvent: PointerEvent | undefined;
	const surface: DocumentDragSurface = {
		get active() {
			return active;
		},
		start(event, callbacks = {}) {
			if (!bondRef) return;
			const currentTarget = event.currentTarget;
			const doc =
				resolveDocument(options.document) ??
				(currentTarget instanceof Node ? currentTarget.ownerDocument : document) ??
				undefined;
			if (!doc) return;
			startEvent = event;
			active = true;
			cleanup();
			const move = (next: Event) => {
				if (!startEvent || !bondRef) return;
				const pointer = next as PointerEvent;
				const detail = dragDetail(startEvent, pointer);
				options.onMove?.(detail, bondRef);
				callbacks.move?.(detail, bondRef);
			};
			const end = (next: Event) => {
				if (!startEvent || !bondRef) return;
				const pointer = next as PointerEvent;
				const detail = dragDetail(startEvent, pointer);
				options.onEnd?.(detail, bondRef);
				callbacks.end?.(detail, bondRef);
				surface.cancel();
			};
			const offMove = listen(doc, 'pointermove', move);
			const offUp = listen(doc, 'pointerup', end);
			cleanup = () => {
				offUp();
				offMove();
			};
		},
		cancel() {
			cleanup();
			cleanup = noop;
			startEvent = undefined;
			active = false;
		}
	};

	return defineEffectCapability<DocumentDragSurface>({
		slot: DOCUMENT_DRAG,
		surface,
		meta: {
			docs: 'Provides document-level pointer move/up handling for drag interactions.'
		},
		setup: (bond) => {
			bondRef = bond;
			return () => {
				surface.cancel();
				bondRef = undefined;
			};
		}
	});
}

export interface PortalLayerCapabilityOptions {
	document?: DocumentSource;
	id?: string;
	zIndex?: number;
	contain?: boolean;
}

export interface PortalLayerSurface {
	readonly host: HTMLElement | undefined;
	readonly zIndex: number;
	nextZIndex(): number;
}

export function portalLayerCapability(
	options: PortalLayerCapabilityOptions = {}
): Capability<PortalLayerSurface> {
	let host = $state<HTMLElement | undefined>();
	let next = options.zIndex ?? 1000;
	const surface: PortalLayerSurface = {
		get host() {
			return host;
		},
		get zIndex() {
			return options.zIndex ?? 1000;
		},
		nextZIndex() {
			return ++next;
		}
	};

	return defineEffectCapability<PortalLayerSurface>({
		slot: PORTAL_LAYER,
		surface,
		meta: {
			docs: 'Creates and exposes a portal layer host with z-index allocation.'
		},
		setup: () => {
			const doc = resolveDocument(options.document);
			if (!doc?.body) return;
			const id = options.id ?? 'ixirjs-portal-layer';
			const existing = doc.getElementById(id) as HTMLElement | null;
			const created = !existing;
			host = existing ?? doc.createElement('div');
			host.id = id;
			host.dataset.svelteAtomsPortalLayer = '';
			host.style.position = 'relative';
			host.style.zIndex = String(options.zIndex ?? 1000);
			if (options.contain ?? true) host.style.contain = 'layout style';
			if (created) doc.body.append(host);
			return () => {
				if (created && host?.childNodes.length === 0) host.remove();
				host = undefined;
			};
		}
	});
}

function resolveScrollTarget(
	source: ScrollMeasurementCapabilityOptions['target'],
	bond: Bond
): Element | Window | undefined {
	if (!source) return typeof window !== 'undefined' ? window : undefined;
	if (isWindow(source) || source instanceof Element) return source;
	if (typeof source !== 'function') return undefined;
	const value = source(bond);
	return isWindow(value) || value instanceof Element ? value : undefined;
}

function measureScrollTarget(target: Element | Window): ScrollGeometry {
	if (target instanceof Window) {
		const doc = target.document.documentElement;
		return {
			x: target.scrollX,
			y: target.scrollY,
			width: target.innerWidth,
			height: target.innerHeight,
			scrollWidth: doc.scrollWidth,
			scrollHeight: doc.scrollHeight
		};
	}
	return {
		x: target.scrollLeft,
		y: target.scrollTop,
		width: target.clientWidth,
		height: target.clientHeight,
		scrollWidth: target.scrollWidth,
		scrollHeight: target.scrollHeight
	};
}

function calculateVirtualRange(options: VirtualWindowCapabilityOptions): VirtualWindowRange {
	const count = typeof options.count === 'function' ? options.count() : options.count;
	if (count <= 0) return emptyRange();
	const scroll = options.scroll?.measure() ?? {
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		scrollWidth: 0,
		scrollHeight: 0
	};
	const sizeAt = (index: number) =>
		typeof options.itemSize === 'function' ? options.itemSize(index) : options.itemSize;
	const itemSize = Math.max(sizeAt(0), 1);
	const overscan = options.overscan ?? 1;
	const start = clamp(Math.floor(scroll.y / itemSize), 0, count - 1);
	const visibleCount = Math.max(Math.ceil(scroll.height / itemSize), 1);
	const end = clamp(start + visibleCount, start + 1, count);
	const overscanStart = clamp(start - overscan, 0, count);
	const overscanEnd = clamp(end + overscan, overscanStart, count);
	return {
		start,
		end,
		overscanStart,
		overscanEnd,
		offsetBefore: overscanStart * itemSize,
		offsetAfter: Math.max(count - overscanEnd, 0) * itemSize
	};
}

function emptyRange(): VirtualWindowRange {
	return {
		start: 0,
		end: 0,
		overscanStart: 0,
		overscanEnd: 0,
		offsetBefore: 0,
		offsetAfter: 0
	};
}

function dragDetail(start: PointerEvent, current: PointerEvent): DocumentDragDetail {
	return {
		start,
		current,
		deltaX: current.clientX - start.clientX,
		deltaY: current.clientY - start.clientY
	};
}
