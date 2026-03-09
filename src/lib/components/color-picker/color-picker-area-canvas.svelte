<script lang="ts">
	import { ColorPickerBond } from './bond.svelte.ts';

	type Props = {
		/** Current thumb position as percentages [x, y] */
		x: number;
		y: number;
		/** CSS gradient string for the area background */
		gradient: string;
		/** Current color for the thumb */
		thumbColor: string;
		/** aria label describing what the axes represent */
		ariaLabel: string;
		/** Live value description for screen readers */
		ariaValueText: string;
		/** Called with normalized [0–100, 0–100] on pick */
		onpick: (x: number, y: number) => void;
		/** Called with delta [dx, dy] steps on keyboard */
		onkey: (dx: number, dy: number) => void;
	};

	let {
		x,
		y,
		gradient,
		thumbColor,
		ariaLabel,
		ariaValueText,
		onpick,
		onkey
	}: Props = $props();

	let areaEl: HTMLDivElement | undefined = $state();
	let dragging = $state(false);

	function pick(ev: PointerEvent) {
		if (!areaEl) return;
		const rect = areaEl.getBoundingClientRect();
		const nx = Math.round(Math.min(100, Math.max(0, ((ev.clientX - rect.left) / rect.width) * 100)));
		const ny = Math.round(Math.min(100, Math.max(0, ((ev.clientY - rect.top) / rect.height) * 100)));
		onpick(nx, ny);
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
		const step = ev.shiftKey ? 10 : 1;
		let dx = 0, dy = 0;
		switch (ev.key) {
			case 'ArrowRight': dx = +step;  break;
			case 'ArrowLeft':  dx = -step;  break;
			case 'ArrowDown':  dy = +step;  break;
			case 'ArrowUp':    dy = -step;  break;
			default: return;
		}
		ev.preventDefault();
		onkey(dx, dy);
	}
</script>

<div
	bind:this={areaEl}
	class="relative w-full cursor-crosshair select-none overflow-hidden rounded-md"
	style="aspect-ratio: 1 / 1; background: {gradient};"
	role="slider"
	tabindex="0"
	aria-label={ariaLabel}
	aria-valuetext={ariaValueText}
	onpointerdown={onPointerDown}
	onpointermove={onPointerMove}
	onpointerup={onPointerUp}
	onkeydown={onKeyDown}
>
	<span
		class={[
			'border-background pointer-events-none absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 shadow-md ring-1',
			dragging ? 'ring-white/60 scale-110' : 'ring-black/20'
		].join(' ')}
		style="
			left: {x}%;
			top: {y}%;
			background: {thumbColor};
			transition: {dragging ? 'none' : 'left 0.05s, top 0.05s'};
		"
	></span>
</div>
