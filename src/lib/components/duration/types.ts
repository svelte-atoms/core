import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

export interface DurationValue {
	years: number;
	months: number;
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
	milliseconds: number;
	totalMilliseconds: number;
}

export interface DurationRootProps {
	/** Bindable start datetime string (ISO or datetime-local format) */
	from?: string;
	/** Bindable end datetime string */
	to?: string;
	/** Bindable computed duration — read-only from outside, updated reactively */
	value?: DurationValue;
	children?: Snippet;
	class?: string;
}

export interface DurationFromProps extends HTMLAttributes<HTMLDivElement> {
	/** Bindable datetime value */
	value?: string;
	label?: string;
	placeholder?: string;
	disabled?: boolean;
	readonly?: boolean;
	min?: string;
	max?: string;
	class?: string;
}

export interface DurationToProps extends HTMLAttributes<HTMLDivElement> {
	value?: string;
	label?: string;
	placeholder?: string;
	disabled?: boolean;
	readonly?: boolean;
	min?: string;
	max?: string;
	class?: string;
}

export interface DurationDisplayProps {
	/**
	 * Format string using tokens:
	 *   Y=years, M=months, D=days, h=hours, m=minutes, s=seconds, ms=milliseconds
	 * Examples:
	 *   "Y years, M months, D days"
	 *   "h:mm:ss"
	 *   "D days h hours"
	 * When omitted, auto-formats the most significant non-zero units.
	 */
	format?: string;
	/** Show zero units (default: false — hides "0 years" etc.) */
	showZero?: boolean;
	class?: string;
}
