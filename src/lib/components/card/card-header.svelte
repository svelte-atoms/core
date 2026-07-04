<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { mergeAtomProps, HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { createAtomInstance } from '$svelte-atoms/core/shared/bond';
	import { CardBond, CardHeaderAtom } from './bond.svelte';
	import type { CardHeaderProps } from './types';

	const bond = CardBond.get();

	let {
		class: klass = '',
		preset = undefined,
		as = 'div' as E,
		children = undefined,
		...restProps
	}: CardHeaderProps<E, B> = $props();

	const atom = createAtomInstance<CardHeaderAtom, CardBond>('header', {
		bond,
		factory: (owner) => new CardHeaderAtom(owner)
	});

	const headerProps = $derived(mergeAtomProps(atom, preset, restProps));
</script>

<HtmlAtom
	{as}
	{bond}
	class={['card-header border-border flex flex-col space-y-1.5 px-4 py-4', '$preset', klass]}
	{...headerProps}
>
	{@render children?.()}
</HtmlAtom>
