import type { ClassValue } from 'svelte/elements';
import type { PresetEntryRecord } from '$ixirjs/ui/preset';
import { PRESET_SKIP, VARIANTS_SKIP } from './constants';
import { getCachedOwnSymbols } from './cache';

export type FoldedPresentation = {
	presetClass: ClassValue | undefined;
	variantClass: ClassValue | undefined;
	attrs: Record<string | symbol, unknown>;
};

function copyStringKeys(
	src: Record<string, unknown>,
	skip: ReadonlySet<string> | undefined,
	result: Record<string | symbol, unknown>
): void {
	for (const key in src) {
		if (!Object.hasOwn(src, key) || skip?.has(key)) continue;
		result[key] = src[key];
	}
}

function copySymbolKeys(
	src: Record<string | symbol, unknown>,
	result: Record<string | symbol, unknown>,
	stable: boolean
): void {
	const symbols = stable ? getCachedOwnSymbols(src) : Object.getOwnPropertySymbols(src);
	for (const symbol of symbols) result[symbol] = src[symbol];
}

// One cascade for native defaults, closed preset attrs, resolved variants, and consumer props.
export function foldPresentation(
	defaults: Record<string, unknown> | undefined,
	preset: PresetEntryRecord | undefined,
	variants: Record<string, unknown> | undefined,
	rest: Record<string, unknown>
): FoldedPresentation {
	const attrs: Record<string | symbol, unknown> = {};

	if (defaults) {
		copyStringKeys(defaults, PRESET_SKIP, attrs);
		copySymbolKeys(defaults, attrs, true);
	}
	if (preset?.attrs) {
		// Preset attrs are DOM data, never lifecycle attachments. String keys only are supported.
		copyStringKeys(preset.attrs, PRESET_SKIP, attrs);
	}
	if (variants) {
		copyStringKeys(variants, VARIANTS_SKIP, attrs);
		copySymbolKeys(variants, attrs, true);
	}
	copyStringKeys(rest, undefined, attrs);
	copySymbolKeys(rest, attrs, false);

	return {
		presetClass: preset?.class,
		variantClass: variants?.class as ClassValue | undefined,
		attrs
	};
}
