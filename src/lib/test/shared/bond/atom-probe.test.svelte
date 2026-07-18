<script lang="ts">
	import { createAtomInstance, type AtomCapabilityEntry, type Bond } from '$ixirjs/ui/shared/bond';

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

	const node = createAtomInstance(undefined, {
		resolveKey: () => nodeKey,
		resolveBond: () => bond,
		resolveRequired: () => required,
		resolveCapabilities: () => capabilities
	});
</script>

<div {...node.spread}></div>
