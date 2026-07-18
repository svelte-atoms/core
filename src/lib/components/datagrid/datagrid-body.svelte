<script
	lang="ts"
	generics="T = unknown, E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base"
>
	import { DataGridBond } from './bond.svelte';
	import { HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import { usePart } from '$ixirjs/ui/shared';
	import type { DatagridBodyProps } from './types';
	import { tick } from 'svelte';

	let {
		class: klass = '',
		preset = undefined,
		children = undefined,
		...restProps
	}: DatagridBodyProps<T, E, B> = $props();

	const part = usePart(DataGridBond, 'body', () => restProps, {
		message: 'DataGrid.Body must be used within DataGrid.Root.',
		preset: () => preset
	});
	const bond = part.bond as DataGridBond<T>;

	// Gate rows until columns have flushed to the derived template; otherwise subgrid rows collapse to the `auto` fallback for one tick.
	let isTemplateReady = $state(false);

	tick().then(() => {
		isTemplateReady = true;
	});

	const content = $derived(isTemplateReady ? children : undefined);
</script>

<HtmlAtom {bond} class={['contents', '$preset', klass]} {...part.props}>
	{@render content?.({ datagrid: bond })}
</HtmlAtom>
