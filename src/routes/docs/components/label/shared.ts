const basicCode = `
<Label for="email">Email Address</Label>
<Input.Root>
  <Input.Control id="email" type="email" />
</Input.Root>`.trim();

const requiredCode = `
<Label for="username">
  Username <span class="text-red-500">*</span>
</Label>
<Input.Root>
  <Input.Control id="username" required />
</Input.Root>`.trim();

const presetCode = `
import { setPreset } from '@svelte-atoms/core';

const preset = setPreset({
  label: () => ({
    class: 'REPLACE_WITH_PRESET_CLASSES'
  })
});
`.trim();

const accessibilityFeatures = [
	'Always use for attribute to associate with input',
	'Place labels consistently (before or after inputs)',
	'Make required fields clear to screen readers',
	'Use semantic label element',
	'Ensure sufficient color contrast'
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
		name: 'Label.Root',
		description: 'TODO: Describe what this sub-component does.'
	}
	// TODO: Add all sub-components
];

export const metadata = {
	title: 'Label - Svelte Atoms',
	description: 'TODO: Brief SEO description',
	componentTitle: 'Label',
	componentDescription:
		'TODO: Detailed component description',
	componentType: 'compound' as const, // TODO: Change to 'simple' if not compound
	status: 'stable' as const,
	packageName: '@svelte-atoms/core',
	importCode: "import { Label } from '@svelte-atoms/core';",
	breadcrumbs: [{ label: 'Components', href: '/docs/components' }, { label: 'Label' }],
	useCases,
	componentsSummary, // TODO: Remove if simple component
	examples: {
		basic: basicCode,
		required: requiredCode
	},
	accessibility: accessibilityFeatures
};
