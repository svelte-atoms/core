
import Page from './template.svelte';
import { metadata } from '../shared';
import { collapsibleRootProps } from '../props';

import type { Frontmatter } from '$docs/md/frontmatter';
import { renderLlmContent } from '$docs/utils/render-llm';

const frontmatter: Frontmatter = {
	id: 'collapsible',
	title: 'Collapsible Component',
	category: 'components',
	subcategory: 'interactive',
	depth: 'beginner',
	prerequisites: ['atoms', 'styling'],
	related: ['variants', 'preset'],
};



export function GET() {
	const text = renderLlmContent(Page, { frontmatter, metadata, collapsibleRootProps });

	return new Response(text, {
		headers: { 'Content-Type': 'text/markdown; charset=utf-8' }
	});
}
