<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { SlideoverHeaderProps } from './types';
	import { DrawerBond } from './bond.svelte';
	import { HtmlAtom, type Base } from '$ixirjs/ui/components/atom';

	type Element = HTMLElementTagNameMap[E];

	const bond = DrawerBond.get();

	let {
		class: klass = '',
		children = undefined,
		...restProps
	}: SlideoverHeaderProps<E, B> & HTMLAttributes<Element> = $props();

	const headerProps = $derived({
		...bond?.header().spread,
		...restProps
	});
</script>

<HtmlAtom
	{bond}
	preset="drawer.header"
	class={['border-border', '$preset', klass]}
	{...headerProps}
	{...restProps}
>
	{@render children?.({ drawer: bond })}
</HtmlAtom>
