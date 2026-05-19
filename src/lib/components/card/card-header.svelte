<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { CardBond } from './bond.svelte';
	export type { CardHeaderProps } from './types';

	const bond = CardBond.get();

	let {
		class: klass = '',
		as = 'div' as E,
		children = undefined,
		...restProps
	}: CardHeaderProps<E, B> = $props();

	const headerProps = $derived({
		...bond?.header(),
		...restProps
	});
</script>

<HtmlAtom
	{as}
	{bond}
	preset="card.header"
	class={['card-header border-border flex flex-col space-y-1.5 px-4 py-4', '$preset', klass]}
	{...headerProps}
>
	{@render children?.()}
</HtmlAtom>
