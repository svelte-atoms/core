<script lang="ts" generics="E extends keyof HTMLElementTagNameMap='div', B extends Base = Base">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { SlideoverFooterProps } from './types';
	import { DrawerBond } from './bond.svelte';
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';

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
	}: SlideoverFooterProps<E, B> & HTMLAttributes<Element> = $props();

	const footerProps = $derived({
		...bond?.footer(),
		...restProps
	});
</script>

<HtmlAtom
	{bond}
	class={['border-border', '$preset', klass]}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	{...footerProps}
>
	{@render children?.({ drawer: bond })}
</HtmlAtom>
