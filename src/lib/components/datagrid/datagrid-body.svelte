<script lang="ts" generics="T, E extends HtmlElementTagName, B extends Base = Base">
	import type { DatagridBodyProps } from './types';
	import { DataGridBond } from './bond.svelte';
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import type { HtmlElementTagName } from '../element';
	export type { HtmlElementTagName } from '$svelte-atoms/core/components/element';
	export type { DatagridBodyProps } from './types';

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
	}: DatagridBodyProps<T, E, B> = $props();
</script>

<HtmlAtom
	{bond}
	preset="datagrid.body"
	class={['border-border', '$preset', klass, 'contents']}
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
