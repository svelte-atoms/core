<script lang="ts" generics="T extends keyof HTMLElementTagNameMap, B extends Base = Base">
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
		keys = undefined,
		factory = _factory,
		children = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	}: DatagridRootProps<T> = $props();

	const bondProps = defineState<DataGridStateProps<T>>([
		defineProperty('template', () => template),
		defineProperty(
			'values',
			() => values,
			(v) => (values = v)
		),
		defineProperty('keys', () => keys)
	]);
	const bond = untrack(() => factory(bondProps).share());

	// Automatic cleanup of stale bonds when keys change (e.g., data refresh, filter, search)
	// Runs asynchronously to avoid blocking the main thread
	$effect(() => {
		if (keys && bond.state.rows.size > 0) {
			// Defer to idle time to avoid blocking rendering/interactions
			requestIdleCallback(() => {
				const cleaned = bond.state.clearStaleRows(keys);
				if (cleaned > 0) {
					console.debug(`[DataGrid] Cleaned ${cleaned} stale row bonds`);
				}
			});
		}
	});

	function _factory(props: typeof bondProps) {
		const dataGridState = new DataGridBondState(() => props);
		return new DataGridBond(dataGridState);
	}

	export function getBond() {
		return bond;
	}

	/**
	 * Cleanup stale row bonds when data changes.
	 * Pass the current dataset IDs to remove bonds that no longer exist.
	 */
	export function clearStaleRows(validIds: string[] | Set<string>) {
		return bond.state.clearStaleRows(validIds);
	}
</script>

<HtmlAtom
	{bond}
	preset="datagrid"
	class={['border-border', 'datagrid-root w-full gap-x-0 gap-y-0', '$preset', klass]}
	style="--template-columns:{bond.state.template ?? fallbackTemplate}"
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	{...restProps}
>
	{@render children?.({ datagrid: bond })}
</HtmlAtom>
