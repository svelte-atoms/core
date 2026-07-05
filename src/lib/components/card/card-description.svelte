<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { mergeAtomProps, HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import { createAtomInstance } from '$ixirjs/ui/shared/bond';
	import type { CardDescriptionProps } from './types';
	import { CardBond, CardDescriptionAtom } from './bond.svelte';

	const bond = CardBond.get();

	let {
		class: klass = '',
		preset = undefined,
		as = 'p' as E,
		children = undefined,
		...restProps
	}: CardDescriptionProps<E, B> = $props();

	const atom = createAtomInstance<CardDescriptionAtom, CardBond>('description', {
		bond,
		factory: (owner) => new CardDescriptionAtom(owner).role('description')
	});

	const descriptionProps = $derived(mergeAtomProps(atom, preset, restProps));
</script>

<HtmlAtom
	{as}
	{bond}
	class={['card-description border-border text-sm text-gray-500', '$preset', klass]}
	{...descriptionProps}
>
	{@render children?.()}
</HtmlAtom>
