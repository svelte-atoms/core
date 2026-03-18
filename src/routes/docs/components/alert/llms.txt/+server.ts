import { render } from 'svelte/server';
import Page from './page.svelte';
import { metadata } from '../shared';
import {
	alertRootProps,
	alertSubPartProps
} from '../props';

import type { Frontmatter } from '$docs/md/frontmatter';

export const frontmatter: Frontmatter = {
	id: 'alert',
	title: 'Alert Component',
	category: 'components',
	subcategory: 'interactive',
	depth: 'beginner',
	prerequisites: ['atoms', 'styling'],
	related: ['variants', 'preset'],
};


export function GET() {
	const { body } = render(Page, { props: { data: { frontmatter, metadata, alertRootProps, alertSubPartProps } } });
	const text = body
		.replace(/<!--[\s\S]*?-->/g, '')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&amp;/g, '&');

	return new Response(text, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' }
	});
}
