import type { HTMLAttributes, HTMLInputTypeAttribute } from 'svelte/elements';
import type { Base, ElementType, HtmlAtomProps } from '../atom';
import type { ClassValue } from '$svelte-atoms/core/utils';
import type { Snippet } from 'svelte';
import type { Override } from '$svelte-atoms/core/types';

export type InputRootProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> = HtmlAtomProps<E, B> &
	HTMLAttributes<ElementType<E>> & {
		value?: string | number | string[] | null;
		checked?: boolean;
		files?: File[] | null;
		children?: Snippet<[]>;
	};

type InputControlBaseProps = {
	value?: any;
	files?: File[];
	date?: Date | null;
	number?: number;
	checked?: boolean;
	class?: string;
	type?: HTMLInputTypeAttribute | null;
	children?: Snippet<[]>;
};

export type InputControlProps<B extends Base = Base> = HtmlAtomProps<'input', B> &
	Override<HTMLAttributes<HTMLInputElement>, InputControlBaseProps>;
