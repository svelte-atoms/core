<script lang="ts">
	import type { autoUpdate, ComputePositionConfig } from "@floating-ui/dom";
	import { PopoverBond, type PopoverParams } from "./bond.svelte";
	import { offset } from "@floating-ui/dom";
	import { flip } from "svelte/animate";
	import { shift } from "@floating-ui/dom";
	import { computePosition } from "@floating-ui/dom";

    const bond = PopoverBond.get();
    const placement = $derived(bond?.state.props.placement);
    const placements = $derived(bond?.state.props.placements);
    const offsetValue = $derived(bond?.state.props.offset);
    const portal = $derived(bond?.state.props.portal);

    let {} = $props();

    $effect.pre(() => {
        if(!bond) {
            return;
        }

        const trigger = bond.elements.trigger;
        if(!trigger) {
            return;
        }
        const content = bond.elements.content;
        if(!content) {
            return;
        }



    });

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
                    padding: 8,
                    crossAxis: true,
                    fallbackStrategy: 'bestFit',
                    
                }),
                shift({
                    padding: 8,
                    limiter: {
                        fn: (state) => {
                            const { x, y } = state;
                            return {
                                x,
                                y
                            };
                        }
                    }
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

                // Round to 0.001 precision to avoid excessive updates from sub-pixel changes
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