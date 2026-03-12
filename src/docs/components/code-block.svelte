<script lang="ts">
	import { codeToHtml } from 'shiki';

	type Props = {
		code: string;
		lang?: string;
		theme?: string;
		class?: string;
		showLineNumbers?: boolean;
	};

	let {
		code,
		lang = 'typescript',
		theme = 'min-dark',
		class: className = '',
		showLineNumbers = false
	}: Props = $props();

	let highlightedCode = $state('');
	let isLoading = $state(true);

	$effect(() => {
		isLoading = true;
		codeToHtml(code, {
			lang,
			theme,
			transformers: showLineNumbers
				? [
						{
							name: 'line-numbers',
							line(node, line) {
								node.properties['data-line'] = line;
							}
						}
					]
				: []
		})
			.then((html) => {
				highlightedCode = html;
				isLoading = false;
			})
			.catch((err) => {
				console.error('Syntax highlighting error:', err);
				highlightedCode = `<pre><code>${code}</code></pre>`;
				isLoading = false;
			});
	});
</script>

<div class="code-block {className}" style="background-color: #1f1f1f; border-radius: inherit;">
	{#if isLoading}
		<div class="animate-pulse p-4">
			<div class="h-4 w-3/4 rounded bg-white/10"></div>
			<div class="mt-2 h-4 w-1/2 rounded bg-white/10"></div>
		</div>
	{:else}
		<div class="overflow-x-auto">
			{@html highlightedCode}
		</div>
	{/if}
</div>

<style>
	.code-block :global(pre) {
		padding: 1rem;
		overflow-x: auto;
		border-radius: 0;
		margin: 0;
		background: transparent !important;
	}

	.code-block :global(code) {
		font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
		font-size: 0.8125rem;
		line-height: 1.6;
		background: transparent !important;
	}

	.code-block :global([data-line]) {
		padding-left: 0.5rem;
		padding-right: 0.5rem;
	}

	.code-block :global([data-line]::before) {
		content: attr(data-line);
		display: inline-block;
		width: 2rem;
		margin-right: 1rem;
		text-align: right;
		color: rgba(255, 255, 255, 0.3);
	}
</style>
