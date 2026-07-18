import { merge } from 'es-toolkit';
import type { ClassValue } from 'svelte/elements';
import type {
	MergedPresetLayers,
	Motion,
	PresetEntryRecord,
	PresetEntryValue
} from '$ixirjs/ui/preset';

// Merge ordered preset records. Only the closed public fields participate.
export function mergePresetRecords(records: PresetEntryRecord[]): PresetEntryRecord | undefined {
	if (records.length === 0) return undefined;
	if (records.length === 1) return records[0];

	const result: PresetEntryRecord = {};
	const classes: ClassValue[] = [];
	const compounds: Array<Record<string, unknown>> = [];
	const variantsList: Array<Record<string, Record<string, unknown>>> = [];

	for (const record of records) {
		if (record.class !== undefined) classes.push(record.class);
		if (record.compounds?.length) compounds.push(...record.compounds);
		if (record.variants) variantsList.push(record.variants);
		if (record.attrs) result.attrs = { ...result.attrs, ...record.attrs };
		if (record.motion !== undefined) result.motion = mergeMotion(result.motion, record.motion);
		if (record.defaults) result.defaults = { ...result.defaults, ...record.defaults };
		if (record.render) result.render = { ...result.render, ...record.render };
	}

	if (classes.length) result.class = classes.length === 1 ? classes[0]! : classes;
	if (compounds.length) result.compounds = compounds;
	if (variantsList.length) {
		let variants: Record<string, Record<string, unknown>> = {};
		for (const layer of variantsList) variants = merge(variants, layer);
		result.variants = variants;
	}
	return result;
}

function mergeMotion(base: Motion | null | undefined, next: Motion | null): Motion | null {
	if (next === null) return null;
	const result: Motion = base && base !== null ? { ...base } : {};
	for (const key of ['initial', 'enter', 'exit', 'animate'] as const) {
		if (Object.hasOwn(next, key) && next[key] !== undefined) {
			(result as Record<string, unknown>)[key] = next[key];
		}
	}
	return result;
}

function isMergedPresetLayers(value: unknown): value is MergedPresetLayers {
	return (
		typeof value === 'object' &&
		value !== null &&
		(value as { kind?: unknown }).kind === 'merged-preset-layers' &&
		Array.isArray((value as { layers?: unknown }).layers)
	);
}

// Resolve explicit merged-layer shapes. Arrays and nested factories have no preset semantics.
export function resolvePreset(preset: PresetEntryValue | undefined): PresetEntryRecord | undefined {
	if (!preset) return undefined;
	if (!isMergedPresetLayers(preset)) return preset;

	const records: PresetEntryRecord[] = [];
	for (const layer of preset.layers) {
		const record = resolvePreset(layer);
		if (record) records.push(record);
	}
	return mergePresetRecords(records);
}
