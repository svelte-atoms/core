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
		name: 'Scrollable.Root',
		description: 'TODO: Describe what this sub-component does.'
	}
	// TODO: Add all sub-components
];

export const metadata = {
	title: 'Scrollable - Svelte Atoms',
	description: 'TODO: Brief SEO description',
	componentTitle: 'Scrollable',
	componentDescription:
		'TODO: Detailed component description',
	componentType: 'compound' as const, // TODO: Change to 'simple' if not compound
	status: 'stable' as const,
	packageName: '@svelte-atoms/core',
	importCode: "import { Scrollable } from '@svelte-atoms/core';",
	breadcrumbs: [{ label: 'Components', href: '/docs/components' }, { label: 'Scrollable' }],
	useCases,
	componentsSummary, // TODO: Remove if simple component
	examples: {
		basic: basicCode,
		horizontal: horizontalCode,
		both: bothCode
	},
	accessibility: accessibilityFeatures
};
