import type { Bond } from '$svelte-atoms/core/shared';
import { cn, type ClassValue, type VariantDefinition } from '$svelte-atoms/core/utils';
import { call } from '$svelte-atoms/core/utils/function';

type ResolvedProps = Record<string, unknown>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyVariantDefinition = VariantDefinition<any>;

/**
 * Cache for resolved variants to avoid recomputation
 * Key: JSON stringified combination of variant props
 */
const variantCache = new Map<string, ResolvedProps>();

/**
 * Maximum cache size to prevent memory leaks
 */
const MAX_CACHE_SIZE = 100;

/**
 * Resolves preset to its final value, handling both direct values and factory functions
 */
export function resolvePreset<T>(preset: T | (() => T) | undefined): T | undefined {
	if (!preset) return undefined;
	const result = call(preset);
	// If call returns a function, call it again (handle deferred preset)
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return typeof result === 'function' ? (result as any)() : result;
}

/**
 * Pure function to resolve variant definition to props
 * Caches results to avoid recomputation with same inputs
 */
export function resolveVariants(
	def: AnyVariantDefinition,
	bond: Bond | null | undefined,
	props: Record<string, unknown>
): ResolvedProps {
	const { variants: variantMap, compounds, defaults, class: baseClass } = def;

	// Merge props with defaults
	const finalProps = { ...defaults, ...props };

	// Create cache key from final props (only variant-related props)
	const variantKeys = variantMap ? Object.keys(variantMap) : [];
	const relevantProps = Object.fromEntries(
		Object.entries(finalProps).filter(([key]) => variantKeys.includes(key))
	);
	const cacheKey = JSON.stringify({ relevantProps, baseClass, compounds });

	// Check cache
	if (variantCache.has(cacheKey)) {
		return variantCache.get(cacheKey)!;
	}

	const classes: ClassValue[] = [];
	const attributes: Record<string | symbol, unknown> = {};

	// Add base class
	if (baseClass) classes.push(baseClass);

	// Add variant classes
	if (variantMap) {
		for (const [key, value] of Object.entries(finalProps)) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const variantValue = (variantMap as any)[key]?.[value as string];
			if (variantValue !== undefined) {
				const resolved = typeof variantValue === 'function' ? variantValue(bond) : variantValue;

				if (typeof resolved === 'string') {
					classes.push(resolved);
				} else if (typeof resolved === 'object' && resolved !== null) {
					if ('class' in resolved) {
						classes.push(resolved.class);
					}
					// Add other attributes (including Symbol-based attachment keys)
					Object.getOwnPropertySymbols(resolved).forEach((sym) => {
						attributes[sym] = (resolved as Record<string | symbol, unknown>)[sym];
					});
				}
			}
		}
	}

	// Add compound variants
	if (compounds) {
		for (const compound of compounds) {
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

	const result = {
		class: classes,
		...attributes
	};

	// Store in cache (limit cache size to prevent memory leaks)
	if (variantCache.size >= MAX_CACHE_SIZE) {
		// Clear oldest entry (first in Map)
		const firstKey = variantCache.keys().next().value;
		if (firstKey) variantCache.delete(firstKey);
	}
	variantCache.set(cacheKey, result);

	return result;
}

/**
 * Pure function to merge preset and local variant definitions
 * Returns merged variant props with local overriding preset
 */
export function mergeVariants(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	presetVariants: Record<string, any> | undefined,
	presetClass: ClassValue | undefined,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	presetCompounds: Array<Record<string, any>> | undefined,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	presetDefaults: Record<string, any> | undefined,
	localVariants: ResolvedProps | undefined,
	bond: Bond | null | undefined,
	props: Record<string, unknown>
): ResolvedProps | undefined {
	// No variants at all
	if (!presetVariants && !localVariants) return undefined;

	// Only preset variants (raw object from preset)
	if (presetVariants && !localVariants) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const variantDef: any = {
			class: presetClass ?? '',
			variants: presetVariants,
			compounds: presetCompounds ?? [],
			defaults: presetDefaults ?? {}
		};
		return resolveVariants(variantDef, bond, props);
	}

	// Only local variants
	if (!presetVariants && localVariants) {
		return localVariants;
	}

	// Both exist - merge them
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const presetVariantDef: any = {
		class: presetClass ?? '',
		variants: presetVariants ?? {},
		compounds: presetCompounds ?? [],
		defaults: presetDefaults ?? {}
	};

	const presetResolved = resolveVariants(presetVariantDef, bond, props);

	// Merge the resolved variant props
	// Local variant classes and attributes override preset
	const presetClasses = Array.isArray(presetResolved.class)
		? presetResolved.class
		: [presetResolved.class];
	const localClasses = Array.isArray(localVariants?.class)
		? localVariants.class
		: [localVariants?.class];

	return {
		class: [...presetClasses, ...localClasses].filter(Boolean),
		...presetResolved,
		...localVariants
	};
}

/**
 * Pure function to merge classes with $preset placeholder support
 * Handles the special $preset placeholder for precise positioning of preset classes
 */
export function mergeClassesWithPreset(
	userClass: string | ClassValue | undefined,
	presetClass: ClassValue | undefined,
	variantClass: ClassValue | undefined
): string {
	const klassStr = cn(userClass ?? '');

	// Check for $preset placeholder first
	if (!klassStr.includes('$preset')) {
		// No placeholder - normal merge: variants override direct class
		return cn(userClass, variantClass ?? '');
	}

	// Has placeholder - calculate position and inject preset classes
	const parts = klassStr.split('$preset');

	// Only keep the last $preset placeholder
	const beforeLastPlaceholder = parts.slice(0, -1).join('');
	const afterLastPlaceholder = parts[parts.length - 1];

	const presetClassString = cn(presetClass);

	// Merge: before + preset + variants + after
	return cn(beforeLastPlaceholder, presetClassString, variantClass ?? '', afterLastPlaceholder);
}

/**
 * Pure function to resolve local variants
 * Handles both function-based and VariantDefinition-based variants
 */
export function resolveLocalVariants(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	variants: any,
	bond: Bond | null | undefined,
	props: Record<string, unknown>
): ResolvedProps | undefined {
	if (!variants) return undefined;

	// If it's a function, call it directly
	if (typeof variants === 'function') {
		return variants(bond, props);
	}

	// Otherwise it's a VariantDefinition, resolve it
	return resolveVariants(variants, bond, props);
}

/**
 * Pure function to extract rest props by filtering out preset and variant-specific props
 */
export function extractRestProps(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	preset: Record<string, any> | undefined,
	mergedVariants: ResolvedProps | undefined,
	restProps: Record<string, unknown>
): Record<string, unknown> {
	const presetProps = { ...preset };
	const presetKeysToRemove = ['class', 'base', 'as', 'variants', 'compounds', 'defaults'];

	for (const key of presetKeysToRemove) {
		delete presetProps[key];
	}

	const variantsRestProps = { ...mergedVariants };
	const variantKeysToRemove = ['class', 'variants', 'compounds', 'defaults'];

	for (const key of variantKeysToRemove) {
		delete variantsRestProps[key];
	}

	return { ...presetProps, ...variantsRestProps, ...restProps };
}

/**
 * Pure function to check if a base is a snippet
 */
export function isSnippetBase(base: unknown): boolean {
	return typeof base === 'function' && base.length === 1 && !base.prototype;
}
