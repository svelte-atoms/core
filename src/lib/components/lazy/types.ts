import type { Component, Snippet } from 'svelte';
import type { HtmlAtomProps } from '../atom';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface LazyExtendProps {}

export interface LazyProps extends HtmlAtomProps<'button'>, LazyExtendProps {
	promise: Promise<Component>;
	children?: Snippet;
	error?: Snippet;
	loading?: Snippet;
}
