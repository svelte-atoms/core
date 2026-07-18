import type { PresetEntryRecord } from '$ixirjs/ui/preset';
import type { ResolvedProps } from './cache';
import { foldPresentation } from './fold';

// Thin wrapper over `foldPresentation`: returns the cascade-merged attrs axis
// (defaults → preset → mergedVariants → restProps). Kept as the stable public name.
export function extractRestProps(
	preset: PresetEntryRecord | undefined,
	mergedVariants: ResolvedProps | undefined,
	restProps: Record<string, unknown>,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	defaults?: Record<string, any> | undefined
): Record<string, unknown> {
	return foldPresentation(defaults, preset, mergedVariants, restProps).attrs as Record<
		string,
		unknown
	>;
}

// The implementation lives in shared so authoring helpers can use the same presentation seam
// without introducing a shared → component dependency. This path remains the compatibility export.
export { mergeAtomProps, mergePresetProps } from '../../../shared/bond/presentation-props';
