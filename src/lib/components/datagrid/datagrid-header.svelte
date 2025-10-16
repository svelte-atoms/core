<script lang="ts" generics="T extends keyof HTMLElementTagNameMap, B extends Base = Base">
	import { setDatagridHeaderContext } from './context';
	import type { DatagridHeaderProps } from './types';
	import { DataGridBond } from './bond.svelte';
	import { toClassValue } from '$svelte-atoms/core/utils';
	import { getPreset } from '$svelte-atoms/core/context';
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';

	const bond = DataGridBond.get();

	const preset = getPreset('datagrid.header');

	let {
		class: klass = '',
		as = preset?.as ?? 'div',
		base = preset?.base as B,
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
	{as}
	{base}
	class={[
		'col-span-full grid grid-cols-subgrid',
		toClassValue.apply(bond, [preset?.class]),
		toClassValue.apply(bond, [klass])
	]}
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
