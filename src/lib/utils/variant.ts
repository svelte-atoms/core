/**
 * Variant System for @svelte-atoms/core
 *
 * A simple, single-function approach to defining component variants.
 * Define variants once, use everywhere with full type safety and bond state access.
 *
 * Goals:
 * 1. Single function returns all variants for a component
 * 2. Access internal component state (via bond) for reactive variants
 * 3. Return both classes AND other attributes (aria, data, etc.)
 * 4. Type-safe with autocompletion
 * 5. No context, no complexity
 */

import type { ClassValue } from 'svelte/elements';
import type { Bond } from '$svelte-atoms/core/shared';

// ============================================================================
// Core Variant System
// ============================================================================

/**
 * Variant value can be a static value or a function that receives bond
 */
export type VariantValue<T = any> = T | ((bond?: Bond | null) => T);

/**
 * Variant definition - maps variant keys to their possible values
 * Each value can return classes and/or attributes
 */
export type VariantDefinition<V extends Record<string, Record<string, any>>> = {
	/** Base classes applied to all variants */
	class?: ClassValue;

	/** Variant definitions - each key maps to possible values */
	variants: V;

	/** Compound variants - apply when multiple conditions match */
	compounds?: Array<
		Partial<{ [K in keyof V]: keyof V[K] }> & {
			class?: ClassValue;
			[key: string]: any;
		}
	>;

	/** Default values for variants */
	defaults?: Partial<{ [K in keyof V]: keyof V[K] }>;
};

/**
 * Props type for variant function
 */
export type VariantProps<V extends Record<string, Record<string, any>>> = Partial<{
	[K in keyof V]: keyof V[K];
}> & {
	bond?: Bond | null;
};

/**
 * Define variants for a component
 * Returns a function that takes variant props and returns classes + attributes
 *
 * @example
 * ```ts
 * // Option 1: Static config (no bond access needed)
 * const buttonVariants = defineVariants({
 *   class: 'rounded-md font-medium transition-colors',
 *   variants: {
 *     variant: {
 *       primary: 'bg-blue-500 text-white hover:bg-blue-600',
 *       secondary: 'bg-gray-500 text-white hover:bg-gray-600'
 *     },
 *     size: {
 *       sm: 'px-2 py-1 text-sm',
 *       md: 'px-4 py-2 text-base',
 *       lg: 'px-6 py-3 text-lg'
 *     }
 *   },
 *   compounds: [
 *     {
 *       variant: 'primary',
 *       size: 'lg',
 *       class: 'shadow-lg'
 *     }
 *   ],
 *   defaults: {
 *     variant: 'primary',
 *     size: 'md'
 *   }
 * });
 *
 * // Option 2: Dynamic config (with bond access)
 * const buttonVariants = defineVariants((bond) => ({
 *   class: 'rounded-md font-medium transition-colors',
 *   variants: {
 *     variant: {
 *       primary: 'bg-blue-500 text-white hover:bg-blue-600',
 *       secondary: 'bg-gray-500 text-white hover:bg-gray-600',
 *       danger: bond?.state?.disabled
 *         ? 'bg-red-300 text-white'
 *         : 'bg-red-500 text-white hover:bg-red-600'
 *     },
 *     size: {
 *       sm: 'px-2 py-1 text-sm',
 *       md: 'px-4 py-2 text-base',
 *       lg: 'px-6 py-3 text-lg'
 *     }
 *   },
 *   compounds: [
 *     {
 *       variant: 'primary',
 *       size: 'lg',
 *       class: 'shadow-lg'
 *     }
 *   ],
 *   defaults: {
 *     variant: 'primary',
 *     size: 'md'
 *   }
 * }));
 *
 * // Usage in component:
 * const props = buttonVariants({ variant: 'primary', size: 'lg', bond });
 * // Returns: { class: '...' }
 * ```
 */
export function defineVariants<V extends Record<string, Record<string, any>>>(
	config: VariantDefinition<V> | ((bond?: Bond | null) => VariantDefinition<V>)
) {
	return (bond: Bond, props?: VariantProps<V>): Record<string, any> => {
		// Get config (either static or dynamic based on bond)
		const resolvedConfig = typeof config === 'function' ? config(bond) : config;

		// Merge with defaults
		const finalProps = { ...resolvedConfig.defaults, ...props };

		// Collect classes and attributes
		const classes: ClassValue[] = [];
		const attributes: Record<string, any> = {};

		// Add base class
		if (resolvedConfig.class) classes.push(resolvedConfig.class);

		// Add variant classes and attributes
		for (const [key, value] of Object.entries(finalProps)) {
			const variantValue = resolvedConfig.variants?.[key]?.[value as string];

			if (variantValue !== undefined) {
				const resolved = typeof variantValue === 'function' ? variantValue(bond) : variantValue;

				if (typeof resolved === 'string') {
					classes.push(resolved);
				} else if (typeof resolved === 'object' && resolved !== null) {
					if ('class' in resolved) {
						classes.push(resolved.class);
					}
					// Add other attributes (aria-*, data-*, etc.)
					Object.entries(resolved).forEach(([k, v]) => {
						if (k !== 'class') {
							attributes[k] = v;
						}
					});
				}
			}
		}

		// Add compound variants
		if (resolvedConfig.compounds) {
			for (const compound of resolvedConfig.compounds) {
				const { class: compoundClass, ...compoundProps } = compound;
				const matches = Object.entries(compoundProps).every(
					([key, value]) => finalProps[key] === value
				);
				if (matches) {
					if (compoundClass) classes.push(compoundClass);
					// Add compound attributes
					Object.entries(compound).forEach(([k, v]) => {
						if (k !== 'class' && !Object.keys(compoundProps).includes(k)) {
							attributes[k] = v;
						}
					});
				}
			}
		}

		return {
			class: classes,
			...attributes
		};
	};
}

// ============================================================================
// Usage Examples
// ============================================================================

/**
 * Example 1: Simple button variants (static config)
 *
 * ```ts
 * const buttonVariants = defineVariants({
 *   class: 'rounded-md font-medium transition-colors focus:outline-none focus:ring-2',
 *   variants: {
 *     variant: {
 *       primary: 'bg-blue-500 text-white hover:bg-blue-600',
 *       secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
 *       ghost: 'hover:bg-gray-100'
 *     },
 *     size: {
 *       sm: 'px-2 py-1 text-sm',
 *       md: 'px-4 py-2',
 *       lg: 'px-6 py-3 text-lg'
 *     }
 *   },
 *   defaultVariants: {
 *     variant: 'primary',
 *     size: 'md'
 *   }
 * });
 *
 * // In component:
 * let { variant, size, ...rest } = $props();
 * const variantProps = buttonVariants({ variant, size });
 *
 * <button class={variantProps.class} {...rest}>Click me</button>
 * ```
 */

/**
 * Example 2: Reactive variants with bond state (function-based config)
 *
 * ```ts
 * const buttonVariants = defineVariants((bond) => ({
 *   class: 'rounded-md font-medium transition-colors',
 *   variants: {
 *     variant: {
 *       primary: 'bg-blue-500 text-white hover:bg-blue-600',
 *       secondary: 'bg-gray-500 text-white hover:bg-gray-600',
 *       // Access bond in the config function itself
 *       danger: bond?.state?.disabled
 *         ? 'bg-red-300 text-white'
 *         : 'bg-red-500 text-white hover:bg-red-600'
 *     },
 *     size: {
 *       sm: 'px-2 py-1 text-sm',
 *       md: 'px-4 py-2',
 *       lg: 'px-6 py-3 text-lg'
 *     }
 *   },
 *   defaults: {
 *     variant: 'primary',
 *     size: 'md'
 *   }
 * }));
 *
 * // In component:
 * const bond = ButtonBond.get();
 * const variantProps = buttonVariants({ variant: 'danger', size: 'md', bond });
 *
 * <button class={variantProps.class}>Click me</button>
 * ```
 */

/**
 * Example 3: Accordion with per-variant bond access
 *
 * ```ts
 * const accordionVariants = defineVariants({
 *   class: 'border rounded-md transition-all',
 *   variants: {
 *     state: {
 *       // Each variant can also be a function receiving bond
 *       open: (bond) => ({
 *         class: bond?.state?.isOpen ? 'bg-blue-50 border-blue-200' : 'bg-white',
 *         'aria-expanded': bond?.state?.isOpen,
 *         'data-state': bond?.state?.isOpen ? 'open' : 'closed'
 *       }),
 *       disabled: (bond) => ({
 *         class: bond?.state?.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
 *         'aria-disabled': bond?.state?.disabled
 *       })
 *     }
 *   }
 * });
 *
 * // In component:
 * const bond = AccordionBond.get();
 * const variantProps = accordionVariants({ state: 'open', bond });
 *
 * <div {...variantProps}>Content</div>
 * ```
 */

// ============================================================================
// Type Utilities
// ============================================================================

export type ExtractVariants<T extends (...args: any[]) => any> = Parameters<T>[0];

export type VariantPropsType<T> =
	T extends VariantDefinition<infer V> ? VariantProps<V> : Record<string, any>;
