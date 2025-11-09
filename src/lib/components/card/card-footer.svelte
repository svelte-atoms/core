<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { CardBond } from './bond.svelte';
	export type { CardFooterProps } from './types';

	const bond = CardBond.get();

	let {
		class: klass = '',
		as = 'div' as E,
		children = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
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
	class={['card-footer border-border flex items-center gap-2 px-4 py-4', '$preset', klass]}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	{...footerProps}
>
	{@render children?.()}
</HtmlAtom>
