import { describe, expect, it } from 'vitest';
import { render } from 'svelte/server';
import PresetContextProbe from '$ixirjs/ui/test/context/preset-context.test.svelte';

describe('preset context', () => {
	it('installs during initialization and layers entries explicitly', () => {
		const { body } = render(PresetContextProbe);
		expect(body).toContain('data-class="base override"');
		expect(body).toContain('data-base="yes"');
		expect(body).toContain('data-layer="yes"');
		expect(body).toContain('data-role="link"');
	});
});
