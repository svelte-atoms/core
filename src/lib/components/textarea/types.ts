import type { HtmlAtomProps, Base } from '$svelte-atoms/core/components/atom';

/**
 * Extend this interface to add custom textarea root properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TextareaRootExtendProps {}

/**
 * Extend this interface to add custom textarea input properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TextareaInputExtendProps {}

export interface TextareaRootProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B>,
		TextareaRootExtendProps {}

export interface TextareaInputProps extends TextareaInputExtendProps {
	value?: string;
	placeholder?: string;
	disabled?: boolean;
	readonly?: boolean;
	rows?: number;
	cols?: number;
	maxlength?: number;
	minlength?: number;
	required?: boolean;
	autofocus?: boolean;
	autocomplete?: string;
	spellcheck?: boolean;
	wrap?: 'soft' | 'hard' | 'off';
}
