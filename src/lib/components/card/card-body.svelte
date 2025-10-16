<script module lang="ts">
	export type CardContentProps<
		E extends keyof HTMLElementTagNameMap = 'div',
		B extends Base = Base
	> = HtmlAtomProps<E, B>;
</script>

<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { toClassValue } from '$svelte-atoms/core/utils';
	import { CardBond } from './bond.svelte';
	import { getPreset } from '$svelte-atoms/core/context';
	import { HtmlAtom, type HtmlAtomProps, type Base } from '$svelte-atoms/core/components/atom';

	const bond = CardBond.get();

	const preset = getPreset('card.content');

	let {
		class: klass = '',
		as = preset?.as ?? 'div',
		base = preset?.base as B,
		children = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	}: CardContentProps<E, B> = $props();

	const contentProps = $derived({
		...bond?.content(),
		...restProps
	});
</script>

<HtmlAtom
	{as}
	{base}
	class={[
		'card-content px-4',
		toClassValue.apply(bond, [preset?.class]),
		toClassValue.apply(bond, [klass])
	]}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	{...contentProps}
>
	{@render children?.()}
</HtmlAtom>
