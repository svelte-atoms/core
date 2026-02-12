const basicCode = `
<Divider />`.trim();

const orientationCode = `
<Divider orientation="horizontal" />
<Divider orientation="vertical" />`.trim();

const labelCode = `
<Divider>
  <span>OR</span>
</Divider>`.trim();

const presetCode = `
import { setPreset } from '@svelte-atoms/core';

const preset = setPreset({
  divider: () => ({
    class: 'REPLACE_WITH_PRESET_CLASSES'
  })
});
`.trim();

const accessibilityFeatures = [
	'Semantic hr element for horizontal dividers',
	'Proper ARIA role when needed',
	'Sufficient visual contrast',
	'Does not interfere with screen readers',
	'Decorative element properly marked'
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
		name: 'Divider.Root',
		description: 'TODO: Describe what this sub-component does.'
	}
	// TODO: Add all sub-components
];

export const metadata = {
	title: 'Divider - Svelte Atoms',
	description: 'TODO: Brief SEO description',
	componentTitle: 'Divider',
	componentDescription:
		'TODO: Detailed component description',
	componentType: 'compound' as const, // TODO: Change to 'simple' if not compound
	status: 'stable' as const,
	packageName: '@svelte-atoms/core',
	importCode: "import { Divider } from '@svelte-atoms/core';",
	breadcrumbs: [{ label: 'Components', href: '/docs/components' }, { label: 'Divider' }],
	useCases,
	componentsSummary, // TODO: Remove if simple component
	examples: {
		basic: basicCode,
		orientation: orientationCode,
		label: labelCode
	},
	accessibility: accessibilityFeatures
};
