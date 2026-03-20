
import Page from './template.svelte';
import { metadata } from '../shared';
import {
	tabsRootProps,
	tabHeaderProps,
	tabBodyProps,
	tabDescriptionProps,
	tabsHeaderProps,
	tabsBodyProps,
	tabsContentProps
} from '../props';

import type { Frontmatter } from '$docs/md/frontmatter';
import { renderLlmContent } from '$docs/utils/render-llm';

const frontmatter: Frontmatter = {
	id: 'tabs',
	title: 'Tabs Component',
	category: 'components',
	subcategory: 'navigation',
	depth: 'beginner',
	prerequisites: ['atoms', 'styling'],
	related: ['variants', 'preset'],
};


export function GET() {
	const text = renderLlmContent(Page, { frontmatter, metadata, tabsRootProps, tabHeaderProps, tabBodyProps, tabDescriptionProps, tabsHeaderProps, tabsBodyProps, tabsContentProps });

	return new Response(text, {
		headers: { 'Content-Type': 'text/markdown; charset=utf-8' }
	});
}
