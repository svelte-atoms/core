<script lang="ts">
	import { Combobox } from '$lib/components/combobox';
	import {
		PageHeader,
		Breadcrumb,
		Section,
		Installation,
		AccessibilityInfo,
		PageNavigation,
		DemoExample,
		Props,
		CodeBlock
	} from '$docs/components';
	import { Input } from '$svelte-atoms/core';
	import { Divider } from '$lib/components/divider';
	import { filterDropdownData } from '$lib/components/dropdown';

	let selectedValue = $state<string | undefined>();
	let selectedValues = $state<string[]>([]);

	let selectedLabels = $state<string[]>([]);

	const options = [
		{ value: 'option1', label: 'Option 1' },
		{ value: 'option2', label: 'Option 2' },
		{ value: 'option3', label: 'Option 3' },
		{ value: 'option4', label: 'Option 4' },
		{ value: 'option5', label: 'Option 5' }
	];

	let currencies = [
		{ value: 'usd', label: 'US Dollar' },
		{ value: 'eur', label: 'Euro' },
		{ value: 'gbp', label: 'British Pound' },
		{ value: 'jpy', label: 'Japanese Yen' },
		{ value: 'cny', label: 'Chinese Yuan' }
	];

	const filteredOptions = filterDropdownData(
		() => options,
		(query, item) => item.label.toLowerCase().includes(query.toLowerCase())
	);

	const filteredCurrencies = filterDropdownData(
		() => currencies,
		(query, item) => item.label.toLowerCase().includes(query.toLowerCase())
	);

	const basicCode = `<script lang="ts">
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
</Combobox.Root>`;

	const multipleCode = `<script lang="ts">
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
</Combobox.Root>`;

	const filterCode = `<script lang="ts">
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
    <Combobox.Query 
      bind:value={filteredItems.query} 
      class="border-border border-b px-4 py-3"
      placeholder="Type to filter..." 
    />
    {#each filteredItems.current as item (item.value)}
      <Combobox.Item value={item.value}>{item.label}</Combobox.Item>
    {/each}
  </Combobox.Content>
</Combobox.Root>`;
</script>

<svelte:head>
	<title>Combobox - Svelte Atoms</title>
	<meta
		name="description"
		content="Accessible combobox component with keyboard navigation and filtering."
	/>
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
	<Breadcrumb items={[{ label: 'Components', href: '/docs/components' }, { label: 'Combobox' }]} />

	<PageHeader
		title="Combobox"
		description="Flexible and accessible combobox component with keyboard navigation support. Built on top of Dropdown and Popover modules."
		status="stable"
	/>

	<Section title="Installation">
		<Installation
			packageName="@svelte-atoms/core"
			importCode="import &#123; Combobox &#125; from '@svelte-atoms/core';"
		/>
	</Section>

	<Section
		title="Preset Configuration"
		description="Customize the combobox appearance using presets"
	>
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for Combobox components by defining presets in your
				configuration:
			</p>
			<CodeBlock
				lang="typescript"
				code={`import { createPreset } from '@svelte-atoms/core';

const preset = createPreset({
  combobox: () => ({
    class: 'relative w-full'
  }),
  'dropdown.trigger': () => ({
    class: 'w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring'
  }),
  'combobox.control': () => ({
    class: 'flex-1 bg-transparent outline-none placeholder:text-muted-foreground'
  }),
  'combobox.item': () => ({
    class: 'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[selected=true]:bg-accent'
  })
});`}
			/>
		</div>
	</Section>

	<Section title="Examples" description="Explore different combobox variations and use cases">
		<div class="space-y-8">
			<DemoExample
				title="Basic Combobox"
				description="Simple combobox with single selection"
				code={basicCode}
			>
				<div class="max-w-sm">
					<Combobox.Root bind:value={selectedValue}>
						<Combobox.Trigger class="w-full" base={Input.Root}>
							<Combobox.Control placeholder="Select an option..." />
						</Combobox.Trigger>

						<Combobox.Content>
							{#each filteredOptions.current as option (option.value)}
								<Combobox.Item value={option.value}>{option.label}</Combobox.Item>
							{/each}
						</Combobox.Content>
					</Combobox.Root>
				</div>
			</DemoExample>

			<DemoExample
				title="Multiple Selection"
				description="Combobox with multiple selection support. Supports selecting from list items and creating custom entries by pressing Enter when in multiple mode."
				code={multipleCode}
			>
				<div class="max-w-sm">
					<Combobox.Root bind:values={selectedValues} bind:labels={selectedLabels} multiple>
						<Combobox.Trigger
							base={Input.Root}
							class="flex h-auto min-h-10 w-full flex-col items-start gap-2"
						>
							<Combobox.Control placeholder="Select multiple options..." />
							<Combobox.Selections />
						</Combobox.Trigger>

						<Combobox.Content>
							{#each options as option (option.value)}
								<Combobox.Item value={option.value}>{option.label}</Combobox.Item>
							{/each}
						</Combobox.Content>
					</Combobox.Root>
				</div>
			</DemoExample>

			<DemoExample
				title="With Filtering"
				description="Combobox with search/filter functionality using the Query component and filterDropdownData helper"
				code={filterCode}
			>
				<div class="max-w-sm">
					<Combobox.Root bind:value={selectedValue}>
						<Combobox.Trigger base={Input.Root} class="w-full">
							<Input.Icon class="text-foreground/50">$</Input.Icon>
							<Divider vertical class="mx-1" />
							<Combobox.Control placeholder="Select a currency..." />
						</Combobox.Trigger>

						<Combobox.Content>
							<Combobox.Query
								bind:value={filteredCurrencies.query}
								class="border-border border-b px-4 py-3"
								placeholder="Type to filter..."
							/>
							{#each filteredCurrencies.current as item (item.value)}
								<Combobox.Item value={item.value}>{item.label}</Combobox.Item>
							{/each}
						</Combobox.Content>
					</Combobox.Root>
				</div>
			</DemoExample>
		</div>
	</Section>

	<Section title="API Reference">
		<div class="space-y-6">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Combobox.Root Props</h3>
				<Props
					data={[
						{
							name: 'open',
							type: 'boolean',
							default: 'false',
							description: 'Control the open state of the combobox dropdown'
						},
						{
							name: 'value',
							type: 'unknown',
							default: 'undefined',
							description: 'Currently selected value (single selection)'
						},
						{
							name: 'values',
							type: 'unknown[]',
							default: 'undefined',
							description: 'Currently selected values (multiple selection)'
						},
						{
							name: 'label',
							type: 'string',
							default: 'undefined',
							description: 'Display label of the selected item (single selection)'
						},
						{
							name: 'labels',
							type: 'string[]',
							default: 'undefined',
							description: 'Display labels of the selected items (multiple selection)'
						},
						{
							name: 'multiple',
							type: 'boolean',
							default: 'false',
							description: 'Enable multiple selection'
						},
						{
							name: 'disabled',
							type: 'boolean',
							default: 'false',
							description: 'Disable the combobox'
						},
						{
							name: 'placements',
							type: 'string[]',
							default: "['bottom-start', 'bottom-end', 'top-start', 'top-end']",
							description: 'Available placement options for the dropdown'
						},
						{
							name: 'placement',
							type: 'string',
							default: "'bottom-start'",
							description: 'Default placement for the dropdown'
						},
						{
							name: 'offset',
							type: 'number',
							default: '1',
							description: 'Offset distance from the trigger element'
						},
						{
							name: 'factory',
							type: 'Factory<ComboboxBond>',
							default: 'undefined',
							description: 'Custom factory function to create combobox bond instance'
						}
					]}
				/>
			</div>

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Combobox.Trigger Props</h3>
				<Props
					data={[
						{
							name: 'as',
							type: 'string',
							default: "'button'",
							description: 'HTML element to render'
						},
						{
							name: 'base',
							type: 'Component',
							default: 'undefined',
							description: 'Base component to compose with (e.g., Input.Root for styled inputs)'
						}
					]}
				/>
			</div>

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Combobox.Item Props</h3>
				<Props
					data={[
						{
							name: 'value',
							type: 'string',
							default: 'nanoid()',
							description: 'Unique value for the item (auto-generated if not provided)'
						},
						{
							name: 'data',
							type: 'T (generic)',
							default: 'undefined',
							description: 'Custom data object associated with the item'
						},
						{
							name: 'preset',
							type: 'string',
							default: "'dropdown.item'",
							description: 'Preset key for styling customization'
						}
					]}
				/>
			</div>

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Combobox.Control Props</h3>
				<Props
					data={[
						{
							name: 'placeholder',
							type: 'string',
							default: 'undefined',
							description: 'Placeholder text for the input control'
						}
					]}
				/>
			</div>

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Combobox.Query Props</h3>
				<Props
					data={[
						{
							name: 'value',
							type: 'string',
							default: "''",
							description: 'Query/search value for filtering items'
						},
						{
							name: 'placeholder',
							type: 'string',
							default: 'undefined',
							description: 'Placeholder text for the search input'
						}
					]}
				/>
			</div>

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Available Components</h3>
				<ul class="text-muted-foreground list-disc space-y-2 pl-5 text-sm">
					<li><code>Combobox.Root</code> - Main combobox container (manages state)</li>
					<li>
						<code>Combobox.Trigger</code> - Trigger element (typically composed with Input.Root using
						base prop)
					</li>
					<li>
						<code>Combobox.Control</code> - Input control for filtering and displaying selected value
					</li>
					<li>
						<code>Combobox.Input</code> - Deprecated alias for Combobox.Control
					</li>
					<li><code>Combobox.Item</code> - Individual selectable combobox item</li>
					<li>
						<code>Combobox.Selections</code> - Container for displaying selected items (multi-select
						mode)
					</li>
					<li>
						<code>Combobox.Arrow</code> - Popover arrow indicator (re-exported from Dropdown)
					</li>
					<li>
						<code>Combobox.Indicator</code> - Custom indicator element (re-exported from Dropdown)
					</li>
					<li>
						<code>Combobox.Content</code> - List container for items (re-exported from Dropdown)
					</li>
					<li>
						<code>Combobox.List</code> - Alternative list container (re-exported from Dropdown)
					</li>
					<li><code>Combobox.Group</code> - Group container for items (re-exported from Dropdown)</li>
					<li>
						<code>Combobox.Divider</code> - Visual divider between items (re-exported from Dropdown)
					</li>
					<li><code>Combobox.Title</code> - Title element for groups (re-exported from Dropdown)</li>
					<li>
						<code>Combobox.Selection</code> - Individual selection badge/chip (re-exported from Dropdown)
					</li>
					<li><code>Combobox.Query</code> - Search/filter input (re-exported from Dropdown)</li>
					<li>
						<code>Combobox.Placeholder</code> - Placeholder element (re-exported from Dropdown)
					</li>
				</ul>
			</div>
		</div>
	</Section>

	<Section title="Helper Functions">
		<div class="space-y-4">
			<h3 class="text-foreground text-lg font-semibold">filterDropdownData</h3>
			<p class="text-muted-foreground text-sm">
				A reactive helper function for filtering dropdown/combobox data based on a query string.
			</p>
			<CodeBlock
				lang="typescript"
				code={`import { filterDropdownData } from '@svelte-atoms/core/components/dropdown';

const items = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' }
];

const filtered = filterDropdownData(
  () => items,
  (query, item) => item.label.toLowerCase().includes(query.toLowerCase())
);

// Use in template
filtered.query = 'app'; // Set search query
filtered.current; // Returns filtered results`}
			/>
		</div>
	</Section>

	<Section title="Accessibility">
		<AccessibilityInfo
			features={[
				'Full ARIA attributes support with proper roles (combobox, listbox, option)',
				'Keyboard navigation (Arrow keys to navigate, Escape to close, Enter to select)',
				'Screen reader announcements for selection changes',
				'Focus management with proper focus trapping',
				'aria-activedescendant for highlighted items',
				'aria-multiselectable for multiple selection mode',
				'Proper labeling and descriptions'
			]}
		/>
	</Section>

	<PageNavigation
		prev={{ label: 'Collapsible', href: '/docs/components/collapsible' }}
		next={{ label: 'Context Menu', href: '/docs/components/contextmenu' }}
	/>
</div>
