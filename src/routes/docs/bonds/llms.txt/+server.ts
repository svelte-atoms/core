import { render } from 'svelte/server';
import Page from './template.svelte';
import { metadata } from '../shared';

import type { Frontmatter } from '$docs/md/frontmatter';

const frontmatter: Frontmatter = {
	id: 'bonds',
	title: 'Bonds Concept',
	category: 'fundamentals',
	depth: 'beginner',
	prerequisites: ['philosophy', 'atoms'],
	related: ['crafting', 'composition'],
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
