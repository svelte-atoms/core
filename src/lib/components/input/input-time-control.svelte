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

	// ── State ──────────────────────────────────────────────────────────────
	let hours = $state<number | null>(null);     // 0–23 internally
	let minutes = $state<number | null>(null);   // 0–59
	let seconds = $state<number | null>(null);   // 0–59
	let period = $state<'AM' | 'PM'>('AM');      // 12h mode only

	// Segment refs for focus navigation
	let segHours = $state<{ focus(): void }>();
	let segMinutes = $state<{ focus(): void }>();
	let segSeconds = $state<{ focus(): void }>();

	let lastEmitted = ''; // Track emitted values to avoid re-parse loops

	// ── Derived state ──────────────────────────────────────────────────────
	const displayHours = $derived.by(() => {
		if (hours === null || hourFormat === 24) return hours;
		return hours % 12 === 0 ? 12 : hours % 12;
	});

	const segments = $derived(withSeconds ? [segHours, segMinutes, segSeconds] : [segHours, segMinutes]);

	// ── Helpers ────────────────────────────────────────────────────────────
	/** Convert time string to seconds for min/max comparison */
	function timeToSeconds(t: string): number {
		const [h, m, s] = t.split(':').map(Number);
		return (h || 0) * 3600 + (m || 0) * 60 + (s || 0);
	}

	/** Build canonical HH:MM(:SS) string from internal state */
	function buildValue(): string {
		if (hours === null || minutes === null) return '';
		const h = String(hours).padStart(2, '0');
		const m = String(minutes).padStart(2, '0');
		if (withSeconds) {
			if (seconds === null) return '';
			return `${h}:${m}:${String(seconds).padStart(2, '0')}`;
		}
		return `${h}:${m}`;
	}

	/** Apply min/max constraints to a time value */
	function clampToRange(v: string): string {
		if (!v) return v;
		const secs = timeToSeconds(v);
		if (min && secs < timeToSeconds(min)) return min;
		if (max && secs > timeToSeconds(max)) return max;
		return v;
	}

	/** Convert display hours (1–12) to internal hours (0–23) in 12h mode */
	function displayToInternal(displayH: number): number {
		if (hourFormat === 24) return displayH;
		if (period === 'AM') return displayH === 12 ? 0 : displayH;
		return displayH === 12 ? 12 : displayH + 12;
	}

	/** Parse time string and update state */
	function parseTimeString(str: string) {
		if (!str) {
			hours = null;
			minutes = null;
			seconds = null;
			return;
		}
		const parts = str.split(':');
		hours = parts[0] ? parseInt(parts[0], 10) : null;
		minutes = parts[1] ? parseInt(parts[1], 10) : null;
		seconds = parts[2] ? parseInt(parts[2], 10) : null;
		if (hourFormat === 12 && hours !== null) {
			period = hours >= 12 ? 'PM' : 'AM';
		}
	}

	// ── Effects ────────────────────────────────────────────────────────────
	/** Parse external value changes */
	$effect(() => {
		if (value === lastEmitted) return; // skip internal emissions
		untrack(() => parseTimeString(value));
	});

	// ── Event handlers ─────────────────────────────────────────────────────
	function emit(ev?: Event) {
		const raw = buildValue();
		if (!raw) return;

		const clamped = clampToRange(raw);
		// If clamped, sync segments to reflect boundary
		if (clamped !== raw) {
			untrack(() => parseTimeString(clamped));
		}

		if (clamped === value) return;
		lastEmitted = clamped;
		value = clamped;
		if (bond) bond.state.props.value = value;

		const detail = { value: clamped };
		ev ? onchange?.(ev, detail) : oninput?.(undefined as unknown as Event, detail);
	}

	function handleHoursChange(h: number | null) {
		hours = h === null ? null : displayToInternal(h);
		emit();
	}

	function handleSegmentChange(key: 'minutes' | 'seconds', v: number | null) {
		if (key === 'minutes') minutes = v;
		else if (key === 'seconds') seconds = v;
		emit();
	}

	function togglePeriod() {
		if (disabled || readonly || hours === null) return;
		period = period === 'AM' ? 'PM' : 'AM';
		handleHoursChange(displayHours);
	}

	function handlePeriodKey(ev: KeyboardEvent) {
		const { key } = ev;
		if (key.toLowerCase() === 'a') {
			period = 'AM';
			if (hours !== null) handleHoursChange(displayHours);
		} else if (key.toLowerCase() === 'p') {
			period = 'PM';
			if (hours !== null) handleHoursChange(displayHours);
		} else if (['ArrowUp', 'ArrowDown', ' ', 'Enter'].includes(key)) {
			ev.preventDefault();
			togglePeriod();
		} else if (key === 'ArrowLeft') {
			ev.preventDefault();
			const idx = hourFormat === 12 ? segments.length : segments.length - 1;
			segments[idx - 1]?.focus();
		}
	}

	function handlePaste(ev: ClipboardEvent) {
		ev.preventDefault();
		const text = ev.clipboardData?.getData('text') ?? '';

		// Try 12h format first (HH:MM(:SS) AM/PM), then 24h format
		const m12 = text.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)/i);
		const m24 = text.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?/);

		if (m12) {
			let h = parseInt(m12[1], 10);
			const isPM = m12[4].toUpperCase() === 'PM';
			// Convert to 24h
			if (isPM && h !== 12) h += 12;
			if (!isPM && h === 12) h = 0;

			hours = Math.min(23, h);
			minutes = Math.min(59, parseInt(m12[2], 10));
			if (withSeconds && m12[3]) seconds = Math.min(59, parseInt(m12[3], 10));
			period = isPM ? 'PM' : 'AM';
		} else if (m24) {
			hours = Math.min(23, parseInt(m24[1], 10));
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
		'inline-flex h-full items-center gap-0 px-2 font-mono flex-1',
		disabled && 'cursor-not-allowed opacity-50',
		preset?.class,
		toClassValue(klass, bond)
	)}
	onpaste={handlePaste}
	{...restProps}
>
	<!-- Hours segment (12 or 24 hour) -->
	<Segment
		bind:this={segHours}
		value={displayHours}
		min={hourFormat === 12 ? 1 : 0}
		max={hourFormat === 12 ? 12 : 23}
		digits={2}
		placeholder="HH"
		{disabled}
		{readonly}
		onchange={handleHoursChange}
		onfocusmove={(dir) => dir === 1 ? segMinutes?.focus() : undefined}
	/>

	<span class="text-muted-foreground select-none">:</span>

	<!-- Minutes segment -->
	<Segment
		bind:this={segMinutes}
		value={minutes}
		min={0}
		max={59}
		digits={2}
		placeholder="MM"
		{disabled}
		{readonly}
		onchange={(v) => handleSegmentChange('minutes', v)}
		onfocusmove={(dir) => {
			if (dir === 1 && withSeconds) segSeconds?.focus();
			else if (dir === -1) segHours?.focus();
		}}
	/>

	<!-- Seconds segment (optional) -->
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
			onchange={(v) => handleSegmentChange('seconds', v)}
			onfocusmove={(dir) => dir === -1 ? segMinutes?.focus() : undefined}
		/>
	{/if}

	<!-- AM/PM toggle (12h mode only) -->
	{#if hourFormat === 12}
		<span class="ml-1 select-none"> </span>
		<span
			role="spinbutton"
			tabindex={disabled ? -1 : 0}
			aria-label="AM/PM"
			aria-valuenow={period === 'AM' ? 0 : 1}
			aria-valuemin={0}
			aria-valuemax={1}
			aria-valuetext={period}
			class={cn(
				'inline-flex min-w-[3ch] cursor-pointer items-center justify-center px-0.5 font-sans text-sm font-medium',
				'focus:bg-foreground/10 focus:outline-none ml-auto',
				disabled && 'cursor-not-allowed opacity-50'
			)}
			onclick={togglePeriod}
			onkeydown={handlePeriodKey}
		>
			{period}
		</span>
	{/if}
</span>
