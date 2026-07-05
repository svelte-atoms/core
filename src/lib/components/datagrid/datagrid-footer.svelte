<script
	lang="ts"
	generics="T = unknown, E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base"
>
	import { mergeAtomProps, HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import { createAtomInstance } from '$ixirjs/ui/shared/bond';
	import { DataGridBond, DataGridFooterAtom } from './bond.svelte';
	import type { DatagridFooterProps } from './types';

	const bond = DataGridBond.getOrThrow(
		'DataGrid.Footer must be used within DataGrid.Root.'
	) as DataGridBond<T>;

	let {
		class: klass = '',
		preset = undefined,
		children = undefined,
		...restProps
	}: DatagridFooterProps<T, E, B> = $props();

	const atom = createAtomInstance<DataGridFooterAtom, DataGridBond<T>>('footer', {
		bond,
		factory: (owner) => new DataGridFooterAtom(owner as DataGridBond<T>)
	});
	const footerProps = $derived(mergeAtomProps(atom, preset, restProps));
</script>

<HtmlAtom {bond} class={['$preset', klass, 'contents']} {...footerProps}>
	{@render children?.({ datagrid: bond })}
</HtmlAtom>
