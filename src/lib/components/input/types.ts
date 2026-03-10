import type { HTMLInputTypeAttribute } from 'svelte/elements';
import type { Base, HtmlAtomProps } from '../atom';
import type { Snippet } from 'svelte';
import type { Override } from '$svelte-atoms/core/types';

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

export interface InputNumberControlProps extends HtmlAtomProps<'div'>, InputNumberControlExtendProps {
	/** Current numeric value */
	number?: number;
	/** Minimum allowed value */
	min?: number;
	/** Maximum allowed value */
	max?: number;
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
	/** HH:MM or HH:MM:SS string */
	value?: string;
	min?: string;
	max?: string;
	/** Step in seconds */
	step?: number;
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
	/** datetime-local string value (YYYY-MM-DDTHH:MM) */
	value?: string;
	/** Parsed Date object (bindable, derived from value) */
	date?: Date | null;
	min?: string;
	max?: string;
	step?: number;
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
	/** Full URL including scheme */
	value?: string;
	/** Prefix displayed before the input (default: 'https://') */
	scheme?: string;
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
	/** Full phone number including country code (e.g. "+1 555-0100") */
	value?: string;
	/** Country code prefix displayed before the input (default: '+1') */
	countryCode?: string;
	placeholder?: string;
	disabled?: boolean;
	readonly?: boolean;
	class?: string;
	preset?: string;
	onchange?: (ev: Event, options: { value: string }) => void;
	oninput?: (ev: Event, options: { value: string }) => void;
}
