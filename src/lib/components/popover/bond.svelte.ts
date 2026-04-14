import { getContext, setContext, untrack } from 'svelte';
import { type ComputePositionReturn, type Placement } from '@floating-ui/dom';
import { Bond, BondState, type BondStateProps } from '$svelte-atoms/core/shared/bond.svelte';
import { BondAtom } from '$svelte-atoms/core/shared';
import { focus, focusTrap, getElementId, isBrowser } from '$svelte-atoms/core/utils/dom.svelte';
import type { PortalBond } from '../portal';
import type { PopoverStrategy } from './strategy-types';
import { createAttachmentKey } from 'svelte/attachments';

export type PopoverParams = {
	apply?: (
		node: HTMLElement,
		params: { x: number; y: number; dx: number; dy: number; open: boolean; offset: number }
	) => void;

	onchange?: (node: HTMLElement, params: ComputePositionReturn) => void;
};

export type PopoverEngineCleanup = () => void;
export type PopoverEngineParams = Record<string, unknown> & {
	onchange?: (node: HTMLElement, position: ComputePositionReturn) => void;
};
export type PopoverEngine = (
	bond: PopoverBond
) => (props: PopoverEngineParams, ...args: unknown[]) => PopoverEngineCleanup;

export type PopoverContentPropsParams = {
	engine?: 'internal' | PopoverEngine | undefined;
};

export type PopoverStateProps = BondStateProps & {
	open: boolean;
	disabled: boolean;
	placements: Placement[];
	placement: Placement | undefined;
	offset: number;
	portal?: string | PortalBond;
	strategy?: PopoverStrategy;
	readonly positionStrategy: 'fixed' | 'absolute';
	readonly rest?: Record<string, unknown>;
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

export class PopoverBond<
	Props extends PopoverStateProps = PopoverStateProps,
	State extends PopoverState<Props> = PopoverState<Props>,
	Elements extends PopoverDomElements = PopoverDomElements
> extends Bond<Props, State, Elements> {
	static CONTEXT_KEY = '@atomic-sv/bonds/popover';

	constructor(state: State) {
		super(state, 'popover');
	}

	/** Handle for granular access to trigger attrs, handlers, and attachment */
	trigger() {
		return this.atom('trigger', () => new PopoverTriggerAtom(this));
	}

	/** Handle for granular access to content attrs, handlers, and attachment */
	content() {
		return this.atom('content', () => new PopoverContentAtom(this));
	}

	/** Handle for granular access to arrow attrs and attachment */
	arrow() {
		return this.atom('arrow', () => new PopoverArrowAtom(this));
	}

	/** Handle for granular access to indicator attrs and attachment */
	indicator() {
		return this.atom('indicator', () => new PopoverIndicatorAtom(this));
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
	position = $state<ComputePositionReturn>();

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

export class PopoverArrowAtom extends BondAtom<PopoverBond, HTMLElement> {
	constructor(bond: PopoverBond) {
		super(bond, 'arrow');
	}

	override get attrs() {
		return {
			...super.attrs,
			role: 'presentation',
			'aria-hidden': true
		};
	}
}

export class PopoverContentAtom extends BondAtom<PopoverBond, HTMLElement> {
	constructor(bond: PopoverBond) {
		super(bond, 'content');
	}

	override get attrs() {
		const triggerId = getElementId(this.bond.id, `${this.bond.name}-trigger`);
		const isOpen = this.bond.state?.props?.open ?? false;
		const isDisabled = this.bond.state?.props?.disabled ?? false;
		const isActive = isOpen && !isDisabled;

		return {
			...super.attrs,
			role: 'dialog',
			'aria-modal': false,
			'aria-labelledby': triggerId,
			inert: !isActive ? true : undefined,
			tabindex: -1,
			'data-active': isActive
		};
	}

	override get handlers() {
		const isOpen = this.bond.state?.props?.open ?? false;

		const focusManager = (ev: KeyboardEvent) => {
			if (ev.key === 'Escape') {
				this.bond.state.close();
				this.bond.element<HTMLElement>('trigger')?.focus();
				return;
			}

			focusTrap(ev);
		};

		return {
			onkeydown: isOpen ? focusManager : undefined
		};
	}

	override onmount(node: HTMLElement) {
		const triggerElement = this.bond.element('trigger');

		if (!triggerElement) return;

		const isOpen = untrack(() => this.bond.state?.props)?.open ?? false;
		if (!isOpen) return;

		// Avoid stealing focus from inputs/textareas inside trigger
		const activeElement = document.activeElement as HTMLElement;
		const triggerContainsFocus =
			['input', 'textarea'].includes(activeElement.tagName.toLowerCase()) &&
			triggerElement.contains(activeElement);

		if (!triggerContainsFocus) {
			setTimeout(() => focus(node, ['textarea:not([disabled])', 'input:not([disabled])']), 0);
		}
	}
}

export class PopoverIndicatorAtom extends BondAtom<PopoverBond, HTMLElement> {
	constructor(bond: PopoverBond) {
		super(bond, 'indicator');
	}

	override get attrs() {
		const isOpen = this.bond.state?.props?.open ?? false;

		return {
			...super.attrs,
			'aria-hidden': true,
			'aria-live': isOpen ? ('polite' as const) : ('off' as const)
		};
	}
}

export class PopoverTriggerAtom extends BondAtom<PopoverBond, HTMLElement> {
	constructor(bond: PopoverBond) {
		super(bond, 'trigger');
	}

	override get attrs() {
		const isButtonElement = isBrowser() ? this.element instanceof HTMLButtonElement : false;

		const isDisabled = this.bond.state?.props?.disabled ?? false;
		const isOpen = this.bond.state?.props?.open ?? false;
		const overlayId = getElementId(this.bond.id, `${this.bond.name}-content`);

		return {
			...super.attrs,
			role: isButtonElement ? '' : 'button',
			disabled: isButtonElement ? isDisabled : undefined,
			tabindex: isDisabled ? -1 : 0,
			'aria-expanded': isOpen,
			'aria-disabled': isDisabled,
			'aria-controls': overlayId,
			'aria-haspopup': 'dialog'
		};
	}

	override get handlers() {
		return {
			onclick: (ev: PointerEvent) => {
				if (ev.button === 2) return;
				if (ev.defaultPrevented) return;
				this.bond.state.toggle();
			},
			onkeydown: (ev: KeyboardEvent) => {
				if (this.bond.state?.props?.disabled) return;

				if (ev.key === 'Enter' || ev.key === ' ') {
					this.bond.state.toggle();
					return;
				}

				if (ev.key === 'Tab') {
					this.bond.element<HTMLElement>('content')?.focus();
					return;
				}

				if (ev.key === 'Escape') {
					this.bond.state.close();
				}
			}
		};
	}
}
