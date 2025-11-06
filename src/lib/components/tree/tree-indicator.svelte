<script lang="ts" module>
	export type CollapsibleHeaderProps<
		E extends keyof HTMLElementTagNameMap = 'div',
		B extends Base = Base
	> = HtmlAtomProps<E, B> &
		TreeBondProps & {
			children?: Snippet<[{ tree?: TreeBond }]>;
		};
</script>

<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { Snippet } from 'svelte';
	import { TreeBond, type TreeBondProps } from './bond.svelte';
	import { HtmlAtom, type HtmlAtomProps, type Base } from '$svelte-atoms/core/components/atom';

	const bond = TreeBond.get();

	let {
		open = $bindable(false),
		class: klass = '',
		children = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	}: CollapsibleHeaderProps<E, B> = $props();

	const indicatorProps = $derived({
		...bond?.indicator(),
		...restProps
	});
</script>

<HtmlAtom
	{bond}
	preset="tree.indicator"
	class={['border-border aspect-square h-fit', '$preset', klass]}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	{...indicatorProps}
>
	{@render children?.({ tree: bond })}
</HtmlAtom>
