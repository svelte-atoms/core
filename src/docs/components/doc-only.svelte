<script lang="ts">
	import type { Snippet } from 'svelte';
	import { getDocMode, type DocMode } from '$docs/context/doc-mode.svelte';

	let {
		for: target = 'both',
		children,
	}: {
		/** Which render mode this content should appear in.
		 *  - `"html"`     — only rendered in the visual/browser page
		 *  - `"markdown"` — only rendered in the LLM text output
		 *  - `"both"`     — always rendered (default)
		 */
		for?: DocMode | 'both';
		children: Snippet;
	} = $props();

	const mode = getDocMode();
	const visible = target === 'both' || target === mode;
</script>

{#if visible}
	{@render children()}
{/if}
