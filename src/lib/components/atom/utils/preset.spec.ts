import { describe, expect, it } from 'vitest';
import { mergePresetLayers } from '$ixirjs/ui/context';
import { mergePresetRecords, resolvePreset } from './preset';

describe('resolvePreset', () => {
	it('resolves a record without adding another factory protocol', () => {
		const value = { class: 'foo' };
		expect(resolvePreset(value)).toBe(value);
	});

	it('merges only an explicit merged-layer shape', () => {
		const result = resolvePreset(
			mergePresetLayers(
				{ class: 'a', attrs: { role: 'button' }, defaults: { variant: 'primary' } },
				{ class: 'b', attrs: { role: 'link' }, defaults: { size: 'md' } }
			)
		);
		expect(result).toEqual({
			class: ['a', 'b'],
			attrs: { role: 'link' },
			defaults: { variant: 'primary', size: 'md' }
		});
	});

	it('does not overload arrays with preset semantics', () => {
		const array = [{ class: 'a' }, { class: 'b' }];
		expect(resolvePreset(array as never)).toBe(array);
	});
});

describe('mergePresetRecords', () => {
	it('merges every closed field with deterministic ordering', () => {
		const result = mergePresetRecords([
			{
				class: 'a',
				attrs: { role: 'button', 'data-layer': 'a' },
				variants: { variant: { primary: { class: 'p1' } } },
				compounds: [{ variant: 'a' }],
				defaults: { variant: 'primary' },
				render: { as: 'div' }
			},
			{
				class: 'b',
				attrs: { role: 'link' },
				variants: { variant: { secondary: { class: 's1' } } },
				compounds: [{ variant: 'b' }],
				defaults: { size: 'md' },
				render: { as: 'span' }
			}
		]);

		expect(result).toEqual({
			class: ['a', 'b'],
			attrs: { role: 'link', 'data-layer': 'a' },
			variants: {
				variant: { primary: { class: 'p1' }, secondary: { class: 's1' } }
			},
			compounds: [{ variant: 'a' }, { variant: 'b' }],
			defaults: { variant: 'primary', size: 'md' },
			render: { as: 'span' }
		});
	});

	it('ignores unsupported fields instead of forwarding them', () => {
		const result = mergePresetRecords([
			{ class: 'safe', attachments: ['not-supported'], title: 'leak' } as never,
			{ attrs: { 'data-safe': 'yes' } }
		]);
		expect(result).toEqual({ class: 'safe', attrs: { 'data-safe': 'yes' } });
	});
});
