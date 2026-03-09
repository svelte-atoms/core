<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import { ColorPickerBond } from './bond.svelte.ts';
	import SliderTrack from './color-picker-slider-track.svelte';
	import type { ColorPickerSlidersProps } from './types';

	const bond = ColorPickerBond.get();
	let { class: klass = '', preset = 'color-picker.sliders.hwb', ...restProps }: ColorPickerSlidersProps & HTMLAttributes<HTMLDivElement> = $props();

	const hwb = $derived(bond?.state.hwb ?? { h: 0, w: 0, b: 0 });
	const hex = $derived(bond?.state.value ?? '#000000');

	const hGrad = 'linear-gradient(to right,#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00)';
	const wGrad = $derived(`linear-gradient(to right,hsl(${hwb.h},100%,50%),#fff)`);
	const bGrad = $derived(`linear-gradient(to right,hsl(${hwb.h},100%,50%),#000)`);
</script>

<HtmlAtom {preset} as="div" class={['color-picker-hwb-sliders flex flex-col gap-3', '$preset', klass]} {...restProps}>
	<SliderTrack label="H" value={hwb.h} max={360} gradient={hGrad} thumbColor="hsl({hwb.h},100%,50%)" oninput={(v) => bond?.state.setH_hwb(v)} />
	<SliderTrack label="W" value={hwb.w} max={100} gradient={wGrad} thumbColor={hex}                    oninput={(v) => bond?.state.setW_hwb(v)} />
	<SliderTrack label="B" value={hwb.b} max={100} gradient={bGrad} thumbColor={hex}                    oninput={(v) => bond?.state.setB_hwb(v)} />
</HtmlAtom>
