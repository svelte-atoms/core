<script lang="ts">
	import { PopoverBond } from '$svelte-atoms/core/components/popover/bond.svelte';
	import { Trigger } from '$svelte-atoms/core/components/popover/atoms';

	const popoverBond = PopoverBond.get();

	let { onmount, children, ...restProps } = $props();

	function tooltip(node: HTMLElement) {
		const onpointerenter = async () => {
			requestAnimationFrame(() => {
				popoverBond?.state.open();
			});
			node.addEventListener('pointerleave', onpointerleave);
		};
		const onpointerleave = () => {
			popoverBond?.state.close();
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

<Trigger preset="tooltip.trigger" onmount={tooltip} {...restProps}>
	{@render children?.()}
</Trigger>
