import { describe, expect, it, vi } from 'vitest';
import { resolvePreset } from './preset';

describe('resolvePreset', () => {
	it('returns undefined for falsy input', () => {
		expect(resolvePreset(undefined)).toBeUndefined();
		expect(resolvePreset(null as unknown as undefined)).toBeUndefined();
	});

	it('returns a plain value as-is', () => {
		const value = { class: 'foo' };
		expect(resolvePreset(value)).toBe(value);
	});

	it('unwraps a single factory function', () => {
		const value = { class: 'foo' };
		expect(resolvePreset(() => value)).toBe(value);
	});

	it('unwraps two levels of factory functions (deferred preset)', () => {
		const value = { class: 'foo' };
		expect(resolvePreset(() => () => value)).toBe(value);
	});

	it('calls the factory only once per resolvePreset call', () => {
		const factory = vi.fn(() => ({ class: 'bar' }));
		resolvePreset(factory);
		expect(factory).toHaveBeenCalledTimes(1);
	});
});
