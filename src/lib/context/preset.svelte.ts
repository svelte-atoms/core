import { getContext, setContext } from 'svelte';
import type {
	FallbackPreset,
	MergedPresetLayers,
	Preset,
	PresetEntry,
	PresetEntryValue,
	PresetModuleName
} from '../preset/types';

export type {
	BuiltInPresetModuleMap,
	FallbackPreset,
	MergedPresetLayers,
	Motion,
	Preset,
	PresetContext,
	PresetEntry,
	PresetEntryRecord,
	PresetEntryValue,
	PresetKey,
	PresetModuleMap,
	PresetModuleName,
	PresetRender,
	ResolvedMotion
} from '../preset/types';

const CONTEXT_KEY = '@ixirjs/context/preset';

export function fallbackPreset(...presets: readonly PresetModuleName[]): FallbackPreset {
	return Object.freeze({ kind: 'fallback-preset', presets: Object.freeze([...presets]) });
}

export function mergePresetLayers(...layers: readonly PresetEntryValue[]): MergedPresetLayers {
	return Object.freeze({ kind: 'merged-preset-layers', layers: Object.freeze([...layers]) });
}

/** Defines a checked, partial theme without exposing the registry representation. */
export function definePreset<const P extends Partial<Preset>>(preset: P): P {
	return Object.freeze({ ...preset }) as P;
}

export function getPreset<K extends PresetModuleName>(key: K): PresetEntry | undefined;
export function getPreset(): Partial<Preset> | undefined;
export function getPreset(...args: unknown[]) {
	const preset = getContext<Partial<Preset> | undefined>(CONTEXT_KEY);
	if (args.length) return preset?.[args[0] as PresetModuleName];
	return preset;
}

function mergePresetEntries(existing: PresetEntry, next: PresetEntry): PresetEntry {
	return (context) => mergePresetLayers(existing(context), next(context));
}

// Context installation is initialization-scoped: call while creating the provider component.
// Runtime reactivity belongs inside entry factories, whose reads are tracked by presentation.
export function setPreset(preset: Partial<Preset>): void {
	mergePreset(() => preset);
}

export function mergePreset(
	callback: (currentPreset: Partial<Preset> | undefined) => Partial<Preset>
): void {
	const currentPreset = getPreset();
	const override = callback(currentPreset);
	const result: Partial<Preset> = { ...currentPreset };

	for (const key of Object.keys(override) as PresetModuleName[]) {
		const next = override[key];
		if (!next) continue;
		const existing = result[key];
		result[key] = existing ? mergePresetEntries(existing, next) : next;
	}

	setContext(CONTEXT_KEY, result);
}
