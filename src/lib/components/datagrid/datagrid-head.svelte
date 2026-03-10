<script lang="ts" generics="T = unknown, E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { setDatagridHeaderContext } from './context';
	import { DataGridBond } from './bond.svelte';
	import type { DatagridHeaderProps } from './types';

	const bond = DataGridBond.get<T>();

	let {
		class: klass = '',
		children = undefined,
		...restProps
	}: DatagridHeaderProps<T, E, B> = $props();

	setDatagridHeaderContext({ derived: { data: { header: true } } });
</script>

<HtmlAtom
	{bond}
	preset="datagrid.head"
	class={['border-border col-span-full grid grid-cols-subgrid', '$preset', klass]}
	{...restProps}
>
	{@render children?.({ datagrid: bond })}
</HtmlAtom>
