<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import { ColorPickerBond } from './bond.svelte.ts';
	import SliderTrack from './color-picker-slider-track.svelte';
	import type { ColorPickerSlidersProps } from './types';

	const bond = ColorPickerBond.get();
	let { class: klass = '', preset = 'color-picker.sliders.hsl', ...restProps }: ColorPickerSlidersProps & HTMLAttributes<HTMLDivElement> = $props();

	const hsl = $derived(bond?.state.hsl ?? { h: 0, s: 0, l: 0 });
	const hex = $derived(bond?.state.value ?? '#000000');

	const hGrad  = 'linear-gradient(to right,#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00)';
	const sGrad  = $derived(`linear-gradient(to right,hsl(${hsl.h},0%,${hsl.l}%),hsl(${hsl.h},100%,${hsl.l}%))`);
	const lGrad  = $derived(`linear-gradient(to right,#000,hsl(${hsl.h},${hsl.s}%,50%),#fff)`);
</script>

<HtmlAtom {preset} as="div" class={['color-picker-hsl-sliders flex flex-col gap-3', '$preset', klass]} {...restProps}>
	<SliderTrack label="H" value={hsl.h} max={360} gradient={hGrad} thumbColor="hsl({hsl.h},100%,50%)" oninput={(v) => bond?.state.setH_hsl(v)} />
	<SliderTrack label="S" value={hsl.s} max={100} gradient={sGrad} thumbColor={hex}                    oninput={(v) => bond?.state.setS_hsl(v)} />
	<SliderTrack label="L" value={hsl.l} max={100} gradient={lGrad} thumbColor={hex}                    oninput={(v) => bond?.state.setL_hsl(v)} />
</HtmlAtom>
