import { getContext, setContext, untrack } from 'svelte';
import { createAttachmentKey } from 'svelte/attachments';
import {
	autoUpdate,
	computePosition,
	arrow,
	flip,
	offset,
	type ComputePositionConfig,
	type ComputePositionReturn,
	type Placement
} from '@floating-ui/dom';
import { getElementId, isBrowser } from '$svelte-atoms/core/utils/dom.svelte.js';
import { Bond, BondState, type BondStateProps } from '$svelte-atoms/core/shared/bond.svelte.js';
import type { PortalBond } from '../portal';

export type PopoverParams = {
	apply?: (
		node: HTMLElement,
		params: { x: number; y: number; dx: number; dy: number; open: boolean; offset: number }
	) => void;

	onchange?: (node: HTMLElement, params: ComputePositionReturn) => void;
};

export type PopoverStateProps<T extends Record<string, unknown> = Record<string, unknown>> =
	BondStateProps & {
		open: boolean;
		disabled: boolean;
		placements: Placement[];
		placement: Placement | undefined;
		offset: number;
		portal?: string | PortalBond;
		extend: T;
	};

export type TriggerParams = {
	onclick?: (ev: MouseEvent) => void;
};

export type PopoverDomElements = {
	trigger: HTMLElement;
	content: HTMLElement;
	indicator: HTMLElement;
	arrow: HTMLElement;
};

const POPOVER_ELEMENTS_KIND: Record<keyof PopoverDomElements, string> = {
	trigger: 'popover-trigger',
	content: 'popover-content',
	indicator: 'popover-indicator',
	arrow: 'popover-arrow'
};

export class PopoverBond<
	Props extends PopoverStateProps = PopoverStateProps,
	State extends PopoverState<Props> = PopoverState<Props>,
	Elements extends PopoverDomElements = PopoverDomElements
> extends Bond<Props, State, Elements> {
	static CONTEXT_KEY = '@atomic-sv/bonds/popover';

	position = $state<ComputePositionReturn>();

	constructor(state: State) {
		super(state);
	}

	trigger() {
		const isButtonElement = isBrowser()
			? this.elements.trigger instanceof HTMLButtonElement
			: false;

		const isDisabled = this.state?.props?.disabled ?? false;
		const isOpen = this.state?.props?.open ?? false;

		const kind = POPOVER_ELEMENTS_KIND.trigger;
		const id = getElementId(this.id, kind);
		const overlayId = getElementId(this.id, POPOVER_ELEMENTS_KIND.content);

		return {
			id,
			role: isButtonElement ? '' : 'button',
			disabled: isButtonElement ? isDisabled : undefined,
			tabindex: isDisabled ? -1 : 0,
			'aria-expanded': isOpen,
			'aria-disabled': isDisabled,
			'aria-controls': overlayId,
			'aria-haspopup': 'dialog',
			'data-kind': kind,
			onclick: (ev: PointerEvent) => {
				if (ev.button === 2) {
					return; // Ignore right-clicks
				}

				if (ev.defaultPrevented) {
					return;
				}

				this.state.toggle();
			},
			onkeydown: (ev: KeyboardEvent) => {
				if (isDisabled) return;

				// Toggle on Enter or Space
				if (ev.key === 'Enter' || ev.key === ' ') {
					ev.preventDefault();
					this.state.toggle();
				}
				// Close on Escape
				else if (ev.key === 'Escape' && isOpen) {
					ev.preventDefault();
					this.state.close();
				}
			},
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.trigger = node;

				const position = untrack(() => this.position);

				if (!position) {
					const init = async () => {
						popover(this)({
							onchange: (_node: HTMLElement, position: ComputePositionReturn) => {
								this.position = position;
							}
						});
						const pointerLeaveHandler = () => {
							node.removeEventListener('pointerenter', init);
							node.removeEventListener('pointerleave', pointerLeaveHandler);
						};

						node.addEventListener('pointerleave', pointerLeaveHandler);
					};

					node.addEventListener('pointerenter', init, { passive: true });

					return () => {
						node.removeEventListener('pointerenter', init);
					};
				}
			}
		};
	}

	content() {
		const kind = POPOVER_ELEMENTS_KIND.content;
		const id = getElementId(this.id, kind);
		const triggerId = getElementId(this.id, POPOVER_ELEMENTS_KIND.trigger);
		const isOpen = this.state?.props?.open ?? false;
		const isDisabled = this.state?.props?.disabled ?? false;
		const isActive = isOpen && !isDisabled;

		// Focus management
		const focusTrap = (ev: KeyboardEvent) => {
			const node = ev.currentTarget as HTMLElement;
			if (ev.key === 'Escape') {
				ev.preventDefault();
				this.state.close();
				this.elements.trigger?.focus();
			}
			// Tab trap - keep focus within popover
			else if (ev.key === 'Tab') {
				const focusableElements = node.querySelectorAll<HTMLElement>(
					'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
				);
				const firstElement = focusableElements[0];
				const lastElement = focusableElements[focusableElements.length - 1];

				if (ev.shiftKey && document.activeElement === firstElement) {
					ev.preventDefault();
					lastElement?.focus();
				} else if (!ev.shiftKey && document.activeElement === lastElement) {
					ev.preventDefault();
					firstElement?.focus();
				}
			}
		};

		return {
			id,
			role: 'dialog',
			'aria-modal': false,
			'aria-labelledby': triggerId,
			'aria-hidden': !isActive,
			inert: !isActive ? '' : undefined,
			tabindex: -1,
			'data-atom': this.id,
			'data-kind': 'content',
			'data-active': isActive,
			onkeydown: isOpen ? focusTrap : undefined,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.content = node;

				if (!this.elements.trigger) {
					return;
				}

				if (!this.state.isOpen) {
					return;
				}

				// Move focus to popover when opened
				setTimeout(() => {
					const firstFocusable = node.querySelector<HTMLElement>(
						'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
					);
					(firstFocusable || node).focus();
				}, 0);

				const cleanup = popover(this)(
					{
						onchange: (node: HTMLElement, position: ComputePositionReturn) => {
							this.position = position;
						}
					},
					autoUpdate
				);

				return () => {
					cleanup?.();
				};
			}
		};
	}

	indicator() {
		const kind = POPOVER_ELEMENTS_KIND.indicator;
		const id = getElementId(this.id, kind);
		const isOpen = this.state?.props?.open ?? false;

		return {
			id,
			'aria-hidden': true,
			'aria-live': isOpen ? 'polite' : 'off',
			'data-kind': kind,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.indicator = node;
			}
		};
	}

	arrow() {
		const kind = POPOVER_ELEMENTS_KIND.arrow;
		const id = getElementId(this.id, kind);

		return {
			id: id,
			role: 'presentation',
			'aria-hidden': true,
			'data-kind': kind,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.arrow = node;
			}
		};
	}

	share(): this {
		return PopoverBond.set(this) as this;
	}

	static override get(): PopoverBond {
		return getContext(PopoverBond.CONTEXT_KEY);
	}

	static override set(bond: PopoverBond) {
		return setContext(PopoverBond.CONTEXT_KEY, bond);
	}
}

export class PopoverState<
	Props extends PopoverStateProps = PopoverStateProps
> extends BondState<Props> {
	constructor(props: () => Props) {
		super(props);
	}

	get isOpen() {
		return this.props.open ?? false;
	}

	open() {
		this.props.open = true;
	}

	close() {
		this.props.open = false;
	}

	toggle() {
		this.props.open = !this.props.open;
	}
}

function popover(bond: PopoverBond) {
	return (props: Record<string, unknown>, updater?: typeof autoUpdate) => {
		const { offset: ofs, placements, placement } = bond.state.props;

		// Guard: ensure required elements exist
		if (!bond.elements.content || !bond.elements.trigger) {
			return;
		}

		const { content, trigger, arrow: arrowElement } = bond.elements;

		// Build middleware stack
		const middleware: ComputePositionConfig['middleware'] = [
			offset(ofs),
			flip({
				fallbackPlacements: placements,
				padding: 4
			})
		];

		// Add arrow middleware if element exists
		if (arrowElement) {
			middleware.push(arrow({ element: arrowElement }));
		}

		// Debounce position change callback
		const onchangeCallback = props.onchange as PopoverParams['onchange'];

		// Compute position and notify listeners
		const compute = async () => {
			// Wait for next frame to ensure DOM has settled and styles are applied
			// Double requestAnimationFrame - This ensures the browser has completed both layout calculation AND painting, giving us accurate final dimensions
			await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

			const position = await computePosition(trigger, content, {
				placement: placement ?? 'bottom',
				middleware
			});

			onchangeCallback?.(content, position);

			// Set minimum width to match trigger
			requestAnimationFrame(() => {
				content.style.minWidth = `${trigger.clientWidth}px`;
			});
		};

		// Use auto-update if provided, otherwise compute once
		if (updater) {
			return updater(trigger, content, compute, {});
		}

		compute();
	};
}
