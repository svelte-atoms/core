<script lang="ts">
	/**
	 * HSL Color Area — x axis: Saturation, y axis: Lightness (inverted, top = light)
	 * Note: HSL's 2D space is diamond-shaped — full saturation only at L=50%.
	 * The gradient approximates this using two fades.
	 */
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import { ColorPickerBond } from './bond.svelte.ts';
	import AreaCanvas from './color-picker-area-canvas.svelte';
	import type { ColorPickerSlidersProps } from './types';

	const bond = ColorPickerBond.get();
	let { class: klass = '', preset = 'color-picker.area.hsl', ...restProps }: ColorPickerSlidersProps & HTMLAttributes<HTMLDivElement> = $props();

	const hsl = $derived(bond?.state.hsl ?? { h: 0, s: 0, l: 0 });
	const hex = $derived(bond?.state.value ?? '#000000');

	// x = S,  y = 100−L  (top = 100% lightness = white)
	const x = $derived(hsl.s);
	const y = $derived(100 - hsl.l);

	// Gradient: top→white, bottom→black, left→grey, right→full hue at L=50%
	const gradient = $derived([
		'linear-gradient(to bottom, #fff, transparent 50%, #000)',
		`linear-gradient(to right, #808080, hsl(${hsl.h}, 100%, 50%))`
	].join(', '));
</script>

<HtmlAtom {preset} as="div" class={['color-picker-hsl-area', '$preset', klass]} {...restProps}>
	<AreaCanvas
		{x} {y} {gradient} thumbColor={hex}
		ariaLabel="Color area — saturation and lightness"
		ariaValueText="Saturation {hsl.s}%, Lightness {hsl.l}%"
		onpick={(nx, ny) => bond?.state.setHsl({ h: hsl.h, s: nx, l: 100 - ny })}
		onkey={(dx, dy) => bond?.state.setHsl({ h: hsl.h, s: Math.min(100, Math.max(0, hsl.s + dx)), l: Math.min(100, Math.max(0, hsl.l - dy)) })}
	/>
</HtmlAtom>
