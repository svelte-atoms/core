<script module lang="ts">
	export type DatagridTdProps<
		D,
		E extends HtmlElementTagName,
		B extends Base = Base
	> = HtmlAtomProps<E, B> & {
		value?: string;
		rows?: string;
		data?: D;
		children?: Snippet<[{ td?: DataGridTdBond<D> }]>;
		onclick?: (ev: Event, options: { td?: DataGridTdBond<D> }) => void;
	};
</script>

<script lang="ts" generics="D,E extends HtmlElementTagName, B extends Base = Base">
	import type { Snippet } from 'svelte';
	import type { DataGridTdBond } from './bond.svelte';
	import { DataGridBond } from '../bond.svelte';
	import { toClassValue } from '$svelte-atoms/core/utils';
	import { HtmlAtom, type HtmlAtomProps, type Base } from '$svelte-atoms/core/components/atom';
	import type { HtmlElementTagName } from '$svelte-atoms/core/components/element';
	import { getPreset } from '$svelte-atoms/core/context';

	const bond = DataGridBond.get();

	const preset = getPreset('datagrid.th');

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
		onclick = undefined,
		...restProps
	}: DatagridTdProps<D, E, B> = $props();

	let element = $state<HTMLElement>();

	const elementIndex = $derived.by(() => {
		if (element) {
			const children = [...(element?.parentElement?.children ?? [])];
			return children.indexOf(element);
		}

		return -1;
	});

	const column = $derived(bond.state.columns.values().find((col) => col.index === elementIndex));

	const isHidden = $derived(column?.state.props.hidden ?? false);

	function onclick_(ev: Event) {
		onclick?.(ev, { td: bond as unknown as DataGridTdBond<D> });

		if (!ev.defaultPrevented) {
			//
		}
	}
</script>

{#if !isHidden}
	<HtmlAtom
		{@attach (node) => {
			element = node;
		}}
		{as}
		{base}
		class={[
			'flex h-full items-center py-2 text-left',
			toClassValue.apply(bond, [preset?.class]),
			toClassValue.apply(bond, [klass])
		]}
		enter={enter?.bind(bond.state)}
		exit={exit?.bind(bond.state)}
		initial={initial?.bind(bond.state)}
		animate={animate?.bind(bond.state)}
		onmount={onmount?.bind(bond.state)}
		ondestroy={ondestroy?.bind(bond.state)}
		onclick={onclick_}
		{...restProps}
	>
		{@render children?.({ td: bond as unknown as DataGridTdBond<D> })}
	</HtmlAtom>
{/if}
