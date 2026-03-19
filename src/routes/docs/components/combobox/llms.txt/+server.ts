
import Page from './template.svelte';
import { metadata } from '../shared';
import {
	comboboxRootProps,
	comboboxSelectionsProps,
	comboboxSelectionProps,
	comboboxControlProps
} from '../props';

import type { Frontmatter } from '$docs/md/frontmatter';
import { renderLlmContent } from '$docs/utils/render-llm';

const frontmatter: Frontmatter = {
	id: 'combobox',
	title: 'Combobox Component',
	category: 'components',
	subcategory: 'form',
	depth: 'beginner',
	prerequisites: ['atoms', 'styling'],
	related: ['variants', 'preset'],
};


export function GET() {
	const text = renderLlmContent(Page, { frontmatter, metadata, comboboxRootProps, comboboxSelectionsProps, comboboxSelectionProps, comboboxControlProps });

	return new Response(text, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' }
	});
}
