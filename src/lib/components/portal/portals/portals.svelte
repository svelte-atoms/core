<script lang="ts">
	import type { PortalsStateProps } from './bond.svelte';
	import { PortalsBond, PortalsState } from './bond.svelte';
	import { bindBond } from '$svelte-atoms/core/shared/bind-bond.svelte';

	let { id, factory = defaultFactory, children = undefined } = $props();

	const binding = bindBond<PortalsBond>(
		(props) => factory(props),
		{ id: () => id }
	);
	const bond = binding.bond.share();

	function defaultFactory(props: PortalsStateProps) {
		const bondState = new PortalsState(props);
		return new PortalsBond(bondState).share();
	}
</script>

{@render children?.({ portals: bond })}
