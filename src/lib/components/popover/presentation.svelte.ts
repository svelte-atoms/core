import { untrack } from 'svelte';
import {
	defineAtomCapability,
	sharedCapabilityKey,
	type AtomHost
} from '$svelte-atoms/core/shared/capability';
import { focus, getElementId, isBrowser } from '$svelte-atoms/core/utils/dom.svelte';
import type { OverlayView } from '$svelte-atoms/core/components/portal/host';
import {
	closeOverlay,
	overlayIsDisabled,
	overlayIsOpen
} from '$svelte-atoms/core/components/portal/host/policies/overlay-view';
import { popoverNode } from '$svelte-atoms/core/components/popover/legacy-state';

const POPOVER_ARROW = sharedCapabilityKey<void>('@svelte-atoms/popover:arrow');
const POPOVER_OVERLAY = sharedCapabilityKey<void>('@svelte-atoms/popover:overlay');
const POPOVER_CONTENT = sharedCapabilityKey<void>('@svelte-atoms/popover:content');
const POPOVER_INDICATOR = sharedCapabilityKey<void>('@svelte-atoms/popover:indicator');
const POPOVER_TRIGGER = sharedCapabilityKey<void>('@svelte-atoms/popover:trigger');

export function popoverArrowPresentation<B extends OverlayView>() {
	return defineAtomCapability<void, AtomHost, B>({
		slot: POPOVER_ARROW,
		meta: {
			layer: 1,
			kind: 'projection',
			projects: ['arrow'],
			docs: 'Popover arrow presentational ARIA projection.'
		},
		behavior: {
			attrs: () => ({
				role: 'presentation',
				'aria-hidden': true
			})
		}
	});
}

export function popoverOverlayPresentation<B extends OverlayView>() {
	return defineAtomCapability<void, AtomHost, B, HTMLElement>({
		slot: POPOVER_OVERLAY,
		meta: {
			layer: 1,
			kind: 'projection',
			projects: ['overlay'],
			docs: 'Popover overlay dialog ARIA, active-state projection, and open-focus behavior.'
		},
		behavior: {
			attrs: (_node, bond) => {
				if (!bond) return {};
				const triggerId = getElementId(bond.id, `${bond.namespace}-trigger`);
				const isOpen = overlayIsOpen(bond);
				const isDisabled = overlayIsDisabled(bond);
				const isActive = isOpen && !isDisabled;

				return {
					role: 'dialog',
					'aria-modal': false,
					'aria-labelledby': triggerId,
					inert: !isActive ? true : undefined,
					tabindex: -1,
					'data-active': isActive
				};
			},
			onmount: (element, _node, bond) => {
				if (!bond) return;
				const triggerElement = popoverNode(bond, 'trigger')?.element as Element | undefined;
				if (!triggerElement) return;

				const isOpen = untrack(() => overlayIsOpen(bond));
				if (!isOpen) return;

				const activeElement = document.activeElement as HTMLElement;
				const triggerContainsFocus =
					['input', 'textarea'].includes(activeElement.tagName.toLowerCase()) &&
					triggerElement.contains(activeElement);

				if (!triggerContainsFocus) {
					setTimeout(
						() => focus(element, ['textarea:not([disabled])', 'input:not([disabled])']),
						0
					);
				}
			}
		}
	});
}

export function popoverContentPresentation<B extends OverlayView>() {
	return defineAtomCapability<void, AtomHost, B>({
		slot: POPOVER_CONTENT,
		meta: {
			layer: 1,
			kind: 'projection',
			projects: ['content'],
			docs: 'Popover content active-state projection.'
		},
		behavior: {
			attrs: (_node, bond) => {
				if (!bond) return {};
				const isOpen = overlayIsOpen(bond);
				const isDisabled = overlayIsDisabled(bond);
				return {
					'data-active': isOpen && !isDisabled
				};
			}
		}
	});
}

export function popoverIndicatorPresentation<B extends OverlayView>() {
	return defineAtomCapability<void, AtomHost, B>({
		slot: POPOVER_INDICATOR,
		meta: {
			layer: 1,
			kind: 'projection',
			projects: ['indicator'],
			docs: 'Popover indicator live-state projection.'
		},
		behavior: {
			attrs: (_node, bond) => {
				const isOpen = bond ? overlayIsOpen(bond) : false;
				return {
					'aria-hidden': true,
					'aria-live': isOpen ? ('polite' as const) : ('off' as const)
				};
			}
		}
	});
}

export function popoverTriggerPresentation<B extends OverlayView>() {
	return defineAtomCapability<void, AtomHost, B>({
		slot: POPOVER_TRIGGER,
		meta: {
			layer: 1,
			kind: 'policy',
			projects: ['trigger'],
			docs: 'Popover trigger button semantics and keyboard routing.'
		},
		behavior: {
			attrs: (node, bond) => {
				const isButtonElement = isBrowser() ? node.element instanceof HTMLButtonElement : false;
				const isDisabled = bond ? overlayIsDisabled(bond) : false;
				return {
					role: isButtonElement ? '' : 'button',
					disabled: isButtonElement ? isDisabled : undefined
				};
			},
			handlers: (_node, bond) => ({
				onkeydown: (ev: KeyboardEvent) => {
					if (!bond || overlayIsDisabled(bond)) return;

					if (ev.key === 'Tab') {
						(popoverNode(bond, 'content')?.element as HTMLElement | undefined)?.focus();
						return;
					}

					if (ev.key === 'Escape') {
						closeOverlay(bond);
					}
				}
			})
		}
	});
}
