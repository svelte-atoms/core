<script lang="ts">
	import { ColorPickerBond } from './bond.svelte.ts';

	type Props = {
		label: string;
		value: number;
		max: number;
		gradient: string;
		thumbColor: string;
		oninput: (v: number) => void;
	};

	const bond = ColorPickerBond.get();

	let { label, value, max, gradient, thumbColor, oninput }: Props = $props();

	const pct = $derived((value / max) * 100);
</script>

<label class="flex items-center gap-2">
	<span class="text-muted-foreground w-3 shrink-0 text-xs">{label}</span>
	<div class="relative h-3 flex-1 rounded-full" style="background: {gradient}">
		<input
			type="range"
			min={0}
			{max}
			{value}
			oninput={(ev) => oninput(Number((ev.target as HTMLInputElement).value))}
			class="absolute inset-0 h-full w-full cursor-pointer opacity-0"
			aria-label={label}
		/>
		<span
			class="border-background pointer-events-none absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 shadow-md"
			style="left: {pct}%; background: {thumbColor}"
		></span>
	</div>
	<span class="text-muted-foreground w-7 shrink-0 text-right text-xs tabular-nums">{value}</span>
</label>
