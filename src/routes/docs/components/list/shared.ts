const basicCode = `
<List.Root>
  <List.Item>Item 1<\/List.Item>
  <List.Item>Item 2<\/List.Item>
  <List.Item>Item 3<\/List.Item>
<\/List.Root>`.trim();

const orderedCode = `
<List.Root ordered>
  <List.Item>First step<\/List.Item>
  <List.Item>Second step<\/List.Item>
  <List.Item>Third step<\/List.Item>
<\/List.Root>`.trim();

const groupedCode = `
<List.Root>
  <List.Title>Settings<\/List.Title>
  <List.Group>
    <List.Item>Profile<\/List.Item>
    <List.Item>Preferences<\/List.Item>
  <\/List.Group>
  <List.Divider />
  <List.Title>Account<\/List.Title>
  <List.Group>
    <List.Item>Billing<\/List.Item>
    <List.Item>Security<\/List.Item>
  <\/List.Group>
<\/List.Root>`.trim();

const withIconsCode = `
<List.Root>
  <List.Item>
    <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
    Dashboard
  <\/List.Item>
  <List.Item>
    <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
    Profile
  <\/List.Item>
  <List.Item>
    <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
    Settings
  <\/List.Item>
<\/List.Root>`.trim();

const interactiveCode = `
<List.Root>
  <List.Item clickable onclick={() => alert('Item 1 clicked')}>
    Clickable Item 1
  <\/List.Item>
  <List.Item clickable onclick={() => alert('Item 2 clicked')}>
    Clickable Item 2
  <\/List.Item>
<\/List.Root>`.trim();

const presetCode = `
import { setPreset } from '@svelte-atoms/core/context';

// Basic preset configuration
setPreset({
  list: () => ({
    class: 'space-y-2'
  }),
  'list.item': () => ({
    class: 'text-muted-foreground'
  }),
  'list.group': () => ({
    class: 'flex flex-col rounded-inherit border-border'
  }),
  'list.title': () => ({
    class: 'px-6 py-1 text-sm font-medium border-border'
  }),
  'list.divider': () => ({
    class: 'my-1'
  })
});

// For interactive/clickable items, you can extend the preset:
setPreset({
  'list.item': () => ({
    class: 'text-muted-foreground hover:bg-muted cursor-pointer rounded px-3 py-2 transition-colors'
  })
});

// For grouped lists with borders:
setPreset({
  list: () => ({
    class: 'rounded-lg border border-border max-w-sm'
  }),
  'list.title': () => ({
    class: 'px-4 py-2 text-sm font-medium'
  }),
  'list.item': () => ({
    class: 'px-4 py-2 text-muted-foreground hover:bg-muted cursor-pointer transition-colors'
  })
});
`.trim();

const accessibilityFeatures = [
	'Use semantic ul or ol elements',
	'Ensure interactive items are keyboard accessible',
	'Proper ARIA attributes for custom lists',
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
		name: 'List.Root',
		description: 'TODO: Describe what this sub-component does.'
	}
	// TODO: Add all sub-components
];

export const metadata = {
	title: 'List - Svelte Atoms',
	description: 'TODO: Brief SEO description',
	componentTitle: 'List',
	componentDescription:
		'TODO: Detailed component description',
	componentType: 'compound' as const, // TODO: Change to 'simple' if not compound
	status: 'stable' as const,
	packageName: '@svelte-atoms/core',
	importCode: "import { List } from '@svelte-atoms/core';",
	breadcrumbs: [{ label: 'Components', href: '/docs/components' }, { label: 'List' }],
	useCases,
	componentsSummary, // TODO: Remove if simple component
	examples: {
		basic: basicCode,
		ordered: orderedCode,
		interactive: interactiveCode,
		grouped: groupedCode,
		withIcons: withIconsCode,
		preset: presetCode
	},
	accessibility: accessibilityFeatures
};
