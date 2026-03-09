<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import { ColorPickerBond } from './bond.svelte.ts';
	import SliderTrack from './color-picker-slider-track.svelte';
	import type { ColorPickerSlidersProps } from './types';

	const bond = ColorPickerBond.get();
	let { class: klass = '', preset = 'color-picker.sliders.hsv', ...restProps }: ColorPickerSlidersProps & HTMLAttributes<HTMLDivElement> = $props();

	const hsv = $derived(bond?.state.hsv ?? { h: 0, s: 0, v: 0 });
	const hex = $derived(bond?.state.value ?? '#000000');

	const hGrad = 'linear-gradient(to right,#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00)';
	const sGrad = $derived(`linear-gradient(to right,hsl(${hsv.h},0%,50%),hsl(${hsv.h},100%,50%))`);
	const vGrad = $derived(`linear-gradient(to right,#000,hsl(${hsv.h},100%,50%))`);
</script>

<HtmlAtom {preset} as="div" class={['color-picker-hsv-sliders flex flex-col gap-3', '$preset', klass]} {...restProps}>
	<SliderTrack label="H" value={hsv.h} max={360} gradient={hGrad} thumbColor="hsl({hsv.h},100%,50%)" oninput={(v) => bond?.state.setH_hsv(v)} />
	<SliderTrack label="S" value={hsv.s} max={100} gradient={sGrad} thumbColor={hex}                    oninput={(v) => bond?.state.setS_hsv(v)} />
	<SliderTrack label="V" value={hsv.v} max={100} gradient={vGrad} thumbColor={hex}                    oninput={(v) => bond?.state.setV_hsv(v)} />
</HtmlAtom>
