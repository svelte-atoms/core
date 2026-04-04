import type { HtmlAtomProps, SnippetProps } from '$svelte-atoms/core/components/atom';
import type { Snippet } from 'svelte';

// ============================================================================
// Badge Snippet Props (Extensible)
// ============================================================================

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BadgeSnippetProps extends SnippetProps {
	// Badge doesn't provide context to children, but can be extended
}

export type BadgeChildren = Snippet<[BadgeSnippetProps]>;

// ============================================================================
// Badge Props
// ============================================================================

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BadgeProps extends HtmlAtomProps<'span', never, BadgeChildren> {
}
