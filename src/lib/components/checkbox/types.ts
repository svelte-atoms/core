import { type Component, type Snippet } from 'svelte';
import { type HtmlAtomProps, type SnippetProps } from '$svelte-atoms/core/components/atom';

// ============================================================================
// Checkbox Snippet Props (Extensible)
// ============================================================================

export interface CheckboxSnippetProps extends SnippetProps {
	checked?: boolean;
	indeterminate?: boolean;
}

export type CheckboxChildren = Snippet<[CheckboxSnippetProps]>;

// ============================================================================
// Checkbox Props
// ============================================================================

export interface CheckboxProps extends HtmlAtomProps<'button', never, CheckboxChildren> {
	value?: string;
	group?: string[];
	checked?: boolean;
	indeterminate?: boolean;
	checkedContent?: Component | Snippet;
	indeterminateContent?: Component | Snippet;
	onclick?: (ev?: Event) => void;
	onchange?: (ev?: Event, options?: { checked: boolean }) => void;
}
