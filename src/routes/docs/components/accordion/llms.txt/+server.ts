
import Page from './template.svelte';
import { metadata } from '../shared';
import {
	accordionRootProps,
	accordionItemRootProps,
	accordionItemHeaderProps,
	accordionItemBodyProps,
	accordionItemIndicatorProps
} from '../props';

import type { Frontmatter } from '$docs/md/frontmatter';
import { renderLlmContent } from '$docs/utils/render-llm';

const frontmatter: Frontmatter = {
	id: 'accordion',
	title: 'Accordion Component',
	category: 'components',
	subcategory: 'interactive',
	depth: 'beginner',
	prerequisites: ['atoms', 'styling'],
	related: ['variants', 'preset'],
};


export function GET() {
	const text = renderLlmContent(Page, { frontmatter, metadata, accordionRootProps, accordionItemRootProps, accordionItemHeaderProps, accordionItemBodyProps, accordionItemIndicatorProps });

	return new Response(text, {
		headers: { 'Content-Type': 'text/markdown; charset=utf-8' }
	});
}
