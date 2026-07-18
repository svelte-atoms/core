import type { Bond } from '$ixirjs/ui/shared';
import type { PresetKey, PresetEntryRecord } from '$ixirjs/ui/preset';
import type { ClassValue } from 'svelte/elements';
import type { Variants } from './types';
import * as resolvers from './resolvers';
import { getPreset } from '$ixirjs/ui/context';

/**
 * Shared presentation seam for full and lightweight renderers.
 *
 * Call this during component initialization. The returned getters intentionally expose the
 * derived values without copying the caller's rest-props proxy; each resolver remains tracked at
 * the component-owned boundary.
 */
export type PresentationOptions = {
	preset?: () => PresetKey | undefined;
	bond?: () => Bond | undefined;
	variants?: () => Variants | undefined;
	defaults?: () => Record<string, unknown> | undefined;
	class?: (() => ClassValue | null | undefined) | undefined;
	as?: (() => unknown) | undefined;
	base?: (() => unknown) | undefined;
	/** Additional known component props used to select preset variants without leaking them as attrs. */
	variantProps?: (() => Record<string, unknown>) | undefined;
	restProps: () => Record<string, unknown>;
};

export type PresentationView = {
	readonly preset: PresetEntryRecord | undefined;
	readonly class: string;
	readonly attrs: Record<string | symbol, unknown>;
	readonly as: unknown;
	readonly base: unknown;
};

export function createPresentation(options: PresentationOptions): PresentationView {
	const preset = $derived.by(() =>
		resolvers.resolvePreset(options.preset?.(), options.bond?.(), getPreset)
	);
	const variantProps = $derived.by(() => {
		const additional = options.variantProps?.();
		if (!additional) return options.restProps();
		return { ...options.restProps(), ...additional };
	});
	const localVariants = $derived(
		resolvers.resolveLocalVariants(options.variants?.(), options.bond?.(), variantProps)
	);
	const mergedVariants = $derived.by(() =>
		resolvers.resolveVariants(preset, localVariants, options.bond?.(), variantProps)
	);
	const folded = $derived.by(() =>
		resolvers.foldLayers(preset, mergedVariants, options.restProps(), options.defaults?.())
	);

	return {
		get preset() {
			return preset;
		},
		get class() {
			return resolvers.resolveClass(options.class?.(), folded);
		},
		get attrs() {
			return folded.attrs;
		},
		get as() {
			return resolvers.resolveAs(options.as?.(), preset);
		},
		get base() {
			return resolvers.resolveBase(options.base?.(), preset);
		}
	};
}
