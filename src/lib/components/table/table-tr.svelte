<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import type { TableTrProps } from './types';

	let { class: klass = '', preset = 'table.tr', children, ...restProps }: TableTrProps & HTMLAttributes<HTMLTableRowElement> = $props();
</script>

<HtmlAtom
	{preset}
	as="tr"
	class={[
		'table-tr border-border border-b transition-colors',
		'hover:bg-muted/50 data-[selected=true]:bg-muted',
		'$preset',
		klass
	]}
	{...restProps}
>
	{@render children?.()}
</HtmlAtom>
