<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { CardBond } from './bond.svelte';
	export type { CardHeaderProps } from './types';

	const bond = CardBond.get();

	let {
		class: klass = '',
		preset = undefined,
		as = 'div' as E,
		children = undefined,
		...restProps
	}: CardHeaderProps<E, B> = $props();

	const headerProps = $derived({
		preset: preset ?? 'card.header',
		...bond?.header(),
		...restProps
	});
</script>

<HtmlAtom
	{as}
	{bond}
	class={['card-header border-border flex flex-col space-y-1.5 px-4 py-4', '$preset', klass]}
	{...headerProps}
>
	{@render children?.()}
</HtmlAtom>
