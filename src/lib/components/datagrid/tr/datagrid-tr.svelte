<script lang="ts" generics="T, E extends HtmlElementTagName, B extends Base = Base">
	import { untrack } from 'svelte';
	import { nanoid } from 'nanoid';
	import { defineProperty, defineState } from '$svelte-atoms/core/utils';
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import type { HtmlElementTagName } from '$svelte-atoms/core/components/element';
	import { DataGridTrBond, DataGridTrBondState, type DataGridTrBondProps } from './bond.svelte';
	import type { DatagridTrProps } from '../types';
	import { type DatagridContext } from '../context';

	import './datagrid-tr.css';

	let {
		class: klass = '',
		value = nanoid(),
		rows = 'auto',
		data = undefined,
		header = false,
		factory = _factory,
		children = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		onclick = undefined,
		...restProps
	}: DatagridTrProps<T, E, B> = $props();

	const bondProps = defineState<DataGridTrBondProps>([
		defineProperty('data', () => data),
		defineProperty('value', () => value),
		defineProperty('header', () => header)
	]);
	const bond = factory(bondProps).share();

	const isHeader = $derived(bond?.state.isHeader ?? false);
	const isSelected = $derived(bond.state.isSelected);

	const headerProps = $derived({
		...bond.root(),
		...restProps
	});

	const unmount = untrack(() => {
		if (!isHeader) {
			return bond.mount();
		}
	});

	$effect(() => unmount);

	function _factory(props: typeof bondProps) {
		const datagridTrState = new DataGridTrBondState(() => props);
		return new DataGridTrBond(datagridTrState);
	}

	function onclick_(ev: Event) {
		onclick?.(ev, { tr: bond as unknown as DatagridContext<T> });

		if (!ev.defaultPrevented) {
			//
		}
	}
</script>

<HtmlAtom
	{bond}
	preset="datagrid.tr"
	class={[
		'datagrid-tr border-border items-center border-b bg-transparent',
		!isHeader && 'hover:bg-foreground/2 active:bg-foreground/4 transition-colors duration-100',
		isHeader && 'header-tr',
		isSelected && 'bg-primary/2 hover:bg-primary/4 active:bg-primary/6',
		'$preset',
		klass
	]}
	style="--rows:{rows}"
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	onclick={onclick_}
	{...headerProps}
>
	{@render children?.({ tr: bond as unknown as DatagridContext<T> })}
</HtmlAtom>
