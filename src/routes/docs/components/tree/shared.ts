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
import { setPreset } from '@svelte-atoms/core';

const preset = setPreset({
  tree: () => ({
    class: 'REPLACE_WITH_PRESET_CLASSES'
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
		title: 'Use Case 1',
		description: 'TODO: Describe when and why to use this component in this scenario.'
	},
	{
		title: 'Use Case 2',
		description: 'TODO: Describe another practical application.'
	}
	// TODO: Add 4-6 use cases total
];

// TODO: Remove if simple component, or fill in for compound component
const componentsSummary = [
	{
		name: 'Tree.Root',
		description: 'TODO: Describe what this sub-component does.'
	}
	// TODO: Add all sub-components
];

export const metadata = {
	title: 'Tree - Svelte Atoms',
	description: 'TODO: Brief SEO description',
	componentTitle: 'Tree',
	componentDescription:
		'TODO: Detailed component description',
	componentType: 'compound' as const, // TODO: Change to 'simple' if not compound
	status: 'stable' as const,
	packageName: '@svelte-atoms/core',
	importCode: "import { Tree } from '@svelte-atoms/core';",
	breadcrumbs: [{ label: 'Components', href: '/docs/components' }, { label: 'Tree' }],
	useCases,
	componentsSummary, // TODO: Remove if simple component
	examples: {
		basic: basicCode,
		nested: nestedCode
	},
	accessibility: accessibilityFeatures
};
