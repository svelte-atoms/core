const basicCode = `
<Breadcrumb.Root>
  <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
  <Breadcrumb.Separator />
  <Breadcrumb.Item href="/components">Components</Breadcrumb.Item>
  <Breadcrumb.Separator />
  <Breadcrumb.Item>Breadcrumb</Breadcrumb.Item>
</Breadcrumb.Root>`.trim();

const customSeparatorCode = `
<Breadcrumb.Root>
  <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
  <Breadcrumb.Separator>></Breadcrumb.Separator>
  <Breadcrumb.Item href="/docs">Docs</Breadcrumb.Item>
  <Breadcrumb.Separator>></Breadcrumb.Separator>
  <Breadcrumb.Item>Components</Breadcrumb.Item>
</Breadcrumb.Root>`.trim();

const presetCode = `
import { setPreset } from '@svelte-atoms/core';

const preset = setPreset({
  breadcrumb: () => ({
    class: 'REPLACE_WITH_PRESET_CLASSES'
  })
});
`.trim();

const accessibilityFeatures = [
	'Uses nav element with aria-label',
	'Semantic ordered list structure',
	'Current page indicated with aria-current',
	'Keyboard navigable links',
	'Screen reader friendly structure'
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
		name: 'Breadcrumb.Root',
		description: 'TODO: Describe what this sub-component does.'
	}
	// TODO: Add all sub-components
];

export const metadata = {
	title: 'Breadcrumb - Svelte Atoms',
	description: 'TODO: Brief SEO description',
	componentTitle: 'Breadcrumb',
	componentDescription:
		'TODO: Detailed component description',
	componentType: 'compound' as const, // TODO: Change to 'simple' if not compound
	status: 'stable' as const,
	packageName: '@svelte-atoms/core',
	importCode: "import { Breadcrumb } from '@svelte-atoms/core';",
	breadcrumbs: [{ label: 'Components', href: '/docs/components' }, { label: 'Breadcrumb' }],
	useCases,
	componentsSummary, // TODO: Remove if simple component
	examples: {
		basic: basicCode,
		customSeparator: customSeparatorCode
	},
	accessibility: accessibilityFeatures
};
