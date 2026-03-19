
import Page from './template.svelte';
import { metadata } from '../shared';
import {
	slideoverRootProps,
	slideoverContentProps,
	slideoverHeaderProps,
	drawerBodyProps,
	slideoverFooterProps,
	slideoverTitleProps,
	slideoverDescriptionProps,
	slideoverBackdropProps
} from '../props';

import type { Frontmatter } from '$docs/md/frontmatter';
import { renderLlmContent } from '$docs/utils/render-llm';

const frontmatter: Frontmatter = {
	id: 'drawer',
	title: 'Drawer Component',
	category: 'components',
	subcategory: 'overlay',
	depth: 'beginner',
	prerequisites: ['atoms', 'styling'],
	related: ['variants', 'preset'],
};


export function GET() {
	const text = renderLlmContent(Page, { frontmatter, metadata, slideoverRootProps, slideoverContentProps, slideoverHeaderProps, drawerBodyProps, slideoverFooterProps, slideoverTitleProps, slideoverDescriptionProps, slideoverBackdropProps });

	return new Response(text, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' }
	});
}
