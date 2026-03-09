<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import { ColorPickerBond } from './bond.svelte.ts';
	import SliderTrack from './color-picker-slider-track.svelte';
	import type { ColorPickerSlidersProps } from './types';

	const bond = ColorPickerBond.get();
	let { class: klass = '', preset = 'color-picker.sliders.rgb', ...restProps }: ColorPickerSlidersProps & HTMLAttributes<HTMLDivElement> = $props();

	const rgb = $derived(bond?.state.rgb ?? { r: 0, g: 0, b: 0 });

	const rGrad = $derived(`linear-gradient(to right,rgb(0,${rgb.g},${rgb.b}),rgb(255,${rgb.g},${rgb.b}))`);
	const gGrad = $derived(`linear-gradient(to right,rgb(${rgb.r},0,${rgb.b}),rgb(${rgb.r},255,${rgb.b}))`);
	const bGrad = $derived(`linear-gradient(to right,rgb(${rgb.r},${rgb.g},0),rgb(${rgb.r},${rgb.g},255))`);
</script>

<HtmlAtom {preset} as="div" class={['color-picker-rgb-sliders flex flex-col gap-3', '$preset', klass]} {...restProps}>
	<SliderTrack label="R" value={rgb.r} max={255} gradient={rGrad} thumbColor="rgb({rgb.r},0,0)"       oninput={(v) => bond?.state.setR(v)} />
	<SliderTrack label="G" value={rgb.g} max={255} gradient={gGrad} thumbColor="rgb(0,{rgb.g},0)"       oninput={(v) => bond?.state.setG(v)} />
	<SliderTrack label="B" value={rgb.b} max={255} gradient={bGrad} thumbColor="rgb(0,0,{rgb.b})"       oninput={(v) => bond?.state.setB(v)} />
</HtmlAtom>
