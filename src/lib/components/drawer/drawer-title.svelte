<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'h3', B extends Base = Base">
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import { DrawerBond } from './bond.svelte';
	import type { SlideoverTitleProps } from './types';

	type Element = HTMLElementTagNameMap[E];

	const bond = DrawerBond.get();

	let {
		class: klass = '',
		as = 'h3' as E,
		children,
		...restProps
	}: SlideoverTitleProps<E, B> & HTMLAttributes<Element> = $props();

	const titleProps = $derived({
		...bond?.title().spread,
		...restProps
	});
</script>

<HtmlAtom
	{as}
	{bond}
	preset="drawer.title"
	class={['border-border', '$preset', klass]}
	{...titleProps}
>
	{@render children?.({ drawer: bond })}
</HtmlAtom>
