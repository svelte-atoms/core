import type { HtmlAtomProps, SnippetProps } from '$svelte-atoms/core/components/atom/types';
import type { ElementChildren } from '$svelte-atoms/core/components/element/types';
import type { Snippet } from 'svelte';

// ============================================================================
// Button Snippet Props (Extensible - override if needed)
// ============================================================================

export interface ButtonSnippetProps extends SnippetProps {
	/** Button is in loading state */
	loading?: boolean;

	/** Button is disabled */
	disabled?: boolean;

	/** Button type (button, submit, reset) */
	type?: 'button' | 'submit' | 'reset';
}

// ============================================================================
// Button Component Props (Extensible)
// ============================================================================

/**
 * Button component props with extensible snippet type
 *
 * Override snippet children in custom implementations:
 * ```ts
 * interface CustomButtonProps extends ButtonProps {
 *   children?: Snippet<[CustomButtonSnippetProps]>;
 * }
 * ```
 */
export interface ButtonProps extends HtmlAtomProps<'button'> {
	/** Button type (button, submit, reset) */
	type?: 'button' | 'submit' | 'reset';

	/** Disable the button */
	disabled?: boolean;

	/** Loading state indicator */
	loading?: boolean;

	/** Render button content with context props */
	children?: Snippet<[ButtonSnippetProps]>;
}
