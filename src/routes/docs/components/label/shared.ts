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
		title: 'Form Field Labels',
		description: 'Associate descriptive text with form inputs like text fields, selects, and checkboxes to improve usability and accessibility.'
	},
	{
		title: 'Required Field Indicators',
		description: 'Mark mandatory form fields clearly so users know which inputs they must fill out before submitting.'
	},
	{
		title: 'Accessible Input Naming',
		description: 'Provide accessible names for form controls used by screen readers and assistive technologies via the for/id association.'
	},
	{
		title: 'Checkbox and Radio Labels',
		description: 'Wrap or associate text with checkbox and radio inputs to make the clickable area larger and more user-friendly.'
	},
	{
		title: 'Field Descriptions',
		description: 'Pair with helper text to give users context about what information is expected in a particular field.'
	}
];

export const metadata = {
	title: 'Label - Svelte Atoms',
	description: 'Accessible label element for associating descriptive text with form controls.',
	componentTitle: 'Label',
	componentDescription:
		'A semantic HTML label component for associating descriptive text with form inputs. It improves accessibility by providing meaningful names for form controls and increases the interactive hit area for checkboxes and radio buttons.',
	componentType: 'simple' as const,
	status: 'stable' as const,
	packageName: '@svelte-atoms/core',
	importCode: "import { Label } from '@svelte-atoms/core';",
	breadcrumbs: [{ label: 'Components', href: '/docs/components' }, { label: 'Label' }],
	useCases,
	examples: {
		basic: basicCode,
		required: requiredCode
	},
	accessibility: accessibilityFeatures
};
