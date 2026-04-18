<script lang="ts" generics="T = unknown, E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { untrack } from 'svelte';
	import { nanoid } from 'nanoid';
	import { defineProperty, defineState } from '$svelte-atoms/core/utils';
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { DataGridRowBond, DataGridRowBondState, type DataGridRowBondProps } from './bond.svelte';
	import type { DatagridRowProps } from '../types';
    import './datagrid-row.css';

	let {
		class: klass = '',
		value = nanoid(),
		rows = 'auto',
		data = undefined,
		header = false,
		factory = _factory,
		children = undefined,
		onclick = undefined,
		...restProps
	}: DatagridRowProps<T, E, B> = $props();

	const bondProps = defineState<DataGridRowBondProps<T>>([
		defineProperty('data', () => data),
		defineProperty('value', () => value),
		defineProperty('header', () => header)
	]);

	const bond = untrack(() => factory(bondProps)).share();

	const isHeader = $derived(bond.state.isHeader);
	const isSelected = $derived(bond.state.isSelected);

	const rowProps = $derived({ ...bond.root().spread, ...restProps });

	const unmount = untrack(() => (isHeader ? undefined : bond.mount()));
	$effect(() => unmount);

	function _factory(props: typeof bondProps) {
		const state = new DataGridRowBondState<T>(() => props);
		return new DataGridRowBond<T>(state);
	}

	function handleClick(ev: Event) {
		onclick?.(ev, { row: bond });
	}
</script>

<HtmlAtom
	{bond}
	preset="datagrid.row"
	class={[
		'datagrid-row border-border items-center border-b bg-transparent',
		!isHeader && 'hover:bg-foreground/2 active:bg-foreground/4 transition-colors duration-100',
		isHeader && 'header-tr',
		isSelected && 'bg-primary/2 hover:bg-primary/4 active:bg-primary/6',
		'$preset',
		klass
	]}
	style="--rows:{rows}"
	onclick={handleClick}
	{...rowProps}
>
	{@render children?.({ row: bond })}
</HtmlAtom>
