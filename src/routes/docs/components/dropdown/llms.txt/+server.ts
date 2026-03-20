
import Page from './template.svelte';
import { metadata } from '../shared';
import {
	dropdownRootProps,
	dropdownTriggerProps,
	dropdownItemProps,
	dropdownQueryProps,
	dropdownSelectionsProps,
	dropdownSelectionProps
} from '../props';

import type { Frontmatter } from '$docs/md/frontmatter';
import { renderLlmContent } from '$docs/utils/render-llm';

const frontmatter: Frontmatter = {
	id: 'dropdown',
	title: 'Dropdown Component',
	category: 'components',
	subcategory: 'overlay',
	depth: 'beginner',
	prerequisites: ['atoms', 'styling'],
	related: ['variants', 'preset'],
};


export function GET() {
	const text = renderLlmContent(Page, { frontmatter, metadata, dropdownRootProps, dropdownTriggerProps, dropdownItemProps, dropdownQueryProps, dropdownSelectionsProps, dropdownSelectionProps });

	return new Response(text, {
		headers: { 'Content-Type': 'text/markdown; charset=utf-8' }
	});
}
