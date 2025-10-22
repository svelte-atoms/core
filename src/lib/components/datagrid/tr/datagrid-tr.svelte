<script module lang="ts">
	export type DatagridTrProps<
		D,
		E extends HtmlElementTagName,
		B extends Base = Base
	> = HtmlAtomProps<E, B> & {
		class?: string;
		value?: string;
		rows?: string;
		data?: D;
		factory?: Factory<DataGridTrBond<D>>;
		children?: Snippet<[{ tr: DatagridContext<D> }]>;
		onclick?: (ev: Event, options: { tr?: DatagridContext<D> }) => void;
	};
</script>

<script lang="ts" generics="T, E extends HtmlElementTagName, B extends Base = Base">
	import { untrack, type Snippet } from 'svelte';
	import { nanoid } from 'nanoid';
	import { defineProperty, defineState } from '$svelte-atoms/core/utils';
	import { DataGridTrBond, DataGridTrBondState, type DataGridTrBondProps } from './bond.svelte';
	import { getDatagridHeaderContext, type DatagridContext } from '../context';
	import { HtmlAtom, type HtmlAtomProps, type Base } from '$svelte-atoms/core/components/atom';
	import type { HtmlElementTagName } from '$svelte-atoms/core/components/element';
	import type { Factory } from '$svelte-atoms/core/types';
	import './datagrid-tr.css';

	const context_header = getDatagridHeaderContext();

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

	const isHeader = $derived(context_header?.derived?.data?.header ?? false);
	const isSelected = $derived(bond.state.isSelected);

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
		!isHeader &&
			'hover:bg-foreground/5 active:bg-foreground/10 transition-colors duration-100 last:border-b-0',
		isHeader && 'header-tr',
		isSelected && 'bg-foreground/3',
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
	{...bond.root(restProps)}
>
	{@render children?.({ tr: bond as unknown as DatagridContext<T> })}
</HtmlAtom>
