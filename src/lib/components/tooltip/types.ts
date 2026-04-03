import type { Snippet } from 'svelte';
import type { HtmlAtomProps, Base } from '$svelte-atoms/core/components/atom';

export interface TooltipTriggerProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
>
	extends Omit<HtmlAtomProps<E, B>, 'children'> {
	content?: string | Snippet<[]>;
	placement?: 'top' | 'bottom' | 'left' | 'right';
	delay?: number;
	children?: Snippet<[]>;
}
