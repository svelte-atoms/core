<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	export type { CardContentProps } from './types';
	import { CardBond } from './bond.svelte';

	const bond = CardBond.get();

	let {
		class: klass = '',
		children = undefined,
		...restProps
	}: CardContentProps<E, B> = $props();

	const contentProps = $derived({
		...bond?.content(),
		...restProps
	});
</script>

<HtmlAtom
	{bond}
	preset="card.content"
	class={['card-content border-border px-4 pb-4', '$preset', klass]}
	{...contentProps}
>
	{@render children?.()}
</HtmlAtom>
