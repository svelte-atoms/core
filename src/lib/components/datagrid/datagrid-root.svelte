<script lang="ts" generics="T = unknown, E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { defineProperty, defineState } from '$svelte-atoms/core/utils';
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { DataGridBond, DataGridBondState, type DataGridStateProps } from './bond.svelte';
	import type { DatagridRootProps } from './types';
	import './datagrid.css';
	import { untrack } from 'svelte';

	let {
		class: klass = '',
		values = $bindable([]),
		template = undefined,
		fallbackTemplate = 'auto',
		factory = _factory,
		children = undefined,
		...restProps
	}: DatagridRootProps<T, E, B> = $props();

	const bondProps = defineState<DataGridStateProps<T>>([
		defineProperty('template', () => template),
		defineProperty(
			'values',
			() => values,
			(v) => (values = v)
		)
	]);

	const bond = untrack(() => factory(bondProps)).share();

	function _factory(props: typeof bondProps) {
		const state = new DataGridBondState<T>(() => props);
		return new DataGridBond<T>(state);
	}

	export function getBond() {
		return bond;
	}
</script>

<HtmlAtom
	{bond}
	preset="datagrid"
	class={['border-border datagrid-root w-full gap-x-0 gap-y-0', '$preset', klass]}
	style="--template-columns:{bond.state.template || fallbackTemplate}"
	{...restProps}
>
	{@render children?.({ datagrid: bond })}
</HtmlAtom>
