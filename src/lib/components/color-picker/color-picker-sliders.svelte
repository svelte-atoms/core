<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import { ColorPickerBond } from './bond.svelte.ts';
	import type { ColorPickerSlidersProps } from './types';

	const bond = ColorPickerBond.get();

	let {
		class: klass = '',
		preset = 'color-picker.sliders',
		...restProps
	}: ColorPickerSlidersProps & HTMLAttributes<HTMLDivElement> = $props();

	const hsl = $derived(bond?.state.hsl ?? { h: 0, s: 0, l: 0 });

	// Gradient backgrounds for each slider track
	const hueGradient = 'linear-gradient(to right, #f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00)';
	const satGradient = $derived(
		`linear-gradient(to right, hsl(${hsl.h},0%,${hsl.l}%), hsl(${hsl.h},100%,${hsl.l}%))`
	);
	const lightGradient = $derived(
		`linear-gradient(to right, #000, hsl(${hsl.h},${hsl.s}%,50%), #fff)`
	);
</script>

<HtmlAtom
	{preset}
	as="div"
	class={['color-picker-sliders flex flex-col gap-3', '$preset', klass]}
	{...restProps}
>
	<!-- Hue -->
	<label class="flex flex-col gap-1">
		<span class="text-muted-foreground text-xs">H</span>
		<div class="relative h-3 w-full rounded-full" style="background: {hueGradient}">
			<input
				type="range" min={0} max={360}
				value={hsl.h}
				oninput={(ev) => bond?.state.setH(Number((ev.target as HTMLInputElement).value))}
				class="absolute inset-0 h-full w-full cursor-pointer opacity-0"
				aria-label="Hue"
			/>
			<!-- Thumb -->
			<span
				class="border-background pointer-events-none absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 shadow-md"
				style="left: {(hsl.h / 360) * 100}%; background: hsl({hsl.h},100%,50%)"
			></span>
		</div>
	</label>

	<!-- Saturation -->
	<label class="flex flex-col gap-1">
		<span class="text-muted-foreground text-xs">S</span>
		<div class="relative h-3 w-full rounded-full" style="background: {satGradient}">
			<input
				type="range" min={0} max={100}
				value={hsl.s}
				oninput={(ev) => bond?.state.setS(Number((ev.target as HTMLInputElement).value))}
				class="absolute inset-0 h-full w-full cursor-pointer opacity-0"
				aria-label="Saturation"
			/>
			<span
				class="border-background pointer-events-none absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 shadow-md"
				style="left: {hsl.s}%; background: hsl({hsl.h},{hsl.s}%,{hsl.l}%)"
			></span>
		</div>
	</label>

	<!-- Lightness -->
	<label class="flex flex-col gap-1">
		<span class="text-muted-foreground text-xs">L</span>
		<div class="relative h-3 w-full rounded-full" style="background: {lightGradient}">
			<input
				type="range" min={0} max={100}
				value={hsl.l}
				oninput={(ev) => bond?.state.setL(Number((ev.target as HTMLInputElement).value))}
				class="absolute inset-0 h-full w-full cursor-pointer opacity-0"
				aria-label="Lightness"
			/>
			<span
				class="border-background pointer-events-none absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 shadow-md"
				style="left: {hsl.l}%; background: hsl({hsl.h},{hsl.s}%,{hsl.l}%)"
			></span>
		</div>
	</label>
</HtmlAtom>
