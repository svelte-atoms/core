<script lang="ts">
	import { Checkbox } from '$svelte-atoms/core/components/checkbox';
	import { DataGridBond } from './bond.svelte';
	import { DataGridTrBond } from './row/bond.svelte';
	export type { DatagridCheckboxProps } from './types';

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

	const classNames = $derived(['datagrid-cell-checkbox', '$preset', klass]);

	const activeCheckbox = $derived(isHeader ? headerCheckbox : rowCheckbox);

	function handleHeaderChange(ev: Event, context: { checked?: boolean } = {}) {
		const checked = context.checked ?? false;
		
		onchange?.(ev, { checked });

		const allIds = [...(datagridBond?.state.rows.keys() ?? [])];

		if(checked === true){
			datagridBond?.state.select(allIds);
		} else {
			datagridBond?.state.unselect(allIds);
		}
	}

	function handleRowChange(ev: Event, { checked = false }: { checked?: boolean }) {
		onchange?.(ev, { checked });
		if (ev.defaultPrevented || !rowId) return;

		if(checked){
			datagridTrBond?.state.select();
		} else {
			datagridTrBond?.state.unselect();
		}
	}
</script>

{#snippet headerCheckbox()}
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
{/snippet}

{#snippet rowCheckbox()}
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
{/snippet}

{@render activeCheckbox()}
