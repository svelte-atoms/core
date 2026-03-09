<script lang="ts">
	/**
	 * HSV Color Area — x axis: Saturation, y axis: Value (brightness)
	 * Typical "Figma-style" picker. Pair with a separate Hue slider.
	 */
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import { ColorPickerBond } from './bond.svelte.ts';
	import AreaCanvas from './color-picker-area-canvas.svelte';
	import type { ColorPickerSlidersProps } from './types';

	const bond = ColorPickerBond.get();
	let { class: klass = '', preset = 'color-picker.area.hsv', ...restProps }: ColorPickerSlidersProps & HTMLAttributes<HTMLDivElement> = $props();

	const hsv = $derived(bond?.state.hsv ?? { h: 0, s: 0, v: 0 });
	const hex = $derived(bond?.state.value ?? '#000000');

	// x = S,  y = 100−V  (top = full brightness)
	const x = $derived(hsv.s);
	const y = $derived(100 - hsv.v);

	const gradient = $derived([
		'linear-gradient(to top, #000, transparent)',
		'linear-gradient(to right, #fff, transparent)',
		`hsl(${hsv.h}, 100%, 50%)`
	].join(', '));
</script>

<HtmlAtom {preset} as="div" class={['color-picker-hsv-area', '$preset', klass]} {...restProps}>
	<AreaCanvas
		{x} {y} {gradient} thumbColor={hex}
		ariaLabel="Color area — saturation and brightness"
		ariaValueText="Saturation {hsv.s}%, Brightness {hsv.v}%"
		onpick={(nx, ny) => bond?.state.setHsv({ h: hsv.h, s: nx, v: 100 - ny })}
		onkey={(dx, dy) => bond?.state.setHsv({ h: hsv.h, s: Math.min(100, Math.max(0, hsv.s + dx)), v: Math.min(100, Math.max(0, hsv.v - dy)) })}
	/>
</HtmlAtom>
