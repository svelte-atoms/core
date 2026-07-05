<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { SlideoverBackdropProps } from './types';
	import { HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import { DrawerBond } from './bond.svelte';

	type Element = HTMLElementTagNameMap[E];

	const bond = DrawerBond.get();

	let {
		class: klass = '',
		...restProps
	}: SlideoverBackdropProps<E, B> & HTMLAttributes<Element> = $props();

	const backdropProps = $derived({
		...bond?.backdrop().spread,
		...restProps
	});
</script>

<HtmlAtom
	{bond}
	preset="drawer.backdrop"
	class={['border-border absolute inset-0 bg-black/30', '$preset', klass]}
	{...backdropProps}
/>
