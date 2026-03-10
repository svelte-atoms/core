import type { HTMLInputTypeAttribute } from 'svelte/elements';
import type { Base, HtmlAtomProps } from '../atom';
import type { Snippet } from 'svelte';
import type { Override } from '$svelte-atoms/core/types';

export type HourAmPmDigits = `0${number}` | `1${0 | 1 | 2}`;
export type HourDigits = `${0 | 1}${number}` | `2${0 | 1 | 2 | 3}`;
export type MinuteDigits = `${0 | 1 | 2 | 3 | 4 | 5}${number}`;
export type SecondDigits = MinuteDigits;

export type Time = `${HourAmPmDigits}:${MinuteDigits}`;
export type TimeFull = `${HourDigits}:${MinuteDigits}`;
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
	type?: HTMLInputTypeAttribute | null;
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

// ── Phone Control ─────────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface InputPhoneControlExtendProps {}

export interface InputPhoneControlProps extends InputPhoneControlExtendProps {
	/** Full phone number string, including country code (e.g. "+1 (555) 123-4567") */
	value?: string;
	/**
	 * Optional display format template — use `#` as digit placeholder.
	 * e.g. "(###) ###-####" or "+## ## #### ####"
	 * When omitted, segments are auto-detected from the input structure.
	 */
	format?: string;
	placeholder?: string;
	disabled?: boolean;
	readonly?: boolean;
	class?: string;
	preset?: string;
	onchange?: (ev: Event, options: { value: string }) => void;
	oninput?: (ev: Event, options: { value: string }) => void;
}
