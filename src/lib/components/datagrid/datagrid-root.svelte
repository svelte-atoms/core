<script lang="ts" generics="T extends keyof HTMLElementTagNameMap, B extends Base = Base">
	import { DataGridBond, DataGridBondState, type DataGridStateProps } from './bond.svelte';
	import type { DatagridRootProps } from './types';
	import { defineProperty, defineState, toClassValue } from '$svelte-atoms/core/utils';
	import { getPreset } from '$svelte-atoms/core/context';
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import './datagrid.css';

	const preset = getPreset('datagrid');

	let {
		class: klass = '',
		values = $bindable([]),
		template = undefined,
		data = [],
		as = preset?.as ?? 'div',
		base = preset?.base as B,
		factory = _factory,
		children = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	}: DatagridRootProps<T> = $props();

	const bondProps = defineState<DataGridStateProps<T>>([
		defineProperty('template', () => template),
		defineProperty(
			'values',
			() => values,
			(v) => (values = v)
		)
	]);
	const bond = factory(bondProps).share();

	function _factory(props: typeof bondProps) {
		const dataGridState = new DataGridBondState(() => props);
		return new DataGridBond(dataGridState);
	}

	export function getBond() {
		return bond;
	}
</script>

<HtmlAtom
	{as}
	{base}
	class={[
		'datagrid-root w-full gap-x-0 gap-y-0',
		toClassValue.apply(bond, [preset?.class]),
		toClassValue.apply(bond, [klass])
	]}
	style="--template-columns:{bond.state.template}"
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
