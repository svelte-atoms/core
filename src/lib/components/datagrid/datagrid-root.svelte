<script lang="ts" generics="T extends keyof HTMLElementTagNameMap, B extends Base = Base">
	import { DataGridBond, DataGridBondState, type DataGridStateProps } from './bond.svelte';
	import type { DatagridRootProps } from './types';
	import { defineProperty, defineState } from '$svelte-atoms/core/utils';
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';

	import './datagrid.css';

	let {
		class: klass = '',
		values = $bindable([]),
		template = undefined,
		data = [],
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
	{bond}
	preset="datagrid"
	class={['datagrid-root w-full gap-x-0 gap-y-0', '$preset', klass]}
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
