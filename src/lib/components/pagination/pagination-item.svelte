<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import type { PaginationItemProps } from './types';

	let {
		class: klass = '',
		page = undefined,
		active = false,
		preset = 'pagination.item',
		onclick = undefined,
		children = undefined,
		...restProps
	}: PaginationItemProps & HTMLAttributes<HTMLButtonElement> = $props();
</script>

<HtmlAtom
	{preset}
	as="button"
	type="button"
	class={[
		'pagination-item border-border flex h-9 min-w-9 cursor-pointer items-center justify-center rounded-md border px-2 text-sm transition-colors',
		active
			? 'bg-foreground text-background border-foreground'
			: 'bg-transparent hover:bg-muted',
		'$preset',
		klass
	]}
	aria-current={active ? 'page' : undefined}
	aria-label={page !== undefined ? `Page ${page}` : undefined}
	onclick={onclick}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		{page}
	{/if}
</HtmlAtom>
