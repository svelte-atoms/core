<script lang="ts" generics="T = unknown, E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { untrack } from 'svelte';
	import { nanoid } from 'nanoid';
	import { defineProperty, defineState } from '$svelte-atoms/core/utils';
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { DataGridTrBond, DataGridTrBondState, type DataGridTrBondProps } from './bond.svelte';
	import type { DatagridTrProps } from '../types';
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
	}: DatagridTrProps<T, E, B> = $props();

	const bondProps = defineState<DataGridTrBondProps<T>>([
		defineProperty('data', () => data),
		defineProperty('value', () => value),
		defineProperty('header', () => header)
	]);

	const bond = untrack(() => factory(bondProps)).share();

	const isHeader = $derived(bond.state.isHeader);
	const isSelected = $derived(bond.state.isSelected);

	const trProps = $derived({ ...bond.root(), ...restProps });

	const unmount = untrack(() => (isHeader ? undefined : bond.mount()));
	$effect(() => unmount);

	function _factory(props: typeof bondProps) {
		const state = new DataGridTrBondState<T>(() => props);
		return new DataGridTrBond<T>(state);
	}

	function handleClick(ev: Event) {
		onclick?.(ev, { tr: bond });
	}
</script>

<HtmlAtom
	{bond}
	preset="datagrid.tr"
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
	{...trProps}
>
	{@render children?.({ tr: bond })}
</HtmlAtom>
