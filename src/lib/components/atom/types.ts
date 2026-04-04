import type { Component, Snippet } from 'svelte';
import type { HtmlElementTagName } from '$svelte-atoms/core/components/element';
import type { HtmlElementProps, ElementType } from '../element/types';
import type { PresetModuleName } from '$svelte-atoms/core/context/preset.svelte';
import type { Bond } from '$svelte-atoms/core/shared';
import type { VariantDefinition } from '$svelte-atoms/core/utils';

// ============================================================================
// Base Component/Snippet Types (Extensible)
// ============================================================================

/** Base type for component-based implementations */
export type ComponentBase = Component;

/** Base type for snippet-based implementations */
export type SnippetBase = Snippet;

/**
 * Generic base type that can be either a Component or Snippet
 * - Allows components to work with both rendering patterns
 * - Provides type safety for generic component props
 */
export type Base<Args extends unknown[] = unknown[]> = Args extends [
	infer First extends Record<string, any>,
	...unknown[]
]
	? ComponentBase // Treat as component if args is an object
	: Args extends []
		? SnippetBase | ComponentBase // Empty args or void
		: Args extends unknown[]
			? SnippetBase // Array of args
			: never;

// ============================================================================
// Variants (Support both static and dynamic)
// ============================================================================

/** Variant configuration - can be static or dynamic */
export type Variants =
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	| VariantDefinition<any>
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	| ((bond: Bond, variantProps: Record<string, any>) => Record<string, any>);

// ============================================================================
// Atom Props (Core, Extensible)
// ============================================================================

/**
 * Base props for HTML atom components
 *
 * Extensibility pattern:
 * ```ts
 * // In component type file:
 * interface CustomSnippetProps extends SnippetProps {
 *   value: string;
 *   onChange: (value: string) => void;
 * }
 *
 * interface CustomAtomProps extends HtmlAtomProps<'input'> {
 *   children?: Snippet<[CustomSnippetProps]>;
 * }
 * ```
 */
export interface HtmlAtomProps<
	E extends HtmlElementTagName = HtmlElementTagName,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	B extends Base<any> = Base,
	Children extends Snippet<unknown[]> = Snippet
> extends HtmlElementProps<E, Children> {
	/** Optional Bond for state management & context */
	bond?: Bond;

	/** Base component or snippet to render (can be overridden) */
	base?: B | undefined;

	/** Preset configuration module */
	preset?: PresetModuleName | (string & {});

	/**
	 * Variant definition or function to resolve variants dynamically
	 *
	 * Supports two patterns:
	 * 1. Static: `VariantDefinition` - static config with variants, defaultVariants, etc.
	 * 2. Dynamic: `Function` - receives bond and props, returns resolved props
	 *
	 * Example:
	 * ```ts
	 * variants: cva('button', {
	 *   variants: {
	 *     size: { sm: 'px-2 py-1', lg: 'px-4 py-2' }
	 *   }
	 * })
	 * ```
	 */
	variants?: Variants;
}

export type { ElementType };
