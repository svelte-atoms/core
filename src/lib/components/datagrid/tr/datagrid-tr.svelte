<script lang="ts" generics="T, E extends HtmlElementTagName, B extends Base = Base">
	import { untrack } from 'svelte';
	import { nanoid } from 'nanoid';
	import { defineProperty, defineState } from '$svelte-atoms/core/utils';
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import type { HtmlElementTagName } from '$svelte-atoms/core/components/element';
	import { DataGridTrBond, DataGridTrBondState, type DataGridTrBondProps } from './bond.svelte';
	import type { DatagridTrProps } from '../types';
	import { type DatagridContext } from '../context';
	import { DataGridBond } from '../bond.svelte';

	import './datagrid-tr.css';

	const datagridBond = DataGridBond.get();

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
	const bond = untrack(() => factory(bondProps).share());

	const isHeader = $derived(bond?.state.isHeader ?? false);
	const isSelected = $derived(bond.state.isSelected);

	const headerProps = $derived({
		...bond.root(),
		...restProps
	});

	const unmount = untrack(() => {
		// Header rows don't participate in the row registry
		if (isHeader) {
			return;
		}

		// Register this row in the datagrid's row map
		// Note: unmounting doesn't delete the bond anymore, it just removes the DOM element
		// This preserves selection state and other bond data during virtualization
		return bond.mount();
	});

	$effect(() => unmount);

	function _factory(props: typeof bondProps) {
		if(datagridBond?.state.rows.has(value)){
			return datagridBond.state.rows.get(value)!;
		}

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
