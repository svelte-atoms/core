<script lang="ts">
	import type { HTMLTdAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import type { TableTdProps } from './types';

	let { class: klass = '', preset = 'table.td', children, ...restProps }: TableTdProps & HTMLTdAttributes = $props();
</script>

<HtmlAtom {preset} as="td" class={['table-td px-3 py-2 align-middle', '$preset', klass]} {...restProps}>
	{@render children?.()}
</HtmlAtom>
