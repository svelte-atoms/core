<script module lang="ts">
	export type SlideoverTitleProps<
		E extends keyof HTMLElementTagNameMap,
		B extends Base = Base
	> = Override<
		HtmlAtomProps<E, B>,
		{
			children?: Snippet<[{ drawer?: DrawerBond }]>;
		}
	>;
</script>

<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'h3', B extends Base = Base">
	import type { Component, Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { DrawerBond } from './bond.svelte';
	import type { Override } from '$svelte-atoms/core/types';
	import { HtmlAtom, type HtmlAtomProps, type Base } from '$svelte-atoms/core/components/atom';
	import { getPreset } from '$svelte-atoms/core/context';
	import { toClassValue } from '$svelte-atoms/core/utils';

	type Element = HTMLElementTagNameMap[E];

	const bond = DrawerBond.get();
	const preset = getPreset('drawer.title');

	let {
		class: klass = '',
		as = preset?.as ?? ('h3' as E),
		base = preset?.base as B,
		children,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	}: SlideoverTitleProps<E, B> & HTMLAttributes<Element> = $props();

	const titleProps = $derived({
		...bond?.title(),
		...restProps
	});
</script>

<HtmlAtom
	{as}
	{base}
	class={[toClassValue.apply(bond, [preset?.class]), toClassValue.apply(bond, [klass])]}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	{...titleProps}
>
	{@render children?.({ drawer: bond })}
</HtmlAtom>
