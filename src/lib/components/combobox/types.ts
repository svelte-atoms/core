import type { Snippet } from 'svelte';
import type { HtmlAtomProps, Base, SnippetProps } from '$ixirjs/ui/components/atom';
import type { Factory, StateChangeCallback } from '$ixirjs/ui/types';
import type { ComboboxBond } from './bond.svelte';
import type {
	SelectSelectionProps as DropdownSelectionProps,
	SelectSelectionsProps as DropdownSelectionsProps
} from '../select';
import type { InputControlProps } from '../input';

// Snippet props (extensible)

export interface ComboboxSnippetProps extends SnippetProps {
	combobox: ComboboxBond;
}

export type ComboboxChildren = Snippet<[ComboboxSnippetProps]>;

export interface ComboboxRootProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B, ComboboxChildren> {
	open?: boolean;
	value?: unknown;
	values?: unknown[];
	label?: string;
	labels?: string[];
	multiple?: boolean;
	disabled?: boolean;
	placements?: string[];
	placement?: string;
	offset?: number;
	// Two-way-bindable search/filter text (bind:query). Read by filterSelectData; cleared by Escape (ClearThenClose).
	query?: string;
	factory?: Factory<ComboboxBond>;
	onopenchange?: StateChangeCallback<boolean, ComboboxBond>;
	onvaluechange?: StateChangeCallback<unknown, ComboboxBond>;
	onvalueschange?: StateChangeCallback<unknown[], ComboboxBond>;
	onquerychange?: StateChangeCallback<string, ComboboxBond>;
}

export interface ComboboxItemProps<
	T = unknown,
	E extends keyof HTMLElementTagNameMap = 'li',
	B extends Base = Base
> extends HtmlAtomProps<E, B, ComboboxChildren> {
	value?: string;
	data?: T;
	disabled?: boolean;
	children?: ComboboxChildren;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ComboboxTriggerProps<
	E extends keyof HTMLElementTagNameMap = 'button',
	B extends Base = Base
> extends HtmlAtomProps<E, B, ComboboxChildren> {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ComboboxSelectionsProps extends DropdownSelectionsProps {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ComboboxSelectionProps extends DropdownSelectionProps {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ComboboxControlProps extends InputControlProps {}

export interface ComboboxSelection {
	id: string;
	label: string;
	createdAt: Date;
	unselect: () => void;
}
