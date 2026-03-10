<script lang="ts">
	import { getPreset } from '$svelte-atoms/core/context';
	import { cn, toClassValue } from '$svelte-atoms/core/utils';
	import type { PresetModuleName } from '$svelte-atoms/core/context/preset.svelte';
	import { untrack } from 'svelte';
	import { InputBond } from './bond.svelte';
	import type { InputPhoneControlProps } from './types';

	const bond = InputBond.get();

	let {
		class: klass = '',
		value = $bindable(''),
		format = undefined,
		segments: segmentMap = undefined,
		placeholder = '+_ (___) ___-____',
		disabled = false,
		readonly = false,
		preset: presetKey = 'input.phone',
		onchange = undefined,
		oninput = undefined,
		...restProps
	}: InputPhoneControlProps = $props();

	const preset = getPreset(untrack(() => presetKey) as PresetModuleName)?.apply(bond, [bond]);

	let inputEl = $state<HTMLInputElement>();
	let scrollLeft = $state(0);

	// ── Mask helpers ───────────────────────────────────────────────────────
	function applyMask(digits: string, fmt: string, empty = '_'): string {
		let di = 0;
		let out = '';
		for (const ch of fmt) {
			if (ch === '#') { out += di < digits.length ? digits[di++] : empty; }
			else { out += ch; }
		}
		return out;
	}

	function nextSlotPos(fmt: string, filledCount: number): number {
		let count = 0;
		for (let i = 0; i < fmt.length; i++) {
			if (fmt[i] === '#') {
				if (count === filledCount) return i;
				count++;
			}
		}
		return fmt.length;
	}

	const maxDigits = $derived(format ? (format.match(/#/g) ?? []).length : 0);

	// ── Segment color map ─────────────────────────────────────────────────
	// segmentMap: e.g. { country: 2, area: 3, prefix: 3, line: 4 }
	// Maps digit slot index → color class
	const segmentColors: Record<string, string> = {
		country: 'text-blue-500 dark:text-blue-400',
		area:    'text-foreground font-medium',
		prefix:  'text-foreground/80',
		line:    'text-foreground',
		other:   'text-foreground',
	};

	const digitSlotKind = $derived<string[]>(() => {
		if (!format) return [];
		const kinds: string[] = [];
		if (segmentMap) {
			for (const [kind, count] of Object.entries(segmentMap)) {
				for (let i = 0; i < (count as number); i++) kinds.push(kind);
			}
		}
		// Pad remaining slots as 'other'
		while (kinds.length < maxDigits) kinds.push('other');
		return kinds;
	})();

	// ── Overlay segments ──────────────────────────────────────────────────
	type Span = { text: string; cls: string };

	const overlaySpans = $derived<Span[]>(() => {
		if (!format) return [];
		const masked = applyMask(value, format, '_');
		const spans: Span[] = [];
		let di = 0;

		for (let i = 0; i < format.length; i++) {
			const ch = format[i];
			if (ch === '#') {
				const filled = di < value.length;
				const kind = digitSlotKind[di] ?? 'other';
				const cls = filled ? (segmentMap ? segmentColors[kind] ?? segmentColors.other : 'text-foreground') : 'text-muted-foreground/40';
				spans.push({ text: masked[i], cls });
				di++;
			} else {
				spans.push({ text: ch, cls: 'text-muted-foreground' });
			}
		}

		// Merge consecutive same-class spans
		return spans.reduce<Span[]>((acc, s) => {
			const last = acc[acc.length - 1];
			if (last && last.cls === s.cls) { last.text += s.text; return acc; }
			return [...acc, { ...s }];
		}, []);
	})();

	// ── Sync: external value → display ────────────────────────────────────
	$effect(() => {
		if (!format || !inputEl) return;
		const masked = applyMask(value, format);
		if (inputEl.value !== masked) inputEl.value = masked;
	});

	// ── Input handler ──────────────────────────────────────────────────────
	function handleInput(ev: Event) {
		const input = ev.currentTarget as HTMLInputElement;

		if (!format) {
			value = input.value;
			if (bond) bond.state.props.value = value;
			oninput?.(ev, { value });
			return;
		}

		const digits = input.value.replace(/\D/g, '').slice(0, maxDigits);
		const masked = applyMask(digits, format);

		input.value = masked;
		scrollLeft = input.scrollLeft;

		const cursorPos = nextSlotPos(format, digits.length);
		input.setSelectionRange(cursorPos, cursorPos);

		value = digits;
		if (bond) bond.state.props.value = value;
		oninput?.(ev, { value });
	}

	function handleChange(ev: Event) {
		onchange?.(ev, { value });
	}

	function snapCaret() {
		if (!format || !inputEl) return;
		const pos = inputEl.selectionStart ?? 0;
		for (let i = 0; i < format.length; i++) {
			if (format[i] === '#' && i >= pos) {
				inputEl.setSelectionRange(i, i);
				return;
			}
		}
		const snapped = nextSlotPos(format, value.length);
		inputEl.setSelectionRange(snapped, snapped);
	}

	function syncScroll() {
		scrollLeft = inputEl?.scrollLeft ?? 0;
	}
</script>

{#if format}
	<!-- Masked mode: overlay + transparent input -->
	<span class="relative flex h-full w-full flex-1 items-center overflow-hidden">

		<!-- Coloured overlay -->
		<span
			aria-hidden="true"
			class={cn(
				'pointer-events-none absolute inset-0 flex items-center overflow-hidden whitespace-pre px-2 font-mono text-sm',
				preset?.class,
				toClassValue(klass, bond)
			)}
		>
			<span style="transform: translateX(-{scrollLeft}px)">
				{#each overlaySpans as span}
					<span class={span.cls}>{span.text}</span>
				{/each}
			</span>
		</span>

		<!-- Real input — transparent text, visible caret -->
		<input
			bind:this={inputEl}
			type="tel"
			value={applyMask(value, format)}
			{disabled}
			{readonly}
			class={cn(
				'relative h-full w-full flex-1 bg-transparent px-2 font-mono text-sm text-transparent caret-foreground outline-none',
				'placeholder:text-transparent',
				disabled && 'cursor-not-allowed opacity-50',
				preset?.class,
				toClassValue(klass, bond)
			)}
			oninput={handleInput}
			onchange={handleChange}
			onscroll={syncScroll}
			onclick={() => requestAnimationFrame(snapCaret)}
			onfocus={() => requestAnimationFrame(snapCaret)}
			{...restProps}
		/>
	</span>
{:else}
	<!-- Free mode: plain input -->
	<input
		bind:this={inputEl}
		type="tel"
		bind:value
		{placeholder}
		{disabled}
		{readonly}
		class={cn(
			'h-full w-full flex-1 bg-transparent px-2 font-mono text-sm outline-none',
			'text-foreground placeholder:text-muted-foreground',
			disabled && 'cursor-not-allowed opacity-50',
			preset?.class,
			toClassValue(klass, bond)
		)}
		oninput={handleInput}
		onchange={handleChange}
		{...restProps}
	/>
{/if}
