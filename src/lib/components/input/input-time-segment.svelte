<script lang="ts">
	import { untrack } from 'svelte';

	/**
	 * InputTimeSegment — a single editable time/date part (HH, MM, SS, etc.)
	 * Fully controlled: value is driven by parent, segment calls onchange to request updates.
	 */

	interface SegmentProps {
		value?: number | null;
		min: number;
		max: number;
		digits?: number;
		placeholder?: string;
		disabled?: boolean;
		readonly?: boolean;
		class?: string;
		onchange?: (value: number | null) => void;
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
	let buffer = $state<string>('');
	let isFocused = $state(false);

	const displayPlaceholder = placeholder ?? '—'.repeat(digits);

	function getDisplay(): string {
		if (buffer !== '') return buffer.padStart(digits, '_');
		if (value !== null && value !== undefined) return String(value).padStart(digits, '0');
		return displayPlaceholder;
	}

	function isEmpty(): boolean {
		return (value === null || value === undefined) && buffer === '';
	}

	// Update DOM imperatively to avoid focus loss
	// Using contenteditable + requestAnimationFrame for safe textContent updates
	$effect(() => {
		if (!el) return;
		const text = getDisplay();
		void buffer; void value; // Track reactive dependencies

		untrack(() => {
			requestAnimationFrame(() => {
				if (el && el.textContent !== text) {
					el.textContent = text;
				}
			});
		});

		el.setAttribute('aria-valuetext', text);
		el.setAttribute('aria-valuenow', value != null ? String(value) : '');
		el.setAttribute('data-empty', String(isEmpty()));

		// Update color classes
		if (isEmpty()) {
			el.classList.remove('text-foreground');
			el.classList.add('text-muted-foreground');
		} else {
			el.classList.remove('text-muted-foreground');
			el.classList.add('text-foreground');
		}
	});

	function clamp(v: number): number {
		return Math.max(min, Math.min(max, v));
	}

	function commitBuffer(buf: string, andAdvance: boolean) {
		const n = parseInt(buf, 10);
		if (!isNaN(n)) onchange?.(clamp(n));
		buffer = '';
		if (andAdvance) onfocusmove?.(1);
	}

	function handleKeydown(ev: KeyboardEvent) {
		if (disabled || readonly) return;

		if (ev.key >= '0' && ev.key <= '9') {
			ev.preventDefault();
			const next = buffer + ev.key;
			const nextNum = parseInt(next, 10);

			// Reject single digit if it exceeds max
			if (next.length === 1 && nextNum > max) return;

			// Buffer complete - commit (clamp to max if invalid)
			if (next.length === digits) {
				commitBuffer(nextNum <= max ? next : String(max), true);
				return;
			}

			// Add digit to buffer
			buffer = next;

			// Auto-advance if minimum possible completion exceeds max
			const minCompletion = parseInt(next + '0'.repeat(digits - next.length), 10);
			if (minCompletion > max) {
				commitBuffer(next, true);
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
			if (buffer) buffer = '';
			else onfocusmove?.(-1);
		} else if (ev.key === 'ArrowRight') {
			ev.preventDefault();
			onfocusmove?.(1);
		} else if (ev.key === 'Backspace' || ev.key === 'Delete') {
			ev.preventDefault();
			if (buffer) buffer = buffer.slice(0, -1);
			else onchange?.(null);
		} else if (ev.key === 'Tab') {
			buffer = '';
		} else if (!ev.ctrlKey && !ev.metaKey && !ev.altKey) {
			ev.preventDefault();
		}
	}

	export function focus() {
		el?.focus();
	}
</script>

<span
	bind:this={el}
	role="spinbutton"
	tabindex={disabled ? -1 : 0}
	contenteditable={!disabled && !readonly}
	aria-valuemin={min}
	aria-valuemax={max}
	aria-label={placeholder}
	aria-disabled={disabled}
	class={[
		'inline-flex min-w-[2ch] items-center justify-center px-0.5 text-center font-mono tabular-nums',
		'focus:bg-foreground/10 focus:outline-none',
		'text-muted-foreground',
		disabled && 'cursor-not-allowed opacity-50',
		klass
	].filter(Boolean).join(' ')}
	onkeydown={handleKeydown}
	onpaste={(ev) => ev.preventDefault()}
	onfocus={() => (isFocused = true)}
	onblur={() => {
		isFocused = false;
		if (buffer) commitBuffer(buffer, false);
	}}
>{displayPlaceholder}</span>
