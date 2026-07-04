import type { ResolvedProps } from './cache';
import { foldPresentation } from './fold';
import { mergeSpreadProps } from '../../../shared/bond/merge';

// Thin wrapper over `foldPresentation`: returns the cascade-merged attrs axis
// (defaults → preset → mergedVariants → restProps). Kept as the stable public name.
export function extractRestProps(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	preset: Record<string, any> | undefined,
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

// Single source of truth for the bonded part merge repeated across components. The atom's own spread
// is the base, component rest props are the explicit user layer, and events/attachments compose via
// the deterministic bond merge rules. The resolved preset is the component override falling back to
// the atom's default preset key.
export function mergeAtomProps(
	atom: { preset?: string; spread?: Record<string | symbol, unknown> } | undefined,
	preset: unknown,
	restProps: Record<string, unknown>
): Record<string, unknown> {
	const safeRestProps = stripDefaultLayerProps(restProps);
	return {
		preset: preset ?? atom?.preset,
		...mergeSpreadProps(atom?.spread, safeRestProps, {
			source: atom?.preset ? `atom preset "${atom.preset}"` : 'atom spread',
			nextSource: 'component props',
			nextIsUser: true
		})
	};
}

// Static-preset sibling of `mergeAtomProps` for presentational components with no bond atom:
// the preset falls back to a literal key instead of `atom.preset`, and there is no atom spread.
// Single source of truth for the `{ preset: preset ?? '<key>', ...restProps }` derivation repeated
// across the non-bonded parts (card/alert/calendar/button/badge/…).
export function mergePresetProps(
	preset: unknown,
	defaultPreset: string,
	restProps: Record<string, unknown>
): Record<string, unknown> {
	return {
		preset: preset ?? defaultPreset,
		...stripDefaultLayerProps(restProps)
	};
}

// `defaults` is the internal HtmlAtom low-priority layer. `fallback` is the old name.
// Strip both from component rest props so consumers cannot tunnel the default layer through
// ordinary parts and stale `fallback={{...}}` props do not leak as DOM attributes.
function stripDefaultLayerProps(
	restProps: Record<string, unknown>
): Record<string | symbol, unknown> {
	if (!Object.hasOwn(restProps, 'defaults') && !Object.hasOwn(restProps, 'fallback')) {
		return restProps as Record<string | symbol, unknown>;
	}

	const out: Record<string | symbol, unknown> = {};
	for (const key in restProps) {
		if (!Object.hasOwn(restProps, key)) continue;
		if (key === 'defaults' || key === 'fallback') continue;
		out[key] = restProps[key];
	}
	const symbolProps = restProps as Record<string | symbol, unknown>;
	for (const key of Object.getOwnPropertySymbols(restProps)) out[key] = symbolProps[key];
	return out;
}
