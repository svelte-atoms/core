import type { RequestHandler } from './$types';
import { readFileSync } from 'fs';
import { join } from 'path';
import { markdownToLLM, generateLLMHeader } from '$docs/markdown-to-llm';

export const GET: RequestHandler = async ({ params }) => {
	const sectionName = params.section;

	// Map URL segments to actual file names
	const fileMap: Record<string, string> = {
		overview: 'overview.md',
		philosophy: 'philosophy.md',
		installation: 'README.md',
		'quick-start': 'quick-reference.md',
		'quick-reference': 'quick-reference.md',
		styling: 'common-patterns.md',
		'common-patterns': 'common-patterns.md',
		accessibility: 'overview.md',
		preset: 'overview.md',
		'naming-convention': 'naming-convention.md',
		'migration-guide': 'QUICK_MIGRATION_GUIDE.md',
		'color-system': 'COLOR_SYSTEM.md',
		'documentation-guide': 'DOCUMENTATION_GUIDE.md',
		agent: 'agent.md',
		comparison: 'COMPARISON.md',
		summary: 'SUMMARY.md',
		'visual-reference': 'VISUAL_REFERENCE.md',
		'llms-implementation': 'LLMS_TXT_IMPLEMENTATION.md',
		'llms-quick-start': 'LLMS_TXT_QUICK_START.md',
		'llms-summary': 'LLMS_TXT_SUMMARY.md'
	};

	const fileName = fileMap[sectionName];
	if (!fileName) {
		return new Response('Documentation not found', { status: 404 });
	}

	const docsPath = join(process.cwd(), 'docs', fileName);

	try {
		const markdown = readFileSync(docsPath, 'utf-8');
		const llmText = markdownToLLM(markdown);

		const title = sectionName
			.split('-')
			.map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');

		const content =
			generateLLMHeader(title, `LLM-friendly documentation for ${title} in @svelte-atoms/core`) +
			llmText;

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
