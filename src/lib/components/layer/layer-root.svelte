<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { HTMLAttributes } from 'svelte/elements';
	import { LayerBond, LayerBondState, type LayerBondProps } from './bond.svelte';
	import { RootBond } from '$svelte-atoms/core/components/root/bond.svelte';
	import {
		HtmlAtom,
		type ElementType,
		type HtmlAtomProps,
		type Base
	} from '$svelte-atoms/core/components/atom';
	import { bindBond } from '$svelte-atoms/core/shared';
	import type { Factory } from '$svelte-atoms/core/types';

	type Element = ElementType<E>;

	const rootAtom = RootBond.get();

	let {
		class: klass = '',
		factory = defaultFactory,
		preset = undefined,
		children = undefined,
		...restProps
	}: HtmlAtomProps<E, B> & HTMLAttributes<Element> = $props();

	if (!rootAtom) {
		throw new Error('Root atom is not found');
	}

	const binding = bindBond<LayerBond>(
		(props) => (factory as Factory<LayerBond>)(props),
		{ rest: () => restProps }
	);
	const bond = binding.bond.share();

	const rootProps = $derived({
		preset: preset ?? 'layer',
		...bond.root(),
		...restProps
	});

	function defaultFactory(props: LayerBondProps) {
		const layerAtomState = new LayerBondState(props);
		return new LayerBond(layerAtomState);
	}

	export function getBond() {
		return bond;
	}
</script>

<HtmlAtom
	class={['pointer-events-none absolute inset-0', '$preset', klass]}
	{...rootProps}
>
	{@render children?.()}
</HtmlAtom>
