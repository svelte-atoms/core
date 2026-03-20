
import Page from './template.svelte';
import { metadata } from '../shared';
import {
	listRootProps,
	listGroupProps,
	listItemProps,
	listTitleProps,
	listDividerProps
} from '../props';

import type { Frontmatter } from '$docs/md/frontmatter';
import { renderLlmContent } from '$docs/utils/render-llm';

const frontmatter: Frontmatter = {
	id: 'list',
	title: 'List Component',
	category: 'components',
	subcategory: 'layout',
	depth: 'beginner',
	prerequisites: ['atoms', 'styling'],
	related: ['variants', 'preset'],
};


export function GET() {
	const text = renderLlmContent(Page, { frontmatter, metadata, listRootProps, listGroupProps, listItemProps, listTitleProps, listDividerProps });

	return new Response(text, {
		headers: { 'Content-Type': 'text/markdown; charset=utf-8' }
	});
}
