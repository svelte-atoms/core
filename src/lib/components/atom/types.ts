import type { Component, Snippet } from 'svelte';
import { type HtmlElementTagName } from '$svelte-atoms/core/components/element';
import type { HtmlElementProps, ElementType } from '../element/types';
import type { PresetModuleName } from '$svelte-atoms/core/context/preset.svelte';
import type { Bond } from '$svelte-atoms/core/shared';
import type { VariantDefinition } from '$svelte-atoms/core/utils';

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
	/**
	 * Variant definition or function to resolve variants
	 * - VariantDefinition: Static variant config with base, variants, compoundVariants, defaultVariants
	 * - Function: Dynamic function that receives bond and props, returns props (legacy)
	 */
	variants?:
		| VariantDefinition<any>
		| ((bond: Bond, variantProps: Record<string, any>) => Record<string, any>);
};

export type { ElementType };
