<script lang="ts">
	import type { HTMLThAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import type { TableThProps } from './types';

	let {
		class: klass = '',
		preset = 'table.th',
		sort = false,
		children,
		...restProps
	}: TableThProps & HTMLThAttributes = $props();
</script>

<HtmlAtom
	{preset}
	as="th"
	class={[
		'table-th text-muted-foreground h-10 px-3 text-left align-middle text-xs font-medium',
		sort !== false && 'cursor-pointer select-none',
		'$preset',
		klass
	]}
	aria-sort={sort === 'asc' ? 'ascending' : sort === 'desc' ? 'descending' : sort === 'none' ? 'none' : undefined}
	{...restProps}
>
	<span class="flex items-center gap-1">
		{@render children?.()}

		{#if sort !== false}
			<svg viewBox="0 0 24 24" class="h-3 w-3 shrink-0 opacity-60" fill="none" aria-hidden="true">
				{#if sort === 'asc'}
					<path d="M12 5l-7 7h14l-7-7z" fill="currentColor"/>
				{:else if sort === 'desc'}
					<path d="M12 19l7-7H5l7 7z" fill="currentColor"/>
				{:else}
					<path d="M12 5l-4 4h8l-4-4zM12 19l4-4H8l4 4z" fill="currentColor" opacity=".5"/>
				{/if}
			</svg>
		{/if}
	</span>
</HtmlAtom>
