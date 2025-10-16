import { tick, untrack } from 'svelte';
import {
	type AutoPlacementOptions,
	type ComputePositionReturn,
	type Placement,
	autoPlacement,
	autoUpdate,
	computePosition,
	offset
} from '@floating-ui/dom';
import { port } from './portal.svelte';

type PopoverElement = HTMLElement;

type OnChangeParams = ComputePositionReturn & {
	dx: number;
	dy: number;
};
type OnMountCallback = (p: OnChangeParams) => void;

export type PopoverParams = AutoPlacementOptions & {
	open?: boolean;
	target?: HTMLElement;
	reference?: HTMLElement;
	offset?: number;
	animate?: (node: PopoverElement, params: ComputePositionReturn) => void;
	onMount?: () => void | (() => void);
	onDestroy?: () => void;
	onChange?: OnMountCallback;
};

// This function is responsible of applying position calculation on the element and notify caller
const positionate = async (
	node: PopoverElement,
	params: PopoverParams & { animate: typeof defaultAnimate }
) => {
	const d = await calculatePosition(node, params);

	params?.onChange?.({ ...d, ...direction(d.placement) });
	params?.animate(node, d);
};

export function popover(node: HTMLElement, fn: () => PopoverParams) {
	node.hidden = true;

	// if (!fn.target) {
	// 	return;
	// }

	// $effect(() => )

	// This function is used to keep a reference of the `autoUpdate` cleanup function
	let cleanups: (() => void)[] = [];

	const { target } = fn();

	if (!target) {
		return;
	}

	const unport = port(node, target);
	$effect(() => unport);

	$effect(() => {
		const { target, reference, animate = defaultAnimate, open = false, ...restParams } = fn();

		if (!target) {
			return;
		}

		if (!reference) {
			return;
		}

		if (!reference) {
			return;
		}

		if (open) {
			// Keep position updated
			const cleanup = autoUpdate(
				reference,
				node,
				() => {
					// positionate(node, { ...restParams, target, reference, animate })
				},
				{}
			);
			cleanups.push(cleanup);
		} else {
			positionate(node, { ...restParams, target, reference, animate });
		}

		return () => {
			try {
				cleanups.forEach((fn) => fn());
				cleanups = [];
			} catch (err) {
				//
			}
		};
	});
}

type CalculatePositionParams = AutoPlacementOptions & {
	offset?: number;
	reference?: HTMLElement;
	onMount?: OnMountCallback;
};

async function calculatePosition(
	node: PopoverElement,
	{ alignment, allowedPlacements, offset: off, reference }: CalculatePositionParams
) {
	if (!reference) {
		throw new Error('Reference element is not found');
	}

	return computePosition(reference, node, {
		middleware: [
			offset(off),
			autoPlacement({
				autoAlignment: true,
				crossAxis: true,
				allowedPlacements: allowedPlacements,
				alignment: alignment
			})
		]
	});
}

function direction(placement: Placement) {
	const dy = placement.startsWith('top') ? 1 : placement.startsWith('bottom') ? -1 : 0;
	const dx = placement.startsWith('left') ? 1 : placement.startsWith('right') ? -1 : 0;

	return { dx, dy };
}

function defaultAnimate(node: PopoverElement, params: ComputePositionReturn) {
	requestAnimationFrame(() => {
		node.style.transform = `translate(${params.x}px, ${params.y}px)`;
	});
}
