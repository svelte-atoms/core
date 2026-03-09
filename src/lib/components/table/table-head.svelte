<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import type { TableHeadProps } from './types';

	let { class: klass = '', preset = 'table.head', children, ...restProps }: TableHeadProps & HTMLAttributes<HTMLTableSectionElement> = $props();
</script>

<HtmlAtom {preset} as="thead" class={['table-head [&_tr]:border-b', '$preset', klass]} {...restProps}>
	{@render children?.()}
</HtmlAtom>
