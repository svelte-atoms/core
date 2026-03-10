<script lang="ts">
	import { getPreset } from '$svelte-atoms/core/context';
	import { cn, toClassValue } from '$svelte-atoms/core/utils';
	import type { PresetModuleName } from '$svelte-atoms/core/context/preset.svelte';
	import { untrack } from 'svelte';
	import { InputBond } from './bond.svelte';
	import type { InputTimeControlProps } from './types';
	import Segment from './input-time-segment.svelte';

	const bond = InputBond.get();

	let {
		class: klass = '',
		value = $bindable(''),
		withSeconds = false,
		disabled = false,
		readonly = false,
		preset: presetKey = 'input.time',
		onchange = undefined,
		oninput = undefined,
		...restProps
	}: InputTimeControlProps = $props();

	const preset = getPreset(untrack(() => presetKey) as PresetModuleName)?.apply(bond, [bond]);

	// ── Segment state ──────────────────────────────────────────────────────
	let hours = $state<number | null>(null);
	let minutes = $state<number | null>(null);
	let seconds = $state<number | null>(null);

	// Segment refs for programmatic focus
	let segHours = $state<ReturnType<typeof Segment>>();
	let segMinutes = $state<ReturnType<typeof Segment>>();
	let segSeconds = $state<ReturnType<typeof Segment>>();

	// Segments in order for focus navigation
	const segments = $derived(withSeconds
		? [segHours, segMinutes, segSeconds]
		: [segHours, segMinutes]);

	// ── Parse incoming value string → segments ────────────────────────────
	$effect(() => {
		if (!value) { hours = null; minutes = null; seconds = null; return; }
		const parts = value.split(':');
		hours   = parts[0] ? parseInt(parts[0], 10) : null;
		minutes = parts[1] ? parseInt(parts[1], 10) : null;
		seconds = parts[2] ? parseInt(parts[2], 10) : null;
	});

	// ── Compose value string from segments ────────────────────────────────
	function buildValue(): string {
		if (hours === null || minutes === null) return '';
		const h = String(hours).padStart(2, '0');
		const m = String(minutes).padStart(2, '0');
		if (withSeconds && seconds !== null) return `${h}:${m}:${String(seconds).padStart(2, '0')}`;
		if (withSeconds) return '';
		return `${h}:${m}`;
	}

	function emit(ev?: Event) {
		const v = buildValue();
		if (v === value) return;
		value = v;
		if (bond) bond.state.props.value = value;
		if (ev) {
			onchange?.(ev, { value });
		} else {
			oninput?.(undefined as unknown as Event, { value });
		}
	}

	// ── Focus navigation ──────────────────────────────────────────────────
	function moveFocus(from: number, dir: -1 | 1) {
		const next = segments[from + dir];
		if (next) (next as { focus: () => void }).focus();
	}

	// ── Paste handler — parse full time string ────────────────────────────
	function handlePaste(ev: ClipboardEvent) {
		ev.preventDefault();
		const text = ev.clipboardData?.getData('text') ?? '';
		const m = text.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?/);
		if (!m) return;
		hours   = Math.min(23, parseInt(m[1], 10));
		minutes = Math.min(59, parseInt(m[2], 10));
		if (withSeconds && m[3]) seconds = Math.min(59, parseInt(m[3], 10));
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
		bind:value={hours}
		min={0}
		max={23}
		digits={2}
		placeholder="HH"
		{disabled}
		{readonly}
		onchange={() => emit()}
		onfocusmove={(dir) => moveFocus(0, dir)}
	/>
	<span class="text-muted-foreground select-none">:</span>
	<Segment
		bind:this={segMinutes}
		bind:value={minutes}
		min={0}
		max={59}
		digits={2}
		placeholder="MM"
		{disabled}
		{readonly}
		onchange={() => emit()}
		onfocusmove={(dir) => moveFocus(1, dir)}
	/>
	{#if withSeconds}
		<span class="text-muted-foreground select-none">:</span>
		<Segment
			bind:this={segSeconds}
			bind:value={seconds}
			min={0}
			max={59}
			digits={2}
			placeholder="SS"
			{disabled}
			{readonly}
			onchange={() => emit()}
			onfocusmove={(dir) => moveFocus(2, dir)}
		/>
	{/if}
</span>
