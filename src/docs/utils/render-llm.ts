import type { Component } from 'svelte';
import { render as svelteRender } from 'svelte/server';

/**
 * Renders a Svelte component for LLM consumption.
 *
 * - New-style (content.svelte): pass props directly — `renderLlmContent(Content, { contentType: 'markdown' })`
 * - Legacy-style (template.svelte): pass as `{ data: props }` — `renderLlmContent(Page, { frontmatter, metadata, ... })`
 *   The function auto-detects legacy callers by checking whether `contentType` is absent.
 */
export function renderLlmContent(component: Component, props: Record<string, any> = {}): string {
	// Legacy callers pass metadata/frontmatter but no contentType — wrap in { data } for them
	const finalProps = 'contentType' in props ? props : { data: props };
	const { body } = svelteRender(component, { props: finalProps });
	return cleanLlmText(body);
}

/**
 * Cleans rendered HTML/markdown output:
 * - Strips HTML tags (residual markup from non-mode-aware components)
 * - Removes HTML comments
 * - Unescapes HTML entities
 * - Collapses excessive blank lines
 */
export function cleanLlmText(html: string): string {
	return html
		.replace(/<!--[\s\S]*?-->/g, '')           // strip HTML comments
		.replace(/<[^>]+>/g, '')                    // strip any remaining HTML tags
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&amp;/g, '&')
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'")
		.replace(/---\s+[ \t]+(?=#)/g, '---\n\n')  // fix frontmatter spacing before headers
		.replace(/\n{3,}/g, '\n\n')                  // collapse 3+ blank lines to 2
		.trim();
}
