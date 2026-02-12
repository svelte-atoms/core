const basicCode = `
<Tooltip.Root>
  <Tooltip.Trigger>
    <button>Hover me</button>
  </Tooltip.Trigger>
  <Tooltip.Content>
    This is a tooltip
  </Tooltip.Content>
</Tooltip.Root>`.trim();

const placementCode = `
<Tooltip.Root placement="top">
  <Tooltip.Trigger>
    <button>Top</button>
  </Tooltip.Trigger>
  <Tooltip.Content>
    Top tooltip
  </Tooltip.Content>
</Tooltip.Root>`.trim();

const presetCode = `
import { setPreset } from '@svelte-atoms/core';

const preset = setPreset({
  tooltip: () => ({
    class: 'z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md'
  })
});
`.trim();

const accessibilityFeatures = [
	'Uses aria-describedby for association',
	'Not shown on keyboard focus by default',
	'Non-essential information only',
	'Clear on mouse leave',
	'Screen reader compatible'
];

const useCases = [
	{
		title: 'Icon Explanations',
		description:
			'Provide text descriptions for icon-only buttons or controls to improve usability and accessibility.'
	},
	{
		title: 'Truncated Text',
		description:
			'Show full text content when hovering over truncated or ellipsized text in tables or lists.'
	},
	{
		title: 'Supplementary Information',
		description:
			'Display additional context, shortcuts, or help text without cluttering the main interface.'
	},
	{
		title: 'Status Indicators',
		description:
			'Explain the meaning of status badges, colored dots, or visual indicators on hover.'
	},
	{
		title: 'Disabled Elements',
		description:
			'Communicate why an element is disabled or what conditions must be met to enable it.'
	},
	{
		title: 'Data Previews',
		description:
			'Show quick previews of data, timestamps, or metadata without requiring navigation or clicks.'
	}
];

const componentsSummary = [
	{
		name: 'Tooltip.Root',
		description:
			'Container component that manages tooltip state, positioning, and visibility logic.'
	},
	{
		name: 'Tooltip.Trigger',
		description:
			'Element that triggers the tooltip display on hover or focus events.'
	},
	{
		name: 'Tooltip.Content',
		description:
			'Floating panel containing the tooltip text or content, positioned relative to the trigger.'
	}
];

export const metadata = {
	title: 'Tooltip - Svelte Atoms',
	description: 'Display contextual information on hover or focus.',
	componentTitle: 'Tooltip',
	componentDescription:
		'A floating label that appears when hovering over or focusing on an element, providing additional context.',
	componentType: 'compound' as const,
	status: 'stable' as const,
	packageName: '@svelte-atoms/core',
	importCode: "import { Tooltip } from '@svelte-atoms/core';",
	breadcrumbs: [{ label: 'Components', href: '/docs/components' }, { label: 'Tooltip' }],
	useCases,
	componentsSummary,
	examples: {
		basic: basicCode,
		placement: placementCode,
		preset: presetCode
	},
	accessibility: accessibilityFeatures
};
