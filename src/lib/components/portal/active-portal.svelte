<script>
	import { PortalsBond } from './portals/bond.svelte';

	let { id, children = undefined } = $props();

	const portalsBond = PortalsBond.get();
	const activePortal = portalsBond?.state.get(id)?.share();

	if (!portalsBond) {
		throw new Error('Portals bond is not found');
	}
</script>

{#if activePortal}
	{@render children?.()}
{/if}
