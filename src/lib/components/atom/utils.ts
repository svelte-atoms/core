import type { Bond } from '$svelte-atoms/core/shared';
import { cn, type ClassValue, type VariantDefinition } from '$svelte-atoms/core/utils';
import { call } from '$svelte-atoms/core/utils/function';

type ResolvedProps = Record<string, unknown>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyVariantDefinition = VariantDefinition<any>;

/**
 * Two-level cache for resolved variants.
 * Outer key: bond instance identity (WeakMap for automatic GC when bond is destroyed).
 * Inner key: JSON stringified variant-relevant props.
 * Bond-less calls share a single flat Map.
 */
const variantCacheByBond = new WeakMap<object, Map<string, ResolvedProps>>();
const variantCacheNoBond = new Map<string, ResolvedProps>();
const MAX_CACHE_SIZE = 100;

function getCacheMap(bond: Bond | null | undefined): Map<string, ResolvedProps> {
	if (!bond) return variantCacheNoBond;
	let map = variantCacheByBond.get(bond);
	if (!map) {
		map = new Map();
		variantCacheByBond.set(bond, map);
	}
	return map;
}

function hasOwnKeys(obj: object): boolean {
	for (const k in obj) if (Object.hasOwn(obj, k)) return true;
	return false;
}

const PRESET_SKIP = new Set(['class', 'base', 'as', 'variants', 'compounds', 'defaults']);
const VARIANTS_SKIP = new Set(['class', 'variants', 'compounds', 'defaults']);

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
	const finalProps = defaults && hasOwnKeys(defaults) ? { ...defaults, ...props } : props;

	const variantKeys = variantMap ? Object.keys(variantMap) : [];

	// Fast path: no variants or compounds — skip cache entirely
	if (variantKeys.length === 0 && !compounds?.length) {
		return { class: baseClass ? [baseClass] : [] } as ResolvedProps;
	}

	// Build cache key only when variants are present
	const relevantProps: Record<string, unknown> = {};
	for (const key of variantKeys) if (key in finalProps) relevantProps[key] = finalProps[key];
	const cacheKey = JSON.stringify({ relevantProps, baseClass, compounds });

	const cacheMap = getCacheMap(bond);
	if (cacheMap.has(cacheKey)) {
		return cacheMap.get(cacheKey)!;
	}

	const classes: ClassValue[] = [];
	const attributes: Record<string | symbol, unknown> = {};

	// Add base class
	if (baseClass) classes.push(baseClass);

	// Add variant classes
	if (variantMap) {
		for (const key of variantKeys) {
			const value = finalProps[key];
			if (value === undefined) continue;
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
	if (compounds?.length) {
		for (const compound of compounds) {
			const compoundClass = compound.class;
			const compoundPropKeys = new Set(Object.keys(compound).filter((k) => k !== 'class'));
			let matches = true;
			for (const key of compoundPropKeys) {
				if (finalProps[key] !== compound[key]) {
					matches = false;
					break;
				}
			}
			if (matches) {
				if (compoundClass) classes.push(compoundClass);
				// Add compound attributes (string keys that are not condition keys or 'class')
				for (const [k, v] of Object.entries(compound)) {
					if (k !== 'class' && !compoundPropKeys.has(k)) attributes[k] = v;
				}
			}
		}
	}

	const result = {
		class: classes,
		...attributes
	};

	// Store in cache (limit per-bond cache size to prevent memory leaks)
	if (cacheMap.size >= MAX_CACHE_SIZE) {
		const firstKey = cacheMap.keys().next().value;
		if (firstKey) cacheMap.delete(firstKey);
	}
	cacheMap.set(cacheKey, result);

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
		...presetResolved,
		...localVariants,
		class: [...presetClasses, ...localClasses].filter(Boolean)
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
 * Internal keys that are never valid DOM attributes — stripped before spreading onto element
 */
const INTERNAL_PROPS = new Set(['class', 'base', 'as', 'variants', 'compounds', 'defaults']);

/**
 * Pure function to extract rest props by filtering out preset and variant-specific props
 */
export function extractRestProps(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	preset: Record<string, any> | undefined,
	mergedVariants: ResolvedProps | undefined,
	restProps: Record<string, unknown>
): Record<string, unknown> {
	const result: Record<string | symbol, unknown> = {};

	if (preset) {
		for (const k in preset)
			if (Object.hasOwn(preset, k) && !PRESET_SKIP.has(k)) result[k] = preset[k];
		// Preserve Symbol-keyed attachment props (e.g. from createAttachmentKey())
		const symPreset = preset as Record<string | symbol, unknown>;
		for (const s of Object.getOwnPropertySymbols(preset)) result[s] = symPreset[s];
	}

	if (mergedVariants) {
		for (const k in mergedVariants)
			if (Object.hasOwn(mergedVariants, k) && !VARIANTS_SKIP.has(k)) result[k] = mergedVariants[k];
		// Preserve Symbol-keyed attachment props (e.g. from variant definitions)
		const symProps = mergedVariants as Record<string | symbol, unknown>;
		for (const s of Object.getOwnPropertySymbols(mergedVariants)) result[s] = symProps[s];
	}

	for (const k in restProps) if (Object.hasOwn(restProps, k)) result[k] = restProps[k];
	// Preserve Symbol-keyed attachment props from restProps (e.g. {@attach} directives)
	const symRestProps = restProps as Record<string | symbol, unknown>;
	for (const s of Object.getOwnPropertySymbols(restProps)) result[s] = symRestProps[s];

	return result as Record<string, unknown>;
}

/**
 * Pure function to check if a base is a snippet
 */
export function isSnippetBase(base: unknown): boolean {
	return typeof base === 'function' && base.length === 1 && !base.prototype;
}
