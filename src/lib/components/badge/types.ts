import type { HtmlAtomProps } from '$svelte-atoms/core/components/atom';
import type { Snippet } from 'svelte';

export type BadgeProps = HtmlAtomProps<'span'> & {
	children?: Snippet<[]>;
};
