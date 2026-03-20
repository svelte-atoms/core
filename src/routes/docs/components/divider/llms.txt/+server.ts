
import Page from './template.svelte';
import { metadata } from '../shared';
import { dividerProps } from '../props';

import type { Frontmatter } from '$docs/md/frontmatter';
import { renderLlmContent } from '$docs/utils/render-llm';

const frontmatter: Frontmatter = {
	id: 'divider',
	title: 'Divider Component',
	category: 'components',
	subcategory: 'layout',
	depth: 'beginner',
	prerequisites: ['atoms', 'styling'],
	related: ['variants', 'preset'],
};



export function GET() {
	const text = renderLlmContent(Page, { frontmatter, metadata, dividerProps });

	return new Response(text, {
		headers: { 'Content-Type': 'text/markdown; charset=utf-8' }
	});
}
