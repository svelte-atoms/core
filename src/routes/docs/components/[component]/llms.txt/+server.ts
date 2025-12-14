import type { RequestHandler } from './$types';
import { readFileSync } from 'fs';
import { join } from 'path';
import {
	markdownToLLM,
	generateLLMHeader,
	injectPropsIntoMarkdown
} from '$docs/markdown-to-llm';

export const GET: RequestHandler = async ({ params }) => {
	const componentName = params.component;
	const docsPath = join(
		process.cwd(),
		'src',
		'routes',
		'docs',
		'components',
		componentName,
		`llms.md`
	);
	const props = await import(`../../${componentName}/props.ts`);

	try {
		const markdown = readFileSync(docsPath, 'utf-8');

		// Inject props into markdown
		const markdownWithProps = injectPropsIntoMarkdown(markdown, props);

		const llmText = markdownToLLM(markdownWithProps);

		const content =
			generateLLMHeader(
				`${componentName.charAt(0).toUpperCase() + componentName.slice(1)} Component`,
				`LLM-friendly documentation for the ${componentName} component in @svelte-atoms/core`
			) + llmText;

		return new Response(content, {
			headers: {
				'Content-Type': 'text/plain; charset=utf-8',
				'Cache-Control': 'public, max-age=3600'
			}
		});
	} catch {
		return new Response('Documentation not found', { status: 404 });
	}
};
