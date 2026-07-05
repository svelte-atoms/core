<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { HTMLAttributes } from 'svelte/elements';
	import { PortalBond } from './bond.svelte';
	import {
		HtmlAtom,
		type ElementType,
		type HtmlAtomProps,
		type Base
	} from '$ixirjs/ui/components/atom';

	type Element = ElementType<E>;

	const bond = PortalBond.get();

	let {
		class: klass = '',
		children = undefined,
		...restProps
	}: HtmlAtomProps<E, B> & HTMLAttributes<Element> = $props();

	const bondProps = $derived({
		...bond?.inner().spread,
		...restProps
	});
</script>

<HtmlAtom
	{bond}
	preset="portal.inner"
	class={['border-border relative size-full', '$preset', klass]}
	{...bondProps}
>
	{@render children?.()}
</HtmlAtom>
