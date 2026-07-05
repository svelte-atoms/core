import type { Snippet } from 'svelte';
import type { HtmlAtomProps, Base, SnippetProps } from '$ixirjs/ui/components/atom';

// ============================================================================
// List Snippet Props (Extensible)
// ============================================================================

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ListSnippetProps extends SnippetProps {}

export type ListChildren = Snippet<[ListSnippetProps]>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ListRootProps<
	E extends keyof HTMLElementTagNameMap = 'ul',
	B extends Base = Base
> extends HtmlAtomProps<E, B, ListChildren> {}
