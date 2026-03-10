<script lang="ts">
	import type { HTMLTdAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import type { TableCellProps } from './types';

	let { class: klass = '', preset = 'table.cell', children, ...restProps }: TableCellProps & HTMLTdAttributes = $props();
</script>

<HtmlAtom {preset} as="td" class={['table-cell px-3 py-2 align-middle', '$preset', klass]} {...restProps}>
	{@render children?.()}
</HtmlAtom>
