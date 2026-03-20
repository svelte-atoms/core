
import Page from './template.svelte';
import { metadata } from '../shared';
import {
	stepperRootProps,
	stepperHeaderProps,
	stepperBodyProps,
	stepperContentProps,
	stepperFooterProps,
	stepRootProps,
	stepHeaderProps,
	stepIndicatorProps,
	stepTitleProps,
	stepDescriptionProps,
	stepSeparatorProps,
	stepBodyProps
} from '../props';

import type { Frontmatter } from '$docs/md/frontmatter';
import { renderLlmContent } from '$docs/utils/render-llm';

const frontmatter: Frontmatter = {
	id: 'stepper',
	title: 'Stepper Component',
	category: 'components',
	subcategory: 'interactive',
	depth: 'beginner',
	prerequisites: ['atoms', 'styling'],
	related: ['variants', 'preset'],
};


export function GET() {
	const text = renderLlmContent(Page, { frontmatter, metadata, stepperRootProps, stepperHeaderProps, stepperBodyProps, stepperContentProps, stepperFooterProps, stepRootProps, stepHeaderProps, stepIndicatorProps, stepTitleProps, stepDescriptionProps, stepSeparatorProps, stepBodyProps });

	return new Response(text, {
		headers: { 'Content-Type': 'text/markdown; charset=utf-8' }
	});
}
