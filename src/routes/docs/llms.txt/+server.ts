import { md } from '$docs/md/template';
import type { RequestHandler } from './$types';
import { renderLlmContent } from '$docs/utils/render-llm';

export const GET: RequestHandler = async ({ request }) => {
	const baseUrl = new URL(request.url).origin;

	const pkg = await import('../../../../package.json');
	const version = pkg.version || '1.0.0';

	const content = md`
# @svelte-atoms/core - LLM Documentation Index

This file provides a comprehensive index of all LLM-friendly documentation available for @svelte-atoms/core.

## What is llms.txt?

The llms.txt standard is an emerging convention for presenting documentation in a simplified, 
text-based format that's easy for LLMs to process. By following this standard, @svelte-atoms/core 
ensures compatibility with AI tools and workflows.

## Available Documentation

### Full Documentation
- ${baseUrl}/docs/llms.txt - Complete consolidated documentation

### Core Documentation

#### Getting Started
- ${baseUrl}/docs/overview/llms.txt - Library overview and introduction
- ${baseUrl}/docs/philosophy/llms.txt - Design principles and concepts
- ${baseUrl}/docs/quick-start/llms.txt - Quick start guide
- ${baseUrl}/docs/quick-reference/llms.txt - Quick reference guide

#### Fundamentals
- ${baseUrl}/docs/imports/llms.txt - Import patterns and conventions
- ${baseUrl}/docs/naming-convention/llms.txt - File and component naming
- ${baseUrl}/docs/usage/llms.txt - Component usage patterns
- ${baseUrl}/docs/atoms/llms.txt - Atoms concept
- ${baseUrl}/docs/bonds/llms.txt - Bonds concept

#### Styling & Theming
- ${baseUrl}/docs/styling/llms.txt - Styling guide
- ${baseUrl}/docs/variants/llms.txt - Variant system
- ${baseUrl}/docs/preset/llms.txt - Preset system
- ${baseUrl}/docs/preset-variant-integration/llms.txt - Preset-variant integration

#### Advanced Topics
- ${baseUrl}/docs/composition/llms.txt - Component composition patterns
- ${baseUrl}/docs/crafting/llms.txt - Crafting components from scratch
- ${baseUrl}/docs/motion/llms.txt - Motion and animation system
- ${baseUrl}/docs/transitions/llms.txt - Transitions and animations
- ${baseUrl}/docs/accessibility/llms.txt - Accessibility features

### Component Documentation

#### Layout & Structure
- ${baseUrl}/docs/components/stack/llms.txt - Stack component
- ${baseUrl}/docs/components/divider/llms.txt - Divider component
- ${baseUrl}/docs/components/list/llms.txt - List component
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
- ${baseUrl}/docs/components/combobox/llms.txt - Combobox component

#### Data Display
- ${baseUrl}/docs/components/card/llms.txt - Card component
- ${baseUrl}/docs/components/badge/llms.txt - Badge component
- ${baseUrl}/docs/components/avatar/llms.txt - Avatar component
- ${baseUrl}/docs/components/datagrid/llms.txt - Datagrid component
- ${baseUrl}/docs/components/tree/llms.txt - Tree component

#### Overlays & Modals
- ${baseUrl}/docs/components/dialog/llms.txt - Dialog component
- ${baseUrl}/docs/components/drawer/llms.txt - Drawer component
- ${baseUrl}/docs/components/popover/llms.txt - Popover component
- ${baseUrl}/docs/components/dropdown/llms.txt - Dropdown component
- ${baseUrl}/docs/components/tooltip/llms.txt - Tooltip component
- ${baseUrl}/docs/components/toast/llms.txt - Toast component

#### Interactive
- ${baseUrl}/docs/components/accordion/llms.txt - Accordion component
- ${baseUrl}/docs/components/collapsible/llms.txt - Collapsible component
- ${baseUrl}/docs/components/alert/llms.txt - Alert component
- ${baseUrl}/docs/components/stepper/llms.txt - Stepper component

#### Core Components
- ${baseUrl}/docs/components/atom/llms.txt - Atom component

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
