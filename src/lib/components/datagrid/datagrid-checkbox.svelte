<script module lang="ts">
	import type { Snippet } from 'svelte';

	export type DatagridCheckboxProps = HtmlAtomProps & {
		children?: Snippet;
	};
</script>

<script lang="ts">
	import { DataGridBond } from './bond.svelte';
	import { DataGridTrBond } from './tr/bond.svelte';
	import { Checkbox } from '$svelte-atoms/core/components/checkbox';
	import { getPreset } from '$svelte-atoms/core/context';
	import type { Base, HtmlAtomProps } from '$svelte-atoms/core/components/atom';
	import { toClassValue } from '$svelte-atoms/core/utils';

	const datagridBond = DataGridBond.get();
	const datagridTrBond = DataGridTrBond.get();

	const preset = getPreset('datagrid.checkbox');

	let {
		class: klass = '',
		value = undefined,
		checked = $bindable(false),
		base = preset?.base as Base,
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

	const classNames = $derived([
		'datagrid-td-checkbox',
		toClassValue.apply(datagridTrBond, [preset?.class, { bond: datagridTrBond }]),
		toClassValue.apply(datagridTrBond, [klass, { bond: datagridTrBond }])
	]);

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
		{base}
		{onclick}
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
		{base}
		{onclick}
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
