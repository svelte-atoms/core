<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { CardBond } from './bond.svelte';
	export type { CardMediaProps } from './types';

	const bond = CardBond.get();

	let {
		class: klass = '',
		preset = undefined,
		as = 'div' as E,
		children = undefined,
		...restProps
	}: CardMediaProps<E, B> = $props();

	const mediaProps = $derived({
		preset: preset ?? 'card.media',
		...bond?.media(),
		...restProps
	});
</script>

<HtmlAtom
	{as}
	{bond}
	class={['card-media border-border overflow-hidden', '$preset', klass]}
	{...mediaProps}
>
	{@render children?.()}
</HtmlAtom>
