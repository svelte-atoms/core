<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { HTMLAttributes } from 'svelte/elements';
	import { LayerBond } from './bond.svelte';
	import {
		HtmlAtom,
		type ElementType,
		type HtmlAtomProps,
		type Base
	} from '$ixirjs/ui/components/atom';

	type Element = ElementType<E>;

	const bond = LayerBond.get();

	let {
		class: klass = '',
		children = undefined,
		...restProps
	}: HtmlAtomProps<E, B> & HTMLAttributes<Element> = $props();

	const innerProps = $derived({
		...bond?.inner(),
		...restProps
	});
</script>

<HtmlAtom
	preset="layer.inner"
	class={['relative size-full', '$preset', klass]}
	{...innerProps}
>
	{@render children?.()}
</HtmlAtom>
