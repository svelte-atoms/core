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
import { debounce } from 'es-toolkit';
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

	#position = $state<ComputePositionReturn>();

	constructor(state: State) {
		super(state);
	}

	get position() {
		return this.#position;
	}

	trigger(props: Record<string, unknown> = {}) {
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
			role: isButtonElement ? '' : 'button', // Ensure trigger is announced as a button
			disabled: isButtonElement ? isDisabled : undefined,
			tabindex: isDisabled ? -1 : 0, // Make focusable unless disabled
			'aria-expanded': isOpen,
			'aria-disabled': isDisabled,
			'aria-controls': overlayId,
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
			...props,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.trigger = node;

				const position = untrack(() => this.#position);

				if (!position) {
					const init = async () => {
						popover(this)(node, {
							...props,
							onchange: (node: HTMLElement, position: ComputePositionReturn) => {
								this.#position = position;
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

	content(props: Record<string, unknown> = {}) {
		const kind = POPOVER_ELEMENTS_KIND.content;
		const id = getElementId(this.id, kind);
		const triggerId = getElementId(this.id, POPOVER_ELEMENTS_KIND.trigger);
		const isOpen = this.state?.props?.open ?? false;
		const isDisabled = this.state?.props?.disabled ?? false;
		const isActive = isOpen && !isDisabled;

		return {
			id,
			role: 'dialog', // Announce as dialog
			'aria-modal': true, // Modal dialog
			'aria-labelledby': triggerId, // Link overlay to trigger
			'aria-controlledby': triggerId, // Link overlay to trigger
			'data-atom': this.id,
			'data-kind': 'overlay',
			'data-active': isActive,
			...props,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.content = node;

				if (!this.elements.trigger) {
					return;
				}

				if (!this.state.isOpen) return;

				return popover(this)(
					node,
					{
						...props,
						onchange: (node: HTMLElement, position: ComputePositionReturn) => {
							this.#position = position;
							props.onchange?.(node, position);
						}
					},
					autoUpdate
				);
			}
		};
	}

	indicator(props: Record<string, unknown> = {}) {
		const kind = POPOVER_ELEMENTS_KIND.indicator;
		const id = getElementId(this.id, kind);
		const triggerId = getElementId(this.id, POPOVER_ELEMENTS_KIND.trigger);

		return {
			id,
			'aria-controlledby': triggerId,
			'data-kind': kind,
			...props,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.indicator = node;
			}
		};
	}

	arrow(props: Record<string, unknown> = {}) {
		const kind = POPOVER_ELEMENTS_KIND.arrow;
		const id = getElementId(this.id, kind);

		return {
			id: id,
			'data-kind': kind,
			...props,
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
	return (node: HTMLElement, props: Record<string, unknown>, updater?: typeof autoUpdate) => {
		const { offset: ofs, placements, placement } = bond.state.props;

		if (!bond.elements.content) {
			return;
		}

		if (!bond.elements.trigger) {
			return;
		}

		bond.elements.content.style.minWidth = bond.elements.trigger.clientWidth + 'px';

		const middleware: ComputePositionConfig['middleware'] = [];

		if (bond.elements.arrow) {
			middleware.push(arrow({ element: bond.elements.arrow }));
		}

		const onchangeDebounced = debounce((node, position) => {
			props.onchange?.(node, position);
		}, 1000 / 60);

		const compute = async () => {
			const position = await computePosition(bond.elements.trigger, node, {
				placement,
				middleware: [
					offset(ofs),
					flip({
						fallbackPlacements: placements,
						padding: 4
					}),
					...middleware
				]
			});

			onchangeDebounced?.(node, position);
		};

		if (updater) {
			return updater(bond.elements.trigger, node, compute, {});
		}

		compute();
	};
}
