<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { mergeAtomProps, HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import { createAtomInstance } from '$ixirjs/ui/shared/bond';
	import { CardBond, CardTitleAtom } from './bond.svelte';
	import type { CardTitleProps } from './types';

	const bond = CardBond.get();

	let {
		class: klass = '',
		preset = undefined,
		as = 'h3' as E,
		children = undefined,
		...restProps
	}: CardTitleProps<E, B> = $props();

	const atom = createAtomInstance<CardTitleAtom, CardBond>('title', {
		bond,
		factory: (owner) => new CardTitleAtom(owner).role('label')
	});

	const titleProps = $derived(mergeAtomProps(atom, preset, restProps));
</script>

<HtmlAtom
	{as}
	{bond}
	class={[
		'card-title border-border text-lg leading-none font-semibold tracking-tight',
		'$preset',
		klass
	]}
	{...titleProps}
>
	{@render children?.()}
</HtmlAtom>
