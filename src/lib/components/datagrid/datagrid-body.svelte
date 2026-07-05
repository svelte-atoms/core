<script lang="ts" generics="T = unknown, E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { DataGridBond } from './bond.svelte';
	import { HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import type { DatagridBodyProps } from './types';
	import { tick } from 'svelte';

	const bond = DataGridBond.get<T>();

	let {
		class: klass = '',
		children = undefined,
		...restProps
	}: DatagridBodyProps<T, E, B> = $props();

	const bodyProps = $derived({ ...bond?.body().spread, ...restProps });

	// Defer rendering rows until the grid template has been computed from the
	// registered columns. Without this gate, the body renders on the same tick
	// the root sets `--template-columns`, before the columns mounted in the
	// header have flushed to the derived `template`. The parent grid then
	// briefly resolves to the `auto` fallback (one column) and rows with
	// `grid-template-columns: subgrid` collapse into a single column, causing a
	// layout shift once the real template is applied.
	let isTemplateReady = $state(false);

	tick().then(() => {
		isTemplateReady = true;
	});

	const content = $derived(isTemplateReady ? children : undefined);
</script>

<HtmlAtom
	{bond}
	preset="datagrid.body"
	class={['border-border contents', '$preset', klass]}
	{...bodyProps}
>
	{@render content?.({ datagrid: bond })}
</HtmlAtom>
