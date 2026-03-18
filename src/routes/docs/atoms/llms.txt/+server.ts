import { render } from 'svelte/server';
import Page from './template.svelte';
import { metadata } from '../shared';

import type { Frontmatter } from '$docs/md/frontmatter';

const frontmatter: Frontmatter = {
	id: 'atoms',
	title: 'Atoms Concept',
	category: 'fundamentals',
	depth: 'beginner',
	prerequisites: ['philosophy'],
	related: ['bonds', 'crafting'],
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
