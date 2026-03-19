import type { Component } from 'svelte';
import { render as svelteRender } from 'svelte/server';

/**
 * Renders a Svelte component for LLM consumption
 * Removes HTML comments and unescapes HTML entities
 * @param component - The Svelte component to render
 * @param data - The data object to pass as props.data
 */
export function renderLlmContent(component: Component, data: Record<string, any>): string {
	const { body } = svelteRender(component, { props: { data } });
	return cleanLlmText(body);
}

/**
 * Cleans rendered HTML by removing comments, unescaping entities
 */
export function cleanLlmText(html: string): string {
	return html
		.replace(/<!--[\s\S]*?-->/g, '')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&amp;/g, '&')
		.replace(/(\n[ \t]+)(?=#)/g, '\n') // Remove spaces/tabs after newline before markdown headers
		.trim();
}
