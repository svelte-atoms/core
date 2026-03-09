<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import type { CodeBlockProps } from './types';

	// Lazy-load Shiki — code-split into its own async chunk.
	// The dynamic import is cached by Vite/Rollup after first call.
	async function highlight(code: string, lang: string, theme: string, withLineNums: boolean): Promise<string> {
		const { codeToHtml } = await import('shiki');
		return codeToHtml(code, {
			lang,
			theme,
			transformers: withLineNums
				? [
						{
							name: 'line-numbers',
							line(node: { properties: Record<string, unknown> }, line: number) {
								node.properties['data-line'] = line;
							}
						}
					]
				: []
		});
	}

	let {
		class: klass = '',
		code,
		lang = 'plaintext',
		theme = 'github-dark',
		title = '',
		lineNumbers = false,
		copyable = true,
		preset = 'code-block',
		...restProps
	}: CodeBlockProps & HTMLAttributes<HTMLDivElement> = $props();

	let highlighted = $state('');
	let loading = $state(true);
	let copied = $state(false);

	$effect(() => {
		loading = true;
		highlighted = '';

		highlight(code, lang, theme, lineNumbers)
			.then((html) => {
				highlighted = html;
				loading = false;
			})
			.catch(() => {
				const escaped = code
					.replace(/&/g, '&amp;')
					.replace(/</g, '&lt;')
					.replace(/>/g, '&gt;');
				highlighted = `<pre class="shiki"><code>${escaped}</code></pre>`;
				loading = false;
			});
	});

	async function copy() {
		try {
			await navigator.clipboard.writeText(code);
			copied = true;
			setTimeout(() => { copied = false; }, 2000);
		} catch {
			// clipboard not available
		}
	}

	// Normalise lang for display (strip query params, uppercase common ones)
	const displayLang = $derived(
		lang === 'plaintext' ? '' : lang.replace(/[?#].*$/, '').toUpperCase()
	);
</script>

<HtmlAtom
	{preset}
	as="div"
	class={['code-block group relative overflow-hidden rounded-lg', '$preset', klass]}
	{...restProps}
>
	<!-- Header (shown when title or lang badge is present) -->
	{#if title || displayLang}
		<div class="bg-muted/60 border-border flex items-center justify-between border-b px-4 py-2">
			<div class="flex items-center gap-2">
				{#if displayLang}
					<span class="text-muted-foreground rounded bg-transparent font-mono text-xs">{displayLang}</span>
				{/if}
				{#if title}
					<span class="text-foreground/70 text-xs">{title}</span>
				{/if}
			</div>

			{#if copyable}
				<button
					type="button"
					onclick={copy}
					class="text-muted-foreground hover:text-foreground ml-auto rounded p-1 transition-colors focus-visible:outline-none focus-visible:ring-2"
					aria-label={copied ? 'Copied!' : 'Copy code'}
				>
					{#if copied}
						<!-- Checkmark icon -->
						<svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" aria-hidden="true">
							<path d="M20 6 9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					{:else}
						<!-- Copy icon -->
						<svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" aria-hidden="true">
							<rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" stroke-width="1.5"/>
							<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" stroke-width="1.5"/>
						</svg>
					{/if}
				</button>
			{/if}
		</div>
	{/if}

	<!-- Code area -->
	{#if loading}
		<div class="bg-muted animate-pulse space-y-2 p-4">
			<div class="bg-muted-foreground/20 h-3 w-3/4 rounded"></div>
			<div class="bg-muted-foreground/20 h-3 w-1/2 rounded"></div>
			<div class="bg-muted-foreground/20 h-3 w-2/3 rounded"></div>
		</div>
	{:else}
		<!-- Floating copy button when no header -->
		{#if copyable && !title && !displayLang}
			<button
				type="button"
				onclick={copy}
				class={[
					'text-muted-foreground hover:text-foreground absolute right-2 top-2 z-10 rounded p-1.5 transition-all',
					'opacity-0 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2',
					'bg-muted/80'
				].join(' ')}
				aria-label={copied ? 'Copied!' : 'Copy code'}
			>
				{#if copied}
					<svg viewBox="0 0 24 24" class="h-3.5 w-3.5" fill="none" aria-hidden="true">
						<path d="M20 6 9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				{:else}
					<svg viewBox="0 0 24 24" class="h-3.5 w-3.5" fill="none" aria-hidden="true">
						<rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" stroke-width="1.5"/>
						<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" stroke-width="1.5"/>
					</svg>
				{/if}
			</button>
		{/if}

		<div
			class={[
				'code-block-content overflow-x-auto text-sm',
				lineNumbers && '[&_[data-line]]:pl-2 [&_[data-line]]:before:mr-4 [&_[data-line]]:before:inline-block [&_[data-line]]:before:w-6 [&_[data-line]]:before:text-right [&_[data-line]]:before:content-[attr(data-line)] [&_[data-line]]:before:opacity-40'
			].join(' ')}
		>
			{@html highlighted}
		</div>
	{/if}
</HtmlAtom>

<style>
	:global(.code-block .shiki) {
		margin: 0;
		padding: 1rem;
		overflow-x: auto;
		border-radius: 0;
		font-size: 0.875rem;
		line-height: 1.6;
	}
	:global(.code-block .shiki code) {
		font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace;
		counter-reset: none;
	}
</style>
