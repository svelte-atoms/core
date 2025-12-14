import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const baseUrl = 'https://svelte-atoms.dev'; // Update with your actual domain

	const pkg = await import('../../../package.json');
	const version = pkg.version || '1.0.0';

	const content = `# @svelte-atoms/core - LLM Documentation Index

This file provides a comprehensive index of all LLM-friendly documentation available for @svelte-atoms/core.

## What is llms.txt?

The llms.txt standard is an emerging convention for presenting documentation in a simplified, 
text-based format that's easy for LLMs to process. By following this standard, @svelte-atoms/core 
ensures compatibility with AI tools and workflows.

## Available Documentation

### Full Documentation
- ${baseUrl}/docs/llms.txt - Complete consolidated documentation

### Core Documentation
- ${baseUrl}/docs/overview/llms.txt - Library overview and introduction
- ${baseUrl}/docs/philosophy/llms.txt - Design principles and concepts
- ${baseUrl}/docs/installation/llms.txt - Installation guide
- ${baseUrl}/docs/quick-start/llms.txt - Quick start guide
- ${baseUrl}/docs/styling/llms.txt - Styling and customization
- ${baseUrl}/docs/accessibility/llms.txt - Accessibility features
- ${baseUrl}/docs/preset/llms.txt - Preset system documentation

### Component Documentation

#### Layout & Structure
- ${baseUrl}/docs/components/stack/llms.txt - Stack component
- ${baseUrl}/docs/components/layer/llms.txt - Layer component
- ${baseUrl}/docs/components/divider/llms.txt - Divider component
- ${baseUrl}/docs/components/list/llms.txt - List component
- ${baseUrl}/docs/components/virtual/llms.txt - Virtual list component
- ${baseUrl}/docs/components/portal/llms.txt - Portal component
- ${baseUrl}/docs/components/scrollable/llms.txt - Scrollable component

#### Navigation
- ${baseUrl}/docs/components/breadcrumb/llms.txt - Breadcrumb component
- ${baseUrl}/docs/components/link/llms.txt - Link component
- ${baseUrl}/docs/components/menu/llms.txt - Menu component
- ${baseUrl}/docs/components/sidebar/llms.txt - Sidebar component
- ${baseUrl}/docs/components/tabs/llms.txt - Tabs component

#### Form Controls
- ${baseUrl}/docs/components/button/llms.txt - Button component
- ${baseUrl}/docs/components/input/llms.txt - Input component
- ${baseUrl}/docs/components/textarea/llms.txt - Textarea component
- ${baseUrl}/docs/components/checkbox/llms.txt - Checkbox component
- ${baseUrl}/docs/components/radio/llms.txt - Radio component
- ${baseUrl}/docs/components/label/llms.txt - Label component
- ${baseUrl}/docs/components/form/llms.txt - Form component
- ${baseUrl}/docs/components/form-field/llms.txt - Form Field component
- ${baseUrl}/docs/components/combobox/llms.txt - Combobox component

#### Data Display
- ${baseUrl}/docs/components/card/llms.txt - Card component
- ${baseUrl}/docs/components/badge/llms.txt - Badge component
- ${baseUrl}/docs/components/avatar/llms.txt - Avatar component
- ${baseUrl}/docs/components/icon/llms.txt - Icon component
- ${baseUrl}/docs/components/datagrid/llms.txt - Datagrid component
- ${baseUrl}/docs/components/tree/llms.txt - Tree component

#### Overlays & Modals
- ${baseUrl}/docs/components/dialog/llms.txt - Dialog component
- ${baseUrl}/docs/components/drawer/llms.txt - Drawer component
- ${baseUrl}/docs/components/popover/llms.txt - Popover component
- ${baseUrl}/docs/components/dropdown/llms.txt - Dropdown component
- ${baseUrl}/docs/components/contextmenu/llms.txt - Context Menu component
- ${baseUrl}/docs/components/tooltip/llms.txt - Tooltip component
- ${baseUrl}/docs/components/toast/llms.txt - Toast component

#### Interactive
- ${baseUrl}/docs/components/accordion/llms.txt - Accordion component
- ${baseUrl}/docs/components/collapsible/llms.txt - Collapsible component
- ${baseUrl}/docs/components/alert/llms.txt - Alert component

### Advanced Topics
- ${baseUrl}/docs/atoms/llms.txt - Atoms concept
- ${baseUrl}/docs/bonds/llms.txt - Bonds concept
- ${baseUrl}/docs/guides/llms.txt - Usage guides

## How to Use

To access the LLM-friendly version of any documentation page, simply append \`/llms.txt\` 
to the end of the page's URL.

Example:
- Standard Page: ${baseUrl}/docs/components/button
- LLM-friendly Version: ${baseUrl}/docs/components/button/llms.txt

---

Generated: ${new Date().toISOString()}
Version: ${version}
`;

	return new Response(content, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});
};
