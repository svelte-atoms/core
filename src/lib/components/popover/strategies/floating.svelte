<script lang="ts">
	import {
		autoUpdate,
		computePosition,
		arrow,
		flip,
		shift,
		offset,
		type ComputePositionConfig
	} from '@floating-ui/dom';
	import { PopoverBond, type PopoverParams } from '../bond.svelte';
	import type { BondVirtualElement } from '$svelte-atoms/core/shared/bond.svelte';

	const bond = PopoverBond.get();

	const open = $derived(bond?.state.props.open);
	const reference = $derived(bond?.element<BondVirtualElement>('virtual-trigger') ?? bond?.element<Element>('trigger'));
	const content = $derived(bond?.element<HTMLElement>('content'));

	$effect.pre(() => {
		if (!(reference) || !content || !open) return;

		// Use the existing positioning behavior
		const cleanup = compute(bond)({}, autoUpdate);

		return () => cleanup?.();
	});

	function compute(bond: PopoverBond) {
		return (props: Record<string, unknown>, updater?: typeof autoUpdate) => {
			const { offset: ofs, placements, placement } = bond.state.props;

			const arrowElement = bond.element<HTMLElement>('arrow');

			// Guard: ensure required elements exist
			if (!reference || !content) {
				return;
			}

			// Build middleware stack
			const middleware: ComputePositionConfig['middleware'] = [
				offset(ofs),
				flip({
					fallbackPlacements: placements,
					padding: 8,
					crossAxis: true,
					fallbackStrategy: 'bestFit'
				}),
				shift({
					padding: 8,
					limiter: {
						fn: (state) => {
							const { x, y } = state;
							return { x, y };
						}
					}
				})
			];

			// Add arrow middleware if element exists
			if (arrowElement) {
				middleware.push(arrow({ element: arrowElement }));
			}

			const onchangeCallback = props.onchange as PopoverParams['onchange'];

			// Compute position and notify listeners
			const compute = async () => {
				// Double rAF ensures browser has completed layout + paint
				await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

				const position = await computePosition(reference, content, {
					placement: placement ?? 'bottom',
					middleware,
					strategy: bond.state.props.positionStrategy
				});

				// Round to 0.01 precision to avoid excessive updates from sub-pixel changes
				const x = Math.round((position.x ?? 0) * 100) / 100;
				const y = Math.round((position.y ?? 0) * 100) / 100;

				bond.state.position = {
					middlewareData: position.middlewareData,
					placement: position.placement,
					strategy: position.strategy,
					x,
					y
				};
				onchangeCallback?.(content, position);

				// Set minimum width to match trigger
				if (reference && (reference instanceof Element)) {
					requestAnimationFrame(() => {
						content.style.minWidth = `${reference.clientWidth}px`;
					});
				}
			};

			// Use auto-update if provided, otherwise compute once
			if (updater) {
				return updater(reference, content, compute, {
					ancestorScroll: false
				});
			}

			compute();
		};
	}
</script>
