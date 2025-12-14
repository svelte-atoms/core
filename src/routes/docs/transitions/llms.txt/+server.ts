import type { RequestHandler } from '@sveltejs/kit';
import { readFileSync } from 'fs';
import { join } from 'path';
import { markdownToLLM } from '$docs/markdown-to-llm';

export const GET: RequestHandler = async () => {
	const docsPath = join(import.meta.dirname, 'transitions.md');

	try {
		const markdown = readFileSync(docsPath, 'utf-8');
		const content = markdownToLLM(markdown);

		return new Response(content, {
			headers: {
				'Content-Type': 'text/plain; charset=utf-8',
				'Cache-Control': 'public, max-age=3600',
				'X-Content-Title': 'Transitions & Animations',
				'X-Content-Description': 'Guide for adding transitions and animations to components',
				'X-Content-Version': '1.0.0-alpha.30',
				'X-Content-Last-Modified': new Date().toISOString()
			}
		});
	} catch {
		return new Response('Transitions documentation not found', {
			status: 404,
			headers: {
				'Content-Type': 'text/plain; charset=utf-8'
			}
		});
	}
};
