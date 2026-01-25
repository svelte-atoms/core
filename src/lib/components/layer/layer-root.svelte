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
	import { defineProperty, defineState } from '$svelte-atoms/core/utils';

	type Element = ElementType<E>;

	const rootAtom = RootBond.get();

	let {
		class: klass = '',
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

	const bondProps = defineState([defineProperty('rest', () => restProps)], () => ({}));

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
	preset="layer"
	class={['pointer-events-none absolute inset-0', '$preset', klass]}
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
