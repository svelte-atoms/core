<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import type { PaginationNextProps } from './types';

	let {
		class: klass = '',
		disabled = false,
		preset = 'pagination.next',
		onclick = undefined,
		indicatorContent = undefined,
		children = undefined,
		...restProps
	}: PaginationNextProps & HTMLAttributes<HTMLButtonElement> = $props();
</script>

{#snippet defaultIndicator()}
	<svg viewBox="0 0 16 16" fill="none" class="h-4 w-4" aria-hidden="true">
		<path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
	</svg>
{/snippet}

<HtmlAtom
	{preset}
	as="button"
	type="button"
	class={[
		'pagination-next border-border flex h-9 items-center gap-1 rounded-md border px-2 text-sm transition-colors',
		disabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-muted cursor-pointer',
		'$preset',
		klass
	]}
	{disabled}
	aria-label="Next page"
	onclick={onclick}
	{...restProps}
>
	{#if children}{@render children()}{/if}
	{@render (indicatorContent ?? defaultIndicator)()}
</HtmlAtom>
