import { render } from 'svelte/server';
import Page from './page.svelte';

import type { Frontmatter } from '$docs/md/frontmatter';

const frontmatter: Frontmatter = {
	id: 'crafting',
	title: 'Crafting Components from Scratch',
	category: 'architecture',
	depth: 'detailed',
	prerequisites: ['philosophy', 'imports'],
	related: ['motion', 'styling', 'variants', 'preset', 'naming-convention', 'composition'],
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
