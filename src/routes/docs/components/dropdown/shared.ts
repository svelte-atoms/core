const basicCode = `
<Dropdown.Root>
  <Dropdown.Trigger as="button">
    Open Menu
  </Dropdown.Trigger>
  
  <Dropdown.Content>
    <Dropdown.Item value="profile">Profile</Dropdown.Item>
    <Dropdown.Item value="settings">Settings</Dropdown.Item>
    <Dropdown.Item value="logout">Logout</Dropdown.Item>
  </Dropdown.Content>
</Dropdown.Root>`.trim();

const multipleCode = `
<script lang="ts">
  import { Dropdown, Input } from '@svelte-atoms/core';
  
  let selectedValues = $state<string[]>([]);
  let selectedLabels = $state<string[]>([]);
  
  const items = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' }
  ];
</script>

<Dropdown.Root bind:values={selectedValues} bind:labels={selectedLabels} multiple>
	<Dropdown.Trigger base={Input.Root} class="min-h-10 min-w-sm">
		<Dropdown.Selections class="flex flex-wrap gap-1" />
		<Dropdown.Placeholder class="">No fruits selected</Dropdown.Placeholder>
	</Dropdown.Trigger>
	
	<Dropdown.Content
		class="bg-background mt-2 max-h-60 overflow-auto rounded-lg border shadow-lg"
	>
		<input
			bind:value={filteredItems.query}
			class="border-border border-b px-4 py-3"
			placeholder="Search items..."
		/>
		{#each filteredItems.current as item (item.value)}
			<Dropdown.Item value={item.value} class="hover:bg-muted block px-4 py-2">
				{item.label}
			</Dropdown.Item>
		{/each}
	</Dropdown.Content>
</Dropdown.Root>`.trim();

const presetCode = `
import { setPreset } from '@svelte-atoms/core';

const preset = setPreset({
  dropdown: () => ({
    class: 'relative inline-block text-left'
  }),
  'dropdown.trigger': () => ({
    class: 'relative flex h-auto min-h-10 flex-wrap items-center border border-border rounded-md bg-background px-3 py-2 text-sm hover:bg-accent transition-colors'
  }),
  'dropdown.item': () => ({
    class: 'block w-full px-4 py-2 text-left text-sm hover:bg-accent transition-colors cursor-pointer'
  }),
  'dropdown.query': () => ({
    class: 'inline-flex h-auto w-auto flex-1 py-1'
  })
});`.trim();

const accessibilityFeatures = [
	'Keyboard navigation (Arrow keys, Enter, Escape)',
	'ARIA attributes (role="menu", role="menuitem")',
	'Focus management',
	'Screen reader support',
	'Click outside to close',
	'Multiple selection support'
];

const useCases = [
	{
		title: 'Action Menus',
		description:
			'Display a list of actions or commands that users can select from (e.g., file operations, user actions).'
	},
	{
		title: 'Filter Controls',
		description:
			'Provide filtering options for data tables, lists, or search results with single or multiple selection.'
	},
	{
		title: 'Item Selection',
		description:
			'Allow users to select one or more items from a list with search and filtering capabilities.'
	},
	{
		title: 'Navigation Menus',
		description:
			'Create dropdown navigation menus for site navigation or contextual menu options.'
	},
	{
		title: 'Form Field Replacements',
		description:
			'Replace traditional select elements with more customizable and feature-rich dropdown components.'
	},
	{
		title: 'Context Menus',
		description:
			'Show contextual actions or options related to specific UI elements or data items.'
	}
];

const componentsSummary = [
	{
		name: 'Dropdown.Root',
		description:
			'Root container that manages dropdown state, selection values, and coordinates all child components. Supports single or multiple selection modes.'
	},
	{
		name: 'Dropdown.Trigger',
		description:
			'Interactive element that opens/closes the dropdown. Can be composed with other components like Input or Button.'
	},
	{
		name: 'Dropdown.Content',
		description:
			'Container for dropdown items. Positioned relative to trigger using floating-ui. Can contain search inputs and scrollable lists.'
	},
	{
		name: 'Dropdown.Item',
		description:
			'Individual selectable item in the dropdown. Handles selection state and keyboard navigation.'
	},
	{
		name: 'Dropdown.Query',
		description:
			'Search input component for filtering dropdown items. Integrates with filterDropdownData utility.'
	},
	{
		name: 'Dropdown.Selections',
		description:
			'Displays currently selected items in multiple selection mode. Typically shown in the trigger area.'
	},
	{
		name: 'Dropdown.Selection',
		description:
			'Individual selected item representation with remove functionality in multiple selection mode.'
	},
	{
		name: 'Dropdown.Placeholder',
		description:
			'Placeholder text shown when no items are selected.'
	}
];

export const metadata = {
	title: 'Dropdown - Svelte Atoms',
	description: 'Dropdown menu for actions and options.',
	componentTitle: 'Dropdown',
	componentDescription:
		'Flexible dropdown component with single/multiple selection support, search functionality, and advanced composition. Built on top of Menu and Popover modules.',
	componentType: 'compound' as const,
	status: 'stable' as const,
	packageName: '@svelte-atoms/core',
	importCode: "import { Dropdown } from '@svelte-atoms/core';",
	breadcrumbs: [{ label: 'Components', href: '/docs/components' }, { label: 'Dropdown' }],
	useCases,
	componentsSummary,
	examples: {
		basic: basicCode,
		multiple: multipleCode,
		preset: presetCode
	},
	accessibility: accessibilityFeatures
};
