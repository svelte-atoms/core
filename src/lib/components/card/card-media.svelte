<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { mergeAtomProps, HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import { createAtomInstance } from '$ixirjs/ui/shared/bond';
	import { CardBond, CardMediaAtom } from './bond.svelte';
	import type { CardMediaProps } from './types';

	const bond = CardBond.get();

	let {
		class: klass = '',
		preset = undefined,
		as = 'div' as E,
		children = undefined,
		...restProps
	}: CardMediaProps<E, B> = $props();

	const atom = createAtomInstance<CardMediaAtom, CardBond>('media', {
		bond,
		factory: (owner) => new CardMediaAtom(owner)
	});

	const mediaProps = $derived(mergeAtomProps(atom, preset, restProps));
</script>

<HtmlAtom
	{as}
	{bond}
	class={['card-media border-border overflow-hidden', '$preset', klass]}
	{...mediaProps}
>
	{@render children?.()}
</HtmlAtom>
