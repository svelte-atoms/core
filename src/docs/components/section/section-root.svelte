<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
		class?: string;
	};

	let { children, class: className = '' }: Props = $props();
</script>

<section class="mb-12 flex flex-col gap-4 {className}">
	{@render children()}
</section>
