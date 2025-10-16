import type { HtmlAtomProps } from '$lib/helpers';
import type { Snippet } from 'svelte';

export type ContainerProps = HtmlAtomProps<'button'> & {
	type?: 'inline-size' | 'size';
	name?: string;
	clientWidth?: number;
	clientHeight?: number;
	children?: Snippet<
		[
			{
				clientWidth: number;
				clientHeight: number;
			}
		]
	>;
};
