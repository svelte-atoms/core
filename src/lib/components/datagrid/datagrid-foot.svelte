<script lang="ts" generics="T = unknown, E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { DataGridBond } from './bond.svelte';
	import type { DatagridFooterProps } from './types';

	const bond = DataGridBond.get<T>();

	let {
		class: klass = '',
		children = undefined,
		...restProps
	}: DatagridFooterProps<T, E, B> = $props();
</script>

<HtmlAtom
	{bond}
	preset="datagrid.footer"
	class={['border-border contents', '$preset', klass]}
	{...restProps}
>
	{@render children?.({ datagrid: bond })}
</HtmlAtom>
