<script lang="ts">
	import { Menu } from '$lib/components/menu';
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
	import { menuItemProps, menuListProps } from './props';
	import { Button } from '$svelte-atoms/core';
	import { metadata } from './shared';
</script>

<svelte:head>
	<title>{metadata.title}</title>
	<meta name="description" content={metadata.description} />
</svelte:head>

<div class="py-8">
	<Breadcrumb items={[{ label: 'Components', href: '/docs/components' }, { label: 'Menu' }]} />

	<PageHeader
		title="Menu"
		description="Display a list of navigation items or actions in a menu format."
		status="stable"
	/>

	<Section.Root>
		<Section.Header>
			<Section.Title>Installation</Section.Title>
		</Section.Header>
		<Installation
			packageName="@svelte-atoms/core"
			importCode="import &#123; Menu, Button &#125; from '@svelte-atoms/core/menu';"
		/>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Preset Configuration</Section.Title>
			<Section.Subtitle>Customize the menu appearance using presets</Section.Subtitle>
		</Section.Header>
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for Menu components by defining presets in your
				configuration:
			</p>
			<CodeBlock lang="typescript" code={metadata.examples.preset} />
		</div>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Examples</Section.Title>
			<Section.Subtitle>Explore different menu variations</Section.Subtitle>
		</Section.Header>
		<div class="space-y-8">
			<DemoExample title="Basic Menu" description="Simple menu with items" code={metadata.examples.basic}>
				<Menu.Root>
					<Menu.Trigger base={Button} class="">Open Menu</Menu.Trigger>

					<Menu.List class="max-w-xs rounded-lg border">
						<Menu.Item class="">New File</Menu.Item>
						<Menu.Item class="">Open File</Menu.Item>
						<Menu.Item class="">Save</Menu.Item>
						<Menu.Item class="">Save As...</Menu.Item>
						<Menu.Item class="text-red-600">Exit</Menu.Item>
					</Menu.List>
				</Menu.Root>
			</DemoExample>

			<DemoExample
				title="Interactive Menu"
				description="Menu with click handlers"
				code={metadata.examples.interactive}
			>
				<Menu.Root>
					<Menu.Trigger base={Button} class="">Open Menu</Menu.Trigger>

					<Menu.List class="max-w-xs rounded-lg border">
						<Menu.Item class="" onclick={() => alert('Profile clicked')}>Profile</Menu.Item>
						<Menu.Item class="" onclick={() => alert('Settings clicked')}>Settings</Menu.Item>
						<Menu.Item class="" onclick={() => alert('Logout clicked')}>Logout</Menu.Item>
					</Menu.List>
				</Menu.Root>
			</DemoExample>
		</div>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>API Reference</Section.Title>
		</Section.Header>
		<div class="space-y-6">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Menu.Root Props</h3>
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
				<h3 class="text-foreground mb-3 text-lg font-semibold">Menu.List Props</h3>
				<Props data={[...menuListProps]} />
			</div>
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Menu.Item Props</h3>
				<Props data={[...menuItemProps]} />
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
