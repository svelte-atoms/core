const basicCode = `
<Scrollable.Root>
  <Scrollable.Container height={200}>
    <Scrollable.Content>
      <div>Long content...</div>
    </Scrollable.Content>
  </Scrollable.Container>
</Scrollable.Root>`.trim();

const horizontalCode = `
<Scrollable.Root>
  <Scrollable.Container>
    <Scrollable.Content>
      <div class="flex gap-4">
        <div>Item 1</div>
        <div>Item 2</div>
      </div>
    </Scrollable.Content>
  </Scrollable.Container>
</Scrollable.Root>`.trim();

const bothCode = `
<Scrollable.Root>
  <Scrollable.Container height={300}>
    <Scrollable.Content>
      <div class="grid grid-cols-10 gap-4" style="min-width: 1200px;">
        {#each Array(50) as _, i}
          <div class="bg-muted rounded p-4 text-center">
            {i + 1}
          </div>
        {/each}
      </div>
    </Scrollable.Content>
  </Scrollable.Container>
</Scrollable.Root>`.trim();

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
		title: 'Fixed-height Content Panels',
		description: 'Contain long text, lists, or tables within a fixed-height container with custom-styled scrollbars that match your design system.'
	},
	{
		title: 'Horizontal Image Galleries',
		description: 'Create horizontally scrollable card rows or image carousels with custom scroll track and thumb styling.'
	},
	{
		title: 'Code Editors and Log Viewers',
		description: 'Display large amounts of code or log output in scrollable panels with precise scroll position control.'
	},
	{
		title: 'Chat or Message Feeds',
		description: 'Render scrollable chat history with programmatic control over scroll position for auto-scrolling to the latest message.'
	},
	{
		title: 'Data Tables',
		description: 'Wrap wide data tables in a horizontal scrollable container so users can access all columns without breaking layout.'
	},
	{
		title: 'Sidebars and Navigation',
		description: 'Enable overflow scrolling in sidebar navigation when the item list exceeds the viewport height.'
	}
];

const componentsSummary = [
	{
		name: 'Scrollable.Root',
		description: 'Root component that establishes the scrollable context and exposes scroll state (scrollX, scrollY, scrollWidth, etc.).'
	},
	{
		name: 'Scrollable.Container',
		description: 'The visible viewport container with overflow clipping. Accepts orientation for vertical or horizontal layout.'
	},
	{
		name: 'Scrollable.Content',
		description: 'The inner content wrapper that determines the actual scrollable area size.'
	},
	{
		name: 'Scrollable.Track',
		description: 'The scrollbar track element, rendered for horizontal or vertical orientation.'
	},
	{
		name: 'Scrollable.Thumb',
		description: 'The draggable scrollbar thumb that represents the current scroll position.'
	}
];

export const metadata = {
	title: 'Scrollable - Svelte Atoms',
	description: 'Custom scrollbar container component for vertical and horizontal scrollable content areas.',
	componentTitle: 'Scrollable',
	componentDescription:
		'Custom-styled scrollable container with full control over scroll position and appearance.',
	componentType: 'compound' as const,
	status: 'stable' as const,
	packageName: '@svelte-atoms/core',
	importCode: "import { Scrollable } from '@svelte-atoms/core';",
	breadcrumbs: [{ label: 'Components', href: '/docs/components' }, { label: 'Scrollable' }],
	useCases,
	componentsSummary,
	examples: {
		basic: basicCode,
		horizontal: horizontalCode,
		both: bothCode,
		preset: presetCode
	},
	accessibility: accessibilityFeatures
};
