<script lang="ts" generics="T = unknown, E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { setDatagridHeaderContext } from './context';
	import { DataGridBond } from './bond.svelte';
	import type { DatagridHeaderProps } from './types';

	const bond = DataGridBond.get<T>();
	if (!bond) {
		throw new Error('DataGrid.Header must be used within DataGrid.Root.');
	}

	let {
		class: klass = '',
		children = undefined,
		...restProps
	}: DatagridHeaderProps<T, E, B> = $props();

	const header = $state(true);

	const derived_header = $derived({
		data: {
			header
		}
	});

	setDatagridHeaderContext({
		get derived() {
			return derived_header;
		}
	});

	const headerProps = $derived({ ...bond.header().spread, ...restProps });
</script>

<HtmlAtom
	{bond}
		preset="datagrid.header"
	class={['border-border col-span-full grid grid-cols-subgrid', '$preset', klass]}
	{...headerProps}
>
	{@render children?.({ datagrid: bond })}
</HtmlAtom>
