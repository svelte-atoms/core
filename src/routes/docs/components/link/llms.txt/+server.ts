
import Page from './template.svelte';
import { metadata } from '../shared';
import { linkProps } from '../props';

import type { Frontmatter } from '$docs/md/frontmatter';
import { renderLlmContent } from '$docs/utils/render-llm';

const frontmatter: Frontmatter = {
	id: 'link',
	title: 'Link Component',
	category: 'components',
	subcategory: 'navigation',
	depth: 'beginner',
	prerequisites: ['atoms', 'styling'],
	related: ['variants', 'preset'],
};



export function GET() {
	const text = renderLlmContent(Page, { frontmatter, metadata, linkProps });

	return new Response(text, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' }
	});
}
