import {
	defineEffectCapability,
	sharedCapabilityKey,
	type Capability
} from '$ixirjs/ui/shared/capability/capability';
import type { Bond } from '$ixirjs/ui/shared/bond';
import { isBrowser } from '$ixirjs/ui/utils/dom.svelte';
import {
	GEOMETRY,
	type GeometryRect
} from '$ixirjs/ui/shared/capability/models/geometry.svelte';
import {
	domRectToGeometry,
	noop,
	observerKey
} from '$ixirjs/ui/shared/capability/models/whole-bond-effects/shared';

export const RESIZE_OBSERVER = sharedCapabilityKey<ResizeObserverSurface>(
	'@ixirjs/cap:resize-observer'
);
export const INTERSECTION_OBSERVER = sharedCapabilityKey<IntersectionObserverSurface>(
	'@ixirjs/cap:intersection-observer'
);
export const MUTATION_OBSERVER = sharedCapabilityKey<MutationObserverSurface>(
	'@ixirjs/cap:mutation-observer'
);

export interface ObserverProjectionOptions {
	roles?: readonly string[];
	key?: string | ((element: Element, bond: Bond) => string);
}

export interface ResizeObserverCapabilityOptions extends ObserverProjectionOptions {
	box?: ResizeObserverBoxOptions;
	onResize?: (entry: ResizeObserverEntry, bond: Bond) => void;
}

export interface ResizeObserverSurface {
	observe(element: Element, key?: string): () => void;
	entry(element: Element): ResizeObserverEntry | undefined;
	rect(key: string): GeometryRect | undefined;
	readonly observed: readonly Element[];
}

export function resizeObserverCapability(
	options: ResizeObserverCapabilityOptions = {}
): Capability<ResizeObserverSurface> {
	let bondRef: Bond | undefined;
	let observer: ResizeObserver | undefined;
	let observed = $state<Element[]>([]);
	const entries = new Map<Element, ResizeObserverEntry>();
	const rects = new Map<string, GeometryRect>();
	const keys = new Map<Element, string>();
	const surface: ResizeObserverSurface = {
		observe(element, key) {
			if (!isBrowser() || typeof ResizeObserver === 'undefined') return noop;
			const geometryKey = key ?? observerKey(element, bondRef, options.key);
			keys.set(element, geometryKey);
			observer ??= new ResizeObserver((nextEntries) => {
				for (const entry of nextEntries) {
					entries.set(entry.target, entry);
					const currentKey = keys.get(entry.target);
					if (currentKey) {
						const rect = domRectToGeometry(entry.contentRect);
						rects.set(currentKey, rect);
						bondRef?.surface(GEOMETRY)?.setRect(currentKey, rect);
					}
					if (bondRef) options.onResize?.(entry, bondRef);
				}
			});
			if (!observed.includes(element)) observed = [...observed, element];
			observer.observe(element, options.box ? { box: options.box } : undefined);
			return () => {
				observer?.unobserve(element);
				entries.delete(element);
				const currentKey = keys.get(element);
				if (currentKey) {
					rects.delete(currentKey);
					bondRef?.surface(GEOMETRY)?.clear(currentKey);
				}
				keys.delete(element);
				observed = observed.filter((item) => item !== element);
			};
		},
		entry(element) {
			return entries.get(element);
		},
		rect(key) {
			return rects.get(key);
		},
		get observed() {
			return observed;
		}
	};

	return defineObserverEffect(RESIZE_OBSERVER, surface, options, {
		docs: 'Observes element size and updates the geometry surface when available.',
		setup(bond) {
			bondRef = bond;
			return () => {
				observer?.disconnect();
				observer = undefined;
				observed = [];
				entries.clear();
				rects.clear();
				keys.clear();
			};
		}
	});
}

export interface IntersectionObserverCapabilityOptions extends ObserverProjectionOptions {
	root?: Element | Document | null;
	rootMargin?: string;
	threshold?: number | readonly number[];
	onIntersect?: (entry: IntersectionObserverEntry, bond: Bond) => void;
}

export interface IntersectionObserverSurface {
	observe(element: Element, key?: string): () => void;
	entry(element: Element): IntersectionObserverEntry | undefined;
	isIntersecting(element: Element): boolean;
	readonly observed: readonly Element[];
}

export function intersectionObserverCapability(
	options: IntersectionObserverCapabilityOptions = {}
): Capability<IntersectionObserverSurface> {
	let bondRef: Bond | undefined;
	let observer: IntersectionObserver | undefined;
	let observed = $state<Element[]>([]);
	const entries = new Map<Element, IntersectionObserverEntry>();
	const surface: IntersectionObserverSurface = {
		observe(element) {
			if (!isBrowser() || typeof IntersectionObserver === 'undefined') return noop;
			const observerOptions: IntersectionObserverInit = {};
			const root = options.root instanceof Document ? null : options.root;
			if (root !== undefined) observerOptions.root = root;
			if (options.rootMargin !== undefined) observerOptions.rootMargin = options.rootMargin;
			if (options.threshold !== undefined) {
				const threshold = options.threshold;
				observerOptions.threshold =
					typeof threshold === 'number' ? threshold : Array.from(threshold);
			}
			observer ??= new IntersectionObserver((nextEntries) => {
				for (const entry of nextEntries) {
					entries.set(entry.target, entry);
					if (bondRef) options.onIntersect?.(entry, bondRef);
				}
			}, observerOptions);
			if (!observed.includes(element)) observed = [...observed, element];
			observer.observe(element);
			return () => {
				observer?.unobserve(element);
				entries.delete(element);
				observed = observed.filter((item) => item !== element);
			};
		},
		entry(element) {
			return entries.get(element);
		},
		isIntersecting(element) {
			return entries.get(element)?.isIntersecting ?? false;
		},
		get observed() {
			return observed;
		}
	};

	return defineObserverEffect(INTERSECTION_OBSERVER, surface, options, {
		docs: 'Observes element visibility and intersection state.',
		setup(bond) {
			bondRef = bond;
			return () => {
				observer?.disconnect();
				observer = undefined;
				observed = [];
				entries.clear();
			};
		}
	});
}

export interface MutationObserverCapabilityOptions extends ObserverProjectionOptions {
	init?: MutationObserverInit;
	onMutation?: (records: MutationRecord[], bond: Bond) => void;
}

export interface MutationObserverSurface {
	observe(element: Node): () => void;
	readonly records: readonly MutationRecord[];
	readonly observed: readonly Node[];
	takeRecords(): MutationRecord[];
}

export function mutationObserverCapability(
	options: MutationObserverCapabilityOptions = {}
): Capability<MutationObserverSurface> {
	let bondRef: Bond | undefined;
	let observer: MutationObserver | undefined;
	let records = $state<MutationRecord[]>([]);
	let observed = $state<Node[]>([]);
	const surface: MutationObserverSurface = {
		observe(node) {
			if (!isBrowser() || typeof MutationObserver === 'undefined') return noop;
			observer ??= new MutationObserver((nextRecords) => {
				records = [...records, ...nextRecords];
				if (bondRef) options.onMutation?.(nextRecords, bondRef);
			});
			if (!observed.includes(node)) observed = [...observed, node];
			observer.observe(node, options.init ?? { childList: true, subtree: true, attributes: true });
			return () => {
				observer?.disconnect();
				observed = observed.filter((item) => item !== node);
			};
		},
		get records() {
			return records;
		},
		get observed() {
			return observed;
		},
		takeRecords() {
			const taken = observer?.takeRecords() ?? [];
			if (taken.length > 0) records = [...records, ...taken];
			return taken;
		}
	};

	return defineObserverEffect(MUTATION_OBSERVER, surface, options, {
		docs: 'Observes DOM mutations for registered targets.',
		setup(bond) {
			bondRef = bond;
			return () => {
				observer?.disconnect();
				observer = undefined;
				records = [];
				observed = [];
			};
		}
	});
}

function defineObserverEffect<Surface>(
	slot: symbol,
	surface: Surface,
	options: ObserverProjectionOptions,
	config: { docs: string; setup: (bond: Bond) => void | (() => void) }
): Capability<Surface> {
	const roles = options.roles ?? [];
	return defineEffectCapability<Surface>({
		slot,
		surface,
		meta: {
			projects: roles,
			docs: config.docs
		},
		setup: config.setup,
		behavior: (role) =>
			roles.includes(role)
				? {
						onmount: (node, bond) => {
							if (!(node instanceof Element)) return;
							const observe = (
								surface as { observe?: (element: Element, key?: string) => () => void }
							).observe;
							return observe?.(node, observerKey(node, bond, options.key));
						}
					}
				: undefined
	});
}
