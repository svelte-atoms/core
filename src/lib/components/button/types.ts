import type { HtmlAtomProps } from '$svelte-atoms/core/components/atom/types';
import type { Snippet } from 'svelte';

export interface ButtonProps extends HtmlAtomProps<'button'> {
	type?: 'button' | 'submit' | 'reset';
	children?: Snippet<[]>;
}
