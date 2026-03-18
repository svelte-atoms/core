<script lang="ts">
	import type { PropDefinition } from '$docs/types';

	interface Props {
		props: PropDefinition[];
	}

	let { props }: Props = $props();
</script>
| name | type | default | description |
| --- | --- | --- | --- |
{#each props as prop (prop.name)}
| {prop.name} | `{prop.type}` | `{prop.default}` | {prop.description} |
{/each}
