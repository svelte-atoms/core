const basicCode = `
<script lang="ts">
  import { Checkbox } from '@svelte-atoms/core/checkbox';
<\/script>

<Checkbox id="basic" />
<label for="basic">Accept terms and conditions</label>`.trim();

const groupCode = `
<div class="space-y-3">
  <div class="flex items-center space-x-2">
    <Checkbox id="option1" />
    <label for="option1">Newsletter updates</label>
  </div>
  <div class="flex items-center space-x-2">
    <Checkbox id="option2" />
    <label for="option2">Marketing emails</label>
  </div>
  <div class="flex items-center space-x-2">
    <Checkbox id="option3" />
    <label for="option3">Product announcements</label>
  </div>
</div>`.trim();

const disabledCode = `
<Checkbox id="disabled" disabled />
<label for="disabled">Disabled checkbox</label>`.trim();

const presetCode = `
import { setPreset } from '@svelte-atoms/core';

const preset = setPreset({
  checkbox: () => ({
    class: 'REPLACE_WITH_PRESET_CLASSES'
  })
});
`.trim();

const accessibilityFeatures = [
	'Proper semantic input element with type=\'checkbox\'',
	'Keyboard navigation support (Space key to toggle)',
	'Focus management with visible focus indicators',
	'Screen reader compatible with proper labels',
	'Disabled state handling with aria-disabled',
	'Associated label support for larger click targets'
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
		name: 'Checkbox.Root',
		description: 'TODO: Describe what this sub-component does.'
	}
	// TODO: Add all sub-components
];

export const metadata = {
	title: 'Checkbox - Svelte Atoms',
	description: 'TODO: Brief SEO description',
	componentTitle: 'Checkbox',
	componentDescription:
		'TODO: Detailed component description',
	componentType: 'compound' as const, // TODO: Change to 'simple' if not compound
	status: 'stable' as const,
	packageName: '@svelte-atoms/core',
	importCode: "import { Checkbox } from '@svelte-atoms/core';",
	breadcrumbs: [{ label: 'Components', href: '/docs/components' }, { label: 'Checkbox' }],
	useCases,
	componentsSummary, // TODO: Remove if simple component
	examples: {
		basic: basicCode,
		group: groupCode,
		disabled: disabledCode
	},
	accessibility: accessibilityFeatures
};
