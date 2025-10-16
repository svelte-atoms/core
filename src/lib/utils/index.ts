export { type StateDefiner, defineProperty, defineState } from './state';

import type { ClassValue as SvelteClassValue } from 'svelte/elements';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export type ClassValueFunction = <T = unknown>(this: T, ...args: unknown[]) => SvelteClassValue;
export type ClassValue = SvelteClassValue | ClassValueFunction | undefined;

export function cn(...inputs: SvelteClassValue[]) {
	return twMerge(clsx(...inputs));
}

export function toClassValue(
	this: unknown,
	input: ClassValue | ClassValueFunction | undefined,
	...args: unknown[]
): SvelteClassValue {
	if (typeof input === 'function') {
		return (input as ClassValueFunction).apply(this, args);
	}

	return input ?? '';
}
