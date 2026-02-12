const basicCode = `
<Scrollable height={200}>
  <div>Long content...</div>
</Scrollable>`.trim();

const horizontalCode = `
<Scrollable direction="horizontal">
  <div class="flex gap-4">
    <div>Item 1</div>
    <div>Item 2</div>
  </div>
</Scrollable>`.trim();

const presetCode = `
import { setPreset } from '@svelte-atoms/core';

const preset = setPreset({
  scrollable: () => ({
    class: 'REPLACE_WITH_PRESET_CLASSES'
  })
});
`.trim();

const accessibilityFeatures = [
	'Keyboard scrolling (Arrow keys)',
	'Focus visible on scroll container',
	'Screen reader compatible',
	'Respects prefers-reduced-motion',
	'Touch-friendly scrolling'
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
		name: 'Scrollable.Root',
		description: 'TODO: Describe what this sub-component does.'
	}
	// TODO: Add all sub-components
];

export const metadata = {
	title: 'Scrollable - Svelte Atoms',
	description: 'TODO: Brief SEO description',
	componentTitle: 'Scrollable',
	componentDescription:
		'TODO: Detailed component description',
	componentType: 'compound' as const, // TODO: Change to 'simple' if not compound
	status: 'stable' as const,
	packageName: '@svelte-atoms/core',
	importCode: "import { Scrollable } from '@svelte-atoms/core';",
	breadcrumbs: [{ label: 'Components', href: '/docs/components' }, { label: 'Scrollable' }],
	useCases,
	componentsSummary, // TODO: Remove if simple component
	examples: {
		basic: basicCode,
		horizontal: horizontalCode
	},
	accessibility: accessibilityFeatures
};
