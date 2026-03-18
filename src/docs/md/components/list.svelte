<script lang="ts">
	interface Props {
		items: string[];
		ordered?: boolean;
	}

	let { items, ordered = false }: Props = $props();
</script>
{#each items as item, i (i)}
{ordered ? `${i + 1}. ${item}` : `- ${item}`}
{/each}
