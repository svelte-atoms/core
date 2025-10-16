<script lang="ts" generics="T extends keyof HTMLElementTagNameMap, B extends Base = Base">
	import { DataGridBond } from './bond.svelte';
	import type { DatagridFooterProps } from './types';
	import { toClassValue } from '$svelte-atoms/core/utils';
	import { getPreset } from '$svelte-atoms/core/context';
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';

	const bond = DataGridBond.get();

	const preset = getPreset('datagrid.footer');

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
	}: DatagridFooterProps<T> = $props();
</script>

<HtmlAtom
	{as}
	{base}
	class={[toClassValue.apply(bond, [preset?.class]), toClassValue.apply(bond, [klass]), 'contents']}
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
