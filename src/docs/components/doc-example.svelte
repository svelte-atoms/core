<script lang="ts">
	import type { Snippet } from 'svelte';
	import { getDocMode } from '$docs/context/doc-mode.svelte';
	import DemoExample from './demo-example.svelte';
	import { codeBlock, newLine } from '$docs/md/template';

	let {
		title,
		description = undefined,
		code = undefined,
		lang = 'svelte',
		children = undefined,
	}: {
		title: string;
		description?: string;
		code?: string;
		lang?: string;
		/** Live preview — only rendered in html mode */
		children?: Snippet;
	} = $props();

	const mode = getDocMode();
</script>

{#if mode === 'html'}
	<DemoExample {title} {description} {code}>
		{#if children}
			{@render children()}
		{/if}
	</DemoExample>
{:else}
{newLine()}### {title}
{#if description}

{newLine()}{description}
{/if}
{#if code}

{newLine(2)}{codeBlock(code, lang)}
{/if}
{/if}
