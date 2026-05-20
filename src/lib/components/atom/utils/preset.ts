import { call } from '$svelte-atoms/core/utils/function';

/**
 * Resolves a preset to its concrete value, unwrapping one or two levels of factory functions.
 *
 * - If `preset` is a plain value, it is returned as-is.
 * - If it is a zero-arg function, the function is called and its return value is returned.
 * - If calling it yields another function (deferred/lazy preset), that function is called too.
 */
export function resolvePreset<T>(preset: T | (() => T) | undefined): T | undefined {
	if (!preset) return undefined;
	const result = call(preset);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return typeof result === 'function' ? (result as any)() : result;
}
