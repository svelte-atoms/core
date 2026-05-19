<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { DrawerBodyProps } from './types';
	import { DrawerBond } from './bond.svelte';
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';

	type Element = HTMLElementTagNameMap[E];

	let {
		class: klass = '',
		children = undefined,
		...restProps
	}: DrawerBodyProps<E, B> & HTMLAttributes<Element> = $props();

	const bond = DrawerBond.get();

	const bodyProps = $derived({
		...bond?.body().spread,
		...restProps
	});
</script>

<HtmlAtom
	{bond}
	preset="drawer.body"
	class={['border-border', '$preset', klass]}
	{...bodyProps}
>
	{@render children?.({ drawer: bond })}
</HtmlAtom>
