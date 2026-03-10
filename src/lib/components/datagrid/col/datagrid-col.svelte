<script lang="ts" generics="T = unknown, E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { nanoid } from 'nanoid';
	import { defineProperty, defineState } from '$svelte-atoms/core/utils';
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { DataGridThBond, DataGridThBondState, type DataGridThBondProps } from './bond.svelte';
	import type { DatagridThProps } from '../types';
	import { untrack } from 'svelte';

	let {
		class: klass = '',
		id = nanoid(),
		width = '1fr',
		direction = $bindable('asc' as const),
		screen = undefined,
		hidden = false,
		sortable = undefined,
		factory = _factory,
		children = undefined,
		onclick = undefined,
		onsort = undefined,
		...restProps
	}: DatagridThProps<T, E, B> = $props();

	const bond = untrack(() => factory()).share();

	const isSortable = $derived(bond.state.isSortable);

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
		return new DataGridThBond<T>(new DataGridThBondState<T>(() => bondProps));
	}

	function handleClick(ev: Event) {
		onclick?.(ev as MouseEvent & { currentTarget: EventTarget & HTMLDivElement });

		if (!ev.defaultPrevented && isSortable) {
			direction = direction === 'asc' ? 'desc' : 'asc';

			onsort?.(new CustomEvent('sort'), {
				field: typeof sortable === 'boolean' ? undefined : sortable,
				direction
			});
		}
	}
</script>

{#if !hidden}
	<HtmlAtom
		{bond}
		preset="datagrid.col"
		class={[
			'border-border flex cursor-pointer py-1 font-medium select-none',
			!!sortable && 'sortable',
			'$preset',
			klass
		]}
		onclick={handleClick}
		{...bond.attachment()}
		{...restProps}
	>
		{@render children?.({ th: bond })}
	</HtmlAtom>
{/if}
