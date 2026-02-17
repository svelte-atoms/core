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
	'Full ARIA attributes support with proper roles (combobox',
	'listbox',
	'option)',
	'Keyboard navigation (Arrow keys to navigate',
	'Escape to close',
	'Enter to select)',
	'Screen reader announcements for selection changes',
	'Focus management with proper focus trapping',
	'aria-activedescendant for highlighted items',
	'aria-multiselectable for multiple selection mode',
	'Proper labeling and descriptions'
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
		name: 'Combobox.Root',
		description: 'TODO: Describe what this sub-component does.'
	}
	// TODO: Add all sub-components
];

export const metadata = {
	title: 'Combobox - Svelte Atoms',
	description: 'TODO: Brief SEO description',
	componentTitle: 'Combobox',
	componentDescription:
		'TODO: Detailed component description',
	componentType: 'compound' as const, // TODO: Change to 'simple' if not compound
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
