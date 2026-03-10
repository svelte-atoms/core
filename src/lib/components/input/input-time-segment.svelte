<script lang="ts">
	/**
	 * InputTimeSegment — a single editable time/date part (HH, MM, SS, YYYY, etc.)
	 *
	 * Keyboard model:
	 *  - Digits: accumulate up to `digits` chars, auto-advance when full
	 *  - ↑ / ↓: increment/decrement with rollover
	 *  - ← / →: move to prev/next segment
	 *  - Backspace: clear to placeholder
	 *  - Tab / Shift+Tab: move segments (native)
	 */
	import type { Snippet } from 'svelte';

	interface SegmentProps {
		/** Current numeric value, or null = empty */
		value?: number | null;
		min: number;
		max: number;
		/** Number of display digits (e.g. 2 for HH, 4 for YYYY) */
		digits?: number;
		/** Placeholder shown when empty (e.g. 'HH', 'MM', 'YYYY') */
		placeholder?: string;
		disabled?: boolean;
		readonly?: boolean;
		class?: string;
		onchange?: (value: number | null) => void;
		/** Request focus move: -1 = prev, +1 = next */
		onfocusmove?: (dir: -1 | 1) => void;
	}

	let {
		value = $bindable<number | null>(null),
		min,
		max,
		digits = 2,
		placeholder,
		disabled = false,
		readonly = false,
		class: klass = '',
		onchange,
		onfocusmove
	}: SegmentProps = $props();

	let el = $state<HTMLSpanElement>();
	// Accumulation buffer while user is typing
	let buffer = $state<string>('');

	const displayPlaceholder = placeholder ?? '—'.repeat(digits);

	const display = $derived(
		buffer !== ''
			? buffer.padStart(digits, '_')
			: value !== null && value !== undefined
				? String(value).padStart(digits, '0')
				: displayPlaceholder
	);

	const isEmpty = $derived(value === null || value === undefined);

	function clamp(v: number) {
		return Math.max(min, Math.min(max, v));
	}

	function commit(raw: string) {
		const n = parseInt(raw, 10);
		if (!isNaN(n)) {
			const clamped = clamp(n);
			value = clamped;
			onchange?.(clamped);
		}
		buffer = '';
	}

	function clear() {
		buffer = '';
		value = null;
		onchange?.(null);
	}

	function increment() {
		const cur = value ?? min;
		value = cur >= max ? min : cur + 1;
		buffer = '';
		onchange?.(value);
	}

	function decrement() {
		const cur = value ?? max;
		value = cur <= min ? max : cur - 1;
		buffer = '';
		onchange?.(value);
	}

	function handleKeydown(ev: KeyboardEvent) {
		if (disabled || readonly) return;

		if (ev.key >= '0' && ev.key <= '9') {
			ev.preventDefault();
			const next = buffer + ev.key;

			// If adding this digit would exceed max, commit immediately with leading digit
			// e.g. max=12, buffer='1', key='9' → would be 19 > 12, so commit '1' first,
			// then start new buffer with '9'
			const candidate = parseInt(next, 10);
			const maxDigit = Math.floor(max / Math.pow(10, digits - 1));

			if (next.length === digits) {
				// Buffer is full — commit it
				const n = parseInt(next, 10);
				if (n > max) {
					// commit what we had, start fresh with this key
					if (buffer) commit(buffer);
					buffer = ev.key;
					// If single digit already exceeds max when padded, commit
					if (parseInt(buffer + '0'.repeat(digits - 1), 10) > max) {
						commit(buffer);
						onfocusmove?.(1);
					}
				} else {
					commit(next);
					onfocusmove?.(1);
				}
			} else {
				buffer = next;
				// Auto-advance if first digit can't possibly form a valid 2-digit number
				// e.g. for max=23 (hours): digit 3-9 → can only be single digit values
				const firstDigit = parseInt(buffer, 10);
				if (buffer.length === 1 && firstDigit * 10 > max) {
					commit(buffer);
					onfocusmove?.(1);
				}
			}
		} else if (ev.key === 'ArrowUp') {
			ev.preventDefault();
			buffer = '';
			increment();
		} else if (ev.key === 'ArrowDown') {
			ev.preventDefault();
			buffer = '';
			decrement();
		} else if (ev.key === 'ArrowLeft') {
			ev.preventDefault();
			onfocusmove?.(-1);
		} else if (ev.key === 'ArrowRight') {
			ev.preventDefault();
			onfocusmove?.(1);
		} else if (ev.key === 'Backspace' || ev.key === 'Delete') {
			ev.preventDefault();
			if (buffer) {
				buffer = buffer.slice(0, -1);
				if (!buffer) {
					// buffer emptied → clear value
					value = null;
					onchange?.(null);
				}
			} else {
				clear();
			}
		} else if (ev.key === 'Tab') {
			// Let Tab propagate for natural focus management
			buffer = '';
		} else if (ev.key === 'a' && (ev.ctrlKey || ev.metaKey)) {
			// Allow select-all passthrough (no-op visually but don't block)
		} else if (!ev.ctrlKey && !ev.metaKey && !ev.altKey) {
			// Block other printable keys
			ev.preventDefault();
		}
	}

	function handlePaste(ev: ClipboardEvent) {
		// Parent TimeControl / DateTimeControl handles paste at the container level
		// Segments just prevent default to avoid garbled input
		ev.preventDefault();
	}

	function handleFocus() {
		// Select all on focus for quick replacement
		el?.select?.();
	}

	export function focus() {
		el?.focus();
	}
</script>

<span
	bind:this={el}
	role="spinbutton"
	tabindex={disabled ? -1 : 0}
	aria-valuenow={value ?? undefined}
	aria-valuemin={min}
	aria-valuemax={max}
	aria-valuetext={display}
	aria-label={placeholder}
	aria-disabled={disabled}
	data-empty={isEmpty}
	class={[
		'inline-flex min-w-[2ch] items-center justify-center px-0.5 text-center font-mono tabular-nums',
		'focus:bg-foreground/10 focus:outline-none',
		isEmpty && 'text-muted-foreground',
		!isEmpty && 'text-foreground',
		disabled && 'cursor-not-allowed opacity-50',
		klass
	]
		.filter(Boolean)
		.join(' ')}
	onkeydown={handleKeydown}
	onpaste={handlePaste}
	onfocus={handleFocus}
	onblur={() => { buffer = ''; }}
>
	{display}
</span>
