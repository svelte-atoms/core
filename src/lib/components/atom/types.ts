import type { Component, Snippet } from 'svelte';
import { type HtmlElementTagName } from '$svelte-atoms/core/components/element';
import type { HtmlElementProps, ElementType } from '../element/types';

export type ComponentBase = Component;
export type SnippetBase = Snippet;
export type Base<Args = any> =
	Args extends Record<string, any> ? ComponentBase : Args extends unknown[] ? SnippetBase : never;

export type HtmlAtomProps<
	E extends HtmlElementTagName = HtmlElementTagName,
	B extends Base<any> = Base
> = HtmlElementProps<E> & {
	base?: B;
};

export type { ElementType };
