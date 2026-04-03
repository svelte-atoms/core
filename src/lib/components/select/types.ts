import type { Component, Snippet } from 'svelte';
import type { HtmlAtomProps, Base } from '$svelte-atoms/core/components/atom';
import type { Factory, Override } from '$svelte-atoms/core/types';
import type { SelectBond } from './bond.svelte';
import type { PopoverTriggerProps } from '$svelte-atoms/core/components/popover';
import type { ClassValue } from 'svelte/elements';
import type { SelectItemController } from './item';

export interface SelectRootProps<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	T = any
> {
	open?: boolean;
	value?: T;
	values?: T[];
	label?: string;
	labels?: string[];
	multiple?: boolean;
	disabled?: boolean;
	placements?: string[];
	placement?: string;
	offset?: number;
	keys?: string[];
	factory?: Factory<SelectBond>;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	children?: Snippet<[{ select: SelectBond<any>; /** @deprecated Use `select` */ dropdown: SelectBond<any> }]>;
	onquerychange?: (query: string) => void;
}

export interface SelectTriggerProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
>
	extends Override<PopoverTriggerProps<E, B>, { children?: Snippet<[{ select?: SelectBond; /** @deprecated Use `select` */ dropdown?: SelectBond }]> }> {}

export interface SelectSelectionsProps {
	class?: ClassValue;
	Selection?: Component | undefined;
	children?: Snippet<
		[
			{
				selections: SelectSelection[];
				selection?: SelectSelection | undefined;
			}
		]
	>;
	getSelections?: <T extends SelectBond>(bond: T) => SelectSelection[];
}

export interface SelectSelectionProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
> extends HtmlAtomProps<E, B> {
	selection: SelectSelection;
	children?: Snippet;
	onclose?: (event: Event) => void;
}

export interface SelectQueryProps extends HtmlAtomProps<'input'> {
	value?: string;
	children?: Snippet;
}

export interface SelectSelection {
	readonly id: string;
	readonly value?: string;
	readonly label: string;
	readonly createdAt: Date;
	unselect: () => void;
	controller?: SelectItemController<unknown>;
}
