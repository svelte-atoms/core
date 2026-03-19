
import Page from './template.svelte';
import { metadata } from '../shared';
import {
	selectRootProps,
	selectTriggerProps,
	selectItemProps,
	selectQueryProps,
	selectSelectionsProps,
	selectSelectionProps
} from '../props';

import type { Frontmatter } from '$docs/md/frontmatter';
import { renderLlmContent } from '$docs/utils/render-llm';

const frontmatter: Frontmatter = {
	id: 'select',
	title: 'Select Component',
	category: 'components',
	subcategory: 'overlay',
	depth: 'beginner',
	prerequisites: ['atoms', 'styling'],
	related: ['variants', 'preset'],
};


export function GET() {
	const text = renderLlmContent(Page, { frontmatter, metadata, selectRootProps, selectTriggerProps, selectItemProps, selectQueryProps, selectSelectionsProps, selectSelectionProps });

	return new Response(text, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' }
	});
}
