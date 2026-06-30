<script lang="ts">
	import {
		createAtomInstance,
		type AtomCapabilityEntry,
		type Bond
	} from '$svelte-atoms/core/shared/bond';

	let {
		bond,
		nodeKey = 'part',
		required = false,
		capabilities = []
	}: {
		bond?: Bond;
		nodeKey?: string;
		required?: boolean | string;
		capabilities?: readonly AtomCapabilityEntry[];
	} = $props();

	const node = createAtomInstance(() => nodeKey, {
		bond: () => bond,
		required: () => required,
		capabilities: () => capabilities
	});
</script>

<div {...node.spread}></div>
