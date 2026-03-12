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

	const statusClass: Record<string, string> = {
		stable: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
		beta: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
		experimental: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
		deprecated: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
	};
</script>

<div class="mb-12">
	<div class="mb-4 flex flex-wrap items-center gap-3">
		<h1 class="text-foreground text-4xl font-bold md:text-5xl">{title}</h1>
		<Badge class={statusClass[status] + ' capitalize border-0'}>
			{status}
		</Badge>
	</div>
	<p class="text-muted-foreground max-w-3xl text-xl leading-relaxed">
		{description}
	</p>
	{#if children}
		<div class="mt-4">
			{@render children()}
		</div>
	{/if}
</div>
