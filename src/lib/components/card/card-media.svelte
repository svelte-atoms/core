<script module lang="ts">
	export type CardMediaProps<
		E extends keyof HTMLElementTagNameMap = 'div',
		B extends Base = Base
	> = HtmlAtomProps<E, B>;
</script>

<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { CardBond } from './bond.svelte';

	import { HtmlAtom, type HtmlAtomProps, type Base } from '$svelte-atoms/core/components/atom';

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
	}: CardMediaProps<E, B> = $props();

	const mediaProps = $derived({
		...bond?.media(),
		...restProps
	});
</script>

<HtmlAtom
	{as}
	{bond}
	preset="card.media"
	class={['card-media overflow-hidden', '$preset', klass]}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	{...mediaProps}
>
	{@render children?.()}
</HtmlAtom>
