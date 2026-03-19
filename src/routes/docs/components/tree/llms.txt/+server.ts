
import Page from './template.svelte';
import { metadata } from '../shared';
import {
	treeRootProps,
	treeHeaderProps,
	treeBodyProps
} from '../props';

import type { Frontmatter } from '$docs/md/frontmatter';
import { renderLlmContent } from '$docs/utils/render-llm';

const frontmatter: Frontmatter = {
	id: 'tree',
	title: 'Tree Component',
	category: 'components',
	subcategory: 'display',
	depth: 'beginner',
	prerequisites: ['atoms', 'styling'],
	related: ['variants', 'preset'],
};


export function GET() {
	const text = renderLlmContent(Page, { frontmatter, metadata, treeRootProps, treeHeaderProps, treeBodyProps });

	return new Response(text, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' }
	});
}
