import { merge } from 'es-toolkit';
import type { ClassValue } from 'svelte/elements';
import { call } from '$svelte-atoms/core/utils/function';
import type {
	PresetEntryRecord,
	PresetEntryValue
} from '$svelte-atoms/core/context/preset.svelte';

/**
 * Merges an ordered list of {@link PresetEntryRecord}s into a single record.
 *
 * - `class`: collected into an array (all classes preserved, later ones appended)
 * - `compounds`: arrays concatenated
 * - `attachments`: arrays concatenated
 * - `variants`: deep-merged
 * - `defaults`: shallow-merged
 * - any other field: last entry wins
 */
export function mergePresetRecords(records: PresetEntryRecord[]): PresetEntryRecord | undefined {
	const len = records.length;
	if (!len) return undefined;
	if (len === 1) return records[0];

	const result: PresetEntryRecord = {};
	const classes: ClassValue[] = [];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const compounds: Array<Record<string, any>> = [];
	const attachments: NonNullable<PresetEntryRecord['attachments']> = [];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const variantsList: Array<Record<string, Record<string, any>>> = [];

	for (let i = 0; i < len; i++) {
		const record = records[i];
		if (!record) continue;

		if (record.class !== undefined) classes.push(record.class as ClassValue);

		const recCompounds = record.compounds;
		if (recCompounds?.length) {
			for (let j = 0, jlen = recCompounds.length; j < jlen; j++)
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				compounds.push(recCompounds[j] as Record<string, any>);
		}

		const recAttachments = record.attachments;
		if (recAttachments?.length) {
			for (let j = 0, jlen = recAttachments.length; j < jlen; j++)
				attachments.push(recAttachments[j] as NonNullable<PresetEntryRecord['attachments']>[number]);
		}

		if (record.variants) variantsList.push(record.variants);

		if (record.defaults)
			result.defaults =
				result.defaults !== undefined
					? { ...result.defaults, ...record.defaults }
					: record.defaults;

		// Copy remaining own keys directly — avoids allocating an intermediate `rest` object.
		// Use hasOwnProperty guard so prototype-chain properties are never copied.
		for (const key in record) {
			if (
				!Object.prototype.hasOwnProperty.call(record, key) ||
				key === 'class' ||
				key === 'compounds' ||
				key === 'attachments' ||
				key === 'variants' ||
				key === 'defaults'
			)
				continue;
			result[key] = record[key];
		}
	}

	if (classes.length) result.class = classes.length === 1 ? (classes[0] as ClassValue) : classes;
	if (compounds.length) result.compounds = compounds;
	if (attachments.length) result.attachments = attachments;

	// Single merge pass over all variant maps — avoids N-1 intermediate objects
	if (variantsList.length) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let merged: Record<string, Record<string, any>> = {};
		for (let j = 0; j < variantsList.length; j++) merged = merge(merged, variantsList[j]!);
		result.variants = merged;
	}

	return result;
}

/**
 * Resolves a preset to its concrete value.
 *
 * - If `preset` is falsy, returns `undefined`.
 * - If it is an array, each entry is resolved (unwrapping deferred factories)
 *   and the results are merged via {@link mergePresetRecords}.
 * - Otherwise, unwraps up to two levels of factory functions.
 */
export function resolvePreset(
	preset:
		| PresetEntryValue
		| Array<PresetEntryValue>
		| undefined
): PresetEntryRecord | undefined;
export function resolvePreset<T>(preset: T | (() => T) | undefined): T | undefined;
export function resolvePreset(preset: unknown): unknown {
	if (!preset) return undefined;

	if (Array.isArray(preset)) {
		const resolved: PresetEntryRecord[] = [];
		for (const entry of preset) {
			const value = resolvePreset(entry as PresetEntryValue);
			if (value) resolved.push(value as PresetEntryRecord);
		}
		return mergePresetRecords(resolved);
	}

	const result = call(preset);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return typeof result === 'function' ? (result as any)() : result;
}
