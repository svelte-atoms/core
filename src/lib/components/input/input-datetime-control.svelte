<script lang="ts">
	import { getPreset } from '$svelte-atoms/core/context';
	import { cn, toClassValue } from '$svelte-atoms/core/utils';
	import type { PresetModuleName } from '$svelte-atoms/core/context/preset.svelte';
	import { untrack } from 'svelte';
	import { InputBond } from './bond.svelte';
	import type { InputDateTimeControlProps } from './types';
	import Segment from './input-time-segment.svelte';

	const bond = InputBond.get();

	let {
		class: klass = '',
		value = $bindable(''),
		date = $bindable<Date | null>(null),
		withSeconds = false,
		disabled = false,
		readonly = false,
		preset: presetKey = 'input.datetime',
		onchange = undefined,
		oninput = undefined,
		...restProps
	}: InputDateTimeControlProps = $props();

	const preset = getPreset(untrack(() => presetKey) as PresetModuleName)?.apply(bond, [bond]);

	// ── Segment state ──────────────────────────────────────────────────────
	let month   = $state<number | null>(null);
	let day     = $state<number | null>(null);
	let year    = $state<number | null>(null);
	let hours   = $state<number | null>(null);
	let minutes = $state<number | null>(null);
	let seconds = $state<number | null>(null);

	// Segment component refs
	let segMonth   = $state<{ focus(): void }>();
	let segDay     = $state<{ focus(): void }>();
	let segYear    = $state<{ focus(): void }>();
	let segHours   = $state<{ focus(): void }>();
	let segMinutes = $state<{ focus(): void }>();
	let segSeconds = $state<{ focus(): void }>();

	const segments = $derived(
		withSeconds
			? [segMonth, segDay, segYear, segHours, segMinutes, segSeconds]
			: [segMonth, segDay, segYear, segHours, segMinutes]
	);

	// ── Parse incoming value string → segments ────────────────────────────
	$effect(() => {
		if (!value) {
			month = day = year = hours = minutes = seconds = null;
			return;
		}
		// Format: YYYY-MM-DDTHH:MM or YYYY-MM-DDTHH:MM:SS
		const m = value.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?/);
		if (!m) return;
		year    = parseInt(m[1], 10);
		month   = parseInt(m[2], 10);
		day     = parseInt(m[3], 10);
		hours   = parseInt(m[4], 10);
		minutes = parseInt(m[5], 10);
		seconds = m[6] ? parseInt(m[6], 10) : null;
	});

	// ── Derive max days for current month/year ────────────────────────────
	const maxDay = $derived(
		month && year ? new Date(year, month, 0).getDate()
		: month ? new Date(2000, month, 0).getDate()
		: 31
	);

	// ── Compose value string from segments ────────────────────────────────
	function buildValue(): string {
		if (year === null || month === null || day === null || hours === null || minutes === null) return '';
		const yyyy = String(year).padStart(4, '0');
		const mm   = String(month).padStart(2, '0');
		const dd   = String(day).padStart(2, '0');
		const hh   = String(hours).padStart(2, '0');
		const min  = String(minutes).padStart(2, '0');
		if (withSeconds && seconds !== null) {
			return `${yyyy}-${mm}-${dd}T${hh}:${min}:${String(seconds).padStart(2, '0')}`;
		}
		return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
	}

	function parseDate(v: string): Date | null {
		if (!v) return null;
		const d = new Date(v);
		return isNaN(d.getTime()) ? null : d;
	}

	function emit(ev?: Event) {
		const v = buildValue();
		if (v === value) return;
		value = v;
		date  = parseDate(v);
		if (bond) bond.state.props.value = value;
		if (ev) {
			onchange?.(ev, { value, date });
		} else {
			oninput?.(undefined as unknown as Event, { value, date });
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
		const m = text.match(/^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2})(?::(\d{2}))?)?/);
		if (!m) return;
		year    = parseInt(m[1], 10);
		month   = Math.min(12, Math.max(1, parseInt(m[2], 10)));
		day     = Math.min(31, Math.max(1, parseInt(m[3], 10)));
		hours   = m[4] ? Math.min(23, parseInt(m[4], 10)) : 0;
		minutes = m[5] ? Math.min(59, parseInt(m[5], 10)) : 0;
		if (withSeconds && m[6]) seconds = Math.min(59, parseInt(m[6], 10));
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
	<!-- Date part: MM / DD / YYYY -->
	<Segment
		bind:this={segMonth}
		value={month}
		min={1}
		max={12}
		digits={2}
		placeholder="MM"
		{disabled}
		{readonly}
		onchange={(v) => { month = v; emit(); }}
		onfocusmove={(dir) => moveFocus(0, dir)}
	/>
	<span class="text-muted-foreground select-none">/</span>
	<Segment
		bind:this={segDay}
		value={day}
		min={1}
		max={maxDay}
		digits={2}
		placeholder="DD"
		{disabled}
		{readonly}
		onchange={(v) => { day = v; emit(); }}
		onfocusmove={(dir) => moveFocus(1, dir)}
	/>
	<span class="text-muted-foreground select-none">/</span>
	<Segment
		bind:this={segYear}
		value={year}
		min={1}
		max={9999}
		digits={4}
		placeholder="YYYY"
		{disabled}
		{readonly}
		onchange={(v) => { year = v; emit(); }}
		onfocusmove={(dir) => moveFocus(2, dir)}
	/>

	<!-- Separator -->
	<span class="text-muted-foreground mx-1 select-none">·</span>

	<!-- Time part: HH : MM -->
	<Segment
		bind:this={segHours}
		value={hours}
		min={0}
		max={23}
		digits={2}
		placeholder="HH"
		{disabled}
		{readonly}
		onchange={(v) => { hours = v; emit(); }}
		onfocusmove={(dir) => moveFocus(3, dir)}
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
		onfocusmove={(dir) => moveFocus(4, dir)}
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
			onfocusmove={(dir) => moveFocus(5, dir)}
		/>
	{/if}
</span>
