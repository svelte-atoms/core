import type { HtmlAtomProps, Base } from '$svelte-atoms/core/components/atom';
import type { Factory } from '$svelte-atoms/core/types';
import type { AccordionItemBond } from './bond.svelte';

/**
 * Extend this interface to add custom accordion item root properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AccordionItemRootExtendProps {}

/**
 * Extend this interface to add custom accordion item header properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AccordionItemHeaderExtendProps {}

/**
 * Extend this interface to add custom accordion item body properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AccordionItemBodyExtendProps {}

/**
 * Extend this interface to add custom accordion item indicator properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AccordionItemIndicatorExtendProps {}

export interface AccordionItemRootProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
>
	extends HtmlAtomProps<E, B>, AccordionItemRootExtendProps {
	value?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data?: any;
	disabled?: boolean;
	factory?: Factory<AccordionItemBond>;
}

export interface AccordionItemHeaderProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
>
	extends HtmlAtomProps<E, B>, AccordionItemHeaderExtendProps {}

export interface AccordionItemBodyProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
>
	extends HtmlAtomProps<E, B>, AccordionItemBodyExtendProps {}

export interface AccordionItemIndicatorProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
>
	extends HtmlAtomProps<E, B>, AccordionItemIndicatorExtendProps {}
