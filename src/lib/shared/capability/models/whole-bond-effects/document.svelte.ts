import {
	defineEffectCapability,
	sharedCapabilityKey,
	type Capability
} from '$ixirjs/ui/shared/capability/capability';
import type { Bond } from '$ixirjs/ui/shared/bond';
import { isBrowser } from '$ixirjs/ui/utils/dom.svelte';
import {
	firstElement,
	isEnabled,
	isInsideSource,
	listen,
	resolveDocument,
	resolveElements,
	type DocumentSource,
	type EffectGuard,
	type ElementSource
} from '$ixirjs/ui/shared/capability/models/whole-bond-effects/shared';

export const OUTSIDE_PRESS_LISTENER = sharedCapabilityKey<OutsidePressListenerSurface>(
	'@ixirjs/cap:outside-press-listener'
);
export const BODY_SCROLL_LOCK = sharedCapabilityKey<BodyScrollLockSurface>(
	'@ixirjs/cap:body-scroll-lock'
);
export const INERT_SIBLINGS = sharedCapabilityKey<InertSiblingsSurface>(
	'@ixirjs/cap:inert-siblings'
);

export interface OutsidePressListenerOptions {
	event?: 'pointerdown' | 'mousedown' | 'click';
	targets?: ElementSource;
	ignore?: ElementSource;
	enabled?: EffectGuard;
	listen?: boolean;
	onOutsidePress?: (event: PointerEvent | MouseEvent, bond: Bond) => void;
}

export interface OutsidePressListenerSurface {
	configure(options: OutsidePressListenerOptions): () => void;
	handle(
		event: PointerEvent | MouseEvent,
		bond: Bond,
		options?: OutsidePressListenerOptions
	): boolean;
}

export function outsidePressListener(
	options: OutsidePressListenerOptions = {}
): Capability<OutsidePressListenerSurface> {
	let runtime: OutsidePressListenerOptions = {};
	const surface: OutsidePressListenerSurface = {
		configure(next) {
			runtime = { ...runtime, ...next };
			return () => {
				for (const key of Object.keys(next) as (keyof OutsidePressListenerOptions)[]) {
					if (Object.is(runtime[key], next[key])) delete runtime[key];
				}
			};
		},
		handle(event, bond, next = {}) {
			const config = { ...options, ...runtime, ...next };
			if (!isEnabled(config.enabled, bond)) return false;
			if (isInsideSource(config.ignore, bond, event.target)) return false;
			if (isInsideSource(config.targets, bond, event.target)) return false;
			config.onOutsidePress?.(event, bond);
			return true;
		}
	};

	return defineEffectCapability<OutsidePressListenerSurface>({
		slot: OUTSIDE_PRESS_LISTENER,
		surface,
		meta: {
			docs: 'Global outside pointer listener with configurable inside and ignored targets.'
		},
		setup: (bond) => {
			if (options.listen === false) return;
			if (!isBrowser()) return;
			const type = options.event ?? 'pointerdown';
			return listen(
				window,
				type,
				(event) => surface.handle(event as PointerEvent | MouseEvent, bond),
				{
					capture: true
				}
			);
		}
	});
}

export interface BodyScrollLockOptions {
	enabled?: EffectGuard;
	target?: ElementSource;
	document?: DocumentSource;
	paddingCompensation?: boolean;
}

export interface BodyScrollLockSurface {
	readonly locked: boolean;
}

export function bodyScrollLock(
	options: BodyScrollLockOptions = {}
): Capability<BodyScrollLockSurface> {
	let locked = $state(false);
	const surface: BodyScrollLockSurface = {
		get locked() {
			return locked;
		}
	};

	return defineEffectCapability<BodyScrollLockSurface>({
		slot: BODY_SCROLL_LOCK,
		surface,
		meta: {
			docs: 'Prevents background scroll while enabled, restoring body styles on teardown.'
		},
		setup: (bond) => {
			$effect(() => {
				const doc = resolveDocument(options.document);
				const target = firstElement(options.target, bond) ?? doc?.body;
				if (!target) return;
				if (!isEnabled(options.enabled, bond)) return;

				const body = target as HTMLElement;
				const previousOverflow = body.style.overflow;
				const previousPaddingRight = body.style.paddingRight;
				body.style.overflow = 'hidden';

				if (options.paddingCompensation) {
					const scrollbar =
						(doc?.defaultView?.innerWidth ?? 0) - (doc?.documentElement.clientWidth ?? 0);
					if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
				}

				locked = true;
				return () => {
					body.style.overflow = previousOverflow;
					body.style.paddingRight = previousPaddingRight;
					locked = false;
				};
			});
		}
	});
}

export interface InertSiblingsOptions {
	enabled?: EffectGuard;
	target?: ElementSource;
	siblings?: ElementSource;
	root?: ElementSource;
	ariaHidden?: boolean;
}

export interface InertSiblingsSurface {
	readonly inerted: readonly Element[];
}

export function inertSiblings(
	options: InertSiblingsOptions = {}
): Capability<InertSiblingsSurface> {
	let inerted = $state<Element[]>([]);
	const surface: InertSiblingsSurface = {
		get inerted() {
			return inerted;
		}
	};

	return defineEffectCapability<InertSiblingsSurface>({
		slot: INERT_SIBLINGS,
		surface,
		meta: {
			docs: 'Marks background or sibling roots inert while a surface is active.'
		},
		setup: (bond) => {
			$effect(() => {
				if (!isEnabled(options.enabled, bond)) return;
				const siblings = resolveInertSiblings(options, bond);
				if (siblings.length === 0) return;
				inerted = siblings;
				const restore = siblings.map((element) => setInert(element, options.ariaHidden ?? true));
				return () => {
					for (const undo of restore.reverse()) undo();
					inerted = [];
				};
			});
		}
	});
}

function resolveInertSiblings(options: InertSiblingsOptions, bond: Bond): Element[] {
	if (options.siblings) return resolveElements(options.siblings, bond);
	const targets = resolveElements(options.target, bond);
	if (targets.length === 0) return [];
	const root = firstElement(options.root, bond);
	const siblings = new Set<Element>();
	for (const target of targets) {
		const parent = root ?? target.parentElement;
		if (!parent) continue;
		for (const child of Array.from(parent.children)) {
			if (targets.some((item) => item === child || item.contains(child))) continue;
			siblings.add(child);
		}
	}
	return [...siblings];
}

function setInert(element: Element, ariaHidden: boolean): () => void {
	const node = element as HTMLElement & { inert?: boolean };
	const previousInert = node.inert;
	const previousAriaHidden = element.getAttribute('aria-hidden');
	node.inert = true;
	if (ariaHidden) element.setAttribute('aria-hidden', 'true');
	return () => {
		node.inert = previousInert;
		if (ariaHidden) {
			if (previousAriaHidden === null) element.removeAttribute('aria-hidden');
			else element.setAttribute('aria-hidden', previousAriaHidden);
		}
	};
}
