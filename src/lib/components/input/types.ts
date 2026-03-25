import type { Base, HtmlAtomProps } from '../atom';
import type { Snippet } from 'svelte';
import type { Override } from '$svelte-atoms/core/types';

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
/**
 * Extend this interface to add custom input root properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface InputRootExtendProps {}

/**
 * Extend this interface to add custom input control properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface InputControlExtendProps {}

export interface InputRootProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
>
	extends HtmlAtomProps<E, B>, InputRootExtendProps {
	value?: string | number | string[] | null;
	checked?: boolean;
	files?: File[] | null;
	children?: Snippet<[]>;
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
	children?: Snippet<[]>;
}

export interface InputControlProps<B extends Base = Base>
	extends Override<HtmlAtomProps<'input', B>, InputControlBaseProps>, InputControlExtendProps {}

// ── Number Control ────────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface InputNumberControlExtendProps {}

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

export interface InputNumberControlProps extends InputNumberControlExtendProps {
	/** Current numeric value */
	number?: number;
	/**
	 * Step increment/decrement amount
	 * @default 1
	 */
	step?: number;
	disabled?: boolean;
	placeholder?: string;
	showControls?: boolean;
	/** Custom decrement button snippet */
	decrementContent?: Snippet<[{ decrement: () => void; disabled: boolean }]>;
	/** Custom increment button snippet */
	incrementContent?: Snippet<[{ increment: () => void; disabled: boolean }]>;
	onchange?: (ev?: Event, options?: { number: number }) => void;
}

// ── Time Control ──────────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface InputTimeControlExtendProps {}

export interface InputTimeControlProps extends InputTimeControlExtendProps {
	/** HH:MM or HH:MM:SS string (always 24h format internally) */
	value?: string;
	/** Optional Date object to sync time with (bindable) */
	date?: Date | undefined;
	/**
	 * Hour display format
	 * @default 24
	 */
	hourFormat?: 12 | 24;
	/** Show the seconds segment
	 * @default false
	 */
	withSeconds?: boolean;
	/** Minimum allowed time as HH:MM string (e.g. "08:00") */
	min?: string;
	/** Maximum allowed time as HH:MM string (e.g. "18:00") */
	max?: string;
	disabled?: boolean;
	readonly?: boolean;
	class?: string;
	preset?: string;
	onchange?: (ev: Event, options: { value: string }) => void;
	oninput?: (ev: Event, options: { value: string }) => void;
}

// ── DateTime Control ──────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface InputDateTimeControlExtendProps {}

export interface InputDateTimeControlProps extends InputDateTimeControlExtendProps {
	/** datetime-local string value (YYYY-MM-DDTHH:MM or YYYY-MM-DDTHH:MM:SS) */
	value?: string;
	/** Parsed Date object (bindable, derived from value) */
	date?: Date | null;
	/** Render mode: 'datetime' shows date + time segments, 'date' shows date segments only
	 * @default 'datetime'
	 */
	mode?: 'datetime';
	/** Show the seconds segment
	 * @default false
	 */
	withSeconds?: boolean;
	disabled?: boolean;
	readonly?: boolean;
	class?: string;
	preset?: string;
	onchange?: (ev: Event, options: { value: string; date: Date | null }) => void;
	oninput?: (ev: Event, options: { value: string; date: Date | null }) => void;
}

// ── Date Control ──────────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface InputDateControlExtendProps {}

export interface InputDateControlProps extends InputDateControlExtendProps {
	/** date string value (YYYY-MM-DD) */
	value?: string;
	/** Parsed Date object (bindable, derived from value) */
	date?: Date | null;
	/** Always 'date' — set this to use date-only mode */
	mode: 'date';
	/** Ignored in date mode, kept for API compatibility */
	withSeconds?: boolean;
	disabled?: boolean;
	readonly?: boolean;
	class?: string;
	preset?: string;
	onchange?: (ev: Event, options: { value: string; date: Date | null }) => void;
	oninput?: (ev: Event, options: { value: string; date: Date | null }) => void;
}

// ── File Control ──────────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface InputFileControlExtendProps {}

export interface InputFileControlProps extends InputFileControlExtendProps {
	/** Selected files (bindable) */
	files?: File[];
	/** Accepted MIME types / extensions (e.g. "image/*,.pdf") */
	accept?: string;
	multiple?: boolean;
	disabled?: boolean;
	placeholder?: string;
	class?: string;
	preset?: string;
	/** Custom trigger content snippet */
	triggerContent?: Snippet<[{ files: File[]; hasFiles: boolean; open: () => void }]>;
	onchange?: (ev: Event, options: { files: File[] }) => void;
}

// ── URL Control ───────────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface InputUrlControlExtendProps {}

export interface InputUrlControlProps extends InputUrlControlExtendProps {
	/** Full URL string */
	value?: string;
	placeholder?: string;
	disabled?: boolean;
	readonly?: boolean;
	class?: string;
	preset?: string;
	onchange?: (ev: Event, options: { value: string }) => void;
	oninput?: (ev: Event, options: { value: string }) => void;
}

// ── Email Control ─────────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface InputEmailControlExtendProps {}

export interface InputEmailControlProps extends InputEmailControlExtendProps {
	/** Email address string */
	value?: string;
	placeholder?: string;
	disabled?: boolean;
	readonly?: boolean;
	class?: string;
	preset?: string;
	onchange?: (ev: Event, options: { value: string }) => void;
	oninput?: (ev: Event, options: { value: string }) => void;
}

// ── Text Control ──────────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface InputTextControlExtendProps {}

export interface InputTextControlProps extends InputTextControlExtendProps {
	/** Text value */
	value?: string;
	placeholder?: string;
	disabled?: boolean;
	readonly?: boolean;
	class?: string;
	preset?: string;
	onchange?: (ev: Event, options: { value: string }) => void;
	oninput?: (ev: Event, options: { value: string }) => void;
}

// ── Location Control ──────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface InputLocationControlExtendProps {}

export interface InputLocationControlProps extends InputLocationControlExtendProps {
	/**
	 * Raw string representation of the coordinate pair (e.g. "40.7128, -74.0060").
	 * Bindable — the component normalises pasted / typed input into this form.
	 */
	value?: string;
	/** Latitude in decimal degrees (bindable, derived from value) */
	lat?: number;
	/** Longitude in decimal degrees (bindable, derived from value) */
	lng?: number;
	/**
	 * Display / overlay format.
	 * - `"dd"`  — decimal degrees (default): `40.712800°, -74.006000°`
	 * - `"dms"` — degrees, minutes, seconds: `40°42'46.08"N, 74°00'21.60"W`
	 */
	format?: 'dd' | 'dms';
	/**
	 * Number of decimal places shown in `"dd"` mode.
	 * @default 6
	 */
	precision?: number;
	/**
	 * Show the crosshair "locate me" button (uses `navigator.geolocation`).
	 * @default true
	 */
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

// ── Phone Control ─────────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface InputPhoneControlExtendProps {}

export type PhoneSpanType = 'country' | 'area' | 'prefix' | 'line' | 'other' | 'lit' | 'empty';
export type PhoneSpan = { text: string; class: string; style?: string; type: PhoneSpanType };

export interface InputPhoneControlProps extends InputPhoneControlExtendProps {
	/** Clean digits only (no format chars). In free mode: full string. */
	value?: string;
	/**
	 * Input mask — `#` = required digit, `[#]` = optional digit, all other chars are literals.
	 *
	 * Optional digits and the literals between them are hidden when empty,
	 * shown as normal once filled. Digits fill left-to-right across all slots.
	 *
	 * Examples:
	 *   "(###) ###-####"               → fixed US format
	 *   "(+[#][#][#]) ### ###-####"    → 1–3 digit country code, rest fixed
	 *   "+[#][#][#] (###) ###-####"    → international with optional country digits
	 */
	format?: string;
	/**
	 * Optional segment color map — defines how digit slots are grouped and colored.
	 * Keys are segment names, values are digit counts.
	 * Must sum to the total number of `#` in format.
	 * Example: { country: 1, area: 3, prefix: 3, line: 4 }
	 * Available segment names: country (blue), area (bold), prefix, line, other
	 */
	segments?: Record<string, number>;
	placeholder?: string;
	disabled?: boolean;
	readonly?: boolean;
	class?: string;
	preset?: string;
	onchange?: (ev: Event, options: { value: string }) => void;
	oninput?: (ev: Event, options: { value: string }) => void;
	/**
	 * Optional snippet to render each overlay span.
	 * - `text`: the characters in this span
	 * - `class`: default Tailwind class (can be ignored)
	 * - `type`: segment type — `'country' | 'area' | 'prefix' | 'line' | 'other' | 'lit' | 'empty'`
	 * @example
	 * ```svelte
	 * {#snippet span({ text, class, type })}
	 *   <span class={type === 'country' ? 'text-green-500' : class}>{text}</span>
	 * {/snippet}
	 * ```
	 */
	span?: Snippet<[PhoneSpan]>;
}

// ── Currency Control ──────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface InputCurrencyControlExtendProps {}

export interface InputCurrencyControlProps extends InputCurrencyControlExtendProps {
	/** Raw decimal string value (bindable) e.g. "1234.50" */
	value?: string;
	/** Parsed number amount (bindable) */
	amount?: number | undefined;
	/** ISO 4217 currency code
	 * @default 'USD'
	 */
	currency?: string;
	/** BCP 47 locale for formatting
	 * @default 'en-US'
	 */
	locale?: string;
	/** Decimal precision
	 * @default 2
	 */
	precision?: number;
	/** Minimum allowed amount */
	min?: number;
	/** Maximum allowed amount */
	max?: number;
	/** Step size for arrow up/down. Defaults to 10^(-precision) */
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

// ── OTP Control ───────────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface InputOtpControlExtendProps {}

export interface InputOtpControlProps extends InputOtpControlExtendProps {
	/** Current OTP value — a string of entered characters (bindable) */
	value?: string;
	/** Number of slots
	 * @default 6
	 */
	length?: number;
	/** Character type constraint
	 * @default 'numeric'
	 */
	type?: 'numeric' | 'alpha' | 'alphanumeric';
	/** Group slots visually with a separator every N slots (e.g. 3 for "123—456") */
	groupSize?: number;
	/** Placeholder character shown in empty slots
	 * @default '·'
	 */
	placeholder?: string;
	disabled?: boolean;
	readonly?: boolean;
	class?: string;
	preset?: string;
	onchange?: (ev: Event, options: { value: string }) => void;
	oninput?: (ev: Event, options: { value: string }) => void;
	/** Fired when all slots are filled */
	oncomplete?: (value: string) => void;
}
