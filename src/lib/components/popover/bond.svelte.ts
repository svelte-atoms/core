import { type ComputePositionReturn, type Placement } from '@floating-ui/dom';
import { Atom, defineAtom, type BondVirtualElement } from '$svelte-atoms/core/shared/bond';
import { defineBond, type BondOf, type BondSpec } from '$svelte-atoms/core/shared';
import {
	OverlayBond,
	OverlayTriggerAtom,
	positionedCapabilities,
	trappedFocus,
	type OverlayStateProps,
	type OverlayView,
	type PositionedOverlayElements
} from '$svelte-atoms/core/components/portal/host';
import type { PortalBond } from '$svelte-atoms/core/components/portal';
import type { PopoverStrategy } from '$svelte-atoms/core/components/popover/strategy-types';
import {
	popoverTailPresentation,
	popoverContentPresentation,
	popoverIndicatorPresentation,
	popoverOverlayPresentation,
	popoverTriggerPresentation
} from '$svelte-atoms/core/components/popover/presentation.svelte';

export {
	getPopoverPosition,
	notifyPopoverComputed,
	popoverNode,
	setPopoverTracking,
	shouldTrackPopoverPosition
} from '$svelte-atoms/core/components/popover/legacy-state';

// -----------------------------------------------------------------------------
// Public types
// -----------------------------------------------------------------------------

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

export type PopoverBondProps = OverlayStateProps & {
	disabled: boolean;
	placements: Placement[];
	placement: Placement | undefined;
	offset: number;
	// CSS positioning strategy for the floating content. Set explicitly by the consumer;
	// always authoritative (a host overlay no longer forces it). Defaults to 'absolute'.
	position: 'fixed' | 'absolute';
	portal?: string | PortalBond;
	strategy?: PopoverStrategy;
};

export type PopoverStateProps = PopoverBondProps;

export type TriggerParams = {
	onclick?: (ev: MouseEvent) => void;
};

export type PopoverDomElements = PositionedOverlayElements & {
	trigger?: HTMLElement;
	'virtual-trigger'?: BondVirtualElement;
	overlay?: HTMLElement;
	content?: HTMLElement;
	indicator?: HTMLElement;
	tail?: HTMLElement;
};

// -----------------------------------------------------------------------------
// Capability slots and shared helpers
// -----------------------------------------------------------------------------

// Positioned defaults (click trigger, escape, restore-to-trigger) + trapped-focus override.
// Shared by PopoverBond constructor and popoverSpec so they never drift.
function popoverCapabilities() {
	return [
		...positionedCapabilities(),
		trappedFocus({ restoreFocus: 'trigger', captureFocusOnOpen: false })
	];
}

// -----------------------------------------------------------------------------
// Bond implementation
// -----------------------------------------------------------------------------

// Floating-positioned disclosure with optional tail/indicator/virtual-trigger.
// Overlay behaviour via capabilities; adds Tab->focus-content and Tab-trap within content.
export class PopoverBondBase<
	Props extends PopoverBondProps = PopoverBondProps
> extends OverlayBond<Props> {
	position = $state<ComputePositionReturn>();
	// Whether position should be actively computed. Defaults to `open`; can be overridden
	// to keep computing while hiding or to start computing on hover before open.
	tracking = $state<boolean | undefined>(undefined);

	#computedResolve!: (position: ComputePositionReturn) => void;
	// Resolves with the next computed position; renewed after each resolution.
	computed: Promise<ComputePositionReturn> = this.#createComputed();

	constructor(props: Props, name = 'popover') {
		super(props, name);
	}

	#createComputed() {
		return new Promise<ComputePositionReturn>((resolve) => {
			this.#computedResolve = resolve;
		});
	}

	// Notify awaiters of a fresh computation and renew the promise.
	notifyComputed(position: ComputePositionReturn) {
		this.position = position;
		this.#computedResolve(position);
		this.computed = this.#createComputed();
	}

	get shouldTrackPosition() {
		return this.tracking ?? this.isOpen;
	}
}

type PopoverBondView = PopoverBondBase<PopoverBondProps>;

// -----------------------------------------------------------------------------
// Atom factory extension point
// -----------------------------------------------------------------------------

type PopoverHTMLElementNode = Atom<PopoverBond, HTMLElement>;

export function createPopoverAtom<N extends PopoverHTMLElementNode>(
	bond: PopoverBond,
	key: string,
	fallback: (bond: PopoverBond) => N
): N {
	const method = (bond as unknown as Record<string, unknown>)[key];
	if (typeof method === 'function') return method.call(bond) as N;
	return fallback(bond);
}

// -----------------------------------------------------------------------------
// Atom definitions
// -----------------------------------------------------------------------------

export const PopoverTailAtom = defineAtom<OverlayView, HTMLElement>('tail', (atom) => {
	atom.capability(popoverTailPresentation());
});
export type PopoverTailAtom = InstanceType<typeof PopoverTailAtom>;

export class PopoverVirtualTriggerAtom<B extends OverlayView = PopoverBondView> extends Atom<
	B,
	BondVirtualElement
> {
	constructor(bond: B) {
		super(bond, 'virtual-trigger');
	}

	override get attrs() {
		return {};
	}

	override get handlers() {
		return {};
	}

	override get attachments() {
		return {};
	}

	override get spread() {
		return {};
	}

	override get element() {
		return super.element;
	}

	override set element(element: BondVirtualElement | undefined) {
		this.setElement(element);
	}
}

// Overlay container atom: owns the dialog ARIA contract and the focus-trap/escape
// capabilities via `.role('surface')`.
export const PopoverOverlayAtom = defineAtom<OverlayView, HTMLElement>('overlay', (atom) => {
	atom.role('surface');
	atom.capability(popoverOverlayPresentation());
});
export type PopoverOverlayAtom = InstanceType<typeof PopoverOverlayAtom>;

// No hand-written handlers: focus-trap + escape onkeydown come from `.role('surface')`.

export const PopoverContentAtom = defineAtom<OverlayView, HTMLElement>('content', (atom) => {
	atom.capability(popoverContentPresentation());
});
export type PopoverContentAtom = InstanceType<typeof PopoverContentAtom>;

export const PopoverIndicatorAtom = defineAtom<OverlayView, HTMLElement>('indicator', (atom) => {
	atom.capability(popoverIndicatorPresentation());
});
export type PopoverIndicatorAtom = InstanceType<typeof PopoverIndicatorAtom>;

// Extends OverlayTriggerAtom with role="button" (non-button), disabled attr (button),
// Tab->focus-content, and Escape->close routing.
export const PopoverTriggerAtom = defineAtom(OverlayTriggerAtom, (atom) => {
	atom.capability(popoverTriggerPresentation());
});
export type PopoverTriggerAtom = InstanceType<typeof PopoverTriggerAtom>;

// -----------------------------------------------------------------------------
// Bond spec and constructor facade
// -----------------------------------------------------------------------------

// Fusion spec (§9.4.1): exposes popover's atoms + capabilities to fuse() without
// converting the generic PopoverBond to a defineBond. Pass as `{ spec: popoverSpec }`.
export const popoverSpec = {
	name: 'popover',
	base: PopoverBondBase,
	atoms: {
		trigger: PopoverTriggerAtom,
		'virtual-trigger': PopoverVirtualTriggerAtom,
		overlay: PopoverOverlayAtom,
		content: PopoverContentAtom,
		tail: PopoverTailAtom,
		indicator: PopoverIndicatorAtom
	},
	capabilities: popoverCapabilities
} satisfies BondSpec<
	{
		trigger: typeof PopoverTriggerAtom;
		'virtual-trigger': typeof PopoverVirtualTriggerAtom;
		overlay: typeof PopoverOverlayAtom;
		content: typeof PopoverContentAtom;
		tail: typeof PopoverTailAtom;
		indicator: typeof PopoverIndicatorAtom;
	},
	typeof PopoverBondBase
>;

const PopoverBondImpl = defineBond<
	{
		trigger: typeof PopoverTriggerAtom;
		'virtual-trigger': typeof PopoverVirtualTriggerAtom;
		overlay: typeof PopoverOverlayAtom;
		content: typeof PopoverContentAtom;
		tail: typeof PopoverTailAtom;
		indicator: typeof PopoverIndicatorAtom;
	},
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	any,
	typeof PopoverBondBase
>(popoverSpec);

// Propagate OverlayBond's owner context through composed families that share Popover's context.
Object.defineProperty(PopoverBondImpl, 'CONTEXT_KEYS', {
	value: [PopoverBondImpl.CONTEXT_KEY, OverlayBond.CONTEXT_KEY],
	writable: true,
	configurable: true
});

export type PopoverBond = BondOf<typeof PopoverBondImpl>;

interface PopoverBondConstructor {
	new (props: PopoverBondProps): PopoverBond;
	readonly CONTEXT_KEY: string;
	readonly CONTEXT_KEYS?: readonly string[];
	readonly spec: (typeof PopoverBondImpl)['spec'];
	get(): PopoverBond | undefined;
	getOrThrow(message?: string): PopoverBond;
	set(bond: PopoverBond): PopoverBond;
	create(props: PopoverBondProps): PopoverBond;
}

export const PopoverBond = PopoverBondImpl as unknown as PopoverBondConstructor;
