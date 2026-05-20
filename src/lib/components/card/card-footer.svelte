<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { CardBond } from './bond.svelte';
	export type { CardFooterProps } from './types';

	const bond = CardBond.get();

	let {
		class: klass = '',
		as = 'div' as E,
		children = undefined,
		...restProps
	}: CardFooterProps<E, B> = $props();

	const footerProps = $derived({
		...bond?.footer(),
		...restProps
	});
</script>

<HtmlAtom
	{as}
	{bond}
	preset="card.footer"
	class={['card-footer border-border flex items-center gap-2 px-4 pb-4', '$preset', klass]}
	{...footerProps}
>
	{@render children?.()}
</HtmlAtom>
