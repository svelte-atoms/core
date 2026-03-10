<script lang="ts">
	import { getPreset } from '$svelte-atoms/core/context';
	import { cn, toClassValue } from '$svelte-atoms/core/utils';
	import type { PresetModuleName } from '$svelte-atoms/core/context/preset.svelte';
	import { untrack } from 'svelte';
	import { InputBond } from './bond.svelte';
	import type { InputTimeControlProps, InputNumber24HourControlProps, InputNumber12HourControlProps } from './types';
	import Segment from './input-time-segment.svelte';

	const bond = InputBond.get();

	let {
		class: klass = '',
		value = $bindable(''),
		hourFormat = 24,
		withSeconds = false,
		min = undefined,
		max = undefined,
		disabled = false,
		readonly = false,
		preset: presetKey = 'input.time',
		onchange = undefined,
		oninput = undefined,
		...restProps
	}: InputTimeControlProps & (InputNumber24HourControlProps | InputNumber12HourControlProps) = $props();

	const preset = getPreset(untrack(() => presetKey) as PresetModuleName)?.apply(bond, [bond]);

	// ── Segment state ──────────────────────────────────────────────────────
	let hours   = $state<number | null>(null); // always 0–23 internally
	let minutes = $state<number | null>(null);
	let seconds = $state<number | null>(null);
	let period  = $state<'AM' | 'PM'>('AM');  // only used in 12h mode

	// Segment refs
	let segHours   = $state<{ focus(): void }>();
	let segMinutes = $state<{ focus(): void }>();
	let segSeconds = $state<{ focus(): void }>();

	const displayHours = $derived(
		hourFormat === 12 && hours !== null
			? (hours % 12 === 0 ? 12 : hours % 12)
			: hours
	);

	const segments = $derived(
		withSeconds
			? [segHours, segMinutes, segSeconds]
			: [segHours, segMinutes]
	);

	// ── Parse incoming value string → segments ─────────────────────────────
	// Parse incoming value → segments only when value changes externally
	// (not when we ourselves emitted it, to avoid the re-render roundtrip)
	let lastEmitted = '';
	$effect(() => {
		if (value === lastEmitted) return; // we emitted this, skip
		if (!value) { hours = null; minutes = null; seconds = null; return; }
		const parts = value.split(':');
		const h = parts[0] ? parseInt(parts[0], 10) : null;
		untrack(() => {
			hours   = h;
			minutes = parts[1] ? parseInt(parts[1], 10) : null;
			seconds = parts[2] ? parseInt(parts[2], 10) : null;
			if (hourFormat === 12 && h !== null) {
				period = h >= 12 ? 'PM' : 'AM';
			}
		});
	});

	// ── Compose value string (always 24h output) ───────────────────────────
	// ── min/max helpers ───────────────────────────────────────────────────
	function timeToSeconds(t: string): number {
		const [h, m, s] = t.split(':').map(Number);
		return (h || 0) * 3600 + (m || 0) * 60 + (s || 0);
	}

	function buildValue(): string {
		if (hours === null || minutes === null) return '';
		const h = String(hours).padStart(2, '0');
		const m = String(minutes).padStart(2, '0');
		if (withSeconds && seconds !== null) return `${h}:${m}:${String(seconds).padStart(2, '0')}`;
		if (withSeconds) return '';
		return `${h}:${m}`;
	}

	function clampToRange(v: string): string {
		if (!v) return v;
		const secs = timeToSeconds(v);
		if (min && secs < timeToSeconds(min)) return min;
		if (max && secs > timeToSeconds(max)) return max;
		return v;
	}

	function emit(ev?: Event) {
		const raw = buildValue();
		if (!raw) return;
		const v = clampToRange(raw);
		// If clamped, update segments to reflect the boundary value
		if (v !== raw) {
			const parts = v.split(':');
			hours   = parseInt(parts[0], 10);
			minutes = parseInt(parts[1], 10);
			if (withSeconds && parts[2]) seconds = parseInt(parts[2], 10);
			if (hourFormat === 12) period = (hours ?? 0) >= 12 ? 'PM' : 'AM';
		}
		if (v === value) return;
		lastEmitted = v;
		value = v;
		if (bond) bond.state.props.value = value;
		if (ev) onchange?.(ev, { value });
		else oninput?.(undefined as unknown as Event, { value });
	}

	// ── 12h → 24h conversion when segment changes ─────────────────────────
	function onHoursChange(h: number | null) {
		if (hourFormat === 24 || h === null) {
			hours = h;
		} else {
			// Convert display 1–12 → internal 0–23
			if (period === 'AM') {
				hours = h === 12 ? 0 : h;
			} else {
				hours = h === 12 ? 12 : h + 12;
			}
		}
		emit();
	}

	function togglePeriod() {
		if (disabled || readonly) return;
		period = period === 'AM' ? 'PM' : 'AM';
		// Recompute internal hours from current display hours
		if (hours !== null) {
			const displayH = hours % 12 === 0 ? 12 : hours % 12;
			onHoursChange(displayH);
		}
	}

	function handlePeriodKey(ev: KeyboardEvent) {
		if (ev.key === 'a' || ev.key === 'A') { period = 'AM'; if (hours !== null) onHoursChange(displayHours ?? null); }
		else if (ev.key === 'p' || ev.key === 'P') { period = 'PM'; if (hours !== null) onHoursChange(displayHours ?? null); }
		else if (ev.key === 'ArrowUp' || ev.key === 'ArrowDown' || ev.key === ' ' || ev.key === 'Enter') {
			ev.preventDefault();
			togglePeriod();
		} else if (ev.key === 'ArrowLeft') {
			ev.preventDefault();
			moveFocus(segments.length, -1);
		}
	}

	// ── Focus navigation ──────────────────────────────────────────────────
	function moveFocus(from: number, dir: -1 | 1) {
		segments[from + dir]?.focus();
	}

	// ── Paste handler ─────────────────────────────────────────────────────
	function handlePaste(ev: ClipboardEvent) {
		ev.preventDefault();
		const text = ev.clipboardData?.getData('text') ?? '';
		// Support HH:MM, HH:MM:SS, H:MM AM/PM
		const m12 = text.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)/i);
		const m24 = text.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?/);
		if (m12) {
			let h = parseInt(m12[1], 10);
			const pm = m12[4].toUpperCase() === 'PM';
			if (pm && h !== 12) h += 12;
			if (!pm && h === 12) h = 0;
			hours   = Math.min(23, h);
			minutes = Math.min(59, parseInt(m12[2], 10));
			if (withSeconds && m12[3]) seconds = Math.min(59, parseInt(m12[3], 10));
			period = pm ? 'PM' : 'AM';
		} else if (m24) {
			hours   = Math.min(23, parseInt(m24[1], 10));
			minutes = Math.min(59, parseInt(m24[2], 10));
			if (withSeconds && m24[3]) seconds = Math.min(59, parseInt(m24[3], 10));
			if (hourFormat === 12) period = (hours ?? 0) >= 12 ? 'PM' : 'AM';
		}
		emit();
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<span
	class={cn(
		'flex h-full items-center gap-0 px-2 font-mono',
		disabled && 'cursor-not-allowed opacity-50',
		preset?.class,
		toClassValue(klass, bond)
	)}
	onpaste={handlePaste}
	{...restProps}
>
	<Segment
		bind:this={segHours}
		value={displayHours}
		min={hourFormat === 12 ? 1 : 0}
		max={hourFormat === 12 ? 12 : 23}
		digits={2}
		placeholder="HH"
		{disabled}
		{readonly}
		onchange={onHoursChange}
		onfocusmove={(dir) => moveFocus(0, dir)}
	/>
	<span class="text-muted-foreground select-none">:</span>
	<Segment
		bind:this={segMinutes}
		value={minutes}
		min={0}
		max={59}
		digits={2}
		placeholder="MM"
		{disabled}
		{readonly}
		onchange={(v) => { minutes = v; emit(); }}
		onfocusmove={(dir) => moveFocus(1, dir)}
	/>
	{#if withSeconds}
		<span class="text-muted-foreground select-none">:</span>
		<Segment
			bind:this={segSeconds}
			value={seconds}
			min={0}
			max={59}
			digits={2}
			placeholder="SS"
			{disabled}
			{readonly}
			onchange={(v) => { seconds = v; emit(); }}
			onfocusmove={(dir) => moveFocus(2, dir)}
		/>
	{/if}

	{#if hourFormat === 12}
		<span class="ml-1 select-none"> </span>
		<!-- AM/PM toggle -->
		<span
			role="spinbutton"
			tabindex={disabled ? -1 : 0}
			aria-label="AM/PM"
			aria-valuenow={period === 'AM' ? 0 : 1}
			aria-valuemin={0}
			aria-valuemax={1}
			aria-valuetext={period}
			class={[
				'inline-flex min-w-[3ch] cursor-pointer items-center justify-center px-0.5 text-center font-sans text-sm font-medium',
				'focus:bg-foreground/10 focus:outline-none',
				'text-foreground',
				disabled && 'cursor-not-allowed opacity-50'
			].filter(Boolean).join(' ')}
			onclick={togglePeriod}
			onkeydown={handlePeriodKey}
		>
			{period}
		</span>
	{/if}
</span>
