<script module lang="ts">
	export type CardSubtitleProps<
		E extends keyof HTMLElementTagNameMap = 'p',
		B extends Base = Base
	> = HtmlAtomProps<E, B>;
</script>

<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'p', B extends Base = Base">
	import { CardBond } from './bond.svelte';
	import { toClassValue } from '$svelte-atoms/core/utils';
	import { getPreset } from '$svelte-atoms/core/context';
	import { HtmlAtom, type HtmlAtomProps, type Base } from '$svelte-atoms/core/components/atom';

	const bond = CardBond.get();

	const preset = getPreset('card.subtitle');

	let {
		class: klass = '',
		as = preset?.as ?? 'p',
		base = preset?.base as B,
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
	{base}
	class={[
		'card-subtitle text-sm font-medium text-gray-600',
		toClassValue.apply(bond, [preset?.class]),
		toClassValue.apply(bond, [klass])
	]}
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
