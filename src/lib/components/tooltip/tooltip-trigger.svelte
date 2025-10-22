<script lang="ts">
	import { PopoverBond } from '$svelte-atoms/core/components/popover/bond.svelte';
	import { Trigger } from '$svelte-atoms/core/components/popover/atoms';

	const popoverBond = PopoverBond.get();

	let { onmount, children, ...restProps } = $props();

	function tooltip(node: HTMLElement) {
		const onpointerenter = async (ev: PointerEvent) => {
			await popoverBond?.isReady;
			popoverBond?.state.open();
		};
		const onpointerleave = (ev: PointerEvent) => {
			popoverBond?.state.close();
		};

		node.addEventListener('pointerenter', onpointerenter);
		node.addEventListener('pointerleave', onpointerleave);

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

<Trigger preset="tooltip.trigger" onmount={tooltip} {...restProps}>
	{@render children?.()}
</Trigger>
