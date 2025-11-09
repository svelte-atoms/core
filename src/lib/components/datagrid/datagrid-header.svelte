<script lang="ts" generics="T extends keyof HTMLElementTagNameMap, B extends Base = Base">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { setDatagridHeaderContext } from './context';
	import { DataGridBond } from './bond.svelte';
	import type { DatagridHeaderProps } from './types';

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
	}: DatagridHeaderProps<T> = $props();

	const header = $state(true);

	const derived_header = $derived({
		data: {
			header
		}
	});

	setDatagridHeaderContext({
		get derived() {
			return derived_header;
		}
	});
</script>

<HtmlAtom
	{bond}
	preset="datagrid.header"
	class={['border-border col-span-full grid grid-cols-subgrid', '$preset', klass]}
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
