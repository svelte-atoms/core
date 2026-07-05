<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { HTMLAttributes } from 'svelte/elements';
	import { LayerBond, LayerBondState } from './bond.svelte';
	import { RootBond } from '$ixirjs/ui/components/root/bond.svelte';
	import {
		HtmlAtom,
		type ElementType,
		type HtmlAtomProps,
		type Base
	} from '$ixirjs/ui/components/atom';
	import { defineProperty, defineState } from '$ixirjs/ui/utils';

	type Element = ElementType<E>;

	const rootAtom = RootBond.get();

	let {
		class: klass = '',
		factory = _factory,
		children = undefined,
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
	{...rootProps}
>
	{@render children?.()}
</HtmlAtom>
