<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import type { TableFooterProps } from './types';

	let { class: klass = '', preset = 'table.footer', children, ...restProps }: TableFooterProps & HTMLAttributes<HTMLTableSectionElement> = $props();
</script>

<HtmlAtom {preset} as="tfoot" class={['table-footer border-t font-medium [&_tr:last-child]:border-b-0', '$preset', klass]} {...restProps}>
	{@render children?.()}
</HtmlAtom>
