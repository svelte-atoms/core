<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { mergeAtomProps, HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { createAtomInstance } from '$svelte-atoms/core/shared/bond';
	import type { CardContentProps } from './types';
	import { CardBond, CardContentAtom } from './bond.svelte';

	const bond = CardBond.get();

	let {
		class: klass = '',
		preset = undefined,
		children = undefined,
		...restProps
	}: CardContentProps<E, B> = $props();

	const atom = createAtomInstance<CardContentAtom, CardBond>('content', {
		bond,
		factory: (owner) => new CardContentAtom(owner)
	});

	const contentProps = $derived(mergeAtomProps(atom, preset, restProps));
</script>

<HtmlAtom
	{bond}
	class={['card-content border-border px-4 pb-4', '$preset', klass]}
	{...contentProps}
>
	{@render children?.()}
</HtmlAtom>
