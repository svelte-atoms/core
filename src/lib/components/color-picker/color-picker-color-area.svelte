<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import { ColorPickerBond } from './bond.svelte.ts';
	import type { ColorPickerSlidersProps } from './types';

	const bond = ColorPickerBond.get();

	let {
		class: klass = '',
		preset = 'color-picker.color-area',
		...restProps
	}: ColorPickerSlidersProps & HTMLAttributes<HTMLDivElement> = $props();

	let areaEl: HTMLDivElement | undefined = $state();
	let dragging = $state(false);

	const hsv = $derived(bond?.state.hsv ?? { h: 0, s: 0, v: 0 });
	const hex = $derived(bond?.state.value ?? '#000000');

	// Thumb position: x = S%, y = (100 - V)%  (V=100 is top)
	const thumbX = $derived(hsv.s);
	const thumbY = $derived(100 - hsv.v);

	function pick(ev: PointerEvent) {
		if (!areaEl) return;
		const rect = areaEl.getBoundingClientRect();
		const s = Math.round(Math.min(100, Math.max(0, ((ev.clientX - rect.left) / rect.width) * 100)));
		const v = Math.round(Math.min(100, Math.max(0, (1 - (ev.clientY - rect.top) / rect.height) * 100)));
		bond?.state.setHsv({ h: hsv.h, s, v });
	}

	function onPointerDown(ev: PointerEvent) {
		ev.preventDefault();
		dragging = true;
		(ev.currentTarget as HTMLElement).setPointerCapture(ev.pointerId);
		pick(ev);
	}

	function onPointerMove(ev: PointerEvent) {
		if (!dragging) return;
		pick(ev);
	}

	function onPointerUp(ev: PointerEvent) {
		dragging = false;
		(ev.currentTarget as HTMLElement).releasePointerCapture(ev.pointerId);
	}

	function onKeyDown(ev: KeyboardEvent) {
		const { h, s, v } = hsv;
		const step = ev.shiftKey ? 10 : 1;
		switch (ev.key) {
			case 'ArrowRight': bond?.state.setHsv({ h, s: Math.min(100, s + step), v }); break;
			case 'ArrowLeft':  bond?.state.setHsv({ h, s: Math.max(0,   s - step), v }); break;
			case 'ArrowUp':    bond?.state.setHsv({ h, s, v: Math.min(100, v + step) }); break;
			case 'ArrowDown':  bond?.state.setHsv({ h, s, v: Math.max(0,   v - step) }); break;
			default: return;
		}
		ev.preventDefault();
	}
</script>

<HtmlAtom
	{preset}
	as="div"
	class={['color-picker-color-area relative select-none overflow-hidden rounded-md', '$preset', klass]}
	style="aspect-ratio: 1 / 1; width: 100%;"
	{...restProps}
>
	<!-- Gradient layers: hue base → white left-to-right → black top-to-bottom -->
	<div
		bind:this={areaEl}
		class="absolute inset-0 cursor-crosshair"
		style="
			background:
				linear-gradient(to top, #000, transparent),
				linear-gradient(to right, #fff, transparent),
				hsl({hsv.h}, 100%, 50%);
		"
		role="slider"
		tabindex="0"
		aria-label="Color area — saturation and brightness"
		aria-valuetext="Saturation {hsv.s}%, Brightness {hsv.v}%"
		onpointerdown={onPointerDown}
		onpointermove={onPointerMove}
		onpointerup={onPointerUp}
		onkeydown={onKeyDown}
	>
		<!-- Draggable thumb -->
		<span
			class={[
				'border-background pointer-events-none absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 shadow-md ring-1',
				dragging ? 'ring-white/60 scale-110' : 'ring-black/20'
			].join(' ')}
			style="
				left: {thumbX}%;
				top: {thumbY}%;
				background: {hex};
				transition: {dragging ? 'none' : 'left 0.05s, top 0.05s'};
			"
		></span>
	</div>
</HtmlAtom>
