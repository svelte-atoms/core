import type { Bond } from '$ixirjs/ui/shared';

export type ResolvedProps = Record<string, unknown>;

/**
 * Two-level cache for resolved variants (legacy / public API).
 *
 * - Outer key: bond instance (WeakMap — automatically GC'd when the bond is destroyed).
 * - Inner key: JSON-stringified variant-relevant props.
 * - Bond-less calls share a single flat Map.
 *
 * Kept exported for backward compatibility. Internal callers prefer
 * `getDefCacheMap` which avoids global cross-component cache pollution.
 */
const variantCacheByBond = new WeakMap<object, Map<string, ResolvedProps>>();
const variantCacheNoBond = new Map<string, ResolvedProps>();

export const MAX_CACHE_SIZE = 100;

export function getCacheMap(bond: Bond | null | undefined): Map<string, ResolvedProps> {
	if (!bond) return variantCacheNoBond;
	let map = variantCacheByBond.get(bond);
	if (!map) {
		map = new Map();
		variantCacheByBond.set(bond, map);
	}
	return map;
}

/**
 * Per-definition cache. The cache map is scoped to a `(def, bond)` pair, so
 * different atoms never share the same eviction window — eliminating the
 * cross-component thrash of the legacy global Map.
 *
 * `def` is keyed by reference via WeakMap, so cache entries are GC'd when
 * the variant definition is no longer reachable.
 */
const defCacheBondMap = new WeakMap<object, WeakMap<object, Map<string, ResolvedProps>>>();
const defCacheNoBondMap = new WeakMap<object, Map<string, ResolvedProps>>();

export function getDefCacheMap(
	def: object,
	bond: Bond | null | undefined
): Map<string, ResolvedProps> {
	if (!bond) {
		let m = defCacheNoBondMap.get(def);
		if (!m) {
			m = new Map();
			defCacheNoBondMap.set(def, m);
		}
		return m;
	}
	const bondKey = bond as unknown as object;
	let inner = defCacheBondMap.get(bondKey);
	if (!inner) {
		inner = new WeakMap();
		defCacheBondMap.set(bondKey, inner);
	}
	let m = inner.get(def);
	if (!m) {
		m = new Map();
		inner.set(def, m);
	}
	return m;
}

/**
 * Performs a true-LRU lookup (touch on hit) and returns the cached value, or
 * `undefined` if absent. Avoids the FIFO eviction bug of the previous impl.
 */
export function lruGet<V>(map: Map<string, V>, key: string): V | undefined {
	const v = map.get(key);
	if (v === undefined) return undefined;
	// Re-insert to mark as most-recently-used (Map preserves insertion order).
	map.delete(key);
	map.set(key, v);
	return v;
}

/** Insert with capacity eviction of the least-recently-used entry. */
export function lruSet<V>(map: Map<string, V>, key: string, value: V, max: number): void {
	if (map.size >= max) {
		const firstKey = map.keys().next().value;
		if (firstKey !== undefined) map.delete(firstKey);
	}
	map.set(key, value);
}

/**
 * Cached `Object.keys(obj)` keyed by `obj` reference. Variant maps are stable
 * per definition, so we avoid re-allocating the keys array every render.
 */
const ownKeysCache = new WeakMap<object, string[]>();
const EMPTY_KEYS: readonly string[] = Object.freeze([]);

export function getCachedOwnKeys(obj: object | null | undefined): readonly string[] {
	if (!obj) return EMPTY_KEYS;
	let keys = ownKeysCache.get(obj);
	if (!keys) {
		keys = Object.keys(obj);
		ownKeysCache.set(obj, keys);
	}
	return keys;
}

/** Returns true if `obj` has at least one own enumerable key. */
export function hasOwnKeys(obj: object): boolean {
	for (const k in obj) if (Object.hasOwn(obj, k)) return true;
	return false;
}

/**
 * Cached `hasOwnKeys` keyed weakly by the input object. Defaults objects are
 * stable per variant definition, so we avoid re-walking the prototype chain
 * on every render. Sentinel `null` is treated as "no" without consuming a slot.
 */
const hasOwnKeysCache = new WeakMap<object, boolean>();

export function hasOwnKeysCached(obj: object | null | undefined): boolean {
	if (!obj) return false;
	const cached = hasOwnKeysCache.get(obj);
	if (cached !== undefined) return cached;
	const result = hasOwnKeys(obj);
	hasOwnKeysCache.set(obj, result);
	return result;
}

/**
 * Cached non-`class` keys for a compound variant condition. Compounds are
 * stable per variant definition, so their condition keys never change.
 * Weakly keyed → freed when the compound object is unreachable.
 */
const compoundKeysCache = new WeakMap<object, string[]>();

export function getCompoundConditionKeys(compound: object): string[] {
	let keys = compoundKeysCache.get(compound);
	if (!keys) {
		keys = [];
		for (const k in compound) {
			if (Object.hasOwn(compound, k) && k !== 'class') keys.push(k);
		}
		compoundKeysCache.set(compound, keys);
	}
	return keys;
}
