import { describe, expect, it } from 'vitest';
import { mergeClassesWithPreset } from './classes';

describe('mergeClassesWithPreset', () => {
	it('merges user and variant classes without a placeholder', () => {
		const result = mergeClassesWithPreset('text-sm', 'bg-white', 'font-bold');
		expect(result).toBe('text-sm font-bold');
	});

	it('injects preset class at $preset placeholder position', () => {
		const result = mergeClassesWithPreset('text-sm $preset rounded', 'bg-white', undefined);
		expect(result).toBe('text-sm bg-white rounded');
	});

	it('appends variant class after preset when using placeholder', () => {
		const result = mergeClassesWithPreset('$preset', 'bg-white', 'font-bold');
		expect(result).toBe('bg-white font-bold');
	});

	it('only uses the last $preset occurrence as the injection point', () => {
		const result = mergeClassesWithPreset('a $preset b $preset c', 'PRESET', undefined);
		// first $preset is treated as literal text; last one is the injection point
		expect(result).toContain('PRESET');
		expect(result).toContain('c');
	});

	it('handles undefined userClass gracefully', () => {
		const result = mergeClassesWithPreset(undefined, 'bg-white', 'font-bold');
		expect(result).toBe('font-bold');
	});

	it('handles all-undefined inputs without throwing', () => {
		const result = mergeClassesWithPreset(undefined, undefined, undefined);
		expect(result).toBe('');
	});
});
