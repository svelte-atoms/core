import { PRESET_SKIP, VARIANTS_SKIP } from './constants';
import type { ResolvedProps } from './cache';

/**
 * Copies own string-keyed props from `src` into `result`, skipping any keys in
 * `skip` (or no skip list when `skip` is undefined). Falls back to `for...in`
 * which only iterates own + enumerable inherited keys; the additional
 * `Object.hasOwn` guard mirrors the original behavior for safety.
 */
function copyStringKeys(
	src: Record<string, unknown>,
	skip: ReadonlySet<string> | undefined,
	result: Record<string | symbol, unknown>
): void {
	for (const k in src) {
		if (!Object.hasOwn(src, k)) continue;
		if (skip && skip.has(k)) continue;
		result[k] = src[k];
	}
}

/**
 * Copies symbol-keyed props from `src` into `result`. Only allocates the
 * symbols array when the source actually has any (the 99% case has none).
 */
function copySymbolKeys(
	src: Record<string | symbol, unknown>,
	result: Record<string | symbol, unknown>
): void {
	const syms = Object.getOwnPropertySymbols(src);
	if (syms.length === 0) return;
	for (const s of syms) result[s] = src[s];
}

/**
 * Builds the final spread-ready props object by layering, in ascending priority:
 * fallback → preset → mergedVariants → restProps.
 *
 * `fallback` is the lowest-priority source and is intended for internal defaults
 * (e.g. a default `animate` function) that should only apply when neither the
 * preset nor the consumer has specified the prop.
 *
 * Internal atom keys (`class`, `base`, `as`, …) are stripped; Symbol-keyed
 * attachment props are preserved at every layer.
 */
export function extractRestProps(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	preset: Record<string, any> | undefined,
	mergedVariants: ResolvedProps | undefined,
	restProps: Record<string, unknown>,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	fallback?: Record<string, any> | undefined
): Record<string, unknown> {
	const result: Record<string | symbol, unknown> = {};

	if (fallback) {
		copyStringKeys(fallback, PRESET_SKIP, result);
		copySymbolKeys(fallback as Record<string | symbol, unknown>, result);
	}

	if (preset) {
		copyStringKeys(preset, PRESET_SKIP, result);
		copySymbolKeys(preset as Record<string | symbol, unknown>, result);
	}

	if (mergedVariants) {
		copyStringKeys(mergedVariants, VARIANTS_SKIP, result);
		copySymbolKeys(mergedVariants as Record<string | symbol, unknown>, result);
	}

	copyStringKeys(restProps, undefined, result);
	copySymbolKeys(restProps as Record<string | symbol, unknown>, result);

	return result as Record<string, unknown>;
}
