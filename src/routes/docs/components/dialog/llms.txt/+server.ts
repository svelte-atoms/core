
import Page from './template.svelte';
import { metadata } from '../shared';
import {
	dialogProps,
	dialogContentProps,
	dialogHeaderProps,
	dialogBodyProps,
	dialogFooterProps,
	dialogTitleProps,
	dialogDescriptionProps,
	dialogCloseButtonProps
} from '../props';

import type { Frontmatter } from '$docs/md/frontmatter';
import { renderLlmContent } from '$docs/utils/render-llm';

const frontmatter: Frontmatter = {
	id: 'dialog',
	title: 'Dialog Component',
	category: 'components',
	subcategory: 'overlay',
	depth: 'beginner',
	prerequisites: ['atoms', 'styling'],
	related: ['variants', 'preset'],
};


export function GET() {
	const text = renderLlmContent(Page, { frontmatter, metadata, dialogProps, dialogContentProps, dialogHeaderProps, dialogBodyProps, dialogFooterProps, dialogTitleProps, dialogDescriptionProps, dialogCloseButtonProps });

	return new Response(text, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' }
	});
}
