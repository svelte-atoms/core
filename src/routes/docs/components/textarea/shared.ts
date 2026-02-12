const basicCode = `
<Textarea.Root>
  <Textarea.Control placeholder="Enter your message..." />
</Textarea.Root>`.trim();

const rowsCode = `
<Textarea.Root>
  <Textarea.Control rows={3} placeholder="Small (3 rows)" class="max-w-lg" />
</Textarea.Root>
<Textarea.Root>
  <Textarea.Control rows={6} placeholder="Medium (6 rows)" class="max-w-lg" />
</Textarea.Root>
<Textarea.Root>
  <Textarea.Control rows={10} placeholder="Large (10 rows)" class="max-w-lg" />
</Textarea.Root>`.trim();

const presetCode = `
import { setPreset } from '@svelte-atoms/core';

const preset = setPreset({
  textarea: () => ({
    class: 'REPLACE_WITH_PRESET_CLASSES'
  })
});
`.trim();

const accessibilityFeatures = [
	'Proper label association',
	'Error message linking',
	'Keyboard accessible',
	'Resize handle visible',
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
		name: 'Textarea.Root',
		description: 'TODO: Describe what this sub-component does.'
	}
	// TODO: Add all sub-components
];

export const metadata = {
	title: 'Textarea - Svelte Atoms',
	description: 'TODO: Brief SEO description',
	componentTitle: 'Textarea',
	componentDescription:
		'TODO: Detailed component description',
	componentType: 'compound' as const, // TODO: Change to 'simple' if not compound
	status: 'stable' as const,
	packageName: '@svelte-atoms/core',
	importCode: "import { Textarea } from '@svelte-atoms/core';",
	breadcrumbs: [{ label: 'Components', href: '/docs/components' }, { label: 'Textarea' }],
	useCases,
	componentsSummary, // TODO: Remove if simple component
	examples: {
		basic: basicCode,
		rows: rowsCode
	},
	accessibility: accessibilityFeatures
};
