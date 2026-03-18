import { render } from 'svelte/server';
import Page from './page.svelte';
import { metadata } from '../shared';
import {
	radioProps,
	radioGroupProps
} from '../props';

import type { Frontmatter } from '$docs/md/frontmatter';

const frontmatter: Frontmatter = {
	id: 'radio',
	title: 'Radio Component',
	category: 'components',
	subcategory: 'form',
	depth: 'beginner',
	prerequisites: ['atoms', 'styling'],
	related: ['variants', 'preset'],
};


export function GET() {
	const { body } = render(Page, { props: { data: { frontmatter, metadata, radioProps, radioGroupProps } } });
	const text = body
		.replace(/<!--[\s\S]*?-->/g, '')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&amp;/g, '&');

	return new Response(text, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' }
	});
}
