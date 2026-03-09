<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import type { PaginationEllipsisProps } from './types';

	let {
		class: klass = '',
		preset = 'pagination.ellipsis',
		indicatorContent = undefined,
		...restProps
	}: PaginationEllipsisProps & HTMLAttributes<HTMLSpanElement> = $props();
</script>

{#snippet defaultIndicator()}
	<span aria-hidden="true">…</span>
{/snippet}

<HtmlAtom
	{preset}
	as="span"
	class={['pagination-ellipsis text-muted-foreground flex h-9 w-9 items-center justify-center text-sm', '$preset', klass]}
	aria-hidden="true"
	{...restProps}
>
	{@render (indicatorContent ?? defaultIndicator)()}
</HtmlAtom>
