import type { Snippet } from 'svelte';
import type { HtmlAtomProps, Base, SnippetProps } from '$ixirjs/ui/components/atom';
import type { Factory } from '$ixirjs/ui/types';
import type { LayerBond } from './bond.svelte';

// ============================================================================
// Layer Snippet Props (Extensible)
// ============================================================================

export interface LayerSnippetProps extends SnippetProps {
	layer: LayerBond;
}

export type LayerChildren = Snippet<[LayerSnippetProps]>;

export interface LayerRootProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B, LayerChildren> {
	factory?: Factory<LayerBond>;
}
