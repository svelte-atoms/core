<script lang="ts">
	import { List } from '$lib/components/list';
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

	const basicCode = `<List.Root>
  <List.Item>Item 1<\/List.Item>
  <List.Item>Item 2<\/List.Item>
  <List.Item>Item 3<\/List.Item>
<\/List.Root>`;

	const orderedCode = `<List.Root ordered>
  <List.Item>First step<\/List.Item>
  <List.Item>Second step<\/List.Item>
  <List.Item>Third step<\/List.Item>
<\/List.Root>`;

	const groupedCode = `<List.Root>
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
<\/List.Root>`;

	const withIconsCode = `<List.Root>
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
<\/List.Root>`;
</script>

<svelte:head>
	<title>List - Svelte Atoms</title>
	<meta name="description" content="Display collections of items in a structured way." />
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
	<Breadcrumb items={[{ label: 'Components', href: '/docs/components' }, { label: 'List' }]} />

	<PageHeader
		title="List"
		description="Display collections of related items in a structured format. Supports ordered and unordered lists."
		status="stable"
	/>

	<Section title="Installation">
		<Installation
			packageName="@svelte-atoms/core"
			importCode="import &#123; List &#125; from '@svelte-atoms/core/list';"
		/>
	</Section>

	<Section title="Preset Configuration" description="Customize the list appearance using presets">
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for List components by defining presets in your
				configuration:
			</p>
			<CodeBlock
				lang="typescript"
				code={`import { setPreset } from '@svelte-atoms/core/context';

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
});`}
			/>
		</div>
	</Section>

	<Section title="Examples" description="Explore different list variations">
		<div class="space-y-8">
			<DemoExample title="Basic List" description="Simple unordered list" code={basicCode}>
				<List.Root class="space-y-2">
					<List.Item class="text-muted-foreground">Item 1</List.Item>
					<List.Item class="text-muted-foreground">Item 2</List.Item>
					<List.Item class="text-muted-foreground">Item 3</List.Item>
				</List.Root>
			</DemoExample>

			<DemoExample
				title="Ordered List"
				description="Numbered list for sequential items"
				code={orderedCode}
			>
				<List.Root ordered class="space-y-2">
					<List.Item class="text-muted-foreground">First step</List.Item>
					<List.Item class="text-muted-foreground">Second step</List.Item>
					<List.Item class="text-muted-foreground">Third step</List.Item>
				</List.Root>
			</DemoExample>

			<DemoExample
				title="Interactive List"
				description="Clickable list items"
				code={`<List.Root>
  <List.Item clickable onclick={() => alert('Item 1 clicked')}>
    Clickable Item 1
  <\/List.Item>
  <List.Item clickable onclick={() => alert('Item 2 clicked')}>
    Clickable Item 2
  <\/List.Item>
<\/List.Root>`}
			>
				<List.Root class="space-y-1">
					<List.Item
						clickable
						class="hover:bg-muted cursor-pointer rounded px-3 py-2"
						onclick={() => alert('Item 1 clicked')}
					>
						Clickable Item 1
					</List.Item>
					<List.Item
						clickable
						class="hover:bg-muted cursor-pointer rounded px-3 py-2"
						onclick={() => alert('Item 2 clicked')}
					>
						Clickable Item 2
					</List.Item>
				</List.Root>
			</DemoExample>

			<DemoExample
				title="Grouped List"
				description="Organize items with titles and dividers"
				code={groupedCode}
			>
				<List.Root class="border-border max-w-sm rounded-lg border">
					<List.Title class="text-sm">Settings</List.Title>
					<List.Group>
						<List.Item class="text-muted-foreground hover:bg-muted cursor-pointer px-4 py-2">
							Profile
						</List.Item>
						<List.Item class="text-muted-foreground hover:bg-muted cursor-pointer px-4 py-2">
							Preferences
						</List.Item>
					</List.Group>
					<List.Divider />
					<List.Title class="text-sm">Account</List.Title>
					<List.Group>
						<List.Item class="text-muted-foreground hover:bg-muted cursor-pointer px-4 py-2">
							Billing
						</List.Item>
						<List.Item class="text-muted-foreground hover:bg-muted cursor-pointer px-4 py-2">
							Security
						</List.Item>
					</List.Group>
				</List.Root>
			</DemoExample>

			<DemoExample
				title="List with Icons"
				description="Add icons to list items"
				code={withIconsCode}
			>
				<List.Root class="max-w-sm space-y-1">
					<List.Item
						class="text-muted-foreground hover:bg-muted flex cursor-pointer items-center rounded px-3 py-2"
					>
						<svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
							/>
						</svg>
						Dashboard
					</List.Item>
					<List.Item
						class="text-muted-foreground hover:bg-muted flex cursor-pointer items-center rounded px-3 py-2"
					>
						<svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
							/>
						</svg>
						Profile
					</List.Item>
					<List.Item
						class="text-muted-foreground hover:bg-muted flex cursor-pointer items-center rounded px-3 py-2"
					>
						<svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
							/>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
							/>
						</svg>
						Settings
					</List.Item>
				</List.Root>
			</DemoExample>
		</div>
	</Section>

	<Section title="API Reference">
		<div class="space-y-8">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">List.Root</h3>
				<p class="text-muted-foreground mb-4 text-sm">Container for list items.</p>
				<Props
					data={[
						{
							name: 'ordered',
							type: 'boolean',
							default: 'false',
							description: 'Use ordered list (ol) instead of unordered (ul)'
						},
						{
							name: 'preset',
							type: 'string',
							default: "'list'",
							description: 'Preset configuration key'
						},
						{
							name: 'class',
							type: 'string',
							default: "''",
							description: 'Additional CSS classes'
						}
					]}
				/>
			</div>

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">List.Item</h3>
				<p class="text-muted-foreground mb-4 text-sm">Individual list item.</p>
				<Props
					data={[
						{
							name: 'clickable',
							type: 'boolean',
							default: 'false',
							description: 'Make item interactive with hover/focus states'
						},
						{
							name: 'preset',
							type: 'string',
							default: "'list.item'",
							description: 'Preset configuration key'
						},
						{
							name: 'class',
							type: 'string',
							default: "''",
							description: 'Additional CSS classes'
						}
					]}
				/>
			</div>

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">List.Group</h3>
				<p class="text-muted-foreground mb-4 text-sm">Groups related list items together.</p>
				<Props
					data={[
						{
							name: 'preset',
							type: 'string',
							default: "'list.group'",
							description: 'Preset configuration key'
						},
						{
							name: 'class',
							type: 'string',
							default: "''",
							description: 'Additional CSS classes'
						}
					]}
				/>
			</div>

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">List.Title</h3>
				<p class="text-muted-foreground mb-4 text-sm">Title or heading for a list group.</p>
				<Props
					data={[
						{
							name: 'as',
							type: 'string',
							default: "'h3'",
							description: 'HTML element to render'
						},
						{
							name: 'preset',
							type: 'string',
							default: "'list.title'",
							description: 'Preset configuration key'
						},
						{
							name: 'class',
							type: 'string',
							default: "''",
							description: 'Additional CSS classes'
						}
					]}
				/>
			</div>

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">List.Divider</h3>
				<p class="text-muted-foreground mb-4 text-sm">Visual separator between list sections.</p>
				<Props
					data={[
						{
							name: 'vertical',
							type: 'boolean',
							default: 'false',
							description: 'Render as vertical divider'
						},
						{
							name: 'preset',
							type: 'string',
							default: "'list.divider'",
							description: 'Preset configuration key'
						},
						{
							name: 'class',
							type: 'string',
							default: "''",
							description: 'Additional CSS classes'
						}
					]}
				/>
			</div>
		</div>
	</Section>

	<Section title="Accessibility">
		<AccessibilityInfo
			features={[
				'Use semantic ul or ol elements',
				'Ensure interactive items are keyboard accessible',
				'Proper ARIA attributes for custom lists',
				'Screen reader friendly structure'
			]}
		/>
	</Section>

	<PageNavigation
		prev={{ label: 'Link', href: '/docs/components/link' }}
		next={{ label: 'Menu', href: '/docs/components/menu' }}
	/>
</div>
