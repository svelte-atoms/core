import type { Bond, BondStateProps } from '$lib/shared/bond.svelte';

/**
 * Deeply merges type U into T, overriding conflicting properties
 * Provides better IntelliSense and handles edge cases
 */
export type Override<T, U> = Omit<T, keyof U> & U;

/**
 * Alternative: Partial override that maintains optional properties
 */
export type PartialOverride<T, U extends Partial<T>> = Omit<T, keyof U> & U;

/**
 * Alternative: Deep override for nested objects
 */
export type DeepOverride<T, U> = U extends object
	? T extends object
		? {
				[K in keyof T | keyof U]: K extends keyof U ? U[K] : K extends keyof T ? T[K] : never;
			}
		: U
	: U;

export type Factory<T extends Bond> = (props?: BondStateProps) => T;
