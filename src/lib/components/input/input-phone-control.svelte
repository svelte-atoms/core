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
		placeholder = '+1 (555) 000-0000',
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

	// ── Segment parsing ───────────────────────────────────────────────────
	type PhoneSegment = { text: string; kind: 'country' | 'area' | 'prefix' | 'line' | 'ext' | 'sep' };

	/**
	 * Parse a raw phone string into display segments.
	 *
	 * Handles common formats:
	 *   +1 (555) 123-4567        → country + area + prefix + line
	 *   +44 20 7946 0958         → country + groups
	 *   555-123-4567             → area + prefix + line (no country)
	 *   (555) 123-4567           → area + prefix + line
	 *   +1 555 123 4567 ext 99   → ... + ext
	 */
	function parseSegments(raw: string): PhoneSegment[] {
		if (!raw) return [];
		const segs: PhoneSegment[] = [];
		let rest = raw.trimStart();

		// Country code: starts with + followed by 1-3 digits
		const countryMatch = rest.match(/^(\+\d{1,3})([\s\-.(]|$)/);
		if (countryMatch) {
			segs.push({ text: countryMatch[1], kind: 'country' });
			rest = rest.slice(countryMatch[1].length);
		}

		// Extension at the end (ext/x/extension followed by digits)
		const extMatch = rest.match(/\s*(ext\.?|x|extension)\s*(\d+)\s*$/i);
		let extSuffix = '';
		if (extMatch) {
			extSuffix = rest.slice(rest.length - extMatch[0].length);
			rest = rest.slice(0, rest.length - extMatch[0].length);
		}

		// Strip and re-examine what's left
		const digits = rest.replace(/\D/g, '');

		if (digits.length === 0 && rest.trim().length === 0) {
			if (extSuffix) segs.push({ text: extSuffix, kind: 'ext' });
			return segs;
		}

		// Apply user-provided format template if given
		// Format uses # for digit placeholders, e.g. "(###) ###-####"
		if (format && digits.length > 0) {
			const formatted = applyFormat(format, digits, rest);
			// Push formatted with separators highlighted
			pushFormatted(segs, formatted, !!countryMatch);
		} else {
			// Auto-detect format from the raw string structure
			pushAutoSegments(segs, rest.trimStart(), digits, !!countryMatch);
		}

		if (extSuffix) {
			segs.push({ text: extSuffix.trimStart(), kind: 'ext' });
		}

		return segs;
	}

	function applyFormat(fmt: string, digits: string, raw: string): string {
		let di = 0;
		let out = '';
		// If the user is still typing and raw doesn't match format length, just return raw
		for (let i = 0; i < fmt.length && di < digits.length; i++) {
			if (fmt[i] === '#') {
				out += digits[di++];
			} else {
				out += fmt[i];
			}
		}
		// Append remaining digits not covered by format
		if (di < digits.length) out += digits.slice(di);
		return out;
	}

	function pushFormatted(segs: PhoneSegment[], formatted: string, hasCountry: boolean) {
		// Split on separator chars, classify each chunk
		const parts = formatted.split(/([^\d]+)/g).filter(Boolean);
		let isFirst = !hasCountry;
		for (const part of parts) {
			if (/^\d+$/.test(part)) {
				if (isFirst) { segs.push({ text: part, kind: 'area' }); isFirst = false; }
				else if (!segs.some(s => s.kind === 'prefix')) segs.push({ text: part, kind: 'prefix' });
				else segs.push({ text: part, kind: 'line' });
			} else {
				segs.push({ text: part, kind: 'sep' });
			}
		}
	}

	function pushAutoSegments(segs: PhoneSegment[], raw: string, digits: string, hasCountry: boolean) {
		// Detect structure: (NXX) NXX-XXXX or NXX-NXX-XXXX or NXX NXX XXXX etc.
		// We operate on the raw string to preserve the user's own separators.

		// Try: (area) prefix-line
		const parenFmt = raw.match(/^(\s*\((\d{3})\)\s*)(\d{3})([\s\-]?)(\d{4})(.*)/);
		if (parenFmt) {
			segs.push({ text: parenFmt[1].trimStart(), kind: 'area' });
			segs.push({ text: parenFmt[3], kind: 'prefix' });
			if (parenFmt[4]) segs.push({ text: parenFmt[4], kind: 'sep' });
			segs.push({ text: parenFmt[5], kind: 'line' });
			if (parenFmt[6]) segs.push({ text: parenFmt[6].trim(), kind: 'ext' });
			return;
		}

		// Try: NXX-NXX-XXXX or NXX NXX XXXX (3-3-4 split)
		const dashFmt = raw.match(/^(\s*(\d{3}))([\s\-./])(\d{3})([\s\-./])(\d{4})(.*)/);
		if (dashFmt) {
			if (!hasCountry) {
				segs.push({ text: dashFmt[2], kind: 'area' });
				segs.push({ text: dashFmt[3], kind: 'sep' });
			} else {
				segs.push({ text: dashFmt[1].trimStart(), kind: 'area' });
				segs.push({ text: dashFmt[3], kind: 'sep' });
			}
			segs.push({ text: dashFmt[4], kind: 'prefix' });
			segs.push({ text: dashFmt[5], kind: 'sep' });
			segs.push({ text: dashFmt[6], kind: 'line' });
			if (dashFmt[7]) segs.push({ text: dashFmt[7].trim(), kind: 'ext' });
			return;
		}

		// Try: 2-4-4 (e.g. UK mobile: 07xxx xxxxxx → 2 groups after country)
		const ukFmt = raw.match(/^(\s*(\d{4,5}))([\s\-])(\d{4,6})(.*)/);
		if (ukFmt) {
			segs.push({ text: ukFmt[2], kind: 'area' });
			segs.push({ text: ukFmt[3], kind: 'sep' });
			segs.push({ text: ukFmt[4], kind: 'line' });
			if (ukFmt[5]) segs.push({ text: ukFmt[5].trim(), kind: 'ext' });
			return;
		}

		// Fallback: treat leading space + text as single block but color digits vs seps
		let pos = 0;
		const trimmed = raw.trimStart();
		if (raw !== trimmed) segs.push({ text: raw.slice(0, raw.length - trimmed.length), kind: 'sep' });
		// Just push remaining as area + rest
		const digitGroups = trimmed.split(/([^\d]+)/g).filter(Boolean);
		let isFirst = !hasCountry;
		for (const g of digitGroups) {
			if (/^\d+$/.test(g)) {
				if (isFirst) { segs.push({ text: g, kind: 'area' }); isFirst = false; }
				else if (!segs.some(s => s.kind === 'prefix')) segs.push({ text: g, kind: 'prefix' });
				else segs.push({ text: g, kind: 'line' });
			} else {
				segs.push({ text: g, kind: 'sep' });
			}
		}
	}

	const segments = $derived(parseSegments(value));

	const kindClass: Record<PhoneSegment['kind'], string> = {
		country: 'text-blue-500 dark:text-blue-400',
		area:    'text-foreground font-medium',
		prefix:  'text-foreground/80',
		line:    'text-foreground',
		sep:     'text-muted-foreground',
		ext:     'text-purple-500 dark:text-purple-400',
	};

	// ── Scroll sync ───────────────────────────────────────────────────────
	function syncScroll() {
		scrollLeft = inputEl?.scrollLeft ?? 0;
	}

	// ── Events ────────────────────────────────────────────────────────────
	function handleInput(ev: Event) {
		const input = ev.currentTarget as HTMLInputElement;
		// Allow digits, spaces, parens, dashes, dots, slashes, +, extensions
		value = input.value;
		if (bond) bond.state.props.value = value;
		syncScroll();
		oninput?.(ev, { value });
	}

	function handleChange(ev: Event) {
		onchange?.(ev, { value });
	}
</script>

<span class="relative flex h-full w-full flex-1 items-center overflow-hidden">

	<!-- Coloured segment overlay -->
	<span
		aria-hidden="true"
		class={cn(
			'pointer-events-none absolute inset-0 flex items-center overflow-hidden whitespace-pre px-2 font-mono text-sm',
			preset?.class,
			toClassValue(klass, bond)
		)}
	>
		<span style="transform: translateX(-{scrollLeft}px)">
			{#if segments.length}
				{#each segments as seg}
					<span class={kindClass[seg.kind]}>{seg.text}</span>
				{/each}
			{:else}
				<span class="text-muted-foreground">{placeholder}</span>
			{/if}
		</span>
	</span>

	<!-- Real input — transparent text, visible caret -->
	<input
		bind:this={inputEl}
		type="tel"
		bind:value
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
		oninput={handleInput}
		onchange={handleChange}
		onscroll={syncScroll}
		{...restProps}
	/>
</span>
