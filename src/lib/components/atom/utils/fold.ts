import type { ClassValue } from 'svelte/elements';
import type { Motion, PresetEntryRecord, ResolvedMotion } from '$ixirjs/ui/preset';
import { MOTION_KEYS, MOTION_SKIP, PRESET_SKIP, VARIANTS_SKIP } from './constants';
import { getCachedOwnSymbols } from './cache';

export type FoldedPresentation = {
	presetClass: ClassValue | undefined;
	variantClass: ClassValue | undefined;
	attrs: Record<string | symbol, unknown>;
	motion: ResolvedMotion;
};

function copyStringKeys(
	src: Record<string, unknown>,
	skip: ReadonlySet<string> | undefined,
	result: Record<string | symbol, unknown>
): void {
	for (const key in src) {
		if (!Object.hasOwn(src, key) || skip?.has(key) || MOTION_SKIP.has(key)) continue;
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

// One cascade for native defaults, closed preset attrs, resolved variants, consumer props, and motion.
export function foldPresentation<E extends Element = Element>(
	defaults: Record<string, unknown> | undefined,
	preset: PresetEntryRecord | undefined,
	variants: Record<string, unknown> | undefined,
	rest: Record<string, unknown>,
	consumerMotion?: Motion<E> | null
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
		attrs,
		motion: resolveMotion([
			readMotion(defaults),
			preset?.motion,
			readMotion(variants),
			readMotion(rest),
			consumerMotion
		])
	};
}

function readMotion(layer: Record<string, unknown> | undefined): Motion | null | undefined {
	if (!layer) return undefined;
	const nested = layer.motion;
	if (nested === null) return null;

	const nestedRecord =
		typeof nested === 'object' && nested !== null ? (nested as Record<string, unknown>) : undefined;
	const result: Motion = {};
	let found = false;
	for (const key of MOTION_KEYS) {
		const value = nestedRecord && Object.hasOwn(nestedRecord, key) ? nestedRecord[key] : layer[key];
		if (value === undefined) continue;
		(result as Record<string, unknown>)[key] = value;
		found = true;
	}
	return found ? result : undefined;
}

function resolveMotion<E extends Element>(
	layers: Array<Motion | Motion<E> | null | undefined>
): ResolvedMotion {
	const motion: Record<string, unknown> = {};
	for (const layer of layers) {
		if (layer === null) {
			for (const key of MOTION_KEYS) delete motion[key];
			continue;
		}
		if (!layer) continue;
		for (const key of MOTION_KEYS) {
			if (!Object.hasOwn(layer, key)) continue;
			const value = layer[key];
			if (value === undefined) continue;
			if (value === null) delete motion[key];
			else motion[key] = value;
		}
	}
	return motion as ResolvedMotion;
}
