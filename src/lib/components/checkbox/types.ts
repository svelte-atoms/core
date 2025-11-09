import { type Component, type Snippet } from 'svelte';
import { type HtmlAtomProps } from '$svelte-atoms/core/components/atom';

/**
 * Extend this interface to add custom checkbox properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CheckboxExtendProps {}

export interface CheckboxProps extends HtmlAtomProps<'button'>, CheckboxExtendProps {
	value?: string;
	group?: string[];
	checked?: boolean;
	indeterminate?: boolean;
	checkedContent?: Component | Snippet;
	indeterminateContent?: Component | Snippet;
	children?: Snippet<[]>;
	onclick?: (ev?: Event) => void;
	onchange?: (ev?: Event, options?: { checked: boolean }) => void;
}
