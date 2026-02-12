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
		name: 'Sidebar.Root',
		description: 'TODO: Describe what this sub-component does.'
	}
	// TODO: Add all sub-components
];

export const metadata = {
	title: 'Sidebar - Svelte Atoms',
	description: 'TODO: Brief SEO description',
	componentTitle: 'Sidebar',
	componentDescription:
		'TODO: Detailed component description',
	componentType: 'compound' as const, // TODO: Change to 'simple' if not compound
	status: 'stable' as const,
	packageName: '@svelte-atoms/core',
	importCode: "import { Sidebar } from '@svelte-atoms/core';",
	breadcrumbs: [{ label: 'Components', href: '/docs/components' }, { label: 'Sidebar' }],
	useCases,
	componentsSummary, // TODO: Remove if simple component
	examples: {
		basic: basicCode,
		right: rightCode
	},
	accessibility: accessibilityFeatures
};
