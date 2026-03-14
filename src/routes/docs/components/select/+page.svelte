<script lang="ts">
	import { Select } from '$lib/components/select';
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
	import { filterSelectData } from '$lib/components/select';
	import {
		selectRootProps,
		selectTriggerProps,
		selectItemProps,
		selectQueryProps,
		selectSelectionsProps,
		selectSelectionProps
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

	const filteredItems = filterSelectData(
		() => items,
		(query, item) => item.label.toLowerCase().includes(query.toLowerCase())
	);
</script>

<svelte:head>
	<title>{metadata.title}</title>
	<meta name="description" content={metadata.description} />
</svelte:head>

<div class="py-8">
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
			<Section.Subtitle>Customize the select appearance using presets</Section.Subtitle>
		</Section.Header>
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for Select components by defining presets in your
				configuration:
			</p>
			<CodeBlock lang="typescript" code={metadata.examples.preset} />
		</div>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Examples</Section.Title>
			<Section.Subtitle>Explore different select variations and use cases</Section.Subtitle>
		</Section.Header>
		<div class="space-y-8">
			<DemoExample
				title="Basic Select"
				description="Simple select with items"
				code={metadata.examples.basic}
			>
				<Select.Root>
					<Select.Trigger base={Input.Root} class="h-10 min-w-sm">
						<Select.Selections class="flex flex-wrap gap-1" />
						<Select.Placeholder class="">No fruit selected</Select.Placeholder>
					</Select.Trigger>

					<Select.Content
						class="bg-background mt-2 max-h-60 overflow-auto rounded-lg border shadow-lg"
					>
						<input
							bind:value={filteredItems.query}
							class="border-border border-b px-4 py-3"
							placeholder="Search items..."
						/>
						{#each filteredItems.current as item (item.value)}
							<Select.Item value={item.value} class="hover:bg-muted block px-4 py-2">
								{item.label}
							</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			</DemoExample>

			<DemoExample
				title="Multiple Selection"
				description="Select with multiple selection support. Selected items are displayed as badges."
				code={metadata.examples.multiple}
			>
				<div class="max-w-sm">
					<Select.Root bind:values={selectedValues} bind:labels={selectedLabels} multiple>
						<Select.Trigger base={Input.Root} class="min-h-10 min-w-sm">
							<Select.Selections class="flex flex-wrap gap-1" />
							<Select.Placeholder class="">No fruits selected</Select.Placeholder>
						</Select.Trigger>

						<Select.Content
							class="bg-background mt-2 max-h-60 overflow-auto rounded-lg border shadow-lg"
						>
							<input
								bind:value={filteredItems.query}
								class="border-border border-b px-4 py-3"
								placeholder="Search items..."
							/>
							{#each filteredItems.current as item (item.value)}
								<Select.Item value={item.value} class="hover:bg-muted block px-4 py-2">
									{item.label}
								</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
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
				<h3 class="text-foreground mb-3 text-lg font-semibold">Select.Root Props</h3>
				<Props data={[...selectRootProps]} />
			</div>

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Select.Trigger Props</h3>
				<Props data={[...selectTriggerProps]} />
			</div>

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Select.Item Props</h3>
				<Props data={[...selectItemProps]} />
			</div>

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Select.Query Props</h3>
				<Props data={[...selectQueryProps]} />
			</div>

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Select.Selections Props</h3>
				<Props data={[...selectSelectionsProps]} />
			</div>

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Select.Selection Props</h3>
				<Props data={[...selectSelectionProps]} />
			</div>

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Available Components</h3>
				<ul class="text-muted-foreground list-disc space-y-2 pl-5 text-sm">
					<li><code>Select.Root</code> - Main select container (manages state)</li>
					<li>
						<code>Select.Trigger</code> - Trigger element (composable with Input.Root or button)
					</li>
					<li><code>Select.Item</code> - Individual selectable list item</li>
					<li>
						<code>Select.Selections</code> - Container for displaying selected items (badges)
					</li>
					<li><code>Select.Selection</code> - Individual selection badge/chip</li>
					<li><code>Select.Placeholder</code> - Placeholder element for empty state</li>
					<li>
						<code>Select.Content</code> - List container (re-exported from Dropdown Menu)
					</li>
					<li><code>Select.Group</code> - Group container for items (re-exported from Dropdown Menu)</li>
					<li>
						<code>Select.Divider</code> - Visual divider between items (re-exported from Dropdown Menu)
					</li>
					<li><code>Select.Title</code> - Title element for groups (re-exported from Dropdown Menu)</li>
					<li><code>Select.Arrow</code> - Popover arrow indicator (re-exported from Popover)</li>
					<li>
						<code>Select.Indicator</code> - Custom indicator element (re-exported from Popover)
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
			<h3 class="text-foreground text-lg font-semibold">filterSelectData</h3>
			<p class="text-muted-foreground text-sm">
				A reactive helper function for filtering select data based on a query string. Returns an
				object with <code>query</code> (getter/setter) and <code>current</code> (filtered results).
			</p>
			<CodeBlock
				lang="typescript"
				code={`import { filterSelectData } from '@svelte-atoms/core/components/select';

const items = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' }
];

const filtered = filterSelectData(
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
