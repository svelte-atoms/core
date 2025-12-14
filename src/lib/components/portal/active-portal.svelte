<script lang="ts">
	import type { PortalBond } from './bond.svelte';
	import { PortalsBond } from './portals/bond.svelte';

	let { portal, children = undefined } = $props();

	const portalsBond = PortalsBond.get();
	const activePortal = $derived.by(() => {
		if (typeof portal === 'string') {
			return portalsBond?.state?.get(portal) ?? undefined;
		}

		return portal as PortalBond;
	});

	if (!portalsBond) {
		throw new Error('Portals bond is not found');
	}

	function proxy(...args: any[]) {
		activePortal?.share();

		return children?.(...args);
	}
</script>

{#if activePortal}
	{@render proxy?.()}
{/if}
