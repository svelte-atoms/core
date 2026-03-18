import { render } from 'svelte/server';
import Page from './page.svelte';
import { metadata } from '../shared';
import { linkProps } from '../props';

import type { Frontmatter } from '$docs/md/frontmatter';

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
	const { body } = render(Page, { props: { data: { frontmatter, metadata, linkProps } } });
	const text = body
		.replace(/<!--[\s\S]*?-->/g, '')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&amp;/g, '&');

	return new Response(text, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' }
	});
}
