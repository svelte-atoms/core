<script lang="ts">
	import type { PortalsStateProps } from './bond.svelte';
	import { PortalsBond, PortalsState } from './bond.svelte';
	import { defineProperty, defineState } from '$svelte-atoms/core/utils';

	let { id, factory = _factory, children = undefined } = $props();

	const bondProps = defineState<PortalsStateProps>([defineProperty('id', () => id)]);
	const bond = factory(bondProps) as PortalsBond;

	function _factory(props: typeof bondProps) {
		const bondState = new PortalsState(() => props);
		return new PortalsBond(bondState).share();
	}
</script>

{@render children?.({ portals: bond })}
