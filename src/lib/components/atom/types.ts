import type { Component, Snippet } from 'svelte';
import { type HtmlElementTagName } from '$svelte-atoms/core/components/element';
import type { HtmlElementProps, ElementType } from '../element/types';
import type { PresetModuleName } from '$svelte-atoms/core/context/preset.svelte';
import type { Bond } from '$svelte-atoms/core/shared';

export type ComponentBase = Component;
export type SnippetBase = Snippet;
export type Base<Args = any> =
	Args extends Record<string, any> ? ComponentBase : Args extends unknown[] ? SnippetBase : never;

export type HtmlAtomProps<
	E extends HtmlElementTagName = HtmlElementTagName,
	B extends Base<any> = Base
> = HtmlElementProps<E> & {
	bond?: Bond;
	base?: B;
	preset?: PresetModuleName | (string & {});
};

export type { ElementType };
