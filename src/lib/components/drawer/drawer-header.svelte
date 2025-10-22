<script module lang="ts">
	export type SlideoverHeaderProps<
		E extends keyof HTMLElementTagNameMap,
		B extends Base = Base
	> = Override<
		HtmlAtomProps<E, B>,
		{
			children?: Snippet<[{ drawer?: DrawerBond }]>;
		}
	>;
</script>

<script lang="ts" generics="E extends keyof HTMLElementTagNameMap='div', B extends Base = Base">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { DrawerBond } from './bond.svelte';
	import type { Override } from '$svelte-atoms/core/types';
	import { HtmlAtom, type HtmlAtomProps, type Base } from '$svelte-atoms/core/components/atom';

	type Element = HTMLElementTagNameMap[E];

	const bond = DrawerBond.get();

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
	}: SlideoverHeaderProps<E, B> & HTMLAttributes<Element> = $props();

	const headerProps = $derived({
		...bond?.header(),
		...restProps
	});
</script>

<HtmlAtom
	{bond}
	class={['$preset', klass]}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	{...headerProps}
	{...restProps}
>
	{@render children?.({ drawer: bond })}
</HtmlAtom>
