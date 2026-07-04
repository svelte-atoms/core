import { describe, expect, it } from 'vitest';
import { render } from 'svelte/server';
import PresetAliasProbe from '$svelte-atoms/core/test/context/preset-alias.test.svelte';

describe('preset aliases', () => {
	it('canonicalizes deprecated close-button overrides so canonical lookups see them', () => {
		const { body } = render(PresetAliasProbe);

		expect(body).toContain('data-canonical="legacy-override"');
		expect(body).toContain('data-legacy="legacy-override"');
		expect(body).toContain('data-has-legacy="no"');
	});
});
