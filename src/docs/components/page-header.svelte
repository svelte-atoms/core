<script lang="ts">
	import Badge from '$lib/components/badge/badge.svelte';
	import type { Snippet } from 'svelte';

	type Props = {
		title: string;
		description: string;
		status?: 'stable' | 'beta' | 'experimental' | 'deprecated';
		children?: Snippet;
	};

	let { title, description, status = 'stable', children }: Props = $props();

	const statusStyles = {
		stable: 'bg-green-100 text-green-800',
		beta: 'bg-blue-100 text-blue-800',
		experimental: 'bg-yellow-100 text-yellow-800',
		deprecated: 'bg-red-100 text-red-800'
	};
</script>

<div class="mb-12">
	<div class="mb-4 flex items-center gap-4">
		<h1 class="text-foreground text-4xl font-bold md:text-5xl">{title}</h1>
		<!-- <Badge class="{statusStyles[status]} px-3 py-1 capitalize">{status}</Badge> -->
	</div>
	<p class="text-muted-foreground max-w-3xl text-xl">
		{description}
	</p>
	{#if children}
		<div class="mt-4">
			{@render children()}
		</div>
	{/if}
</div>
