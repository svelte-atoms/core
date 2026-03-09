<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import type { SpinnerProps } from './types';

	let {
		class: klass = '',
		label = 'Loading…',
		preset = 'spinner',
		indicatorContent = undefined,
		children = undefined,
		...restProps
	}: SpinnerProps & HTMLAttributes<HTMLSpanElement> = $props();
</script>

<!-- ─── Default part snippets ──────────────────────────────────────────── -->

{#snippet defaultIndicator()}
	<svg
		class="h-5 w-5 animate-spin"
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

<!-- ─── Render ────────────────────────────────────────────────────────── -->

<HtmlAtom
	{preset}
	as="span"
	class={['spinner-root inline-flex items-center gap-2', '$preset', klass]}
	role="status"
	aria-label={label}
	{...restProps}
>
	{@render (indicatorContent ?? defaultIndicator)()}

	{#if children}
		<span class="spinner-label">{@render children()}</span>
	{/if}
</HtmlAtom>
