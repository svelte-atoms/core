const basicCode = `
<script lang="ts">
  let open = $state(false);
</script>

<Collapsible.Root bind:open>
  <Collapsible.Trigger>
    <button>Toggle Content</button>
  </Collapsible.Trigger>
  <Collapsible.Content>
    <p>This content can be shown or hidden.</p>
  </Collapsible.Content>
</Collapsible.Root>`.trim();

const controlledCode = `
<script lang="ts">
  let isOpen = $state(true);
</script>

<Collapsible.Root bind:open={isOpen}>
  <Collapsible.Header>
    <span>Controlled Collapsible</span>
    <span>{isOpen ? 'Open' : 'Closed'}</span>
  </Collapsible.Header>
  <Collapsible.Body>
    <div>
      <p>This collapsible is controlled by external state.</p>
    </div>
  </Collapsible.Body>
</Collapsible.Root>

<button onclick={() => (isOpen = !isOpen)}>
  Toggle from Outside
</button>`.trim();

const presetCode = `
import { setPreset } from '@svelte-atoms/core';

const preset = setPreset({
  collapsible: () => ({
    class: 'w-full space-y-2'
  }),
  'collapsible.trigger': () => ({
    class: 'flex w-full items-center justify-between rounded-md border border-border bg-background px-4 py-3 text-sm font-medium hover:bg-accent transition-colors'
  }),
  'collapsible.content': () => ({
    class: 'overflow-hidden text-sm text-muted-foreground px-4 py-3 border border-t-0 rounded-b-md border-border'
  })
});`.trim();

const accessibilityFeatures = [
	'ARIA attributes (aria-expanded, aria-controls)',
	'Keyboard accessible trigger',
	'Proper semantic structure',
	'Screen reader support',
	'Focus management'
];

const useCases = [
	{
		title: 'FAQ Items',
		description:
			'Individual FAQ questions that can be expanded to reveal answers without affecting other questions.'
	},
	{
		title: 'Progressive Disclosure',
		description:
			'Show basic information by default with option to reveal advanced details or settings when needed.'
	},
	{
		title: 'Compact List Items',
		description:
			'Display list items with summary view that can expand to show full details without navigation.'
	},
	{
		title: 'Filter Options',
		description:
			'Toggleable filter sections in sidebars that can be collapsed to save space when not in use.'
	},
	{
		title: 'Content Previews',
		description:
			'Show content previews or summaries with the ability to expand for full content view.'
	},
	{
		title: 'Settings Sections',
		description:
			'Group related settings that can be hidden or shown based on user needs.'
	}
];

const componentsSummary = [
	{
		name: 'Collapsible.Root',
		description:
			'Root container that manages the collapsible state and coordinates child components.'
	},
	{
		name: 'Collapsible.Trigger',
		description:
			'Interactive element that toggles the collapsible open/closed state. Can be customized with any clickable content.'
	},
	{
		name: 'Collapsible.Header',
		description:
			'Header section containing the trigger and any additional header content.'
	},
	{
		name: 'Collapsible.Body',
		description:
			'Collapsible content area that expands and collapses based on state.'
	},
	{
		name: 'Collapsible.Content',
		description:
			'Alias for Collapsible.Body, providing semantic naming flexibility.'
	},
	{
		name: 'Collapsible.Indicator',
		description:
			'Optional visual indicator (e.g., chevron icon) that reflects the open/closed state.'
	}
];

export const metadata = {
	title: 'Collapsible - Svelte Atoms',
	description: 'Expandable container for showing and hiding content.',
	componentTitle: 'Collapsible',
	componentDescription:
		'Expandable container for showing and hiding content. Perfect for FAQs, settings, and progressive disclosure.',
	componentType: 'compound' as const,
	status: 'stable' as const,
	packageName: '@svelte-atoms/core',
	importCode: "import { Collapsible } from '@svelte-atoms/core';",
	breadcrumbs: [{ label: 'Components', href: '/docs/components' }, { label: 'Collapsible' }],
	useCases,
	componentsSummary,
	examples: {
		basic: basicCode,
		controlled: controlledCode,
		preset: presetCode
	},
	accessibility: accessibilityFeatures
};
