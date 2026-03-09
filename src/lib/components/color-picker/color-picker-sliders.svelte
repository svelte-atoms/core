<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import { ColorPickerBond } from './bond.svelte.ts';
	import type { ColorPickerSlidersProps } from './types';

	const bond = ColorPickerBond.get();

	let {
		class: klass = '',
		domain = 'hsl' as NonNullable<ColorPickerSlidersProps['domain']>,
		preset = 'color-picker.sliders',
		...restProps
	}: ColorPickerSlidersProps & HTMLAttributes<HTMLDivElement> = $props();

	// ── Derived values per domain ────────────────────────────────────────

	const rgb = $derived(bond?.state.rgb ?? { r: 0, g: 0, b: 0 });
	const hsl = $derived(bond?.state.hsl ?? { h: 0, s: 0, l: 0 });
	const hsv = $derived(bond?.state.hsv ?? { h: 0, s: 0, v: 0 });
	const hwb = $derived(bond?.state.hwb ?? { h: 0, w: 0, b: 0 });
	const hex = $derived(bond?.state.value ?? '#000000');

	// ── Gradient helpers ─────────────────────────────────────────────────

	const hueGrad = 'linear-gradient(to right,#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00)';

	const gradients = $derived({
		hsl: {
			h: hueGrad,
			s: `linear-gradient(to right,hsl(${hsl.h},0%,${hsl.l}%),hsl(${hsl.h},100%,${hsl.l}%))`,
			l: `linear-gradient(to right,#000,hsl(${hsl.h},${hsl.s}%,50%),#fff)`
		},
		hsv: {
			h: hueGrad,
			s: `linear-gradient(to right,hsl(${hsv.h},0%,50%),hsl(${hsv.h},100%,50%))`,
			v: `linear-gradient(to right,#000,hsl(${hsv.h},100%,50%))`
		},
		rgb: {
			r: `linear-gradient(to right,rgb(0,${rgb.g},${rgb.b}),rgb(255,${rgb.g},${rgb.b}))`,
			g: `linear-gradient(to right,rgb(${rgb.r},0,${rgb.b}),rgb(${rgb.r},255,${rgb.b}))`,
			b: `linear-gradient(to right,rgb(${rgb.r},${rgb.g},0),rgb(${rgb.r},${rgb.g},255))`
		},
		hwb: {
			h: hueGrad,
			w: `linear-gradient(to right,hsl(${hwb.h},100%,50%),#fff)`,
			b: `linear-gradient(to right,hsl(${hwb.h},100%,50%),#000)`
		}
	});

	// ── Slider config per domain ─────────────────────────────────────────

	type SliderDef = { label: string; value: number; max: number; gradient: string; set: (v: number) => void; thumbColor: string };

	const sliders = $derived<SliderDef[]>({
		hsl: [
			{ label: 'H', value: hsl.h, max: 360, gradient: gradients.hsl.h, set: (v) => bond?.state.setH_hsl(v), thumbColor: `hsl(${hsl.h},100%,50%)` },
			{ label: 'S', value: hsl.s, max: 100, gradient: gradients.hsl.s, set: (v) => bond?.state.setS_hsl(v), thumbColor: hex },
			{ label: 'L', value: hsl.l, max: 100, gradient: gradients.hsl.l, set: (v) => bond?.state.setL_hsl(v), thumbColor: hex }
		],
		hsv: [
			{ label: 'H', value: hsv.h, max: 360, gradient: gradients.hsv.h, set: (v) => bond?.state.setH_hsv(v), thumbColor: `hsl(${hsv.h},100%,50%)` },
			{ label: 'S', value: hsv.s, max: 100, gradient: gradients.hsv.s, set: (v) => bond?.state.setS_hsv(v), thumbColor: hex },
			{ label: 'V', value: hsv.v, max: 100, gradient: gradients.hsv.v, set: (v) => bond?.state.setV_hsv(v), thumbColor: hex }
		],
		rgb: [
			{ label: 'R', value: rgb.r, max: 255, gradient: gradients.rgb.r, set: (v) => bond?.state.setR(v), thumbColor: `rgb(${rgb.r},0,0)` },
			{ label: 'G', value: rgb.g, max: 255, gradient: gradients.rgb.g, set: (v) => bond?.state.setG(v), thumbColor: `rgb(0,${rgb.g},0)` },
			{ label: 'B', value: rgb.b, max: 255, gradient: gradients.rgb.b, set: (v) => bond?.state.setB(v), thumbColor: `rgb(0,0,${rgb.b})` }
		],
		hwb: [
			{ label: 'H', value: hwb.h, max: 360, gradient: gradients.hwb.h, set: (v) => bond?.state.setH_hwb(v), thumbColor: `hsl(${hwb.h},100%,50%)` },
			{ label: 'W', value: hwb.w, max: 100, gradient: gradients.hwb.w, set: (v) => bond?.state.setW_hwb(v), thumbColor: hex },
			{ label: 'B', value: hwb.b, max: 100, gradient: gradients.hwb.b, set: (v) => bond?.state.setB_hwb(v), thumbColor: hex }
		]
	}[domain] ?? []);
</script>

<HtmlAtom
	{preset}
	as="div"
	class={['color-picker-sliders flex flex-col gap-3', '$preset', klass]}
	{...restProps}
>
	{#each sliders as slider}
		<label class="flex items-center gap-2">
			<span class="text-muted-foreground w-3 shrink-0 text-xs">{slider.label}</span>
			<div class="relative h-3 flex-1 rounded-full" style="background: {slider.gradient}">
				<input
					type="range"
					min={0}
					max={slider.max}
					value={slider.value}
					oninput={(ev) => slider.set(Number((ev.target as HTMLInputElement).value))}
					class="absolute inset-0 h-full w-full cursor-pointer opacity-0"
					aria-label={slider.label}
				/>
				<span
					class="border-background pointer-events-none absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 shadow-md"
					style="left: {(slider.value / slider.max) * 100}%; background: {slider.thumbColor}"
				></span>
			</div>
			<span class="text-muted-foreground w-7 shrink-0 text-right text-xs tabular-nums">
				{slider.value}
			</span>
		</label>
	{/each}
</HtmlAtom>
