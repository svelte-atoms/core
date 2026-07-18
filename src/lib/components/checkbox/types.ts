import { type Component, type Snippet } from 'svelte';
import { type HtmlAtomProps, type SnippetProps } from '$ixirjs/ui/components/atom';
import type { StateChangeCallback } from '$ixirjs/ui/types';

export interface CheckboxSnippetProps extends SnippetProps {
	checked?: boolean;
	indeterminate?: boolean;
}

export type CheckboxChildren = Snippet<[CheckboxSnippetProps]>;

export interface CheckboxProps extends HtmlAtomProps<'button', never, CheckboxChildren> {
	value?: string;
	group?: string[];
	checked?: boolean;
	indeterminate?: boolean;
	disabled?: boolean;
	id?: string;
	name?: string;
	checkedContent?: Component | Snippet;
	indeterminateContent?: Component | Snippet;
	// Semantic state callback; runs after `checked` commits.
	oncheckedchange?: StateChangeCallback<boolean>;
	// Native DOM callbacks retain their event-only signatures.
	onclick?: (event: MouseEvent) => void;
	onchange?: (event: Event) => void;
	oninput?: (event: Event) => void;
	onblur?: (event: FocusEvent) => void;
	onfocus?: (event: FocusEvent) => void;
}
