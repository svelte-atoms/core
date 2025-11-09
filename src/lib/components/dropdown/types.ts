import type { Snippet } from 'svelte';
import type { HtmlAtomProps, Base } from '$svelte-atoms/core/components/atom';
import type { Factory, Override } from '$svelte-atoms/core/types';
import type { DropdownBond } from './bond.svelte';
import type { PopoverTriggerProps } from '$svelte-atoms/core/components/popover';

/**
 * Extend this interface to add custom dropdown properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DropdownExtendProps {}

/**
 * Extend this interface to add custom dropdown trigger properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DropdownTriggerExtendProps {}

export interface DropdownRootProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	T = any
> extends Omit<HtmlAtomProps<E, B>, 'children'>,
		DropdownExtendProps {
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
		DropdownTriggerExtendProps {}
