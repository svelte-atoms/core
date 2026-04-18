<script lang="ts">
	import { Checkbox } from '$svelte-atoms/core/components/checkbox';
	import { DataGridBond } from './bond.svelte';
	import { DataGridRowBond } from './row/bond.svelte';
	import type { DatagridCheckboxProps } from './types';

	const datagridBond = DataGridBond.get();
	const datagridRowBond = DataGridRowBond.get();

	let {
		class: klass = '',
		value = undefined,
		checked = $bindable(false),
		onclick = undefined,
		oninput = undefined,
		onchange = undefined,
		...restProps
	}: DatagridCheckboxProps = $props();

	const isHeader = $derived(datagridRowBond?.state.isHeader ?? false);
	const rowId = $derived(datagridRowBond?.state.id);

	const selectedCount = $derived(datagridBond?.state.selectedRows.length ?? 0);
	const rowCount = $derived(datagridBond?.state.rows.size ?? 0);

	const isAllSelected = $derived(rowCount > 0 && selectedCount === rowCount);
	const isHeaderIndeterminate = $derived(selectedCount > 0 && selectedCount < rowCount);

	const isRowSelected = $derived(datagridRowBond?.state.isSelected ?? false);

	const classNames = $derived(['datagrid-cell-checkbox', '$preset', klass]);

	const activeCheckbox = $derived(isHeader ? headerCheckbox : rowCheckbox);

	function handleCallbacks(ev: Event, checked: boolean) {
		const onInput = oninput as ((event: Event, options: { checked: boolean }) => void) | undefined;
		const onChange = onchange as ((event: Event, options: { checked: boolean }) => void) | undefined;
		onInput?.(ev, { checked });
		onChange?.(ev, { checked });
	}

	function handleHeaderChange(ev?: Event) {
		const checked = !isAllSelected;
		const currentEvent = ev ?? new Event('input');
		handleCallbacks(currentEvent, checked);
		if (currentEvent.defaultPrevented) return;

		const allIds = [...(datagridBond?.state.rows.keys() ?? [])];

		if(checked === true){
			datagridBond?.state.select(allIds);
		} else {
			datagridBond?.state.unselect(allIds);
		}
	}

	function handleRowChange(ev?: Event) {
		const checked = !isRowSelected;
		const currentEvent = ev ?? new Event('input');
		handleCallbacks(currentEvent, checked);
		if (currentEvent.defaultPrevented || !rowId) return;

		if(checked){
			datagridRowBond?.state.select();
		} else {
			datagridRowBond?.state.unselect();
		}
	}
</script>

{#snippet headerCheckbox()}
	<Checkbox
		{...(value !== undefined ? { value: value as string } : {})}
		{...(onclick ? { onclick: onclick as (ev?: Event) => void } : {})}
		bond={datagridRowBond}
		preset="datagrid.checkbox"
		class={classNames}
		checked={isAllSelected}
		indeterminate={isHeaderIndeterminate}
		oninput={handleHeaderChange}
		{...restProps}
	/>
{/snippet}

{#snippet rowCheckbox()}
	<Checkbox
		{...(value !== undefined ? { value: value as string } : {})}
		{...(onclick ? { onclick: onclick as (ev?: Event) => void } : {})}
		bond={datagridRowBond}
		preset="datagrid.checkbox"
		class={classNames}
		checked={isRowSelected}
		oninput={handleRowChange}
		{...restProps}
	/>
{/snippet}

{@render activeCheckbox()}
