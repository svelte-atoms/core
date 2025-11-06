<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		title: string;
		description?: string;
		children: Snippet;
		class?: string;
	};

	let { title, description, children, class: className = '' }: Props = $props();
</script>

<section class="mb-12 {className}">
	<div class="mb-6">
		<h2 class="text-foreground text-2xl font-bold">{title}</h2>
		{#if description}
			<p class="text-muted-foreground mt-2">{description}</p>
		{/if}
	</div>
	{@render children()}
</section>
