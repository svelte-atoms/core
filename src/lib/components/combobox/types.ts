import type { Snippet } from 'svelte';
import type { HtmlAtomProps, Base } from '$svelte-atoms/core/components/atom';
import type { Factory } from '$svelte-atoms/core/types';
import type { ComboboxBond } from './bond.svelte';
import type { DropdownSelectionProps, DropdownSelectionsProps } from '../dropdown';
import type { InputControlProps } from '../input';

/**
 * Extend this interface to add custom combobox properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ComboboxExtendProps { }

export interface ComboboxRootProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B>,
	ComboboxExtendProps {
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
	factory?: Factory<ComboboxBond>;
	children?: Snippet<[{ combobox: ComboboxBond }]>;
}


// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ComboboxSelectionsProps extends DropdownSelectionsProps {
	// 
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ComboboxSelectionProps extends DropdownSelectionProps {
	// 
}


// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ComboboxControlProps extends InputControlProps {
	// 
};


export interface ComboboxSelection {
	id: string;
	label: string;
	createdAt: Date;
	unselect: () => void;
}