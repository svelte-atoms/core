<script module lang="ts">
	export type DatagridBodyProps<
		E extends HtmlElementTagName,
		B extends Base = Base
	> = HtmlAtomProps<E, B> & {
		children?: Snippet<[{ datagrid?: DataGridBond<E> }]>;
	};
</script>

<script lang="ts" generics="E extends HtmlElementTagName, B extends Base = Base">
	import type { Snippet } from 'svelte';
	import { DataGridBond } from './bond.svelte';
	import { HtmlAtom, type HtmlAtomProps, type Base } from '$svelte-atoms/core/components/atom';
	export type { HtmlElementTagName } from '$svelte-atoms/core/components/element';

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
	}: DatagridBodyProps<E, B> = $props();
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
