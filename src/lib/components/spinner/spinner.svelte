<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import type { SpinnerProps } from './types';

	let {
		class: klass = '',
		variant = 'ring',
		size = 'md',
		label = 'Loading…',
		preset = 'spinner',
		indicatorContent = undefined,
		children = undefined,
		...restProps
	}: SpinnerProps & HTMLAttributes<HTMLSpanElement> = $props();

	const sizeMap: Record<string, string> = {
		xs: 'h-3 w-3',
		sm: 'h-4 w-4',
		md: 'h-6 w-6',
		lg: 'h-8 w-8',
		xl: 'h-12 w-12'
	};

	const dotSizeMap: Record<string, string> = {
		xs: 'h-1 w-1',
		sm: 'h-1.5 w-1.5',
		md: 'h-2 w-2',
		lg: 'h-2.5 w-2.5',
		xl: 'h-3.5 w-3.5'
	};

	const barSizeMap: Record<string, string> = {
		xs: 'h-3 w-0.5',
		sm: 'h-4 w-0.5',
		md: 'h-5 w-1',
		lg: 'h-7 w-1',
		xl: 'h-10 w-1.5'
	};

	const sz = $derived(sizeMap[size] ?? sizeMap.md);
	const dotSz = $derived(dotSizeMap[size] ?? dotSizeMap.md);
	const barSz = $derived(barSizeMap[size] ?? barSizeMap.md);
</script>

<!-- ─── Default part snippets ──────────────────────────────────────────── -->

{#snippet defaultRing()}
	<svg
		class={['animate-spin', sz].join(' ')}
		viewBox="0 0 24 24"
		fill="none"
		aria-hidden="true"
	>
		<circle
			cx="12" cy="12" r="10"
			stroke-width="3"
			class="stroke-current opacity-25"
		/>
		<path
			d="M12 2a10 10 0 0 1 10 10"
			stroke-width="3"
			stroke-linecap="round"
			class="stroke-current"
		/>
	</svg>
{/snippet}

{#snippet defaultDots()}
	<span class="flex items-center gap-1" aria-hidden="true">
		{#each [0, 1, 2] as i}
			<span
				class={['rounded-full bg-current animate-bounce', dotSz].join(' ')}
				style="animation-delay: {i * 150}ms"
			></span>
		{/each}
	</span>
{/snippet}

{#snippet defaultBars()}
	<span class="flex items-end gap-0.5" aria-hidden="true">
		{#each [0, 1, 2, 3] as i}
			<span
				class={['rounded-sm bg-current animate-pulse', barSz].join(' ')}
				style="animation-delay: {i * 100}ms"
			></span>
		{/each}
	</span>
{/snippet}

{#snippet defaultPulse()}
	<span
		class={['rounded-full bg-current animate-ping', sz].join(' ')}
		aria-hidden="true"
	></span>
{/snippet}

{#snippet defaultIndicator({ variant: v, size: s }: { variant: string; size: string })}
	{#if v === 'dots'}
		{@render defaultDots()}
	{:else if v === 'bars'}
		{@render defaultBars()}
	{:else if v === 'pulse'}
		{@render defaultPulse()}
	{:else}
		{@render defaultRing()}
	{/if}
{/snippet}

<!-- ─── Render ────────────────────────────────────────────────────────── -->

<HtmlAtom
	{preset}
	as="span"
	class={[
		'spinner-root inline-flex items-center gap-2',
		'$preset',
		klass
	]}
	role="status"
	aria-label={label}
	{...restProps}
>
	{@render (indicatorContent ?? defaultIndicator)({ variant, size })}

	{#if children}
		<span class="spinner-label">{@render children()}</span>
	{/if}
</HtmlAtom>
