<script lang="ts" generics="T = unknown, E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { DataGridBond } from './bond.svelte';
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import type { DatagridBodyProps } from './types';

	const bond = DataGridBond.get<T>();

	let {
		class: klass = '',
		children = undefined,
		...restProps
	}: DatagridBodyProps<T, E, B> = $props();

	const bodyProps = $derived({ ...bond?.body().spread, ...restProps });
</script>

<HtmlAtom
	{bond}
	preset="datagrid.body"
	class={['border-border contents', '$preset', klass]}
	{...bodyProps}
>
	{@render children?.({ datagrid: bond })}
</HtmlAtom>
