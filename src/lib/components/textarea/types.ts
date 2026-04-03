import type { HtmlAtomProps, Base } from '$svelte-atoms/core/components/atom';

export interface TextareaRootProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
>
	extends HtmlAtomProps<E, B> {}

export interface TextareaInputProps {
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
