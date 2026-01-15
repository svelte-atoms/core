import type { Snippet } from 'svelte';
import type { HtmlAtomProps } from '../atom';

/**
 * Extend this interface to add custom container properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ContainerExtendProps {}

export interface ContainerProps
	extends Omit<HtmlAtomProps<'button'>, 'children'>, ContainerExtendProps {
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
