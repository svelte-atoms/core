<script lang="ts">
	/**
	 * InputTimeSegment — a single editable time/date part (HH, MM, SS, YYYY, etc.)
	 * Fully controlled: value is driven by parent, segment calls onchange to request updates.
	 */

	interface SegmentProps {
		/** Current numeric value driven by parent, or null = empty */
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
		value = null,
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
	// Transient typing buffer — only lives while user is actively keying digits
	let buffer = $state<string>('');

	const displayPlaceholder = placeholder ?? '—'.repeat(digits);

	const display = $derived(
		buffer !== ''
			? buffer.padStart(digits, '_')
			: value !== null && value !== undefined
				? String(value).padStart(digits, '0')
				: displayPlaceholder
	);

	const isEmpty = $derived((value === null || value === undefined) && buffer === '');

	function clamp(v: number): number {
		return Math.max(min, Math.min(max, v));
	}

	function commitBuffer(buf: string, andAdvance = false) {
		const n = parseInt(buf, 10);
		if (!isNaN(n)) {
			onchange?.(clamp(n));
		}
		buffer = '';
		if (andAdvance) onfocusmove?.(1);
	}

	function handleKeydown(ev: KeyboardEvent) {
		if (disabled || readonly) return;

		if (ev.key >= '0' && ev.key <= '9') {
			ev.preventDefault();
			const next = buffer + ev.key;
			const n = parseInt(next, 10);

			if (next.length === digits) {
				// Buffer full — commit
				commitBuffer(next, true);
			} else {
				buffer = next;
				// Auto-advance: if the first digit makes it impossible to form a valid number
				// e.g. max=23, typed '4' → '40' > 23, so commit '4' immediately
				const wouldMin = parseInt(next + '0'.repeat(digits - next.length), 10);
				if (wouldMin > max) {
					commitBuffer(next, true);
				}
			}
		} else if (ev.key === 'ArrowUp') {
			ev.preventDefault();
			buffer = '';
			const cur = value ?? min;
			onchange?.(cur >= max ? min : cur + 1);
		} else if (ev.key === 'ArrowDown') {
			ev.preventDefault();
			buffer = '';
			const cur = value ?? max;
			onchange?.(cur <= min ? max : cur - 1);
		} else if (ev.key === 'ArrowLeft') {
			ev.preventDefault();
			if (buffer) { buffer = ''; } else { onfocusmove?.(-1); }
		} else if (ev.key === 'ArrowRight') {
			ev.preventDefault();
			onfocusmove?.(1);
		} else if (ev.key === 'Backspace' || ev.key === 'Delete') {
			ev.preventDefault();
			if (buffer) {
				buffer = buffer.slice(0, -1);
			} else {
				onchange?.(null);
			}
		} else if (ev.key === 'Tab') {
			buffer = '';
		} else if (!ev.ctrlKey && !ev.metaKey && !ev.altKey) {
			ev.preventDefault();
		}
	}

	function handlePaste(ev: ClipboardEvent) {
		ev.preventDefault(); // parent handles paste
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
		isEmpty ? 'text-muted-foreground' : 'text-foreground',
		disabled && 'cursor-not-allowed opacity-50',
		klass
	]
		.filter(Boolean)
		.join(' ')}
	onkeydown={handleKeydown}
	onpaste={handlePaste}
	onblur={() => {
		// Commit partial buffer on blur
		if (buffer) commitBuffer(buffer, false);
	}}
>
	{display}
</span>
