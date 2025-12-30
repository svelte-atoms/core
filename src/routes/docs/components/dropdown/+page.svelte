<script lang="ts">
	import { Dropdown } from '$lib/components/dropdown';
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

	import { Input } from '$lib/components/input';
	import { filterDropdownData } from '$lib/components/dropdown';

	const basicCode = `<Dropdown.Root>
  <Dropdown.Trigger as="button">
    Open Menu
  </Dropdown.Trigger>
  
  <Dropdown.Content>
    <Dropdown.Item value="profile">Profile</Dropdown.Item>
    <Dropdown.Item value="settings">Settings</Dropdown.Item>
    <Dropdown.Item value="logout">Logout</Dropdown.Item>
  </Dropdown.Content>
</Dropdown.Root>`;

	const multipleCode = `<script lang="ts">
  import { Dropdown, Input } from '@svelte-atoms/core';
  
  let selectedValues = $state<string[]>([]);
  let selectedLabels = $state<string[]>([]);
  
  const items = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' }
  ];
<\/script>

<Dropdown.Root bind:values={selectedValues} bind:labels={selectedLabels} multiple>
	<Dropdown.Trigger base={Input.Root} class="min-h-10 min-w-sm">
		<Dropdown.Selections class="flex flex-wrap gap-1" />
		<Dropdown.Placeholder class="">No fruits selected</Dropdown.Placeholder>
	</Dropdown.Trigger>
	
	<Dropdown.Content
		class="bg-background mt-2 max-h-60 overflow-auto rounded-lg border shadow-lg"
	>
		<Dropdown.Query
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
</Dropdown.Root>`;

	let selectedValues = $state<string[]>([]);
	let selectedLabels = $state<string[]>([]);

	const items = [
		{ value: 'apple', label: 'Apple' },
		{ value: 'banana', label: 'Banana' },
		{ value: 'cherry', label: 'Cherry' },
		{ value: 'date', label: 'Date' },
		{ value: 'elderberry', label: 'Elderberry' }
	];

	const filteredItems = filterDropdownData(
		() => items,
		(query, item) => item.label.toLowerCase().includes(query.toLowerCase())
	);
</script>

<svelte:head>
	<title>Dropdown - Svelte Atoms</title>
	<meta name="description" content="Dropdown menu for actions and options." />
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
	<Breadcrumb items={[{ label: 'Components', href: '/docs/components' }, { label: 'Dropdown' }]} />

	<PageHeader
		title="Dropdown"
		description="Flexible dropdown component with single/multiple selection support, search functionality, and advanced composition. Built on top of Menu and Popover modules."
		status="stable"
	/>

	<Section title="Installation">
		<Installation
			packageName="@svelte-atoms/core"
			importCode="import &#123; Dropdown &#125; from '@svelte-atoms/core';"
		/>
	</Section>

	<Section
		title="Preset Configuration"
		description="Customize the dropdown appearance using presets"
	>
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for Dropdown components by defining presets in your
				configuration:
			</p>
			<CodeBlock
				lang="typescript"
				code={`import { createPreset } from '@svelte-atoms/core';

const preset = createPreset({
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
});`}
			/>
		</div>
	</Section>

	<Section title="Examples" description="Explore different dropdown variations and use cases">
		<div class="space-y-8">
			<DemoExample
				title="Basic Dropdown"
				description="Simple dropdown menu with items"
				code={basicCode}
			>
				<Dropdown.Root>
					<Dropdown.Trigger base={Input.Root} class="h-10 min-w-sm">
						<Dropdown.Selections class="flex flex-wrap gap-1" />
						<Dropdown.Placeholder class="">No fruit selected</Dropdown.Placeholder>
					</Dropdown.Trigger>

					<Dropdown.Content
						class="bg-background mt-2 max-h-60 overflow-auto rounded-lg border shadow-lg"
					>
						<Dropdown.Query
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
				</Dropdown.Root>
			</DemoExample>

			<DemoExample
				title="Multiple Selection"
				description="Dropdown with multiple selection support. Selected items are displayed as badges."
				code={multipleCode}
			>
				<div class="max-w-sm">
					<Dropdown.Root bind:values={selectedValues} bind:labels={selectedLabels} multiple>
						<Dropdown.Trigger base={Input.Root} class="min-h-10 min-w-sm">
							<Dropdown.Selections class="flex flex-wrap gap-1" />
							<Dropdown.Placeholder class="">No fruits selected</Dropdown.Placeholder>
						</Dropdown.Trigger>

						<Dropdown.Content
							class="bg-background mt-2 max-h-60 overflow-auto rounded-lg border shadow-lg"
						>
							<Dropdown.Query
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
					</Dropdown.Root>
				</div>
			</DemoExample>
		</div>
	</Section>

	<Section title="API Reference">
		<div class="space-y-6">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Dropdown.Root Props</h3>
				<Props
					data={[
						{
							name: 'open',
							type: 'boolean',
							default: 'false',
							description: 'Control the open/closed state of the dropdown'
						},
						{
							name: 'value',
							type: 'unknown',
							default: 'undefined',
							description: 'Currently selected value (single selection mode)'
						},
						{
							name: 'values',
							type: 'unknown[]',
							default: 'undefined',
							description: 'Currently selected values (multiple selection mode)'
						},
						{
							name: 'label',
							type: 'string',
							default: 'undefined',
							description: 'Display label of the selected item (auto-managed)'
						},
						{
							name: 'labels',
							type: 'string[]',
							default: 'undefined',
							description: 'Display labels of selected items (auto-managed)'
						},
						{
							name: 'multiple',
							type: 'boolean',
							default: 'false',
							description: 'Enable multiple selection mode'
						},
						{
							name: 'disabled',
							type: 'boolean',
							default: 'false',
							description: 'Disable the dropdown'
						},
						{
							name: 'placement',
							type: 'string',
							default: "'bottom-start'",
							description: 'Default placement for the dropdown list'
						},
						{
							name: 'placements',
							type: 'string[]',
							default: "['bottom-start', 'bottom-end', 'top-start', 'top-end']",
							description: 'Available placement options for auto-positioning'
						},
						{
							name: 'offset',
							type: 'number',
							default: '1',
							description: 'Offset distance from the trigger element'
						},
						{
							name: 'keys',
							type: 'string[]',
							default: '[]',
							description: 'Array of valid item keys for validation'
						}
					]}
				/>
			</div>

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Dropdown.Trigger Props</h3>
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
							default: 'Input.Root',
							description: 'Base component to compose with (e.g., Input.Root for styled inputs)'
						}
					]}
				/>
			</div>

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Dropdown.Item Props</h3>
				<Props
					data={[
						{
							name: 'value',
							type: 'string',
							default: 'auto-generated',
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
				<h3 class="text-foreground mb-3 text-lg font-semibold">Dropdown.Query Props</h3>
				<Props
					data={[
						{
							name: 'value',
							type: 'string',
							default: "''",
							description: 'Search query value for filtering items'
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
				<h3 class="text-foreground mb-3 text-lg font-semibold">Dropdown.Selections Props</h3>
				<Props
					data={[
						{
							name: 'class',
							type: 'ClassValue',
							default: 'undefined',
							description: 'CSS class for the selections container'
						},
						{
							name: 'Selection',
							type: 'Component',
							default: 'Dropdown.Selection',
							description: 'Custom component to render each selection'
						},
						{
							name: 'getSelections',
							type: '(bond: DropdownBond) => DropdownSelection[]',
							default: 'undefined',
							description: 'Custom function to retrieve selections from the bond'
						}
					]}
				/>
			</div>

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Dropdown.Selection Props</h3>
				<Props
					data={[
						{
							name: 'selection',
							type: 'DropdownSelection',
							default: '-',
							description: 'Selection object containing id, value, label, and unselect function (required)'
						},
						{
							name: 'base',
							type: 'Component',
							default: 'Chip (in multiple mode)',
							description: 'Base component to compose with'
						},
						{
							name: 'onclose',
							type: '(event: Event) => void',
							default: 'undefined',
							description: 'Callback fired when the selection is closed/removed'
						}
					]}
				/>
			</div>

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Available Components</h3>
				<ul class="text-muted-foreground list-disc space-y-2 pl-5 text-sm">
					<li><code>Dropdown.Root</code> - Main dropdown container (manages state)</li>
					<li>
						<code>Dropdown.Trigger</code> - Trigger element (composable with Input.Root or button)
					</li>
					<li><code>Dropdown.Item</code> - Individual selectable list item</li>
					<li><code>Dropdown.Query</code> - Search/filter input component</li>
					<li>
						<code>Dropdown.Selections</code> - Container for displaying selected items (badges)
					</li>
					<li><code>Dropdown.Selection</code> - Individual selection badge/chip</li>
					<li><code>Dropdown.Placeholder</code> - Placeholder element for empty state</li>
					<li><code>Dropdown.List</code> - List container (re-exported from Menu)</li>
					<li>
						<code>Dropdown.Content</code> - Alternative list container (re-exported from Menu)
					</li>
					<li><code>Dropdown.Group</code> - Group container for items (re-exported from Menu)</li>
					<li>
						<code>Dropdown.Divider</code> - Visual divider between items (re-exported from Menu)
					</li>
					<li><code>Dropdown.Title</code> - Title element for groups (re-exported from Menu)</li>
					<li><code>Dropdown.Arrow</code> - Popover arrow indicator (re-exported from Popover)</li>
					<li>
						<code>Dropdown.Indicator</code> - Custom indicator element (re-exported from Popover)
					</li>
				</ul>
			</div>
		</div>
	</Section>

	<Section title="Helper Functions">
		<div class="space-y-4">
			<h3 class="text-foreground text-lg font-semibold">filterDropdownData</h3>
			<p class="text-muted-foreground text-sm">
				A reactive helper function for filtering dropdown data based on a query string. Returns an
				object with <code>query</code> (getter/setter) and <code>current</code> (filtered results).
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

// Usage
filtered.query = 'app'; // Set search query
filtered.current; // Returns filtered results: [{ value: 'apple', label: 'Apple' }]`}
			/>
		</div>
	</Section>

	<Section title="Accessibility">
		<AccessibilityInfo
			features={[
				'Keyboard navigation (Arrow keys)',
				'Escape key to close',
				'Proper ARIA attributes',
				'Focus management',
				'Screen reader support',
				'Automatic positioning'
			]}
		/>
	</Section>

	<PageNavigation
		prev={{ label: 'Drawer', href: '/docs/components/drawer' }}
		next={{ label: 'Form', href: '/docs/components/form' }}
	/>
</div>
