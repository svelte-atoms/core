<script lang="ts">
	/**
	 * HWB Color Area — x axis: Whiteness, y axis: Blackness (inverted, top = white)
	 * The hue is fixed; dragging mixes in white (left→right) and black (top→bottom).
	 */
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import { ColorPickerBond } from './bond.svelte.ts';
	import AreaCanvas from './color-picker-area-canvas.svelte';
	import type { ColorPickerSlidersProps } from './types';

	const bond = ColorPickerBond.get();
	let { class: klass = '', preset = 'color-picker.area.hwb', ...restProps }: ColorPickerSlidersProps & HTMLAttributes<HTMLDivElement> = $props();

	const hwb = $derived(bond?.state.hwb ?? { h: 0, w: 0, b: 0 });
	const hex = $derived(bond?.state.value ?? '#000000');

	// x = W,  y = B  (top-left = pure hue, top-right = white, bottom = black)
	const x = $derived(hwb.w);
	const y = $derived(hwb.b);

	// Pure hue in top-left corner; white fades in right; black fades in bottom
	const gradient = $derived([
		'linear-gradient(to bottom, transparent, #000)',
		`linear-gradient(to right, hsl(${hwb.h}, 100%, 50%), #fff)`
	].join(', '));
</script>

<HtmlAtom {preset} as="div" class={['color-picker-hwb-area', '$preset', klass]} {...restProps}>
	<AreaCanvas
		{x} {y} {gradient} thumbColor={hex}
		ariaLabel="Color area — whiteness and blackness"
		ariaValueText="Whiteness {hwb.w}%, Blackness {hwb.b}%"
		onpick={(nx, ny) => bond?.state.setHwb({ h: hwb.h, w: nx, b: ny })}
		onkey={(dx, dy) => bond?.state.setHwb({ h: hwb.h, w: Math.min(100, Math.max(0, hwb.w + dx)), b: Math.min(100, Math.max(0, hwb.b + dy)) })}
	/>
</HtmlAtom>
