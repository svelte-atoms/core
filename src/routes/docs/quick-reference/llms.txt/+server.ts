import { render } from 'svelte/server';
import Page from './page.svelte';

import type { Frontmatter } from '$docs/md/frontmatter';

export const frontmatter: Frontmatter = {
	id: 'quick-reference',
	title: 'Quick Reference',
	category: 'reference',
	depth: 'foundational',
	prerequisites: [],
	related: ['overview', 'usage'],
};



export function GET() {
	const { body } = render(Page, { props: { data: { frontmatter } } });
	const text = body
		.replace(/<!--[\s\S]*?-->/g, '')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&amp;/g, '&');

	return new Response(text, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=3600' }
	});
}
