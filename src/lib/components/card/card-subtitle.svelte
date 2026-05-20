<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { CardBond } from './bond.svelte';
	export type { CardSubtitleProps } from './types';

	const bond = CardBond.get();

	let {
		class: klass = '',
		as = 'p' as E,
		children = undefined,
		...restProps
	}: CardSubtitleProps<E, B> = $props();

	const subtitleProps = $derived({
		...bond?.subtitle(),
		...restProps
	});
</script>

<HtmlAtom
	{as}
	{bond}
	preset="card.subtitle"
	class={['card-subtitle border-border text-sm font-medium text-gray-600', '$preset', klass]}
	{...subtitleProps}
>
	{@render children?.()}
</HtmlAtom>
