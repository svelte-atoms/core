import type { RequestHandler } from './$types';
import { readFileSync } from 'fs';
import { join } from 'path';
import { markdownToLLM, generateLLMHeader } from '$docs/markdown-to-llm';

export const GET: RequestHandler = async () => {
	const docsPath = join(process.cwd(), 'docs');

	// List of all documentation files to include
	const docFiles = [
		{ path: 'README.md', title: 'Documentation Index' },
		{ path: 'overview.md', title: 'Overview' },
		{ path: 'philosophy.md', title: 'Philosophy' },
		{ path: 'naming-convention.md', title: 'Naming Conventions' },
		{ path: 'agent.md', title: 'Agent Guidelines' },
		{ path: 'quick-reference.md', title: 'Quick Reference' },
		{ path: 'COLOR_SYSTEM.md', title: 'Color System' },
		{ path: 'common-patterns.md', title: 'Common Patterns' },
		{ path: 'DOCUMENTATION_GUIDE.md', title: 'Documentation Guide' },
		{ path: 'QUICK_MIGRATION_GUIDE.md', title: 'Migration Guide' },
		{ path: 'components/README.MD', title: 'Component Index' }
	];

	// Read all component documentation
	const componentFiles = [
		'accordion',
		'accordion-item',
		'alert',
		'atom',
		'avatar',
		'badge',
		'breadcrumb',
		'button',
		'card',
		'checkbox',
		'collapsible',
		'combobox',
		'contextmenu',
		'datagrid',
		'datagrid-td',
		'datagrid-th',
		'datagrid-tr',
		'dialog',
		'divider',
		'drawer',
		'dropdown',
		'dropdown-item',
		'form',
		'form-field',
		'html-atom',
		'html-element',
		'icon',
		'input',
		'label',
		'layer',
		'link',
		'list',
		'menu',
		'popover',
		'portal',
		'radio',
		'scrollable',
		'sidebar',
		'stack',
		'tabs',
		'tabs-tab',
		'textarea',
		'toast',
		'tooltip',
		'tree',
		'virtual'
	].map((name) => ({
		path: `components/${name}.md`,
		title: `Component: ${name}`
	}));

	let content = generateLLMHeader(
		'@svelte-atoms/core - Complete Documentation',
		'Complete LLM-friendly documentation for @svelte-atoms/core - A modern, composable UI component library for Svelte 5'
	);

	// Process all documentation files
	for (const file of [...docFiles, ...componentFiles]) {
		try {
			const filePath = join(docsPath, file.path);
			const markdown = readFileSync(filePath, 'utf-8');
			const llmText = markdownToLLM(markdown);

			content += `\n\n${'='.repeat(80)}\n`;
			content += `= ${file.title.toUpperCase()}\n`;
			content += `${'='.repeat(80)}\n\n`;
			content += llmText;
		} catch (error) {
			console.error(`Error processing ${file.path}:`, error);
			// Continue with other files
		}
	}

	return new Response(content, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});
};
