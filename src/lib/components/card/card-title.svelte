<script module lang="ts">
	export type CardTitleProps<
		E extends keyof HTMLElementTagNameMap = 'h3',
		B extends Base = Base
	> = HtmlAtomProps<E, B>;
</script>

<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'h3', B extends Base = Base">
	import { CardBond } from './bond.svelte';

	import { HtmlAtom, type HtmlAtomProps, type Base } from '$svelte-atoms/core/components/atom';

	const bond = CardBond.get();

	let {
		class: klass = '',
		as = 'h3' as E,
		children = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	}: CardTitleProps<E, B> = $props();

	const titleProps = $derived({
		...bond?.title(),
		...restProps
	});
</script>

<HtmlAtom
	{as}
	{bond}
	preset="card.title"
	class={[
		'card-title border-border text-lg leading-none font-semibold tracking-tight',
		'$preset',
		klass
	]}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	{...titleProps}
>
	{@render children?.()}
</HtmlAtom>
