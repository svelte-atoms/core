import type { Snippet } from 'svelte';
import type { HtmlAtomProps } from '../atom';

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
