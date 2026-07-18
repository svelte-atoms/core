import { describe, expect, it } from 'vitest';
import { fallbackPreset, type PresetEntry } from '$ixirjs/ui/context';
import * as resolvers from './resolvers';

describe('presentation precedence', () => {
	it('applies defaults < preset attrs < variants < consumer props', () => {
		const out = resolvers.resolveRestProps(
			{ attrs: { 'data-tier': 'preset', 'data-preset': true } },
			{ class: [], 'data-tier': 'variant' },
			{ 'data-tier': 'consumer' },
			{ 'data-tier': 'defaults', 'data-default': true }
		);
		expect(out).toMatchObject({
			'data-tier': 'consumer',
			'data-preset': true,
			'data-default': true
		});
	});
});

describe('render configuration', () => {
	it('lets the caller override namespaced preset render values', () => {
		const preset = { render: { base: 'preset-base' as never, as: 'div' } };
		expect(resolvers.resolveBase('caller', preset)).toBe('caller');
		expect(resolvers.resolveAs('section', preset)).toBe('section');
	});

	it('uses namespaced preset render values when caller values are absent', () => {
		const preset = { render: { base: 'preset-base' as never, as: 'div' } };
		expect(resolvers.resolveBase(undefined, preset)).toBe('preset-base');
		expect(resolvers.resolveAs(undefined, preset)).toBe('div');
	});
});

describe('preset selection', () => {
	const registry: Record<string, PresetEntry> = {
		'popover.tail': () => ({ class: 'origin' }),
		'combobox.content': () => ({ class: 'namespaced' })
	};
	const getPreset = (key: string) => registry[key];

	it('resolves one key', () => {
		expect(resolvers.resolvePreset('popover.tail', undefined, getPreset)?.class).toBe('origin');
	});

	it('uses an explicit fallback selection in order', () => {
		expect(
			resolvers.resolvePreset(
				fallbackPreset('select.content', 'popover.tail'),
				undefined,
				getPreset
			)?.class
		).toBe('origin');
	});

	it('does not invoke later fallbacks after a hit', () => {
		expect(
			resolvers.resolvePreset(
				fallbackPreset('combobox.content', 'popover.tail'),
				undefined,
				getPreset
			)?.class
		).toBe('namespaced');
	});
});
