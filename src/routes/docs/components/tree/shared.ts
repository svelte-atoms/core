const basicCode = `
<script lang="ts">
  import { Tree } from '@svelte-atoms/core/tree';
<\/script>

<Tree.Root open>
  <Tree.Header>Documents</Tree.Header>
  <Tree.Body>
    <div>Resume.pdf</div>
    <div>CoverLetter.docx</div>
  </Tree.Body>
</Tree.Root>`.trim();

const nestedCode = `
<script lang="ts">
  import { Tree } from '@svelte-atoms/core/tree';
<\/script>

<Tree.Root open>
  <Tree.Header>src</Tree.Header>
  <Tree.Body>
    <Tree.Root open>
      <Tree.Header>components</Tree.Header>
      <Tree.Body>
        <div>Button.svelte</div>
        <div>Input.svelte</div>
      </Tree.Body>
    </Tree.Root>
    <Tree.Root open>
      <Tree.Header>utils</Tree.Header>
      <Tree.Body>
        <div>helpers.ts</div>
        <div>validators.ts</div>
      </Tree.Body>
    </Tree.Root>
    <div>app.ts</div>
  </Tree.Body>
</Tree.Root>`.trim();

const presetCode = `
import { setPreset } from '@svelte-atoms/core/context';

setPreset({
  'tree.root': () => ({
    class: 'space-y-1'
  }),
  'tree.header': () => ({
    class: 'cursor-pointer border-border flex items-center gap-2'
  }),
  'tree.body': () => ({
    class: 'pl-4 border-l border-border'
  })
});
`.trim();

const accessibilityFeatures = [
	'ARIA tree role',
	'Keyboard navigation (Arrow keys)',
	'aria-expanded state',
	'Focus management',
	'Screen reader friendly'
];

const useCases = [
	{
		title: 'File System Browsers',
		description: 'Display directory and file structures with expandable folder nodes and nested file items.'
	},
	{
		title: 'Organization Charts',
		description: 'Render hierarchical org structures with nested groups and team members as expandable tree nodes.'
	},
	{
		title: 'Category Navigation',
		description: 'Build nested category trees for e-commerce filters, taxonomy browsers, or content classification.'
	},
	{
		title: 'JSON or XML Viewers',
		description: 'Visualize structured data like JSON objects or XML elements as an expandable tree for debugging or exploration.'
	},
	{
		title: 'Documentation Sidebar',
		description: 'Create a hierarchical docs navigation with expandable section groups and nested page links.'
	},
	{
		title: 'Permission Trees',
		description: 'Display and manage nested permission or role hierarchies in admin interfaces.'
	}
];

const componentsSummary = [
	{
		name: 'Tree.Root',
		description: 'Root node container that manages the open/closed expanded state. Bindable open prop for controlled usage.'
	},
	{
		name: 'Tree.Header',
		description: 'Clickable header element that toggles the expanded/collapsed state of the tree node when clicked.'
	},
	{
		name: 'Tree.Body',
		description: 'Collapsible content container for nested tree items, shown when the node is expanded.'
	}
];

export const metadata = {
	title: 'Tree - Svelte Atoms',
	description: 'Hierarchical tree view component for displaying expandable nested data structures.',
	componentTitle: 'Tree',
	componentDescription:
		'A recursive, compound tree component for rendering hierarchical data with expandable and collapsible nodes. Supports nested Tree instances for unlimited depth, bindable open state, and fully customizable header and body content.',
	componentType: 'compound' as const,
	status: 'stable' as const,
	packageName: '@svelte-atoms/core',
	importCode: "import { Tree } from '@svelte-atoms/core';",
	breadcrumbs: [{ label: 'Components', href: '/docs/components' }, { label: 'Tree' }],
	useCases,
	componentsSummary,
	examples: {
		basic: basicCode,
		nested: nestedCode,
		preset: presetCode
	},
	accessibility: accessibilityFeatures
};
