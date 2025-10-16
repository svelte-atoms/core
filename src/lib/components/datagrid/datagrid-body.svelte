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
	import { getPreset } from '$svelte-atoms/core/context';
	import { HtmlAtom, type HtmlAtomProps, type Base } from '$svelte-atoms/core/components/atom';
	export type { HtmlElementTagName } from '$svelte-atoms/core/components/element';

	const bond = DataGridBond.get();

	const preset = getPreset('datagrid.body');

	let {
		class: klass = '',
		as = preset?.as ?? ('div' as E),
		base = preset?.base as B,
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
	{as}
	{base}
	class={[klass, 'contents']}
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
