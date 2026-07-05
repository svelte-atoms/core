<script lang="ts">
	import { PopoverBond } from '$ixirjs/ui/components/popover/bond.svelte';
	import { Trigger } from '$ixirjs/ui/components/popover/atoms';

	const popoverBond = PopoverBond.get();

	let { preset = 'tooltip.trigger', onmount, children, onclick = undefined, ...restProps } = $props();

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

<Trigger preset={preset} onmount={tooltip} {onclick} {...restProps}>
	{@render children?.()}
</Trigger>
