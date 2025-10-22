<script module lang="ts">
	import type { Snippet } from 'svelte';

	export type SlideoverContentProps<
		E extends keyof HTMLElementTagNameMap,
		B extends Base = Base
	> = Override<
		HtmlAtomProps<E, B>,
		{
			children?: Snippet<[{ sidebar?: SidebarBond<any> }]>;
		}
	>;
</script>

<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { SidebarBond } from './bond.svelte';
	import type { Override } from '$svelte-atoms/core/types';
	import { HtmlAtom, type HtmlAtomProps, type Base } from '$svelte-atoms/core/components/atom';

	const bond = SidebarBond.get();

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
	}: SlideoverContentProps<E, B> = $props();

	const contentProps = $derived({
		...bond?.content(),
		...restProps
	});
</script>

<HtmlAtom
	{bond}
	preset="sidebar.content"
	class={['bg-card border-border', '$preset', klass]}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	{...contentProps}
>
	{@render children?.({ sidebar: bond })}
</HtmlAtom>
