import type { ClassValue } from 'svelte/elements';
import type { Bond } from '$ixirjs/ui/shared';
import type {
	FallbackPreset,
	Motion,
	PresetEntry,
	PresetEntryRecord,
	PresetKey,
	PresetModuleName
} from '$ixirjs/ui/preset';
import type { ResolvedProps } from './utils/cache';
import type { FoldedPresentation } from './utils/fold';
import type { Variants } from './types';
import * as utils from './utils';

export function resolvePreset(
	presetKey: PresetKey | undefined,
	bond: Bond | undefined,
	getPreset: (key: PresetModuleName) => PresetEntry | undefined
): PresetEntryRecord | undefined {
	if (!presetKey) return undefined;
	if (typeof presetKey === 'string') {
		const entry = getPreset(presetKey);
		return entry ? resolveEntry(entry, bond) : undefined;
	}
	for (const key of (presetKey as FallbackPreset).presets) {
		const entry = getPreset(key);
		if (entry) return resolveEntry(entry, bond);
	}
	return undefined;
}

function resolveEntry(entry: PresetEntry, bond: Bond | undefined): PresetEntryRecord | undefined {
	const fresh = utils.resolvePreset(entry({ bond })) as PresetEntryRecord | undefined;
	if (!fresh) return undefined;
	return utils.stabilizePresetRecord(entry, bond, fresh);
}

export function resolveLocalVariants(
	variants: Variants | undefined,
	bond: Bond | undefined,
	restProps: Record<string, unknown>
): ResolvedProps | undefined {
	return utils.resolveLocalVariants(variants, bond ?? null, restProps);
}

export function resolveVariants(
	preset: PresetEntryRecord | undefined,
	localVariants: ResolvedProps | undefined,
	bond: Bond | undefined,
	restProps: Record<string, unknown>
): ResolvedProps | undefined {
	return utils.mergeVariants(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		preset?.variants as Record<string, any> | undefined,
		preset?.class,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		preset?.compounds as Array<Record<string, any>> | undefined,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		preset?.defaults as Record<string, any> | undefined,
		localVariants,
		bond ?? null,
		restProps
	);
}

export function foldLayers<E extends Element = Element>(
	preset: PresetEntryRecord | undefined,
	variants: ResolvedProps | undefined,
	restProps: Record<string, unknown>,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	defaults: Record<string, any> | undefined,
	consumerMotion?: Motion<E> | null
): FoldedPresentation<E> {
	return utils.foldPresentation(defaults, preset, variants, restProps, consumerMotion);
}

export function resolveClass(
	klass: ClassValue | null | undefined,
	folded: Pick<FoldedPresentation, 'presetClass' | 'variantClass'>
): string {
	return utils.mergeClassesWithPreset(klass ?? undefined, folded.presetClass, folded.variantClass);
}

export function resolveBase(base: unknown, preset: PresetEntryRecord | undefined): unknown {
	return base ?? preset?.render?.base;
}

export function resolveAs(as: unknown, preset: PresetEntryRecord | undefined): unknown {
	return as ?? preset?.render?.as;
}

export function resolveRestProps(
	preset: PresetEntryRecord | undefined,
	variants: ResolvedProps | undefined,
	restProps: Record<string, unknown>,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	defaults: Record<string, any> | undefined
): Record<string, unknown> {
	return utils.extractRestProps(preset, variants, restProps, defaults);
}
