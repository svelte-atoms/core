
import Page from './template.svelte';

import type { Frontmatter } from '$docs/md/frontmatter';
import { renderLlmContent } from '$docs/utils/render-llm';

const frontmatter: Frontmatter = {
	id: 'motion',
	title: 'Motion System',
	category: 'animation',
	depth: 'intermediate',
	prerequisites: [],
	related: ['styling', 'crafting', 'transitions'],
};



export function GET() {
	const text = renderLlmContent(Page, { frontmatter });

	return new Response(text, {
		headers: { 'Content-Type': 'text/markdown; charset=utf-8',
			'Cache-Control': 'public, max-age=3600' }
	});
}
