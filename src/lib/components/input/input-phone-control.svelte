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

	// ── Mask helpers ───────────────────────────────────────────────────────
	/** Apply up to N digits into the format template. Returns masked string. */
	function applyMask(digits: string, fmt: string): string {
		let di = 0;
		let out = '';
		for (const ch of fmt) {
			if (di >= digits.length) break;
			if (ch === '#') { out += digits[di++]; }
			else { out += ch; }
		}
		return out;
	}

	/** Position of the (n+1)th `#` in the format string (0-indexed). */
	function nextSlotPos(fmt: string, filledDigits: number): number {
		let count = 0;
		for (let i = 0; i < fmt.length; i++) {
			if (fmt[i] === '#') {
				if (count === filledDigits) return i;
				count++;
			}
		}
		return fmt.length; // all filled, put caret at end
	}

	/** Build the display placeholder: replace # with _ */
	function maskPlaceholder(fmt: string): string {
		return fmt.replace(/#/g, '_');
	}

	// ── Sync: external value → display ────────────────────────────────────
	// value stores digits only; on mount/external change, update the input display
	$effect(() => {
		if (!format || !inputEl) return;
		const masked = applyMask(value, format);
		if (inputEl.value !== masked) inputEl.value = masked;
	});

	// ── Event handler ──────────────────────────────────────────────────────
	function handleInput(ev: Event) {
		const input = ev.currentTarget as HTMLInputElement;

		if (!format) {
			// Free mode — no masking
			value = input.value;
			if (bond) bond.state.props.value = value;
			oninput?.(ev, { value });
			return;
		}

		// Extract all digits from whatever the user typed/pasted
		const digits = input.value.replace(/\D/g, '');

		// Cap to max digit slots in format
		const maxDigits = (format.match(/#/g) ?? []).length;
		const capped = digits.slice(0, maxDigits);

		// Rebuild masked display
		const masked = applyMask(capped, format);

		// Write back to input (bypasses Svelte re-render, keeps caret stable)
		input.value = masked;

		// Move caret to next empty slot
		const cursorPos = nextSlotPos(format, capped.length);
		input.setSelectionRange(cursorPos, cursorPos);

		// value = clean digits
		value = capped;
		if (bond) bond.state.props.value = value;
		oninput?.(ev, { value });
	}

	function handleChange(ev: Event) {
		onchange?.(ev, { value });
	}

	// Snap caret to nearest # slot on click/focus (avoid landing on literals)
	function snapCaret() {
		if (!format || !inputEl) return;
		const pos = inputEl.selectionStart ?? 0;
		// Find the first # slot at or after the cursor
		let slot = 0;
		for (let i = 0; i < format.length; i++) {
			if (format[i] === '#') {
				if (i >= pos) {
					inputEl.setSelectionRange(i, i);
					return;
				}
				slot = i;
			}
		}
		// Cursor is past all slots — put it after last filled digit
		const filledDigits = value.length;
		const snapped = nextSlotPos(format, filledDigits);
		inputEl.setSelectionRange(snapped, snapped);
	}
</script>

<input
	bind:this={inputEl}
	type="tel"
	value={format ? applyMask(value, format) : value}
	placeholder={format ? maskPlaceholder(format) : placeholder}
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
	onclick={format ? () => requestAnimationFrame(snapCaret) : undefined}
	onfocus={format ? () => requestAnimationFrame(snapCaret) : undefined}
	{...restProps}
/>
