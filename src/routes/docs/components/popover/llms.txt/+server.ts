import { render } from 'svelte/server';
import Page from './template.svelte';
import { metadata } from '../shared';
import {
	popoverRootProps,
	popoverTriggerProps,
	popoverContentProps,
	popoverArrowProps,
	popoverIndicatorProps
} from '../props';

import type { Frontmatter } from '$docs/md/frontmatter';

const frontmatter: Frontmatter = {
	id: 'popover',
	title: 'Popover Component',
	category: 'components',
	subcategory: 'overlay',
	depth: 'beginner',
	prerequisites: ['atoms', 'styling'],
	related: ['variants', 'preset'],
};


export function GET() {
	const { body } = render(Page, { props: { data: { frontmatter, metadata, popoverRootProps, popoverTriggerProps, popoverContentProps, popoverArrowProps, popoverIndicatorProps } } });
	const text = body
		.replace(/<!--[\s\S]*?-->/g, '')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&amp;/g, '&');

	return new Response(text, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' }
	});
}
