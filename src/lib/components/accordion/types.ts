import type { Snippet } from 'svelte';
import type { HtmlAtomProps, Base, SnippetProps } from '$ixirjs/ui/components/atom';
import type { Factory, StateChangeCallback } from '$ixirjs/ui/types';
import type { AccordionBond } from './bond.svelte';

// Accordion Snippet Props
export interface AccordionSnippetProps extends SnippetProps {
	accordion: AccordionBond;
}

export type AccordionChildren = Snippet<[AccordionSnippetProps]>;

// Accordion Root Props
export interface AccordionRootProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B, AccordionChildren> {
	value?: string;
	values?: string[];
	data?: unknown;
	multiple?: boolean;
	collapsible?: boolean;
	disabled?: boolean;
	factory?: Factory<AccordionBond>;
	// Single-mode callback; runs after the selected value commits.
	onvaluechange?: StateChangeCallback<string | undefined, AccordionBond> | undefined;
	// Multiple-mode callback; runs after the selected values commit.
	onvalueschange?: StateChangeCallback<string[], AccordionBond> | undefined;
}
