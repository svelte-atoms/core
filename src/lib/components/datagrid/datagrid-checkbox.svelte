<script lang="ts">
	import { Checkbox } from '$svelte-atoms/core/components/checkbox';
	import { DataGridBond } from './bond.svelte';
	import { DataGridTrBond } from './tr/bond.svelte';
	import type { DatagridCheckboxProps } from './types';

	const datagridBond = DataGridBond.get();
	const datagridTrBond = DataGridTrBond.get();

	let {
		class: klass = '',
		value = undefined,
		checked = $bindable(false),
		onclick = undefined,
		onchange = undefined,
		...restProps
	}: DatagridCheckboxProps = $props();

	const isHeader = $derived(datagridTrBond?.state.isHeader ?? false);
	const rowId = $derived(datagridTrBond?.state.id);

	const isAllSelected = $derived(
		!!datagridBond &&
		datagridBond.state.selectedRows.length > 0 &&
		datagridBond.state.rows.size === datagridBond.state.selectedRows.length
	);

	const isRowSelected = $derived(datagridTrBond?.state.isSelected ?? false);

	const classNames = $derived(['datagrid-td-checkbox', '$preset', klass]);

	function handleHeaderChange(ev: Event, { checked = false }: { checked?: boolean }) {
		onchange?.(ev, { checked });
		if (ev.defaultPrevented) return;

		const allIds = [...(datagridBond?.state.rows.keys() ?? [])];
		checked ? datagridBond?.state.select(allIds) : datagridBond?.state.unselect(allIds);
	}

	function handleRowChange(ev: Event, { checked = false }: { checked?: boolean }) {
		onchange?.(ev, { checked });
		if (ev.defaultPrevented || !rowId) return;

		checked ? datagridBond?.state.select([rowId]) : datagridBond?.state.unselect([rowId]);
	}
</script>

{#if isHeader}
	<Checkbox
		{value}
		{onclick}
		bond={datagridTrBond}
		preset="datagrid.checkbox"
		class={classNames}
		checked={isAllSelected}
		oninput={handleHeaderChange}
		{...restProps}
	/>
{:else}
	<Checkbox
		{value}
		{onclick}
		bond={datagridTrBond}
		preset="datagrid.checkbox"
		class={classNames}
		checked={isRowSelected}
		oninput={handleRowChange}
		{...restProps}
	/>
{/if}
