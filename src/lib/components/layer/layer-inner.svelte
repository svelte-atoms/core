<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { HTMLAttributes } from 'svelte/elements';
	import { LayerBond } from './bond.svelte';
	import {
		HtmlAtom,
		type ElementType,
		type HtmlAtomProps,
		type Base
	} from '$svelte-atoms/core/components/atom';

	type Element = ElementType<E>;

	const bond = LayerBond.get();

	let {
		class: klass = '',
		preset = undefined,
		children = undefined,
		...restProps
	}: HtmlAtomProps<E, B> & HTMLAttributes<Element> = $props();

	const innerProps = $derived({
		preset: preset ?? 'layer.inner',
		...bond?.inner(),
		...restProps
	});
</script>

<HtmlAtom
	class={['relative size-full', '$preset', klass]}
	{...innerProps}
>
	{@render children?.()}
</HtmlAtom>
