import type { HtmlAtomProps } from '$lib/helpers';
import type { Snippet } from 'svelte';

export type ButtonProps = HtmlAtomProps<'button'> & {
	type?: 'button' | 'submit' | 'reset';
	children?: Snippet<[]>;
};
