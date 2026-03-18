import { render } from 'svelte/server';
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
	const { body } = render(Page, { props: { data: { frontmatter, metadata, datagridRootProps, datagridHeaderProps, datagridBodyProps, datagridFooterProps, datagridThProps, datagridTdProps, datagridCheckboxProps, datagridTrProps } } });
	const text = body
		.replace(/<!--[\s\S]*?-->/g, '')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&amp;/g, '&');

	return new Response(text, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' }
	});
}
