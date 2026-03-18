import { render } from 'svelte/server';
import Page from './page.svelte';
import { metadata } from '../shared';

import type { Frontmatter } from '$docs/md/frontmatter';

export const frontmatter: Frontmatter = {
	id: 'styling',
	title: 'Styling Guide',
	category: 'styling',
	depth: 'intermediate',
	prerequisites: ['atoms'],
	related: ['variants', 'preset', 'motion'],
};



export function GET() {
	const { body } = render(Page, { props: { data: { frontmatter, metadata } } });
	const text = body
		.replace(/<!--[\s\S]*?-->/g, '')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&amp;/g, '&');

	return new Response(text, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' }
	});
}
