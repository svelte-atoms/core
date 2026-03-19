
import Page from './template.svelte';

import type { Frontmatter } from '$docs/md/frontmatter';
import { renderLlmContent } from '$docs/utils/render-llm';

const frontmatter: Frontmatter = {
	id: 'variants',
	title: 'Variants System',
	category: 'styling',
	depth: 'intermediate',
	prerequisites: ['styling'],
	related: ['preset', 'motion'],
};



export function GET() {
	const text = renderLlmContent(Page, { frontmatter });

	return new Response(text, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=3600' }
	});
}
