import { cn, type ClassValue } from '$ixirjs/ui/utils';

/**
 * Merges user-supplied class, preset class, and resolved variant class into a
 * single Tailwind-safe class string.
 *
 * Supports the special `$preset` placeholder inside the user class string, which
 * lets the caller control exactly where the preset classes are injected.
 *
 * Rules:
 * - No `$preset` → normal merge: `cn(userClass, variantClass)`.
 * - Has `$preset` → only the **last** occurrence acts as the injection point:
 *   `beforePlaceholder + presetClass + variantClass + afterPlaceholder`.
 */
export function mergeClassesWithPreset(
	userClass: string | ClassValue | undefined,
	presetClass: ClassValue | undefined,
	variantClass: ClassValue | undefined
): string {
	// Fast path: user class is a plain string and contains no `$preset` placeholder
	// — by far the most common case. Skip the prelim `cn()` call entirely.
	if (typeof userClass === 'string') {
		if (userClass.indexOf('$preset') === -1) {
			return cn(userClass, variantClass ?? '');
		}
	} else if (userClass == null) {
		return cn(variantClass ?? '');
	} else {
		// Non-string ClassValue (array/object) — must run through `cn()` first
		// to detect a `$preset` placeholder potentially nested inside.
		const merged = cn(userClass);
		if (merged.indexOf('$preset') === -1) {
			return cn(merged, variantClass ?? '');
		}
		const lastIdx = merged.lastIndexOf('$preset');
		return cn(
			merged.slice(0, lastIdx),
			cn(presetClass),
			variantClass ?? '',
			merged.slice(lastIdx + '$preset'.length)
		);
	}

	// Slow path: `$preset` placeholder resolution for string `userClass`.
	const klassStr = userClass as string;
	const lastIdx = klassStr.lastIndexOf('$preset');
	const beforeLastPlaceholder = klassStr.slice(0, lastIdx);
	const afterLastPlaceholder = klassStr.slice(lastIdx + '$preset'.length);
	const presetClassString = cn(presetClass);

	return cn(beforeLastPlaceholder, presetClassString, variantClass ?? '', afterLastPlaceholder);
}
