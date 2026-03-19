
import Page from './template.svelte';
import { metadata } from '../shared';
import {
	popoverRootProps,
	popoverTriggerProps,
	popoverContentProps,
	popoverArrowProps,
	popoverIndicatorProps
} from '../props';

import type { Frontmatter } from '$docs/md/frontmatter';
import { renderLlmContent } from '$docs/utils/render-llm';

const frontmatter: Frontmatter = {
	id: 'popover',
	title: 'Popover Component',
	category: 'components',
	subcategory: 'overlay',
	depth: 'beginner',
	prerequisites: ['atoms', 'styling'],
	related: ['variants', 'preset'],
};


export function GET() {
	const text = renderLlmContent(Page, { frontmatter, metadata, popoverRootProps, popoverTriggerProps, popoverContentProps, popoverArrowProps, popoverIndicatorProps });

	return new Response(text, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' }
	});
}
