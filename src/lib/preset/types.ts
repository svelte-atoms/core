import type { ClassValue } from 'svelte/elements';
import type { Base } from '$ixirjs/ui/components/atom';
import type { Bond } from '$ixirjs/ui/shared';
import type { BuiltInPresetName } from './manifest';

export interface PresetRender {
	as?: string;
	base?: Base;
}

// Stable preset data is deliberately closed. DOM-facing values live under `attrs` so adding
// future configuration fields cannot reinterpret an attribute consumers already publish.
export interface PresetEntryRecord {
	class?: ClassValue;
	attrs?: Record<string, unknown>;
	variants?: Record<string, Record<string, unknown>>;
	compounds?: Array<Record<string, unknown>>;
	defaults?: Record<string, unknown>;
	render?: PresetRender;
}

export interface MergedPresetLayers {
	readonly kind: 'merged-preset-layers';
	readonly layers: readonly PresetEntryValue[];
}

// Named layer objects replace the old overloaded array and nested-factory forms.
export type PresetEntryValue = PresetEntryRecord | MergedPresetLayers;

export interface PresetContext {
	bond: Bond | undefined | null;
}

export type PresetEntry = (context: PresetContext) => PresetEntryValue;

export type BuiltInPresetModuleMap = { [K in BuiltInPresetName]: PresetEntry };

// This is the single public augmentation seam. Application code extends it through
// `declare module '@ixirjs/ui/preset'`.
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PresetModuleMap extends BuiltInPresetModuleMap {}

export type PresetModuleName = keyof PresetModuleMap & string;
export type Preset = { [K in PresetModuleName]: PresetModuleMap[K] };

export interface FallbackPreset {
	readonly kind: 'fallback-preset';
	readonly presets: readonly PresetModuleName[];
}

export type PresetKey = PresetModuleName | FallbackPreset;
