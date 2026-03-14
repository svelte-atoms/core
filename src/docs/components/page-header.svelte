<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		title: string;
		description: string;
		status?: 'stable' | 'beta' | 'experimental' | 'deprecated';
		children?: Snippet;
	};

	let { title, description, status = 'stable', children }: Props = $props();
</script>

<div class="mb-12">
	<div class="mb-3 flex flex-wrap items-center gap-2">
		<h1 class="text-foreground text-3xl font-bold">{title}</h1>
		<span class="border-border text-muted-foreground rounded-full border px-2 py-0.5 text-xs capitalize">
			{status}
		</span>
	</div>
	<p class="text-muted-foreground max-w-3xl text-lg leading-relaxed">
		{description}
	</p>
	{#if children}
		<div class="mt-4">
			{@render children()}
		</div>
	{/if}
</div>
