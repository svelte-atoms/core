import type { Component, Snippet } from 'svelte';
import type { HtmlAtomProps, Base } from '$svelte-atoms/core/components/atom';
import type { Factory, Override } from '$svelte-atoms/core/types';
import type { DropdownBond } from './bond.svelte';
import type { PopoverTriggerProps } from '$svelte-atoms/core/components/popover';
import type { ClassValue } from 'svelte/elements';
import type { DropdownItemController } from './item';

/**
 * Extend this interface to add custom dropdown properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DropdownExtendProps { }

/**
 * Extend this interface to add custom dropdown trigger properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DropdownTriggerExtendProps { }

export interface DropdownRootProps<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	T = any
> extends DropdownExtendProps {
	open?: boolean;
	value?: T;
	values?: T[];
	multiple?: boolean;
	disabled?: boolean;
	placements?: string[];
	placement?: string;
	offset?: number;
	keys?: string[];
	factory?: Factory<DropdownBond>;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	children?: Snippet<[{ dropdown: DropdownBond<any> }]>;
	onquerychange?: (query: string) => void;
}

export interface DropdownTriggerProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends Override<
	PopoverTriggerProps<E, B>,
	{ children?: Snippet<[{ dropdown?: DropdownBond }]> }
>,
	DropdownTriggerExtendProps { }


export interface DropdownSelectionsProps {
	class?: ClassValue;
	Selection?: Component | undefined;
	children?: Snippet<[{
		items: DropdownItemController<unknown>[];
		item?: DropdownItemController<unknown> | undefined;
	}]>;
}

export interface DropdownSelectionProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	T = any
> extends HtmlAtomProps<E, B> {
	item: DropdownItemController<T>;
	children?: Snippet;
	onclose?: (event: Event) => void;
}

export interface DropdownQueryProps extends HtmlAtomProps<'input'> {
	children?: Snippet;
}