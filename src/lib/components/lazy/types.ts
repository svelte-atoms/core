import type { Component, Snippet } from 'svelte';
import type { HtmlAtomProps } from '../atom';

export interface LazyProps extends HtmlAtomProps<'button'> {
	promise: Promise<Component>;
	children?: Snippet;
	error?: Snippet<[error: unknown]>;
	loading?: Snippet;
}
