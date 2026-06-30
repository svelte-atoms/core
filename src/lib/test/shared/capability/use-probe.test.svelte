<script lang="ts">
	import type { Bond } from '$svelte-atoms/core/shared/bond';
	import { useCapabilities } from '$svelte-atoms/core/shared/capability/use.svelte';

	type Props = { bond: Bond };

	const { bond }: Props = $props();

	// svelte-ignore state_referenced_locally
	useCapabilities(bond);
</script>

<div data-testid="capability-probe"></div>
