<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import type { TableBodyProps } from './types';

	let { class: klass = '', preset = 'table.body', children, ...restProps }: TableBodyProps & HTMLAttributes<HTMLTableSectionElement> = $props();
</script>

<HtmlAtom {preset} as="tbody" class={['table-body [&_tr:last-child]:border-0', '$preset', klass]} {...restProps}>
	{@render children?.()}
</HtmlAtom>
