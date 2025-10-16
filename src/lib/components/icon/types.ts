import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

export type IconProps = HTMLAttributes<HTMLDivElement> & {
	class?: string;
	element?: HTMLElement;
	children?: Snippet<[]>;
};
