const basicCode = `
<script lang="ts">
  let activeTab = $state('tab1');
</script>

<Tabs.Root bind:value={activeTab}>
  <Tabs.Header>
    <Tab.Root value="tab1">
      <Tab.Header>Tab 1</Tab.Header>
      <Tab.Body>Content 1</Tab.Body>
    </Tab.Root>
    <Tab.Root value="tab2">
      <Tab.Header>Tab 2</Tab.Header>
      <Tab.Body>Content 2</Tab.Body>
    </Tab.Root>
  </Tabs.Header>
  <Tabs.Body>
    <Tabs.Content />
  </Tabs.Body>
</Tabs.Root>`.trim();

const contentCode = `
<script lang="ts">
  let exampleTab = $state('overview');
</script>

<Tabs.Root bind:value={exampleTab}>
  <Tabs.Header>
    <Tab.Root value="overview">
      <Tab.Header>Overview</Tab.Header>
      <Tab.Body>Content</Tab.Body>
    </Tab.Root>
    <Tab.Root value="features">
      <Tab.Header>Features</Tab.Header>
      <Tab.Body>More content</Tab.Body>
    </Tab.Root>
  </Tabs.Header>
  <Tabs.Body>
    <Tabs.Content />
  </Tabs.Body>
</Tabs.Root>`.trim();

const presetCode = `
import { setPreset } from '@svelte-atoms/core';

const preset = setPreset({
  tabs: () => ({
    class: 'w-full'
  }),
  'tabs.header': () => ({
    class: 'border-b border-border'
  }),
  'tabs.content': () => ({
    class: 'mt-4'
  }),
  'tab.header': () => ({
    class: 'inline-flex items-center justify-center whitespace-nowrap px-4 py-2 text-sm font-medium transition-colors hover:bg-accent data-[active=true]:border-b-2 data-[active=true]:border-primary'
  })
});`.trim();

const accessibilityFeatures = [
	'ARIA attributes (role="tablist", role="tab", role="tabpanel")',
	'Keyboard navigation (Arrow keys, Home, End)',
	'Automatic tab panel association',
	'Focus management',
	'Screen reader support'
];

const useCases = [
	{
		title: 'Content Organization',
		description:
			'Organize related content into separate, switchable panels for better information architecture and user navigation.'
	},
	{
		title: 'Settings Interfaces',
		description:
			'Group different categories of settings (account, privacy, notifications) into tabs for easier management.'
	},
	{
		title: 'Dashboard Views',
		description:
			'Switch between different data views or reports without page navigation (analytics, performance, reports).'
	},
	{
		title: 'Product Details',
		description:
			'Display product information across multiple tabs (overview, specifications, reviews, related items).'
	},
	{
		title: 'Documentation',
		description:
			'Present code examples, API reference, and guides in tabbed interface for better developer experience.'
	},
	{
		title: 'Multi-step Forms',
		description:
			'Break complex forms into logical sections accessed via tabs while maintaining context.'
	}
];

const componentsSummary = [
	{
		name: 'Tabs.Root',
		description:
			'Root container that manages the active tab state and coordinates all child components.'
	},
	{
		name: 'Tabs.Header',
		description:
			'Container for tab triggers. Typically renders as a horizontal list of clickable tabs.'
	},
	{
		name: 'Tabs.Body',
		description:
			'Container for tab content panels.'
	},
	{
		name: 'Tabs.Content',
		description:
			'Renders the active tab\'s content. Automatically switches based on selected tab.'
	},
	{
		name: 'Tab.Root',
		description:
			'Individual tab item that contains both the header (trigger) and body (content).'
	},
	{
		name: 'Tab.Header',
		description:
			'Clickable tab trigger element that switches to this tab when activated.'
	},
	{
		name: 'Tab.Body',
		description:
			'Content panel for this specific tab, shown when tab is active.'
	},
	{
		name: 'Tab.Description',
		description:
			'Optional description or subtitle for the tab content.'
	}
];

export const metadata = {
	title: 'Tabs - Svelte Atoms',
	description: 'Organize content into multiple panels.',
	componentTitle: 'Tabs',
	componentDescription:
		'Organize content into separate views that users can switch between.',
	componentType: 'compound' as const,
	status: 'stable' as const,
	packageName: '@svelte-atoms/core',
	importCode: "import { Tabs, Tab } from '@svelte-atoms/core';",
	breadcrumbs: [{ label: 'Components', href: '/docs/components' }, { label: 'Tabs' }],
	useCases,
	componentsSummary,
	examples: {
		basic: basicCode,
		content: contentCode,
		preset: presetCode
	},
	accessibility: accessibilityFeatures
};
