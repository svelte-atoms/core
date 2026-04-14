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

	const bond = PopoverBond.get();

	const open = $derived(bond?.state.props.open);
	const trigger = $derived(bond?.element('trigger'));
	const content = $derived(bond?.element('content'));

	$effect.pre(() => {

		if (!trigger || !content || !open) return;

		// Use the existing positioning behavior
		const cleanup = compute(bond)({}, autoUpdate);

		return () => cleanup?.();
	});

	function compute(bond: PopoverBond) {
		return (props: Record<string, unknown>, updater?: typeof autoUpdate) => {
			const { offset: ofs, placements, placement } = bond.state.props;
			
			const trigger = bond.element<HTMLElement>('trigger');
			const content = bond.element<HTMLElement>('content');
			const arrowElement = bond.element<HTMLElement>('arrow');

			// Guard: ensure required elements exist
			if (!trigger || !content) {
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

				const position = await computePosition(trigger, content, {
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
				requestAnimationFrame(() => {
					content.style.minWidth = `${trigger.clientWidth}px`;
				});
			};

			// Use auto-update if provided, otherwise compute once
			if (updater) {
				return updater(trigger, content, compute, {
					ancestorScroll: false
				});
			}

			compute();
		};
	}
</script>
