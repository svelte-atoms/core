import type { Base, HtmlAtomProps, SnippetProps } from '../atom';
import type { Snippet } from 'svelte';
import type { Override } from '$svelte-atoms/core/types';
import type { InputBond } from './bond.svelte';

// ============================================================================
// Input Snippet Props (Extensible)
// ============================================================================

export interface InputSnippetProps extends SnippetProps {
	// The input bond — `Input.Root` renders `children` with `{ input }`.
	input: InputBond;
}

export type InputChildren = Snippet<[InputSnippetProps]>;

export type HourAmPmDigits = `0${number}` | `1${0 | 1 | 2}`;
export type HourDigits = `${0 | 1}${number}` | `2${0 | 1 | 2 | 3}`;
export type MinuteDigits = `${0 | 1 | 2 | 3 | 4 | 5}${number}`;
export type SecondDigits = MinuteDigits;

export type Time = `${HourAmPmDigits}:${MinuteDigits}`;
export type TimeFull = `${HourDigits}:${MinuteDigits}`;

export type InputControlType =
	| 'text'
	| 'number'
	| 'email'
	| 'url'
	| 'tel'
	| 'file'
	| 'time'
	| 'datetime-local'
	| 'date'
	| 'color'
	| 'otp'
	| 'currency'
	| 'location'
	| null;

export interface InputRootProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B, InputChildren> {
	value?: string | number | string[] | null;
	checked?: boolean;
	files?: File[] | null;
}

interface InputControlBaseProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	value?: any;
	files?: File[];
	date?: Date | null;
	number?: number;
	checked?: boolean;
	class?: string;
	type?: InputControlType | null;
	children?: InputChildren;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface InputControlProps<B extends Base = Base> extends Override<
	HtmlAtomProps<'input', B>,
	InputControlBaseProps
> {}

// ── Number Control ────────────────────────────────────────────────────────

export interface InputNumber12HourControlProps {
	hourFormat: 12;
	min?: Time;
	max?: Time;
}

export interface InputNumber24HourControlProps {
	hourFormat: 24;
	min?: TimeFull;
	max?: TimeFull;
}

export interface InputNumberControlProps {
	// Current numeric value
	number?: number;
	// Step increment/decrement amount (default 1)
	step?: number;
	disabled?: boolean;
	placeholder?: string;
	showControls?: boolean;
	// Custom decrement button snippet
	decrement?: Snippet<[{ action: () => void; disabled: boolean }]>;
	// Custom increment button snippet
	increment?: Snippet<[{ action: () => void; disabled: boolean }]>;
	onchange?: (ev?: Event, options?: { number: number }) => void;
}

// ── Time Control ──────────────────────────────────────────────────────────
export interface InputNumberControlProps {
	// HH:MM or HH:MM:SS string (always 24h internally)
	value?: string;
	// Optional Date to sync time with (bindable)
	date?: Date | undefined;
	// Hour display format (default 24)
	hourFormat?: 12 | 24;
	// Show the seconds segment (default false)
	withSeconds?: boolean;
	// Minimum allowed time as HH:MM string (e.g. "08:00")
	min?: string;
	// Maximum allowed time as HH:MM string (e.g. "18:00")
	max?: string;
	disabled?: boolean;
	readonly?: boolean;
	class?: string;
	preset?: string;
	onchange?: (ev: Event, options: { value: string }) => void;
	oninput?: (ev: Event, options: { value: string }) => void;
}

export interface InputDateTimeControlProps {
	// datetime-local string value (YYYY-MM-DDTHH:MM or YYYY-MM-DDTHH:MM:SS)
	value?: string;
	// Parsed Date object (bindable, derived from value)
	date?: Date | null;
	// Render mode: 'datetime' shows date + time segments (default 'datetime')
	mode?: 'datetime';
	// Show the seconds segment (default false)
	withSeconds?: boolean;
	disabled?: boolean;
	readonly?: boolean;
	class?: string;
	preset?: string;
	onchange?: (ev: Event, options: { value: string; date: Date | null }) => void;
	oninput?: (ev: Event, options: { value: string; date: Date | null }) => void;
}

export interface InputDateControlProps {
	// date string value (YYYY-MM-DD)
	value?: string;
	// Parsed Date object (bindable, derived from value)
	date?: Date | null;
	// Always 'date' — use this to select date-only mode
	mode: 'date';
	// Ignored in date mode, kept for API compatibility
	withSeconds?: boolean;
	disabled?: boolean;
	readonly?: boolean;
	class?: string;
	preset?: string;
	onchange?: (ev: Event, options: { value: string; date: Date | null }) => void;
	oninput?: (ev: Event, options: { value: string; date: Date | null }) => void;
}

export interface InputFileControlProps {
	// Selected files (bindable)
	files?: File[];
	// Accepted MIME types / extensions (e.g. "image/*,.pdf")
	accept?: string;
	multiple?: boolean;
	disabled?: boolean;
	placeholder?: string;
	class?: string;
	preset?: string;
	// Custom trigger content snippet
	triggerContent?: Snippet<[{ files: File[]; hasFiles: boolean; open: () => void }]>;
	onchange?: (ev: Event, options: { files: File[] }) => void;
}

export interface InputUrlControlProps {
	// Full URL string
	value?: string;
	placeholder?: string;
	disabled?: boolean;
	readonly?: boolean;
	class?: string;
	preset?: string;
	onchange?: (ev: Event, options: { value: string }) => void;
	oninput?: (ev: Event, options: { value: string }) => void;
}

export interface InputEmailControlProps {
	// Email address string
	value?: string;
	placeholder?: string;
	disabled?: boolean;
	readonly?: boolean;
	class?: string;
	preset?: string;
	onchange?: (ev: Event, options: { value: string }) => void;
	oninput?: (ev: Event, options: { value: string }) => void;
}

export interface InputTextControlProps {
	// Text value
	value?: string;
	// Input type: 'text', 'search', or 'password' (default 'text'). Use Input.PasswordControl for show/hide toggle.
	type?: 'text' | 'search' | 'password';
	placeholder?: string;
	disabled?: boolean;
	readonly?: boolean;
	class?: string;
	preset?: string;
	onchange?: (ev: Event, options: { value: string }) => void;
	oninput?: (ev: Event, options: { value: string }) => void;
}

export interface InputLocationControlProps {
	// Raw coordinate string e.g. "40.7128, -74.0060" (bindable, normalised on input/paste)
	value?: string;
	// Latitude in decimal degrees (bindable, derived from value)
	lat?: number;
	// Longitude in decimal degrees (bindable, derived from value)
	lng?: number;
	// Display format: 'dd' = decimal degrees (default), 'dms' = degrees/minutes/seconds
	format?: 'dd' | 'dms';
	// Decimal places shown in 'dd' mode (default 6)
	precision?: number;
	// Show the crosshair "locate me" button via navigator.geolocation (default true)
	locate?: boolean;
	placeholder?: string;
	disabled?: boolean;
	readonly?: boolean;
	class?: string;
	preset?: string;
	onchange?: (
		ev: Event,
		options: { lat: number | undefined; lng: number | undefined; value: string }
	) => void;
	oninput?: (
		ev: Event,
		options: { lat: number | undefined; lng: number | undefined; value: string }
	) => void;
}

export interface InputPhoneControlProps {
	// Clean digits only (no format chars); full string in free mode
	value?: string;
	// Input mask: `#` = required digit, `[#]` = optional digit, other chars are literals
	format?: string;
	// Segment color map keyed by name with digit counts; must sum to total `#` in format
	segments?: Record<string, number>;
	placeholder?: string;
	disabled?: boolean;
	readonly?: boolean;
	class?: string;
	preset?: string;
	onchange?: (ev: Event, options: { value: string }) => void;
	oninput?: (ev: Event, options: { value: string }) => void;
	// Optional snippet to render each overlay span (text, class, type)
	span?: Snippet<[PhoneSpan]>;
}

export interface InputCurrencyControlProps {
	// Raw decimal string value (bindable), e.g. "1234.50"
	value?: string;
	// Parsed numeric amount (bindable)
	amount?: number | undefined;
	// ISO 4217 currency code (default 'USD')
	currency?: string;
	// BCP 47 locale for formatting (default 'en-US')
	locale?: string;
	// Decimal precision (default 2)
	precision?: number;
	// Minimum allowed amount
	min?: number;
	// Maximum allowed amount
	max?: number;
	// Step size for arrow up/down (defaults to 10^(-precision))
	step?: number;
	placeholder?: string;
	disabled?: boolean;
	readonly?: boolean;
	class?: string;
	preset?: string;
	onchange?: (ev: Event, options: { value: string; amount: number | undefined }) => void;
	oninput?: (ev: Event, options: { value: string; amount: number | undefined }) => void;
}

// ── Color Control — types live in ./color/types.ts ────────────────────────
export type { InputColorControlExtendProps, InputColorControlProps } from './color/types';

export interface InputOtpControlProps {
	// Current OTP value — string of entered characters (bindable)
	value?: string;
	// Number of slots (default 6)
	length?: number;
	// Character type constraint (default 'numeric')
	type?: 'numeric' | 'alpha' | 'alphanumeric';
	// Group slots visually with a separator every N slots (e.g. 3 for "123—456")
	groupSize?: number;
	// Placeholder character shown in empty slots (default '·')
	placeholder?: string;
	disabled?: boolean;
	readonly?: boolean;
	class?: string;
	preset?: string;
	onchange?: (ev: Event, options: { value: string }) => void;
	oninput?: (ev: Event, options: { value: string }) => void;
	// Fired when all slots are filled
	oncomplete?: (value: string) => void;
}
