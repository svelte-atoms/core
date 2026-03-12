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
		theme = 'github-dark',
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

<div class="code-block {className}">
	{#if isLoading}
		<div class="bg-muted animate-pulse rounded-lg p-4">
			<div class="bg-muted-foreground/20 h-4 w-3/4 rounded"></div>
			<div class="bg-muted-foreground/20 mt-2 h-4 w-1/2 rounded"></div>
		</div>
	{:else}
		<div class="overflow-x-auto rounded-lg">
			{@html highlightedCode}
		</div>
	{/if}
</div>

<style>
	.code-block :global(pre) {
		padding: 1rem;
		overflow-x: auto;
		border-radius: 0.5rem;
	}

	.code-block :global(code) {
		font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
		font-size: 0.875rem;
		line-height: 1.5;
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
		color: rgba(255, 255, 255, 0.4);
	}
</style>
