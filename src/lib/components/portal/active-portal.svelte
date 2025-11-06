<script>
	import { PortalsBond } from './portals/bond.svelte';

	let { portal, children = undefined } = $props();

	const portalsBond = PortalsBond.get();
	const activePortal = (() => {
		if (typeof portal === 'string') {
			return portalsBond?.state?.get(portal) ?? undefined;
		}

		return portal;
	})()?.share();

	if (!portalsBond) {
		throw new Error('Portals bond is not found');
	}
</script>

{#if activePortal}
	{@render children?.()}
{/if}
