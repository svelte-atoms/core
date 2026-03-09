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

/**
 * Extend this interface to add custom number control properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface InputNumberControlExtendProps {}

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

export interface InputNumberControlProps extends HtmlAtomProps<'div'>, InputNumberControlExtendProps {
	/**
	 * Current numeric value
	 */
	number?: number;
	/**
	 * Minimum allowed value
	 */
	min?: number;
	/**
	 * Maximum allowed value
	 */
	max?: number;
	/**
	 * Step increment/decrement amount
	 * @default 1
	 */
	step?: number;
	/**
	 * Whether the control is disabled
	 */
	disabled?: boolean;
	/**
	 * Placeholder text for the input
	 */
	placeholder?: string;
	/**
	 * Custom decrement button snippet
	 */
	decrementContent?: Snippet<[{ decrement: () => void; disabled: boolean }]>;
	/**
	 * Custom increment button snippet
	 */
	incrementContent?: Snippet<[{ increment: () => void; disabled: boolean }]>;
	/**
	 * Change handler
	 */
	onchange?: (ev?: Event, options?: { number: number }) => void;
}
