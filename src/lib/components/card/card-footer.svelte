<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { mergeAtomProps, HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import { createAtomInstance } from '$ixirjs/ui/shared/bond';
	import { CardBond, CardFooterAtom } from './bond.svelte';
	import type { CardFooterProps } from './types';

	const bond = CardBond.get();

	let {
		class: klass = '',
		preset = undefined,
		as = 'div' as E,
		children = undefined,
		...restProps
	}: CardFooterProps<E, B> = $props();

	const atom = createAtomInstance<CardFooterAtom, CardBond>('footer', {
		bond,
		factory: (owner) => new CardFooterAtom(owner)
	});

	const footerProps = $derived(mergeAtomProps(atom, preset, restProps));
</script>

<HtmlAtom
	{as}
	{bond}
	class={['card-footer border-border flex items-center gap-2 px-4 pb-4', '$preset', klass]}
	{...footerProps}
>
	{@render children?.()}
</HtmlAtom>
