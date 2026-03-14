<script lang="ts">
	import { DropdownMenu } from '$lib/components/dropdown-menu';
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
	import { dropdownMenuItemProps, dropdownMenuListProps } from './props';
	import { Button } from '$svelte-atoms/core';
	import { metadata } from './shared';
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
			<Section.Subtitle>Customize the dropdown menu appearance using presets</Section.Subtitle>
		</Section.Header>
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for Dropdown Menu components by defining presets in
				your configuration:
			</p>
			<CodeBlock lang="typescript" code={metadata.examples.preset} />
		</div>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Examples</Section.Title>
			<Section.Subtitle>Explore different dropdown menu variations</Section.Subtitle>
		</Section.Header>
		<div class="space-y-8">
			<DemoExample
				title="Basic Dropdown Menu"
				description="Simple dropdown menu with items"
				code={metadata.examples.basic}
			>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger base={Button} class="">Open Menu</DropdownMenu.Trigger>

					<DropdownMenu.List class="max-w-xs rounded-lg border">
						<DropdownMenu.Item class="">New File</DropdownMenu.Item>
						<DropdownMenu.Item class="">Open File</DropdownMenu.Item>
						<DropdownMenu.Item class="">Save</DropdownMenu.Item>
						<DropdownMenu.Item class="">Save As...</DropdownMenu.Item>
						<DropdownMenu.Item class="text-red-600">Exit</DropdownMenu.Item>
					</DropdownMenu.List>
				</DropdownMenu.Root>
			</DemoExample>

			<DemoExample
				title="Interactive Dropdown Menu"
				description="Dropdown menu with click handlers"
				code={metadata.examples.interactive}
			>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger base={Button} class="">Open Menu</DropdownMenu.Trigger>

					<DropdownMenu.List class="max-w-xs rounded-lg border">
						<DropdownMenu.Item class="" onclick={() => alert('Profile clicked')}>Profile</DropdownMenu.Item>
						<DropdownMenu.Item class="" onclick={() => alert('Settings clicked')}>Settings</DropdownMenu.Item>
						<DropdownMenu.Item class="" onclick={() => alert('Logout clicked')}>Logout</DropdownMenu.Item>
					</DropdownMenu.List>
				</DropdownMenu.Root>
			</DemoExample>
		</div>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>API Reference</Section.Title>
		</Section.Header>
		<div class="space-y-6">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">DropdownMenu.Root Props</h3>
				<Props
					data={[
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
				<h3 class="text-foreground mb-3 text-lg font-semibold">DropdownMenu.List Props</h3>
				<Props data={[...dropdownMenuListProps]} />
			</div>
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">DropdownMenu.Item Props</h3>
				<Props data={[...dropdownMenuItemProps]} />
			</div>
		</div>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Accessibility</Section.Title>
		</Section.Header>
		<AccessibilityInfo
			features={[
				'Keyboard navigation (Arrow keys)',
				'ARIA menu role',
				'Focus management',
				'Screen reader friendly',
				'Disabled state support'
			]}
		/>
	</Section.Root>

	<PageNavigation
		prev={{ label: 'List', href: '/docs/components/list' }}
		next={{ label: 'Popover', href: '/docs/components/popover' }}
	/>
</div>
