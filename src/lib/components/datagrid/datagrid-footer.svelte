<script lang="ts" generics="T = unknown, E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { DataGridBond } from './bond.svelte';
	import type { DatagridFooterProps } from './types';

	const bond = DataGridBond.get<T>();
	if (!bond) {
		throw new Error('DataGrid.Footer must be used within DataGrid.Root.');
	}

	let {
		class: klass = '',
		children = undefined,
		...restProps
	}: DatagridFooterProps<T, E, B> = $props();

	const footerProps = $derived({ ...bond.footer().spread, ...restProps });
</script>

<HtmlAtom
	{bond}
		preset="datagrid.footer"
	class={['border-border', '$preset', klass, 'contents']}
	{...footerProps}
>
	{@render children?.({ datagrid: bond })}
</HtmlAtom>
