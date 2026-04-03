import type { Component, Snippet } from 'svelte';
import { type HtmlElementTagName } from '$svelte-atoms/core/components/element';
import type { HtmlElementProps, ElementType } from '../element/types';
import type { PresetModuleName } from '$svelte-atoms/core/context/preset.svelte';
import type { Bond } from '$svelte-atoms/core/shared';
import type { VariantDefinition } from '$svelte-atoms/core/utils';

export type ComponentBase = Component;
export type SnippetBase = Snippet;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Base<Args = any> =
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	Args extends Record<string, any> ? ComponentBase : Args extends unknown[] ? SnippetBase : never;

type Variants =
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	| VariantDefinition<any>
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	| ((bond: Bond, variantProps: Record<string, any>) => Record<string, any>);

export interface HtmlAtomProps<
	E extends HtmlElementTagName = HtmlElementTagName,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	B extends Base<any> = Base
>
	extends HtmlElementProps<E> {
	bond?: Bond;
	base?: B | undefined;
	preset?: PresetModuleName | (string & {});
	/**
	 * Variant definition or function to resolve variants
	 * - VariantDefinition: Static variant config with base, variants, compoundVariants, defaultVariants
	 * - Function: Dynamic function that receives bond and props, returns props (legacy)
	 */
	variants?: Variants;
}

export type { ElementType };
