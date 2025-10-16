import { type Component, type Snippet } from 'svelte';
import { type HtmlAtomProps } from '$svelte-atoms/core/components/atom';

export type CheckboxProps = HtmlAtomProps<'button'> & {
	value?: string;
	group?: string[];
	checked?: boolean;
	indeterminate?: boolean;
	checkedContent?: Component | Snippet;
	indeterminateContent?: Component | Snippet;
	children?: Snippet<[]>;
	onclick?: (ev?: Event) => void;
	onchange?: (ev?: Event, options?: { checked: boolean }) => void;
};
