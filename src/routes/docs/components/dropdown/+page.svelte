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
	import {
		dropdownRootProps,
		dropdownTriggerProps,
		dropdownItemProps,
		dropdownQueryProps,
		dropdownSelectionsProps,
		dropdownSelectionProps
	} from './props';
	import { metadata } from './shared';

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
	<title>{metadata.title}</title>
	<meta name="description" content={metadata.description} />
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
	<Breadcrumb items={metadata.breadcrumbs} />

	<PageHeader
		title={metadata.componentTitle}
		description={metadata.componentDescription}
		status={metadata.status}
	/>

	<Section.Root>
		<Section.Header>
			<Section.Title>Installation</Section.Title>
		</Section.Header>
		<Installation
			packageName={metadata.packageName}
			importCode={metadata.importCode}
		/>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Preset Configuration</Section.Title>
			<Section.Subtitle>Customize the dropdown appearance using presets</Section.Subtitle>
		</Section.Header>
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for Dropdown components by defining presets in your
				configuration:
			</p>
			<CodeBlock
				lang="typescript"
				code={metadata.examples.preset}
			/>
		</div>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Examples</Section.Title>
			<Section.Subtitle>Explore different dropdown variations and use cases</Section.Subtitle>
		</Section.Header>
		<div class="space-y-8">
			<DemoExample
				title="Basic Dropdown"
				description="Simple dropdown menu with items"
				code={metadata.examples.basic}
			>
				<Dropdown.Root>
					<Dropdown.Trigger base={Input.Root} class="h-10 min-w-sm">
						<Dropdown.Selections class="flex flex-wrap gap-1" />
						<Dropdown.Placeholder class="">No fruit selected</Dropdown.Placeholder>
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
				</Dropdown.Root>
			</DemoExample>

			<DemoExample
				title="Multiple Selection"
				description="Dropdown with multiple selection support. Selected items are displayed as badges."
				code={metadata.examples.multiple}
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
					</Dropdown.Root>
				</div>
			</DemoExample>
		</div>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>API Reference</Section.Title>
		</Section.Header>
		<div class="space-y-6">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Dropdown.Root Props</h3>
				<Props data={[...dropdownRootProps]} />
			</div>

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Dropdown.Trigger Props</h3>
				<Props data={[...dropdownTriggerProps]} />
			</div>

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Dropdown.Item Props</h3>
				<Props data={[...dropdownItemProps]} />
			</div>

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Dropdown.Query Props</h3>
				<Props data={[...dropdownQueryProps]} />
			</div>

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Dropdown.Selections Props</h3>
				<Props data={[...dropdownSelectionsProps]} />
			</div>

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Dropdown.Selection Props</h3>
				<Props data={[...dropdownSelectionProps]} />
			</div>

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Available Components</h3>
				<ul class="text-muted-foreground list-disc space-y-2 pl-5 text-sm">
					<li><code>Dropdown.Root</code> - Main dropdown container (manages state)</li>
					<li>
						<code>Dropdown.Trigger</code> - Trigger element (composable with Input.Root or button)
					</li>
					<li><code>Dropdown.Item</code> - Individual selectable list item</li>
					<li>
						<code>Dropdown.Selections</code> - Container for displaying selected items (badges)
					</li>
					<li><code>Dropdown.Selection</code> - Individual selection badge/chip</li>
					<li><code>Dropdown.Placeholder</code> - Placeholder element for empty state</li>
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
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Helper Functions</Section.Title>
		</Section.Header>
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
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Accessibility</Section.Title>
		</Section.Header>
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
	</Section.Root>

	<PageNavigation
		prev={{ label: 'Drawer', href: '/docs/components/drawer' }}
		next={{ label: 'Form', href: '/docs/components/form' }}
	/>
</div>
