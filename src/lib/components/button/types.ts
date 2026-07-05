import type { HtmlAtomProps } from '$ixirjs/ui/components/atom/types';

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
	type?: 'button' | 'submit' | 'reset';
}
