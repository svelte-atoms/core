<script lang="ts">
	import * as floating from '@floating-ui/dom';
	import type { ComputePositionConfig, Strategy } from '@floating-ui/dom';
	import {
		notifyPopoverComputed,
		popoverNode,
		PopoverBond,
		shouldTrackPopoverPosition,
		type PopoverParams
	} from '../bond.svelte';
	import type { BondVirtualElement } from '$ixirjs/ui/shared/bond';
	import type { PortalBond } from '$ixirjs/ui/components/portal';

	let { portal = undefined }: { portal?: PortalBond | undefined } = $props();

	const bond = PopoverBond.get();

	type AutoUpdate = typeof floating.autoUpdate;

	// The content-resolved Portal owns both the teleport sink and floating boundary.
	const boundary = $derived(portal?.sinkElement);

	const tracking = $derived(bond ? shouldTrackPopoverPosition(bond) : false);
	const reference = $derived(
		(bond
			? (popoverNode(bond, 'virtual-trigger')?.element as BondVirtualElement | undefined)
			: undefined) ??
			(bond ? (popoverNode(bond, 'trigger')?.element as Element | undefined) : undefined)
	);
	const overlay = $derived(
		bond ? (popoverNode(bond, 'overlay')?.element as HTMLElement | undefined) : undefined
	);

	// CSS positioning strategy, set explicitly by the consumer via the `position` root prop.
	const position = $derived<Strategy>(bond?.props.position ?? 'absolute');

	$effect(() => {
		// Run after PortalSurface commits its attachment so floating-ui measures the canonical sink.
		void boundary;

		if (!bond || !reference || !overlay || !tracking) return;

		// Re-runs if the `position` strategy changes: tears down auto-update, recomputes.
		const cleanup = compute(bond, position)({}, floating.autoUpdate);

		return () => cleanup?.();
	});

	function compute(bond: PopoverBond, strategy: Strategy) {
		return (props: Record<string, unknown>, updater: AutoUpdate | undefined = undefined) => {
			const { offset: ofs, placements, placement } = bond.props;

			const tailElement = popoverNode(bond, 'tail')?.element as HTMLElement | undefined;

			if (!reference || !overlay) {
				return;
			}

			// Middleware stack. flip/shift/hide measure overflow against the resolved Portal sink,
			// so positioning and porting share the same containment boundary.
			const middleware: ComputePositionConfig['middleware'] = [
				floating.offset(ofs),
				floating.flip({
					fallbackPlacements: placements,
					padding: 8,
					crossAxis: true,
					fallbackStrategy: 'bestFit',
					boundary: boundary ?? 'clippingAncestors'
				}),
				floating.shift({
					padding: 8,
					boundary: boundary ?? 'clippingAncestors',
					limiter: {
						fn: (state) => {
							const { x, y } = state;
							return { x, y };
						}
					}
				})
			];

			if (tailElement) {
				// floating-ui's own `arrow()` middleware — not our naming.
				middleware.push(floating.arrow({ element: tailElement }));
			}

			// Hide the overlay when the anchor leaves the resolved Portal boundary.
			middleware.push(floating.hide({ boundary: boundary ?? 'clippingAncestors' }));

			const onpositionchange = props.onpositionchange as PopoverParams['onpositionchange'];

			const compute = async () => {
				const position = await floating.computePosition(reference, overlay, {
					placement: placement ?? 'bottom',

					middleware,
					strategy
				});

				// Round to 0.01px to avoid churn from sub-pixel changes.
				const x = Math.round((position.x ?? 0) * 100) / 100;
				const y = Math.round((position.y ?? 0) * 100) / 100;

				notifyPopoverComputed(bond, {
					middlewareData: position.middlewareData,
					placement: position.placement,
					strategy: position.strategy,
					x,
					y
				});
				onpositionchange?.(overlay, position);

				// Publish the trigger's measured size as CSS vars so content can match it — via a
				// class (`min-w-[var(--sa-anchor-width)]`) or the sizing props
				// (`minWidth="var(--sa-anchor-width)"`). Reuses computePosition's layout read.
				if (reference && reference instanceof Element) {
					overlay.style.setProperty('--sa-anchor-width', `${reference.clientWidth}px`);
					overlay.style.setProperty('--sa-anchor-height', `${reference.clientHeight}px`);
				}
			};

			// Auto-update if provided, else compute once.
			if (updater) {
				return updater(reference, overlay, compute, {
					ancestorScroll: true,
					// Off: thrashes its IntersectionObserver at scroll edges (recompute storm);
					// hide() covers the out-of-view case instead.
					layoutShift: false
				});
			}

			compute();
		};
	}
</script>
