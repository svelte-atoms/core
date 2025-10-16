<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { HTMLAttributes } from 'svelte/elements';
	import { LayerBond, LayerBondState } from './bond.svelte';
	import { RootBond } from '$svelte-atoms/core/components/root/bond.svelte';
	import {
		HtmlAtom,
		type ElementType,
		type HtmlAtomProps,
		type Base
	} from '$svelte-atoms/core/components/atom';
	import { toClassValue, cn, defineState } from '$svelte-atoms/core/utils';
	import { getPreset } from '$svelte-atoms/core/context';

	type Element = ElementType<E>;

	const rootAtom = RootBond.get();

	const preset = getPreset('layer');

	let {
		class: klass = '',
		as = preset?.as ?? ('div' as E),
		base = preset?.base as B,
		factory = _factory,
		children = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	}: HtmlAtomProps<E, B> & HTMLAttributes<Element> = $props();

	if (!rootAtom) {
		throw new Error('Root atom is not found');
	}

	const bondProps = defineState([], () => ({}));

	const bond = factory().share();

	const rootProps = $derived({
		...bond.root(),
		...restProps
	});

	function _factory(props: typeof bondProps) {
		const layerAtomState = new LayerBondState(() => props);
		return new LayerBond(layerAtomState);
	}

	export function getBond() {
		return bond;
	}
</script>

<HtmlAtom
	{as}
	{base}
	class={[
		'pointer-events-none absolute inset-0',
		toClassValue.apply(bond, [preset?.class]),
		toClassValue.apply(bond, [klass])
	]}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	{...rootProps}
>
	{@render children?.()}
</HtmlAtom>
