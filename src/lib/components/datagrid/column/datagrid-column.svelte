<script lang="ts" generics="T = unknown, E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { nanoid } from 'nanoid';
	import { untrack } from 'svelte';
	import { defineProperty, defineState } from '$svelte-atoms/core/utils';
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import {
		DataGridColumnBond,
		DataGridColumnBondState,
		type DataGridColumnBondProps
	} from './bond.svelte';
	import type { DatagridColumnProps } from '../types';

	let {
		class: klass = '',
		id = nanoid(),
		width = '1fr',
		direction = 'asc',
		hidden = false,
		sortable = undefined,
		factory = _factory,
		children = undefined,
		onclick = undefined,
		onsort = undefined,
		...restProps
	}: DatagridColumnProps<T, E, B> = $props();

	const bond = untrack(() => factory()).share();

	const isSortable = $derived(bond.state.isSortable);
	const columnProps = $derived({ ...bond.root().spread, ...bond.state.props, ...restProps });
	// const directionAsNumber = $derived(+(direction === 'asc'));

	const unmount = bond.mount();

	$effect(() => unmount);

	function _factory(): DataGridColumnBond<T> {
		const bondProps = defineState<DataGridColumnBondProps>([
			defineProperty('id', () => id),
			defineProperty('width', () => width),
			defineProperty('sortable', () => sortable),
			defineProperty('hidden', () => hidden),
			defineProperty('direction', () => direction)
		]);

		const bondState = new DataGridColumnBondState(() => bondProps);
		return new DataGridColumnBond<T>(bondState);
	}

	function onclick_(ev: Event) {
		const onClick = onclick as
			| ((event: MouseEvent & { currentTarget: EventTarget & HTMLDivElement }) => void)
			| undefined;
		onClick?.(ev as MouseEvent & { currentTarget: EventTarget & HTMLDivElement });

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

			if (typeof sortable === 'string') {
				onsort?.(new CustomEvent('sort'), { field: sortable, direction });
			} else {
				onsort?.(new CustomEvent('sort'), { direction });
			}
		}
	}
</script>

{#if !hidden}
	<HtmlAtom
		{bond}
			preset="datagrid.column"
		class={[
			'border-border flex cursor-pointer py-1 font-medium select-none',
			!!sortable && 'sortable',
			'$preset',
			klass
		]}
		onclick={onclick_}
		{...columnProps}
	>
		{@render children?.({ column: bond })}
	</HtmlAtom>
{/if}
