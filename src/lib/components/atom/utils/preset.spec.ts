import { describe, expect, it, vi } from 'vitest';
import { mergePresetRecords, resolvePreset } from './preset';

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

	it('merges an array of records', () => {
		const result = resolvePreset([
			{ class: 'a', defaults: { variant: 'primary' } },
			{ class: 'b', defaults: { size: 'md' } }
		]);
		expect(result).toEqual({
			class: ['a', 'b'],
			defaults: { variant: 'primary', size: 'md' }
		});
	});

	it('unwraps factories inside arrays before merging', () => {
		const result = resolvePreset([{ class: 'a' }, () => ({ class: 'b' })]);
		expect(result).toEqual({ class: ['a', 'b'] });
	});

	it('returns undefined for an empty array', () => {
		expect(resolvePreset([])).toBeUndefined();
	});

	it('returns the single record unchanged for a one-item array', () => {
		const value = { class: 'foo' };
		expect(resolvePreset([value])).toBe(value);
	});
});

describe('mergePresetRecords', () => {
	it('concatenates compounds and attachments', () => {
		const result = mergePresetRecords([
			{ compounds: [{ variant: 'a' }] },
			{ compounds: [{ variant: 'b' }] }
		]);
		expect(result?.compounds).toEqual([{ variant: 'a' }, { variant: 'b' }]);
	});

	it('lets later entries override earlier ones for as/base', () => {
		const result = mergePresetRecords([
			{ as: 'div', class: 'a' },
			{ as: 'span', class: 'b' }
		]);
		expect(result?.as).toBe('span');
		expect(result?.class).toEqual(['a', 'b']);
	});

	it('deep-merges variants', () => {
		const result = mergePresetRecords([
			{ variants: { variant: { primary: { class: 'p1' } } } },
			{ variants: { variant: { secondary: { class: 's1' } } } }
		]);
		expect(result?.variants).toEqual({
			variant: { primary: { class: 'p1' }, secondary: { class: 's1' } }
		});
	});
});
