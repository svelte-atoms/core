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

	// ── Mask engine (only active when format is provided) ─────────────────
	type Token = { type: 'lit'; char: string } | { type: 'digit'; index: number };

	const tokens = $derived<Token[]>(() => {
		if (!format) return [];
		let di = 0;
		return [...format].map(ch => ch === '#' ? { type: 'digit', index: di++ } : { type: 'lit', char: ch });
	})();

	const digitCount = $derived(tokens.filter(t => t.type === 'digit').length);

	// digits[i] = the digit entered at slot i, or undefined
	let digits = $state<(string | undefined)[]>([]);

	// Sync digits from external value changes
	$effect(() => {
		if (!format || !value) { digits = []; return; }
		const raw = value.replace(/\D/g, '');
		digits = [...raw.slice(0, digitCount)];
	});

	function buildMasked(filled: (string | undefined)[], empty = '_'): string {
		return tokens.map(t =>
			t.type === 'lit' ? t.char : (filled[t.index] ?? empty)
		).join('');
	}

	// Position in the formatted string of digit slot i
	function slotPos(slotIdx: number): number {
		for (let i = 0; i < tokens.length; i++) {
			const t = tokens[i];
			if (t.type === 'digit' && t.index === slotIdx) return i;
		}
		return tokens.length;
	}

	// First empty digit slot index
	function firstEmpty(d: (string | undefined)[]): number {
		for (let i = 0; i < digitCount; i++) {
			if (d[i] === undefined) return i;
		}
		return digitCount; // all filled
	}

	function setCursor(pos: number) {
		// After Svelte render + browser paint
		requestAnimationFrame(() => inputEl?.setSelectionRange(pos, pos));
	}

	function handleMaskedKeydown(ev: KeyboardEvent) {
		if (disabled || readonly) return;

		if (ev.key >= '0' && ev.key <= '9') {
			ev.preventDefault();
			const slot = firstEmpty(digits);
			if (slot >= digitCount) return; // all filled
			const next = [...digits];
			next[slot] = ev.key;
			digits = next;
			emitMasked();
			// Move cursor to next slot (skip following literals)
			const nextSlot = firstEmpty(next);
			setCursor(nextSlot < digitCount ? slotPos(nextSlot) : slotPos(digitCount - 1) + 1);
		} else if (ev.key === 'Backspace') {
			ev.preventDefault();
			// Find the last filled slot
			let last = -1;
			for (let i = digitCount - 1; i >= 0; i--) {
				if (digits[i] !== undefined) { last = i; break; }
			}
			if (last === -1) return;
			const next = [...digits];
			next[last] = undefined;
			digits = next;
			emitMasked();
			setCursor(slotPos(last));
		} else if (ev.key === 'Delete') {
			ev.preventDefault();
			// Clear slot at current cursor
			const pos = inputEl?.selectionStart ?? 0;
			// Find digit slot at or after cursor
			for (let i = 0; i < digitCount; i++) {
				if (slotPos(i) >= pos && digits[i] !== undefined) {
					const next = [...digits];
					next[i] = undefined;
					digits = next;
					emitMasked();
					setCursor(slotPos(i));
					break;
				}
			}
		} else if (!ev.ctrlKey && !ev.metaKey && !ev.altKey && ev.key.length === 1) {
			// Block non-digit printable keys
			ev.preventDefault();
		}
		// Allow: Tab, arrows, Ctrl+A/C/V/X, etc.
	}

	function emitMasked() {
		const masked = buildMasked(digits, '_');
		// External value = digits only (clean), display uses masked
		const raw = digits.filter(Boolean).join('');
		value = raw;
		if (bond) bond.state.props.value = value;
		// Update input display imperatively to avoid re-render focus loss
		if (inputEl) inputEl.value = masked;
		oninput?.(undefined as unknown as Event, { value });
	}

	// ── No-format mode: free typing with segment parsing ─────────────────
	type PhoneSegment = { text: string; kind: 'country' | 'area' | 'prefix' | 'line' | 'ext' | 'sep' };

	function parseSegments(raw: string): PhoneSegment[] {
		if (!raw) return [];
		const segs: PhoneSegment[] = [];
		let rest = raw.trimStart();

		const countryMatch = rest.match(/^(\+\d{1,3})([\s\-.(]|$)/);
		if (countryMatch) {
			segs.push({ text: countryMatch[1], kind: 'country' });
			rest = rest.slice(countryMatch[1].length);
		}

		const extMatch = rest.match(/\s*(ext\.?|x|extension)\s*(\d+)\s*$/i);
		let extSuffix = '';
		if (extMatch) {
			extSuffix = rest.slice(rest.length - extMatch[0].length);
			rest = rest.slice(0, rest.length - extMatch[0].length);
		}

		const parenFmt = rest.match(/^(\s*\((\d{3})\)\s*)(\d{3})([\s\-]?)(\d{4})(.*)/);
		if (parenFmt) {
			segs.push({ text: parenFmt[1].trimStart(), kind: 'area' });
			segs.push({ text: parenFmt[3], kind: 'prefix' });
			if (parenFmt[4]) segs.push({ text: parenFmt[4], kind: 'sep' });
			segs.push({ text: parenFmt[5], kind: 'line' });
		} else {
			const dashFmt = rest.match(/^(\s*(\d{3}))([\s\-./])(\d{3})([\s\-./])(\d{4})(.*)/);
			if (dashFmt) {
				segs.push({ text: dashFmt[2], kind: 'area' });
				segs.push({ text: dashFmt[3], kind: 'sep' });
				segs.push({ text: dashFmt[4], kind: 'prefix' });
				segs.push({ text: dashFmt[5], kind: 'sep' });
				segs.push({ text: dashFmt[6], kind: 'line' });
			} else {
				const parts = rest.trimStart().split(/([^\d]+)/g).filter(Boolean);
				let isFirst = !countryMatch;
				for (const g of parts) {
					if (/^\d+$/.test(g)) {
						if (isFirst) { segs.push({ text: g, kind: 'area' }); isFirst = false; }
						else if (!segs.some(s => s.kind === 'prefix')) segs.push({ text: g, kind: 'prefix' });
						else segs.push({ text: g, kind: 'line' });
					} else {
						segs.push({ text: g, kind: 'sep' });
					}
				}
			}
		}

		if (extSuffix) segs.push({ text: extSuffix.trimStart(), kind: 'ext' });
		return segs;
	}

	// ── Overlay segments ──────────────────────────────────────────────────
	type OverlaySegment = { text: string; cls: string };

	const overlaySegments = $derived<OverlaySegment[]>(() => {
		if (format) {
			// Mask mode: color literals vs digits
			const masked = buildMasked(digits, '_');
			const segs: OverlaySegment[] = [];
			for (let i = 0; i < tokens.length; i++) {
				const t = tokens[i];
				const ch = masked[i] ?? '';
				if (t.type === 'lit') {
					segs.push({ text: ch, cls: 'text-muted-foreground' });
				} else {
					const filled = digits[t.index] !== undefined;
					segs.push({ text: ch, cls: filled ? 'text-foreground' : 'text-muted-foreground/40' });
				}
			}
			// Merge consecutive same-class spans
			return segs.reduce<OverlaySegment[]>((acc, s) => {
				const last = acc[acc.length - 1];
				if (last && last.cls === s.cls) { last.text += s.text; return acc; }
				return [...acc, { ...s }];
			}, []);
		} else {
			const phoneSegs = parseSegments(value);
			const kindClass: Record<string, string> = {
				country: 'text-blue-500 dark:text-blue-400',
				area:    'text-foreground font-medium',
				prefix:  'text-foreground/80',
				line:    'text-foreground',
				sep:     'text-muted-foreground',
				ext:     'text-purple-500 dark:text-purple-400',
			};
			return phoneSegs.map(s => ({ text: s.text, cls: kindClass[s.kind] }));
		}
	})();

	// ── Free-type event handlers (no format) ──────────────────────────────
	function handleInput(ev: Event) {
		const input = ev.currentTarget as HTMLInputElement;
		value = input.value;
		if (bond) bond.state.props.value = value;
		scrollLeft = input.scrollLeft;
		oninput?.(ev, { value });
	}

	function handleChange(ev: Event) {
		onchange?.(ev, { value });
	}

	function syncScroll() {
		scrollLeft = inputEl?.scrollLeft ?? 0;
	}

	// ── Init masked input display ─────────────────────────────────────────
	$effect(() => {
		if (format && inputEl) {
			inputEl.value = buildMasked(digits, '_');
			// Place cursor at first empty slot
			const slot = firstEmpty(digits);
			const pos = slot < digitCount ? slotPos(slot) : tokens.length;
			inputEl.setSelectionRange(pos, pos);
		}
	});
</script>

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
			{#if overlaySegments.length}
				{#each overlaySegments as seg}
					<span class={seg.cls}>{seg.text}</span>
				{/each}
			{:else}
				<span class="text-muted-foreground">{placeholder}</span>
			{/if}
		</span>
	</span>

	<!-- Real input -->
	<input
		bind:this={inputEl}
		type="tel"
		value={format ? buildMasked(digits, '_') : value}
		{placeholder}
		{disabled}
		{readonly}
		class={cn(
			'relative h-full w-full flex-1 bg-transparent px-2 font-mono text-sm text-transparent caret-foreground outline-none',
			'placeholder:text-transparent',
			disabled && 'cursor-not-allowed',
			preset?.class,
			toClassValue(klass, bond)
		)}
		onkeydown={format ? handleMaskedKeydown : undefined}
		oninput={format ? undefined : handleInput}
		onchange={handleChange}
		onscroll={syncScroll}
		{...restProps}
	/>
</span>
