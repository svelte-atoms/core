<script lang="ts">
	type Props = {
		prev?: { label: string; href: string };
		next?: { label: string; href: string };
	};

	let { prev, next }: Props = $props();
</script>

<div class="border-border flex items-center justify-between border-t pt-8">
	{#if prev}
		<a
			href={prev.href}
			class="text-accent hover:text-accent/80 inline-flex items-center transition-colors"
		>
			<svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
			</svg>
			{prev.label}
		</a>
	{:else}
		<div></div>
	{/if}

	{#if next}
		<a
			href={next.href}
			class="text-accent hover:text-accent/80 inline-flex items-center transition-colors"
		>
			{next.label}
			<svg class="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
			</svg>
		</a>
	{/if}
</div>
