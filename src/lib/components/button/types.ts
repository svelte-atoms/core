import type { HtmlAtomProps } from '$svelte-atoms/core/components/atom/types';
import type { Snippet } from 'svelte';

export type ButtonProps = HtmlAtomProps<'button'> & {
	type?: 'button' | 'submit' | 'reset';
	children?: Snippet<[]>;
};
