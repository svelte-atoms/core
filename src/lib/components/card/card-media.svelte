<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { CardBond } from './bond.svelte';
	export type { CardMediaProps } from './types';

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
	class={['card-media border-border overflow-hidden', '$preset', klass]}
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
