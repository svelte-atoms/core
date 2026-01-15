import type { Snippet } from 'svelte';
import type { HtmlAtomProps, Base } from '$svelte-atoms/core/components/atom';
import type { Factory } from '$svelte-atoms/core/types';
import type { AccordionBond } from './bond.svelte';

/**
 * Extend this interface to add custom accordion properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AccordionExtendProps {}

export interface AccordionRootProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
>
	extends Omit<HtmlAtomProps<E, B>, 'children'>, AccordionExtendProps {
	value?: string;
	values?: string[];
	data?: unknown;
	multiple?: boolean;
	collapsible?: boolean;
	disabled?: boolean;
	factory?: Factory<AccordionBond>;
	children?: Snippet<[{ accordion: AccordionBond }]>;
}
