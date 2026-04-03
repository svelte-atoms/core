import type { Snippet } from 'svelte';
import type { HtmlAtomProps } from '../atom';

export interface ContainerProps
	extends Omit<HtmlAtomProps<'button'>, 'children'> {
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
}
