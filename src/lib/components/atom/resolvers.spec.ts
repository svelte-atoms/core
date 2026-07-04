import { describe, expect, it } from 'vitest';
import * as resolvers from './resolvers';

// Pins the documented cascade order:
//     defaults → preset → variants → restProps   (each later wins)
// Load-bearing contract for resolvers.ts — change merge order → update these + CONTEXT.md.

describe('presentation stages — precedence contract', () => {
	it('restProps overrides variants (variants → restProps)', () => {
		// No preset, no defaults — just variants vs restProps.
		const out = resolvers.resolveRestProps(
			undefined,
			{ class: [], 'data-color': 'variant-blue' } as never,
			{ 'data-color': 'rest-red' },
			undefined
		);
		expect(out['data-color']).toBe('rest-red');
	});

	it('variants override preset (preset → variants)', () => {
		const preset = { 'data-color': 'preset-green' } as never;
		const merged = { class: [], 'data-color': 'variant-blue' } as never;
		const out = resolvers.resolveRestProps(preset, merged, {}, undefined);
		expect(out['data-color']).toBe('variant-blue');
	});

	it('preset overrides defaults (defaults → preset)', () => {
		const preset = { 'data-color': 'preset-green' } as never;
		const defaults = { 'data-color': 'default-grey' };
		const out = resolvers.resolveRestProps(preset, undefined, {}, defaults);
		expect(out['data-color']).toBe('preset-green');
	});

	it('full cascade: defaults < preset < variants < restProps', () => {
		const defaults = { 'data-tier': 'defaults' };
		const preset = { 'data-tier': 'preset' } as never;
		const merged = { class: [], 'data-tier': 'variant' } as never;
		const rest = { 'data-tier': 'rest' };

		const out = resolvers.resolveRestProps(preset, merged, rest, defaults);
		expect(out['data-tier']).toBe('rest');
	});

	it('defaults are preserved for keys not overridden later', () => {
		const defaults = { 'data-default-only': 'present' };
		const preset = { 'data-other': 'preset' } as never;
		const out = resolvers.resolveRestProps(preset, undefined, {}, defaults);
		expect(out['data-default-only']).toBe('present');
		expect(out['data-other']).toBe('preset');
	});
});

describe('presentation stages — resolveBase / resolveAs precedence', () => {
	it('caller-supplied base wins over preset.base', () => {
		const out = resolvers.resolveBase('caller', { base: 'preset' } as never);
		expect(out).toBe('caller');
	});

	it('preset.base wins when caller passes undefined', () => {
		const out = resolvers.resolveBase(undefined, { base: 'preset' } as never);
		expect(out).toBe('preset');
	});

	it('caller-supplied `as` wins over preset.as', () => {
		const out = resolvers.resolveAs('section', { as: 'div' } as never);
		expect(out).toBe('section');
	});

	it('preset.as wins when caller passes undefined', () => {
		const out = resolvers.resolveAs(undefined, { as: 'div' } as never);
		expect(out).toBe('div');
	});
});

describe('presentation stages — resolvePreset short-circuits', () => {
	it('returns undefined when presetKey is undefined', () => {
		const out = resolvers.resolvePreset(undefined, undefined, () => undefined);
		expect(out).toBeUndefined();
	});

	it('returns undefined when the preset registry has no entry', () => {
		const out = resolvers.resolvePreset('missing.key', undefined, () => undefined);
		expect(out).toBeUndefined();
	});
});

describe('presentation stages — resolvePreset fallback chains', () => {
	const registry: Record<string, () => { class: string }> = {
		'popover.arrow': () => ({ class: 'origin' }),
		'combobox.arrow': () => ({ class: 'namespaced' })
	};
	const getPreset = (key: string) => registry[key];

	it('resolves a single-string key (unchanged behavior)', () => {
		const out = resolvers.resolvePreset('popover.arrow', undefined, getPreset);
		expect(out?.class).toBe('origin');
	});

	it('first registered key in the chain wins', () => {
		const out = resolvers.resolvePreset(['combobox.arrow', 'popover.arrow'], undefined, getPreset);
		expect(out?.class).toBe('namespaced');
	});

	it('falls back to the next key when the first is unregistered', () => {
		const out = resolvers.resolvePreset(['select.arrow', 'popover.arrow'], undefined, getPreset);
		expect(out?.class).toBe('origin');
	});

	it('returns undefined when no key in the chain is registered', () => {
		const out = resolvers.resolvePreset(['a.x', 'b.x'], undefined, getPreset);
		expect(out).toBeUndefined();
	});
});

describe('presentation stages — isSnippetBase', () => {
	it('returns false for plain values', () => {
		expect(resolvers.isSnippetBase(undefined)).toBe(false);
		expect(resolvers.isSnippetBase('div')).toBe(false);
		expect(resolvers.isSnippetBase({})).toBe(false);
	});
});
