<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { HTMLAttributes } from 'svelte/elements';
	import { LayerBond } from './bond.svelte';
	import { toClassValue, cn } from '$svelte-atoms/core/utils';
	import {
		HtmlAtom,
		type ElementType,
		type HtmlAtomProps,
		type Base
	} from '$svelte-atoms/core/components/atom';
	import { getPreset } from '$svelte-atoms/core/context';

	type Element = ElementType<E>;

	const bond = LayerBond.get();

	const preset = getPreset('layer.inner');

	let {
		class: klass = '',
		as = preset?.as ?? ('div' as E),
		base = preset?.base as B,
		children = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	}: HtmlAtomProps<E, B> & HTMLAttributes<Element> = $props();

	const innerProps = $derived({
		...bond?.inner(),
		...restProps
	});
</script>

<HtmlAtom
	{as}
	{base}
	class={[
		'relative size-full',
		toClassValue.apply(bond, [preset?.class]),
		toClassValue.apply(bond, [klass])
	]}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	{...innerProps}
>
	{@render children?.()}
</HtmlAtom>
