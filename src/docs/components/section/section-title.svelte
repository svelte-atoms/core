<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
		class?: string;
		id?: string;
	};

	let { children, class: className = '', id: idProp = '' }: Props = $props();

	let el = $state<HTMLHeadingElement | undefined>(undefined);

	$effect(() => {
		if (!el) return;
		const slug =
			idProp ||
			el.textContent
				?.trim()
				.toLowerCase()
				.replace(/[^a-z0-9]+/g, '-')
				.replace(/^-|-$/g, '') ||
			'';
		if (slug) el.id = slug;
	});
</script>

<h2 bind:this={el} class="text-3xl font-bold {className}">
	{@render children()}
</h2>
