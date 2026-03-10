<script lang="ts">
	/**
	 * InputTimeSegment — a single editable time/date part (HH, MM, SS, YYYY, etc.)
	 *
	 * Uses <input type="text" readonly> as the host element so the browser's
	 * native focus management keeps focus stable across any DOM update.
	 * All input is handled via onkeydown; `readonly` blocks the browser's own editing.
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

	let el = $state<HTMLInputElement>();
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

	function commitBuffer(buf: string, andAdvance: boolean) {
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

			if (next.length === digits) {
				commitBuffer(next, true);
			} else {
				buffer = next;
				// Auto-advance: if even the smallest number completable from this buffer
				// already exceeds max, commit immediately (e.g. max=23, typed '4' → '40' > 23)
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
			// let Tab propagate for natural focus movement
		} else if (!ev.ctrlKey && !ev.metaKey && !ev.altKey) {
			ev.preventDefault();
		}
	}

	function handlePaste(ev: ClipboardEvent) {
		ev.preventDefault(); // parent container handles paste
	}

	export function focus() {
		el?.focus();
	}
</script>

<input
	bind:this={el}
	type="text"
	inputmode="none"
	readonly
	role="spinbutton"
	tabindex={disabled ? -1 : 0}
	aria-valuenow={value ?? undefined}
	aria-valuemin={min}
	aria-valuemax={max}
	aria-label={placeholder}
	aria-disabled={disabled}
	value={display}
	data-empty={isEmpty}
	class={[
		'inline-flex w-[2ch] cursor-default appearance-none border-none bg-transparent p-0 text-center font-mono tabular-nums outline-none',
		'focus:bg-foreground/10',
		isEmpty ? 'text-muted-foreground' : 'text-foreground',
		disabled && 'cursor-not-allowed opacity-50',
		klass
	]
		.filter(Boolean)
		.join(' ')}
	onkeydown={handleKeydown}
	onpaste={handlePaste}
	onblur={() => {
		if (buffer) commitBuffer(buffer, false);
	}}
/>
