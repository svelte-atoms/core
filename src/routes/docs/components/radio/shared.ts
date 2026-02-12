const basicCode = `
<script lang="ts">
  let selected = $state('option1');
<\/script>

<RadioGroup bind:value={selected}>
  <Radio value="option1">Option 1<\/Radio>
  <Radio value="option2">Option 2<\/Radio>
  <Radio value="option3">Option 3<\/Radio>
<\/RadioGroup>`.trim();

const presetCode = `
import { setPreset } from '@svelte-atoms/core';

const preset = setPreset({
  radio: () => ({
    class: 'REPLACE_WITH_PRESET_CLASSES'
  })
});
`.trim();

const accessibilityFeatures = [
	'Use proper grouping with fieldset/legend',
	'Associate labels with radio buttons',
	'Keyboard navigation (Arrow keys)',
	'Clear visual focus indicators',
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
		name: 'Radio.Root',
		description: 'TODO: Describe what this sub-component does.'
	}
	// TODO: Add all sub-components
];

export const metadata = {
	title: 'Radio - Svelte Atoms',
	description: 'TODO: Brief SEO description',
	componentTitle: 'Radio',
	componentDescription:
		'TODO: Detailed component description',
	componentType: 'compound' as const, // TODO: Change to 'simple' if not compound
	status: 'stable' as const,
	packageName: '@svelte-atoms/core',
	importCode: "import { Radio } from '@svelte-atoms/core';",
	breadcrumbs: [{ label: 'Components', href: '/docs/components' }, { label: 'Radio' }],
	useCases,
	componentsSummary, // TODO: Remove if simple component
	examples: {
		basic: basicCode
	},
	accessibility: accessibilityFeatures
};
