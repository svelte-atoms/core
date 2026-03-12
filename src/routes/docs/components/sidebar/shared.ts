const basicCode = `
<script lang="ts">
  import { Sidebar, animateSidebarContent } from '@svelte-atoms/core/sidebar';
  import { Button } from '@svelte-atoms/core/button';
  
  let leftOpen = $state(false);
<\/script>

<Sidebar.Root bind:open={leftOpen}>
  <div class="flex min-h-96 w-full">
    <Sidebar.Content
      animate={animateSidebarContent({ '0': '96px', '1': '320px' })}
      class="overflow-hidden border-r p-4"
    >
      <h3 class="mb-4 font-semibold">Details</h3>
      <div class="space-y-3">
        <p class="text-muted-foreground w-40 text-sm">
          Additional information and details can be displayed here.
        </p>
        <Button 
          size="sm" 
          variant="outline" 
          onclick={() => (leftOpen = false)}
        >
          Close
        </Button>
      </div>
    </Sidebar.Content>

    <main class="flex-1 p-4">
      <Button onclick={() => (leftOpen = true)}>
        Open Left Sidebar
      </Button>
    </main>
  </div>
</Sidebar.Root>`.trim();

const rightCode = `
<script lang="ts">
  import { Sidebar, animateSidebarContent } from '@svelte-atoms/core/sidebar';
  import { Button } from '@svelte-atoms/core/button';
  
  let rightOpen = $state(false);
<\/script>

<Sidebar.Root bind:open={rightOpen}>
  <div class="flex min-h-96 w-full">
    <main class="flex-1">
      <Button onclick={() => (rightOpen = true)}>
        Open Right Sidebar
      </Button>
    </main>

    <Sidebar.Content
      animate={animateSidebarContent({ '0': '96px', '1': '320px' })}
      class="border-l p-4"
    >
      <h3 class="mb-4 font-semibold">Details</h3>
      <div class="space-y-3">
        <p class="text-muted-foreground w-40 text-sm">
          Additional information and details can be displayed here.
        </p>
        <Button 
          size="sm" 
          variant="outline" 
          onclick={() => (rightOpen = false)}
        >
          Close
        </Button>
      </div>
    </Sidebar.Content>
  </div>
</Sidebar.Root>`.trim();

const presetCode = `
import { setPreset } from '@svelte-atoms/core';

const preset = setPreset({
  sidebar: () => ({
    class: 'REPLACE_WITH_PRESET_CLASSES'
  })
});
`.trim();

const accessibilityFeatures = [
	'Keyboard navigation (Escape to close)',
	'Focus trap when open',
	'ARIA attributes for navigation',
	'Screen reader announcements',
	'Backdrop click to dismiss'
];

const useCases = [
	{
		title: 'Navigation Drawers',
		description: 'Implement collapsible navigation panels that slide in from the left or right edge to display menus, links, or filters.'
	},
	{
		title: 'Detail Panels',
		description: 'Show contextual details or metadata for a selected item without navigating away from the main content view.'
	},
	{
		title: 'Filter and Search Panels',
		description: 'Reveal advanced filter controls or search options in a side panel to keep the main UI uncluttered.'
	},
	{
		title: 'Dashboard Widgets',
		description: 'Expand collapsible sidebar sections to display charts, stats, or additional data alongside the primary content area.'
	},
	{
		title: 'Settings Panels',
		description: 'Slide in application or page-level settings alongside the content being edited or viewed.'
	}
];

const componentsSummary = [
	{
		name: 'Sidebar.Root',
		description: 'Root container that manages the open/closed state and provides the sidebar context to child components.'
	},
	{
		name: 'Sidebar.Content',
		description: 'The animated sidebar panel that slides in/out. Accepts width, enter/exit animations, and custom styling.'
	}
];

export const metadata = {
	title: 'Sidebar - Svelte Atoms',
	description: 'Collapsible side panel component for navigation drawers, detail views, and filter panels.',
	componentTitle: 'Sidebar',
	componentDescription:
		'A compound sidebar component that provides an animated, collapsible side panel. Supports both left and right placement with configurable widths, smooth enter/exit animations, and open/closed state binding.',
	componentType: 'compound' as const,
	status: 'stable' as const,
	packageName: '@svelte-atoms/core',
	importCode: "import { Sidebar } from '@svelte-atoms/core';",
	breadcrumbs: [{ label: 'Components', href: '/docs/components' }, { label: 'Sidebar' }],
	useCases,
	componentsSummary,
	examples: {
		basic: basicCode,
		right: rightCode
	},
	accessibility: accessibilityFeatures
};
