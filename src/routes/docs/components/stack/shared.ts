const basicCode = `
<Stack.Root class="h-64 w-64 overflow-hidden rounded-lg">
  <Stack.Item>
    <div class="h-64 w-64 bg-gradient-to-br from-blue-500 to-purple-600"></div>
  </Stack.Item>
  <Stack.Item class="flex items-end">
    <div class="w-full bg-black/50 p-4">
      <h3 class="text-lg font-bold text-white">Overlay Text</h3>
      <p class="text-sm text-white/80">Stays in document flow</p>
    </div>
  </Stack.Item>
</Stack.Root>`.trim();

const badgeCode = `
<Stack.Root class="inline-block w-fit flex-0">
  <Stack.Item base={Button} variant="primary">Messages</Stack.Item>
  <Stack.Item class="flex justify-end" style="margin-top: -8px; margin-right: -8px;">
    <span class="bg-destructive text-destructive-foreground flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold">
      5
    </span>
  </Stack.Item>
</Stack.Root>`.trim();

const loadingCode = `
<Stack.Root class="w-64">
  <Stack.Item base={Card.Root} class="rounded-lg border p-8">
    <h3 class="mb-2 text-lg font-bold">Content Card</h3>
    <p class="text-muted-foreground text-sm">Your content here that determines the size</p>
    <p class="text-muted-foreground mt-2 text-sm">Container sizes based on this content</p>
  </Stack.Item>
  <Stack.Item class="flex items-center justify-center">
    <div class="bg-background/90 border-border/50 rounded-lg border p-4 shadow-lg backdrop-blur-sm">
      <div class="text-muted-foreground text-sm">Loading...</div>
    </div>
  </Stack.Item>
</Stack.Root>`.trim();

const presetCode = `
import { setPreset } from '@svelte-atoms/core';

const preset = setPreset({
  stack: () => ({
    class: 'REPLACE_WITH_PRESET_CLASSES'
  })
});
`.trim();

const accessibilityFeatures = [
	'Semantic HTML structure',
	'Uses CSS Grid for proper layering',
	'Maintains DOM order for screen readers',
	'Works with absolute positioning and z-index',
	'Keyboard navigation preserves natural tab order'
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
		name: 'Stack.Root',
		description: 'TODO: Describe what this sub-component does.'
	}
	// TODO: Add all sub-components
];

export const metadata = {
	title: 'Stack - Svelte Atoms',
	description: 'TODO: Brief SEO description',
	componentTitle: 'Stack',
	componentDescription:
		'TODO: Detailed component description',
	componentType: 'compound' as const, // TODO: Change to 'simple' if not compound
	status: 'stable' as const,
	packageName: '@svelte-atoms/core',
	importCode: "import { Stack } from '@svelte-atoms/core';",
	breadcrumbs: [{ label: 'Components', href: '/docs/components' }, { label: 'Stack' }],
	useCases,
	componentsSummary, // TODO: Remove if simple component
	examples: {
		basic: basicCode,
		badge: badgeCode,
		loading: loadingCode
	},
	accessibility: accessibilityFeatures
};
