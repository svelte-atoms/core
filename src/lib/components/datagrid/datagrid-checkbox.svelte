<script lang="ts">
	import { Checkbox } from '$svelte-atoms/core/components/checkbox';
	import type { DatagridCheckboxProps } from './types';
	import { DataGridBond } from './bond.svelte';
	import { DataGridTrBond } from './tr/bond.svelte';
	export type { DatagridCheckboxProps } from './types';

	const datagridBond = DataGridBond.get();
	const datagridTrBond = DataGridTrBond.get();

	let {
		class: klass = '',
		value = undefined,
		checked = $bindable(false),
		onclick = undefined,
		onchange = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	}: DatagridCheckboxProps = $props();

	const id = $derived(datagridTrBond.state.id);

	const isAllRowsSelected = $derived(
		datagridBond.state.selectedRows.length > 0 &&
			datagridBond.state.rows.size === datagridBond.state.selectedRows.length
	);

	const isHeaderRow = $derived(datagridTrBond?.state.isHeader);

	const classNames = $derived(['datagrid-td-checkbox', '$preset', klass]);

	function handleInputTd(ev: Event, { checked = false }) {
		onchange?.(ev, { checked });

		if (!ev.defaultPrevented) {
			//
			if (checked) {
				datagridBond.state.select([id]);
			} else {
				datagridBond.state.unselect([id]);
			}
		}
	}

	function handleInputTh(ev: Event, { checked = false }) {
		onchange?.(ev, { checked });

		if (!ev.defaultPrevented) {
			const allRows = datagridBond.state.rows.keys().toArray();

			if (checked) {
				datagridBond.state.select(allRows);
			} else {
				datagridBond.state.unselect(allRows);
			}
		}
	}
</script>

{#if isHeaderRow}
	<!-- content here -->
	<Checkbox
		{value}
		{onclick}
		bond={datagridTrBond}
		preset="datagrid.checkbox"
		class={classNames}
		checked={isAllRowsSelected}
		enter={enter?.bind(datagridTrBond)}
		exit={exit?.bind(datagridTrBond)}
		initial={initial?.bind(datagridTrBond)}
		animate={animate?.bind(datagridTrBond)}
		onmount={onmount?.bind(datagridTrBond)}
		ondestroy={ondestroy?.bind(datagridTrBond)}
		oninput={handleInputTh}
		{...restProps}
	/>
{:else}
	<!-- else content here -->
	<Checkbox
		{value}
		{onclick}
		bond={datagridTrBond}
		preset="datagrid.checkbox"
		class={classNames}
		checked={datagridTrBond.state.isSelected}
		enter={enter?.bind(datagridTrBond)}
		exit={exit?.bind(datagridTrBond)}
		initial={initial?.bind(datagridTrBond)}
		animate={animate?.bind(datagridTrBond)}
		onmount={onmount?.bind(datagridTrBond)}
		ondestroy={ondestroy?.bind(datagridTrBond)}
		oninput={handleInputTd}
		{...restProps}
	/>
{/if}
