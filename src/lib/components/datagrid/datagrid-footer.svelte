<script lang="ts" generics="T extends keyof HTMLElementTagNameMap, B extends Base = Base">
	import { DataGridBond } from './bond.svelte';
	import type { DatagridFooterProps } from './types';
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';

	const bond = DataGridBond.get();

	let {
		class: klass = '',
		children = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	}: DatagridFooterProps<T> = $props();
</script>

<HtmlAtom
	{bond}
	preset="datagrid.footer"
	class={['$preset', klass, 'contents']}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	{...restProps}
>
	{@render children?.({ datagrid: bond })}
</HtmlAtom>
