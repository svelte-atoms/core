<script lang="ts">
	import { defineProperty, defineState } from '$svelte-atoms/core/utils';
	import { Root } from '../popover/atoms';
	import { ColorPickerBond, ColorPickerBondState, type ColorPickerBondProps } from './bond.svelte.ts';
	import type { ColorPickerRootProps } from './types';

	let {
		open = $bindable(false),
		value = $bindable('#000000'),
		swatches = [],
		offset = 4,
		onchange = undefined,
		children,
		...restProps
	}: ColorPickerRootProps = $props();

	const seed = {};

	const bondProps = defineState<ColorPickerBondProps>([
		defineProperty('open', () => open, (v) => { open = v; }),
		defineProperty('value', () => value, (v) => {
			value = v;
			onchange?.(v);
		}),
		defineProperty('swatches', () => swatches),
		defineProperty('disabled', () => false),
		defineProperty('placement', () => 'bottom-start' as const),
		defineProperty('placements', () => ['bottom-start', 'bottom-end', 'top-start', 'top-end'] as const),
		defineProperty('offset', () => offset),
		defineProperty('rest', () => restProps)
	], () => seed);

	const bond = _factory().share();

	function _factory() {
		const state = new ColorPickerBondState(() => bondProps);
		return new ColorPickerBond(state);
	}

	export function getBond() {
		return bond;
	}
</script>

<Root bind:open extend={bondProps} {offset} {...restProps}>
	{@render children?.({ colorPicker: bond })}
</Root>
