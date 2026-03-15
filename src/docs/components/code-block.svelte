<script lang="ts">
	import { createHighlighter, type BundledLanguage, type BundledTheme } from 'shiki';
	import { Theme } from '../../routes/theme.svelte';

	type Props = {
		code: string;
		lang?: string;
		theme?: string;
		class?: string;
		showLineNumbers?: boolean;
		showLeftBorder?: boolean;
		transparent?: boolean;
	};

	let {
		code,
		lang = 'typescript',
		theme,
		class: className = '',
		showLineNumbers = false,
		showLeftBorder = true,
		transparent = true,
	}: Props = $props();

	const appTheme = Theme.get();

	let isDark = $derived(appTheme ? appTheme.colorScheme === 'dark' : true);
	let highlightedCode = $state('');
	let isLoading = $state(true);

	// Languages to always pre-load so they're available in the browser bundle
	const BASE_LANGS: BundledLanguage[] = ['typescript', 'svelte', 'bash', 'json', 'html', 'css'];

	$effect(() => {
		const resolvedTheme = (theme ?? (isDark ? 'github-dark' : 'vitesse-light')) as BundledTheme;
		const resolvedLang = lang as BundledLanguage;
		isLoading = true;

		// Merge requested lang into pre-loaded set
		const langs = BASE_LANGS.includes(resolvedLang)
			? BASE_LANGS
			: ([...BASE_LANGS, resolvedLang] as BundledLanguage[]);

		createHighlighter({
			themes: [resolvedTheme],
			langs
		})
			.then((highlighter) =>
				highlighter.codeToHtml(code, {
					lang: resolvedLang,
					theme: resolvedTheme,
					transformers: showLineNumbers
						? [{ name: 'line-numbers', line(node, line) { node.properties['data-line'] = line; } }]
						: []
				})
			)
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

<div class="code-block {transparent ? 'transparent' : ''} {className}" style:--left-border-width={showLeftBorder ? '1px' : '0px'}>
	{#if isLoading}
		<div class="bg-muted animate-pulse rounded-lg p-4">
			<div class="bg-muted-foreground/20 h-4 w-3/4 rounded"></div>
			<div class="bg-muted-foreground/20 mt-2 h-4 w-1/2 rounded"></div>
		</div>
	{:else}
		<div class="overflow-x-auto">
			{@html highlightedCode}
		</div>
	{/if}
</div>

<style>
	.code-block :global(pre) {
		padding: 1rem 1.25rem;
		overflow-x: auto;
		border-radius: 0;
		border-left: var(--left-border-width, 0px) solid color-mix(in oklch, currentColor 15%, transparent);
		background: transparent !important;
		margin: 0;
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
		opacity: 0.4;
	}
</style>
