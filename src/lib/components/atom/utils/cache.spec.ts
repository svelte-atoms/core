import { describe, expect, it } from 'vitest';
import { getCacheMap, hasOwnKeys } from './cache';

describe('getCacheMap', () => {
	it('returns the same Map for the same bond reference', () => {
		const bond = {} as object;
		expect(getCacheMap(bond)).toBe(getCacheMap(bond));
	});

	it('returns different Maps for different bonds', () => {
		const a = {} as object;
		const b = {} as object;
		expect(getCacheMap(a)).not.toBe(getCacheMap(b));
	});

	it('returns a shared flat Map for null/undefined (bond-less calls)', () => {
		expect(getCacheMap(null)).toBe(getCacheMap(null));
		expect(getCacheMap(undefined)).toBe(getCacheMap(undefined));
		expect(getCacheMap(null)).toBe(getCacheMap(undefined));
	});
});

describe('hasOwnKeys', () => {
	it('returns false for an empty object', () => {
		expect(hasOwnKeys({})).toBe(false);
	});

	it('returns true when the object has at least one own key', () => {
		expect(hasOwnKeys({ a: 1 })).toBe(true);
	});

	it('returns false for an object with only inherited keys', () => {
		const parent = { inherited: true };
		const child = Object.create(parent) as object;
		expect(hasOwnKeys(child)).toBe(false);
	});
});
