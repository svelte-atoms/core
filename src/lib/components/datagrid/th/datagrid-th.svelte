<script module lang="ts">
	export type DatagridThProps = HtmlAtomProps<'div'> & {
		id?: string;
		class?: string;
		width?: string;
		direction?: Direction;
		screen?: string;
		sortable?: boolean | SortableType;
		hidden?: boolean;
		factory?: () => DataGridThBond<unknown>;
		children?: Snippet<
			[
				{
					th: DatagridContext;
				}
			]
		>;
	};
</script>

<script lang="ts" generics="T extends keyof HTMLElementTagNameMap, B extends Base = Base">
	import type { Snippet } from 'svelte';
	import { nanoid } from 'nanoid';
	import { DataGridThBond, DataGridThBondState, type DataGridThBondProps } from './bond.svelte';
	import type { Direction, SortableType } from '$svelte-atoms/core/types';
	import type { DatagridContext } from '../context';
	import { defineProperty, defineState, toClassValue } from '$svelte-atoms/core/utils';
	import { getPreset } from '$svelte-atoms/core/context';
	import { HtmlAtom, type Base, type HtmlAtomProps } from '$svelte-atoms/core/components/atom';

	const preset = getPreset('datagrid.th');

	let {
		class: klass = '',
		id = nanoid(),
		width = '1fr',
		direction = 'asc',
		screen = undefined,
		hidden = false,
		as = preset?.as ?? 'div',
		base = preset?.base as B,
		sortable = undefined,
		factory = _factory,
		children = undefined,
		onclick = undefined,
		onsort = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	}: DatagridThProps = $props();

	const bond = factory().share();

	const isSortable = $derived(bond.state.isSortable);
	// const directionAsNumber = $derived(+(direction === 'asc'));

	const unmount = bond.mount();

	$effect(() => unmount);

	function _factory() {
		const bondProps = defineState<DataGridThBondProps>([
			defineProperty('id', () => id),
			defineProperty('width', () => width),
			defineProperty('sortable', () => sortable),
			defineProperty('hidden', () => hidden),
			defineProperty('direction', () => direction)
		]);

		const bondState = new DataGridThBondState(() => bondProps);
		return new DataGridThBond(bondState);
	}

	function onclick_(ev: Event) {
		onclick?.(ev as MouseEvent & { currentTarget: EventTarget & HTMLDivElement });

		if (!ev.defaultPrevented) {
			if (!isSortable) {
				return;
			}

			if (isSortable) {
				if (direction === 'asc') {
					direction = 'desc';
				} else {
					direction = 'asc';
				}
			} else {
				if (!(typeof sortable === 'boolean')) {
					// sortby_columns[value] = column;
				}
			}

			onsort?.(new CustomEvent('sort'), {
				field: typeof sortable === 'boolean' ? undefined : sortable,
				direction
			});
		}
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
{#if !hidden}
	<HtmlAtom
		{as}
		{@attach (node) => {
			bond.elements.root = node;
		}}
		class={[
			'flex cursor-pointer py-1 font-medium select-none',
			!!sortable && 'sortable',
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
		{...bond.props()}
		{...restProps}
	>
		{@render children?.({ th: bond as unknown as DatagridContext })}
	</HtmlAtom>
{/if}
