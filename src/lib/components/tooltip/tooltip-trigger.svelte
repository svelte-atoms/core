<script lang="ts">
	import { mergePresetProps } from '$ixirjs/ui/components/atom';
	import { PopoverBond } from '$ixirjs/ui/components/popover/bond.svelte';
	import { Trigger } from '$ixirjs/ui/components/popover/atoms';
	import {
		closeOverlay,
		openOverlay
	} from '$ixirjs/ui/components/portal/host/policies/overlay-view';

	const popoverBond = PopoverBond.get();

	let {
		preset = undefined,
		onmount = undefined,
		children,
		onclick = undefined,
		...restProps
	} = $props();

	const triggerProps = $derived(mergePresetProps(preset, 'tooltip.trigger', restProps));

	function tooltip(node: HTMLElement) {
		const onpointerenter = async () => {
			requestAnimationFrame(() => {
				if (popoverBond) openOverlay(popoverBond);
			});
			node.addEventListener('pointerleave', onpointerleave);
		};
		const onpointerleave = () => {
			if (popoverBond) closeOverlay(popoverBond);
			node.removeEventListener('pointerleave', onpointerleave);
		};

		node.addEventListener('pointerenter', onpointerenter, { passive: true });

		const cleanup = () => {
			node.removeEventListener('pointerenter', onpointerenter);
			node.removeEventListener('pointerleave', onpointerleave);
		};

		const unmount = onmount?.(node);

		return () => {
			cleanup?.();
			unmount?.();
		};
	}
</script>

<Trigger onmount={tooltip} {onclick} {...triggerProps}>
	{@render children?.()}
</Trigger>
