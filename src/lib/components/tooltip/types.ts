import type { Snippet } from 'svelte';
import type { HtmlAtomProps, Base } from '$svelte-atoms/core/components/atom';

/**
 * Extend this interface to add custom tooltip properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TooltipExtendProps {}

export interface TooltipTriggerProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends Omit<HtmlAtomProps<E, B>, 'children'>,
		TooltipExtendProps {
	content?: string | Snippet<[]>;
	placement?: 'top' | 'bottom' | 'left' | 'right';
	delay?: number;
	children?: Snippet<[]>;
}
