
import Page from './template.svelte';
import { metadata } from '../shared';
import { buttonProps } from '../props';

import type { Frontmatter } from '$docs/md/frontmatter';
import { renderLlmContent } from '$docs/utils/render-llm';

const frontmatter: Frontmatter = {
	id: 'button',
	title: 'Button Component',
	category: 'components',
	subcategory: 'form',
	depth: 'beginner',
	prerequisites: ['atoms', 'styling'],
	related: ['variants', 'preset'],
};



export function GET() {
	const text = renderLlmContent(Page, { frontmatter, metadata, buttonProps });

	return new Response(text, {
		headers: { 'Content-Type': 'text/markdown; charset=utf-8' }
	});
}
