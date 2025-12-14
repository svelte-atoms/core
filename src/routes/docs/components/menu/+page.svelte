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

	const basicCode = `<Menu.Root>
  <Menu.Trigger base={Button}>Open Menu</Menu.Trigger>
  <Menu.List class="max-w-xs rounded-lg border">
    <Menu.Item>New File</Menu.Item>
    <Menu.Item>Open File</Menu.Item>
    <Menu.Item>Save</Menu.Item>
    <Menu.Item>Save As...</Menu.Item>
    <Menu.Item class="text-red-600">Exit</Menu.Item>
  </Menu.List>
</Menu.Root>`;

	const interactiveCode = `<Menu.Root>
  <Menu.Trigger base={Button}>Open Menu</Menu.Trigger>
  <Menu.List class="max-w-xs rounded-lg border">
    <Menu.Item onclick={() => alert('Profile clicked')}>Profile</Menu.Item>
    <Menu.Item onclick={() => alert('Settings clicked')}>Settings</Menu.Item>
    <Menu.Item onclick={() => alert('Logout clicked')}>Logout</Menu.Item>
  </Menu.List>
</Menu.Root>`;

	const presetConfigCode = `import { createPreset } from '@svelte-atoms/core';

const preset = createPreset({
  menu: () => ({
    class: 'flex flex-col rounded-md border border-border bg-background py-1 text-popover-foreground shadow-md outline-none'
  }),
  'menu.item': () => ({
    class: 'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
  })
});`;
</script>

<svelte:head>
	<title>Menu - Svelte Atoms</title>
	<meta name="description" content="Navigation menu component." />
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
	<Breadcrumb items={[{ label: 'Components', href: '/docs/components' }, { label: 'Menu' }]} />

	<PageHeader
		title="Menu"
		description="Display a list of navigation items or actions in a menu format."
		status="stable"
	/>

	<Section title="Installation">
		<Installation
			packageName="@svelte-atoms/core"
			importCode="import &#123; Menu, Button &#125; from '@svelte-atoms/core/menu';"
		/>
	</Section>

	<Section title="Preset Configuration" description="Customize the menu appearance using presets">
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for Menu components by defining presets in your
				configuration:
			</p>
			<CodeBlock lang="typescript" code={presetConfigCode} />
		</div>
	</Section>

	<Section title="Examples" description="Explore different menu variations">
		<div class="space-y-8">
			<DemoExample title="Basic Menu" description="Simple menu with items" code={basicCode}>
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
				code={interactiveCode}
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
	</Section>

	<Section title="API Reference">
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
	</Section>

	<Section title="Accessibility">
		<AccessibilityInfo
			features={[
				'Keyboard navigation (Arrow keys)',
				'ARIA menu role',
				'Focus management',
				'Screen reader friendly',
				'Disabled state support'
			]}
		/>
	</Section>

	<PageNavigation
		prev={{ label: 'List', href: '/docs/components/list' }}
		next={{ label: 'Popover', href: '/docs/components/popover' }}
	/>
</div>
