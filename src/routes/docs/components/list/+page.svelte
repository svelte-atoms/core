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
	import { listRootProps } from './props';
	import { metadata } from './shared';

	const { basic: basicCode, ordered: orderedCode, interactive: interactiveCode, grouped: groupedCode, withIcons: withIconsCode, preset: presetCode } = metadata.examples;
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
			<Section.Subtitle>Customize the list appearance using presets</Section.Subtitle>
		</Section.Header>
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for List components by defining presets in your
				configuration:
			</p>
			<CodeBlock
				lang="typescript"
				code={presetCode}
			/>
		</div>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Examples</Section.Title>
			<Section.Subtitle>Explore different list variations</Section.Subtitle>
		</Section.Header>
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
				code={interactiveCode}
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
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>API Reference</Section.Title>
		</Section.Header>
		<div class="space-y-8">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">List.Root</h3>
				<p class="text-muted-foreground mb-4 text-sm">Container for list items.</p>
				<Props data={listRootProps} />
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
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Accessibility</Section.Title>
		</Section.Header>
		<AccessibilityInfo
			features={metadata.accessibility}
		/>
	</Section.Root>

	<PageNavigation
		prev={{ label: 'Link', href: '/docs/components/link' }}
		next={{ label: 'Menu', href: '/docs/components/menu' }}
	/>
</div>
