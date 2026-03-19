
import Page from './template.svelte';

import type { Frontmatter } from '$docs/md/frontmatter';
import { renderLlmContent } from '$docs/utils/render-llm';

const frontmatter: Frontmatter = {
	id: 'preset-variant-integration',
	title: 'Preset-Variant Integration',
	category: 'styling',
	depth: 'detailed',
	prerequisites: ['preset', 'variants'],
	related: ['styling', 'crafting'],
};



export function GET() {
	const text = renderLlmContent(Page, { frontmatter });

	return new Response(text, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=3600' }
	});
}
