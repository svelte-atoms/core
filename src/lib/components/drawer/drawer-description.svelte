<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'p', B extends Base = Base">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { SlideoverDescriptionProps } from './types';
	import { DrawerBond } from './bond.svelte';
	import { HtmlAtom, type Base } from '$ixirjs/ui/components/atom';

	type Element = HTMLElementTagNameMap[E];

	const bond = DrawerBond.get();

	let {
		class: klass = '',
		as = 'p' as E,
		children,
		...restProps
	}: SlideoverDescriptionProps<E, B> & HTMLAttributes<Element> = $props();

	const descriptionProps = $derived({
		...bond?.description().spread,
		...restProps
	});
</script>

<HtmlAtom
	{as}
	{bond}
	preset="drawer.description"
	class={['border-border', '$preset', klass]}
	{...descriptionProps}
>
	{@render children?.({ drawer: bond })}
</HtmlAtom>
