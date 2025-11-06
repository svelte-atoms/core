<script lang="ts">
	type Props = {
		items: Array<{ label: string; href?: string }>;
	};

	let { items }: Props = $props();
</script>

<nav class="text-muted-foreground mb-8 flex items-center space-x-2 text-sm">
	{#each items as item, index}
		{#if index > 0}
			<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
				<path
					fill-rule="evenodd"
					d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
					clip-rule="evenodd"
				/>
			</svg>
		{/if}
		{#if item.href}
			<a href={item.href} class="hover:text-accent transition-colors">{item.label}</a>
		{:else}
			<span class="text-foreground">{item.label}</span>
		{/if}
	{/each}
</nav>
