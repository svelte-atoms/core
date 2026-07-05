<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { mergeAtomProps, HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import { createAtomInstance } from '$ixirjs/ui/shared/bond';
	import { CardBond, CardSubtitleAtom } from './bond.svelte';
	import type { CardSubtitleProps } from './types';

	const bond = CardBond.get();

	let {
		class: klass = '',
		preset = undefined,
		as = 'p' as E,
		children = undefined,
		...restProps
	}: CardSubtitleProps<E, B> = $props();

	const atom = createAtomInstance<CardSubtitleAtom, CardBond>('subtitle', {
		bond,
		factory: (owner) => new CardSubtitleAtom(owner)
	});

	const subtitleProps = $derived(mergeAtomProps(atom, preset, restProps));
</script>

<HtmlAtom
	{as}
	{bond}
	class={['card-subtitle border-border text-sm font-medium text-gray-600', '$preset', klass]}
	{...subtitleProps}
>
	{@render children?.()}
</HtmlAtom>
