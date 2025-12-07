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
		Props
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
			<div class="bg-muted rounded-lg p-4">
				<pre class="overflow-x-auto text-sm"><code
						>{`import { createPreset } from '@svelte-atoms/core';

const preset = createPreset({
  list: () => ({
    class: 'space-y-2'
  }),
  'list.item': () => ({
    class: 'text-foreground'
  })
});`}</code
					></pre>
			</div>
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
  <List.Item clickable onclick={() => {}}>
    Clickable Item
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
		</div>
	</Section>

	<Section title="API Reference">
		<div class="space-y-6">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">List.Root Props</h3>
				<Props
					data={[
						{
							name: 'ordered',
							type: 'boolean',
							default: 'false',
							description: 'Use ordered list (ol)'
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
				<h3 class="text-foreground mb-3 text-lg font-semibold">List.Item Props</h3>
				<Props
					data={[
						{
							name: 'clickable',
							type: 'boolean',
							default: 'false',
							description: 'Make item interactive'
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
