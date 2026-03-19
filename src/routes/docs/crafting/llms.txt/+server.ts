
import Page from './template.svelte';

import type { Frontmatter } from '$docs/md/frontmatter';
import { renderLlmContent } from '$docs/utils/render-llm';

const frontmatter: Frontmatter = {
	id: 'crafting',
	title: 'Crafting Components from Scratch',
	category: 'architecture',
	depth: 'detailed',
	prerequisites: ['philosophy', 'imports'],
	related: ['motion', 'styling', 'variants', 'preset', 'naming-convention', 'composition'],
};

export function GET() {
	const text = renderLlmContent(Page, { frontmatter });

	return new Response(text, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=3600' }
	});
}
