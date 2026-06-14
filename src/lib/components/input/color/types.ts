// ── Color format namespace ─────────────────────────────────────────────────

export type ColorFormat =
	| 'named'
	| 'hex'
	| 'rgb'
	| 'hsl'
	| 'hwb'
	| 'lab'
	| 'lch'
	| 'oklab'
	| 'oklch'
	| 'display-p3'
	| 'srgb'
	| 'srgb-linear'
	| 'a98-rgb'
	| 'prophoto-rgb'
	| 'rec2020'
	| 'xyz-d50'
	| 'xyz-d65';

// ── Channel definition ─────────────────────────────────────────────────────

export type ChannelKind =
	| 'integer' // 0–255 integer (rgb channels)
	| 'float' // decimal, typically 0–1
	| 'percent' // 0–100 with % suffix
	| 'angle' // hue, 0–360 with deg suffix
	| 'hex' // two-char hex pair
	| 'alpha' // 0–1 float or 0–100%
	| 'text'; // free-form string (named colors)

export interface ChannelDef {
	id: string;
	label: string;
	kind: ChannelKind;
	min: number;
	max: number;
	// Decimal precision for display/editing
	precision?: number;
	// Suffix shown after the value (e.g. '%', 'deg')
	suffix?: string;
}

// ── Segment props ──────────────────────────────────────────────────────────

export interface ColorSegmentProps {
	value: number | string | undefined;
	channel: ChannelDef;
	disabled?: boolean;
	readonly?: boolean;
	class?: string;
	// Fired on every live change (arrow up/down, typing)
	onchange?: (value: number | string | undefined) => void;
	// Fired on blur / Enter — use for commit semantics
	oncommit?: (ev: Event, value: number | string | undefined) => void;
	onfocusmove?: (dir: 1 | -1) => void;
}

// ── Component props ────────────────────────────────────────────────────────

export interface InputColorControlProps {
	// Raw CSS color string (bindable); format is auto-detected (hex, rgb, hsl, oklab, color(…), etc.)
	value?: string;
	// Override the active format; segments always render for this format regardless of value
	format?: ColorFormat;
	// Always show the alpha channel segment even when the value has no alpha component
	alpha?: boolean;
	placeholder?: string;
	disabled?: boolean;
	readonly?: boolean;
	class?: string;
	preset?: string;
	// Fired on every channel edit (live)
	oninput?: (ev: Event, options: { value: string }) => void;
	// Fired on blur / Enter (commit)
	onchange?: (ev: Event, options: { value: string }) => void;
}
