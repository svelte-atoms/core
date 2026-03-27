/**
 * Types for the input/time sub-module.
 */

// ── Segment ────────────────────────────────────────────────────────────────
export interface SegmentProps {
	value?: number | undefined;
	min: number;
	max: number;
	digits?: number;
	placeholder?: string;
	disabled?: boolean;
	readonly?: boolean;
	class?: string;
	onchange?: (value: number | undefined) => void;
	onfocusmove?: (dir: -1 | 1) => void;
	/** Fired when ArrowUp/Down wraps past min/max */
	onrollover?: (dir: 1 | -1) => void;
}

// ── Time-only parts ────────────────────────────────────────────────────────
export interface TimeParts {
	hh?: number;
	mm?: number;
	ss?: number;
	period?: 'AM' | 'PM';
}

// ── DateTime parts ─────────────────────────────────────────────────────────
export interface DateTimeParts {
	year?: number;
	month?: number;
	day?: number;
	hours?: number;
	minutes?: number;
	seconds?: number;
}

// ── Loose variant for segment onchange callbacks ───────────────────────────
// Segment fires (number | undefined); exactOptionalPropertyTypes rejects that
// as a direct Parts key.  Strip undefined values before spreading.
export type LooseParts<T> = { [K in keyof T]: number | undefined };
