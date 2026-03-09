<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import type { TableHeaderProps } from './types';

	let { class: klass = '', preset = 'table.header', children, ...restProps }: TableHeaderProps & HTMLAttributes<HTMLTableSectionElement> = $props();
</script>

<HtmlAtom {preset} as="thead" class={['table-header [&_tr]:border-b', '$preset', klass]} {...restProps}>
	{@render children?.()}
</HtmlAtom>
