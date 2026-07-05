import { untrack } from 'svelte';
import { getPreset } from '$ixirjs/ui/context';
import { resolvePreset } from '$ixirjs/ui/components/atom';
import type { PresetModuleName } from '$ixirjs/ui/context/preset.svelte';
import type { InputBond } from './bond.svelte';

// Resolve an input control's preset record from its preset key. Single source of truth for the
// `resolvePreset(getPreset(untrack(() => presetKey))?.apply(bond, [bond]))` pattern that was
// repeated verbatim across every input control.
// `presetKey` is a getter so the read happens inside `untrack` (preset is computed once, not
// reactively) — mirrors the original inline `untrack(() => presetKey)` and avoids the
// "captures initial value" warning. Its result is `unknown` to mirror the `as PresetModuleName`
// cast — control preset keys are variously typed (string | undefined, the base control's unknown).
export function resolveControlPreset(presetKey: () => unknown, bond: InputBond | undefined) {
	return resolvePreset(getPreset(untrack(presetKey) as PresetModuleName)?.apply(bond, [bond]));
}

// Base field styling shared by the text-like input controls (text, password, base control).
// Single source of truth for the transparent, full-size input field appearance.
export const INPUT_FIELD_CLASS =
	'text-foreground placeholder:text-muted-foreground h-full w-full flex-1 bg-transparent px-2 leading-1 outline-none';

// Single source of truth for writing a text control's value back to the input bond. Routes through
// the bond's InputModel (`bond.value.set`) — the documented general approach — rather than poking
// `bond.state.props.value` directly, so any coercion/notification the model adds stays centralized.
export function writeInputValue(bond: InputBond | undefined, value: string): void {
	bond?.value.set(value);
}

// Typed controls keep richer values on the bindable props surface. These helpers make the
// intentional storage shape explicit and keep direct state writes out of the controls.
export function writeInputRawValue(
	bond: InputBond | undefined,
	value: string | number | Date | undefined
): void {
	if (bond) bond.state.props.value = value;
}

export function writeInputNumber(bond: InputBond | undefined, value: number): void {
	writeInputRawValue(bond, value);
}

export function writeInputFiles(bond: InputBond | undefined, files: File[]): void {
	if (bond) bond.state.props.files = files;
}
