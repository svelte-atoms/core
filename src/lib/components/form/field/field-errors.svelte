<script>
	import { FieldBond } from './bond.svelte';

	const bond = FieldBond.get();

	let { children = undefined } = $props();
</script>

{@render children?.({ errors: bond?.state.errors ?? [] })}
