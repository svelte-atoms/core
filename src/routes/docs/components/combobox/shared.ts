const basicCode = `
<script lang="ts">
  import { Combobox } from '@svelte-atoms/core';
  import { Input } from '@svelte-atoms/core';

  let value = $state<string | undefined>();
  let label = $state<string | undefined>();
  
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ];
<\/script>

<Combobox.Root bind:value bind:label>
  <Combobox.Trigger base={Input.Root}>
    <Combobox.Control placeholder="Select an option..." />
  </Combobox.Trigger>

  <Combobox.Content>
    {#each options as option (option.value)}
      <Combobox.Item value={option.value}>{option.label}</Combobox.Item>
    {/each}
  </Combobox.Content>
</Combobox.Root>`.trim();

const multipleCode = `
<script lang="ts">
  import { Combobox } from '@svelte-atoms/core';
  import { Input } from '@svelte-atoms/core';

  let values = $state<string[]>([]);
  let labels = $state<string[]>([]);
  
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ];
<\/script>

<Combobox.Root bind:values bind:labels multiple>
  <Combobox.Trigger base={Input.Root} class="flex h-auto min-h-10 flex-col items-start gap-2">
    <Combobox.Control placeholder="Select multiple options..." />
    <Combobox.Selections />
  </Combobox.Trigger>

  <Combobox.Content>
    {#each options as option (option.value)}
      <Combobox.Item value={option.value}>{option.label}</Combobox.Item>
    {/each}
  </Combobox.Content>
</Combobox.Root>`.trim();

const filterCode = `
<script lang="ts">
  import { Combobox } from '@svelte-atoms/core';
  import { Input, Divider } from '@svelte-atoms/core';
  import { filterDropdownData } from '@svelte-atoms/core/components/dropdown';

  let value = $state<string | undefined>();
  let label = $state<string | undefined>();
  
  let currencies = [
    { value: 'usd', label: 'US Dollar' },
    { value: 'eur', label: 'Euro' },
    { value: 'gbp', label: 'British Pound' }
  ];

  const filteredItems = filterDropdownData(
    () => currencies,
    (query, item) => item.label.toLowerCase().includes(query.toLowerCase())
  );
<\/script>

<Combobox.Root bind:value bind:label>
  <Combobox.Trigger base={Input.Root}>
    <Input.Icon class="text-foreground/50">$</Input.Icon>
    <Divider vertical class="mx-1" />
    <Combobox.Control placeholder="Select a currency..." />
  </Combobox.Trigger>

  <Combobox.Content>
    <input 
      bind:value={filteredItems.query} 
      class="border-border border-b px-4 py-3"
      placeholder="Type to filter..." 
    />
    {#each filteredItems.current as item (item.value)}
      <Combobox.Item value={item.value}>{item.label}</Combobox.Item>
    {/each}
  </Combobox.Content>
</Combobox.Root>`.trim();

const presetCode = `
import { setPreset } from '@svelte-atoms/core';

const preset = setPreset({
  combobox: () => ({
    class: 'REPLACE_WITH_PRESET_CLASSES'
  })
});
`.trim();

const accessibilityFeatures = [
	'Full ARIA attributes support with proper roles (combobox, listbox, option)',
	'Keyboard navigation (Arrow keys to navigate, Escape to close, Enter to select)',
	'Screen reader announcements for selection changes',
	'Focus management with proper focus trapping',
	'aria-activedescendant for highlighted items',
	'aria-multiselectable for multiple selection mode',
	'Proper labeling and descriptions'
];

const useCases = [
	{
		title: 'Single Value Selection',
		description: 'Allow users to pick one option from a list, like selecting a country, category, or status — with type-ahead support for fast navigation.'
	},
	{
		title: 'Multi-Select Tagging',
		description: 'Enable selecting multiple values (e.g., tags, skills, team members) that render as removable chips in the trigger area.'
	},
	{
		title: 'Searchable Dropdowns',
		description: 'Filter a long list of options in real-time as the user types, ideal for currency pickers, user lookups, or product selectors.'
	},
	{
		title: 'Form Fields',
		description: 'Replace native <select> elements in forms with a richer UI that supports icons, custom rendering, and validation integration.'
	},
	{
		title: 'Async Data Loading',
		description: 'Load options dynamically from an API as the user types, supporting use cases like location search or user autocomplete.'
	},
	{
		title: 'Custom Entry Creation',
		description: 'In multiple mode, allow users to type and press Enter to create custom values not in the predefined list.'
	}
];

const componentsSummary = [
	{
		name: 'Combobox.Root',
		description: 'Root container that manages selection state (value/values, label/labels), open state, and coordinates all child components. Supports single and multiple selection modes.'
	},
	{
		name: 'Combobox.Trigger',
		description: 'Interactive element that opens/closes the combobox dropdown. Typically composed with Input.Root via the base prop to look like a text input.'
	},
	{
		name: 'Combobox.Control',
		description: 'Text input control within the trigger. Displays the selected label in single mode and serves as a filter/search input. Supports placeholder.'
	},
	{
		name: 'Combobox.Item',
		description: 'Individual selectable option in the dropdown list. Handles selection state, keyboard highlight, and click events.'
	},
	{
		name: 'Combobox.Selections',
		description: 'Renders all currently selected items as chips/badges. Used in multiple selection mode, typically inside the trigger.'
	},
	{
		name: 'Combobox.Content',
		description: 'Dropdown container for the list of items. Positioned relative to the trigger using floating-ui. Can contain search inputs and scrollable lists. Re-exported from Dropdown.'
	},
	{
		name: 'Combobox.Selection',
		description: 'Individual selected item badge with a remove button. Re-exported from Dropdown.'
	},
	{
		name: 'Combobox.Placeholder',
		description: 'Placeholder element shown when no item is selected. Re-exported from Dropdown.'
	},
	{
		name: 'Combobox.Arrow / Combobox.Indicator',
		description: 'Visual indicator elements for the dropdown trigger (e.g., chevron icon). Re-exported from Dropdown.'
	},
	{
		name: 'Combobox.Group / Combobox.Title / Combobox.Divider',
		description: 'Grouping helpers for organizing items with titles and separators inside the dropdown content. Re-exported from Dropdown.'
	}
];

export const metadata = {
	title: 'Combobox - Svelte Atoms',
	description: 'Accessible combobox with single/multiple selection, search filtering, and keyboard navigation. Built on Dropdown and Popover.',
	componentTitle: 'Combobox',
	componentDescription:
		'A flexible combobox combining a text input with a dropdown list, supporting single and multiple selection, real-time filtering, and full keyboard navigation. Built on top of the Dropdown and Popover modules, it can be composed with Input.Root for consistent styling across your UI.',
	componentType: 'compound' as const,
	status: 'stable' as const,
	packageName: '@svelte-atoms/core',
	importCode: "import { Combobox } from '@svelte-atoms/core';",
	breadcrumbs: [{ label: 'Components', href: '/docs/components' }, { label: 'Combobox' }],
	useCases,
	componentsSummary, // TODO: Remove if simple component
	examples: {
		basic: basicCode,
		multiple: multipleCode,
		filter: filterCode
	},
	accessibility: accessibilityFeatures
};
