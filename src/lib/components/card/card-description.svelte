<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import type { CardDescriptionProps } from './types';
	import { CardBond } from './bond.svelte';

	const bond = CardBond.get();

	let {
		class: klass = '',
		as = 'p' as E,
		children = undefined,
		...restProps
	}: CardDescriptionProps<E, B> = $props();

	const descriptionProps = $derived({
		...bond?.description(),
		...restProps
	});
</script>

<HtmlAtom
	{as}
	{bond}
	preset="card.description"
	class={['card-description border-border text-sm text-gray-500', '$preset', klass]}
	{...descriptionProps}
>
	{@render children?.()}
</HtmlAtom>
