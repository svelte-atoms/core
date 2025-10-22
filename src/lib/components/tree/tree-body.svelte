<script module lang="ts">
	export type TreeBodyProps<
		E extends keyof HTMLElementTagNameMap = 'div',
		B extends Base = Base
	> = HtmlAtomProps<E, B> & {
		open?: boolean;
		disabled?: boolean;
		children?: Snippet<[{ tree?: TreeBond }]>;
	};
</script>

<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { Snippet } from 'svelte';
	import { TreeBond } from './bond.svelte';
	import { HtmlAtom, type HtmlAtomProps, type Base } from '$svelte-atoms/core/components/atom';

	const bond = TreeBond.get();

	let {
		class: klass = '',
		children = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	}: TreeBodyProps<E, B> = $props();

	const bodyProps = $derived({
		...bond?.body(),
		...restProps
	});
</script>

<HtmlAtom
	{bond}
	preset="tree.body"
	class={['pl-4', '$preset', klass]}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	{...bodyProps}
>
	{@render children?.({ tree: bond })}
</HtmlAtom>
