import type { Snippet } from 'svelte';
import type { HtmlAtomProps, Base } from '$svelte-atoms/core/components/atom';
import type { Factory } from '$svelte-atoms/core/types';
import type { AccordionBond } from './bond.svelte';

export interface AccordionRootProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
>
	extends Omit<HtmlAtomProps<E, B>, 'children'> {
	value?: string;
	values?: string[];
	data?: unknown;
	multiple?: boolean;
	collapsible?: boolean;
	disabled?: boolean;
	factory?: Factory<AccordionBond>;
	children?: Snippet<[{ accordion: AccordionBond }]>;
}
