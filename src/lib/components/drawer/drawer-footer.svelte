<script lang="ts" generics="E extends keyof HTMLElementTagNameMap='div', B extends Base = Base">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { SlideoverFooterProps } from './types';
	import { DrawerBond } from './bond.svelte';
	import { HtmlAtom, type Base } from '$ixirjs/ui/components/atom';

	type Element = HTMLElementTagNameMap[E];

	const bond = DrawerBond.get();

	let {
		class: klass = '',
		children = undefined,
		...restProps
	}: SlideoverFooterProps<E, B> & HTMLAttributes<Element> = $props();

	const footerProps = $derived({
		...bond?.footer().spread,
		...restProps
	});
</script>

<HtmlAtom
	{bond}
	class={['border-border', '$preset', klass]}
	{...footerProps}
>
	{@render children?.({ drawer: bond })}
</HtmlAtom>
