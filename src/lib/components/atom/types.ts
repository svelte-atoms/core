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

/**
 * Extend this interface to add custom HTML atom properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface HtmlAtomExtendProps {}

export interface HtmlAtomProps<
	E extends HtmlElementTagName = HtmlElementTagName,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	B extends Base<any> = Base
> extends HtmlElementProps<E>,
		HtmlAtomExtendProps {
	bond?: Bond;
	base?: B;
	preset?: PresetModuleName | (string & {});
	/**
	 * Variant definition or function to resolve variants
	 * - VariantDefinition: Static variant config with base, variants, compoundVariants, defaultVariants
	 * - Function: Dynamic function that receives bond and props, returns props (legacy)
	 */
	variants?: // eslint-disable-next-line @typescript-eslint/no-explicit-any
	| VariantDefinition<any>
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		| ((bond: Bond, variantProps: Record<string, any>) => Record<string, any>);
}

export type { ElementType };
