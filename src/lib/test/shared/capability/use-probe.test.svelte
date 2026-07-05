<script lang="ts">
	import type { Bond } from '$ixirjs/ui/shared/bond';
	import { useCapabilities } from '$ixirjs/ui/shared/capability/use.svelte';

	type Props = { bond: Bond };

	const { bond }: Props = $props();

	// svelte-ignore state_referenced_locally
	useCapabilities(bond);
</script>

<div data-testid="capability-probe"></div>
