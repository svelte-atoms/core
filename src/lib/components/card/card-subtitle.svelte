<script module lang="ts">
	export type CardSubtitleProps<
		E extends keyof HTMLElementTagNameMap = 'p',
		B extends Base = Base
	> = HtmlAtomProps<E, B>;
</script>

<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'p', B extends Base = Base">
	import { CardBond } from './bond.svelte';

	import { HtmlAtom, type HtmlAtomProps, type Base } from '$svelte-atoms/core/components/atom';

	const bond = CardBond.get();

	let {
		class: klass = '',
		as = 'p' as E,
		children = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
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
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	{...subtitleProps}
>
	{@render children?.()}
</HtmlAtom>
