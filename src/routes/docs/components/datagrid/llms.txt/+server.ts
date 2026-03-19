
import Page from './template.svelte';
import { metadata } from '../shared';
import {
	datagridRootProps,
	datagridHeaderProps,
	datagridBodyProps,
	datagridFooterProps,
	datagridThProps,
	datagridTdProps,
	datagridCheckboxProps,
	datagridTrProps
} from '../props';

import type { Frontmatter } from '$docs/md/frontmatter';
import { renderLlmContent } from '$docs/utils/render-llm';

const frontmatter: Frontmatter = {
	id: 'datagrid',
	title: 'Datagrid Component',
	category: 'components',
	subcategory: 'display',
	depth: 'beginner',
	prerequisites: ['atoms', 'styling'],
	related: ['variants', 'preset'],
};


export function GET() {
	const text = renderLlmContent(Page, { frontmatter, metadata, datagridRootProps, datagridHeaderProps, datagridBodyProps, datagridFooterProps, datagridThProps, datagridTdProps, datagridCheckboxProps, datagridTrProps });

	return new Response(text, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' }
	});
}
