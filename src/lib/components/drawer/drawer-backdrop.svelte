<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { SlideoverBackdropProps } from './types';
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { DrawerBond } from './bond.svelte';

	type Element = HTMLElementTagNameMap[E];

	const bond = DrawerBond.get();

	let {
		class: klass = '',
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	}: SlideoverBackdropProps<E, B> & HTMLAttributes<Element> = $props();

	const backdropProps = $derived({
		...restProps
	});
</script>

<HtmlAtom
	{bond}
	preset="drawer.backdrop"
	class={['border-border absolute inset-0 z-0 bg-black/30', '$preset', klass]}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	{...backdropProps}
/>
