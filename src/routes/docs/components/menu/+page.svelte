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
		Props
	} from '$docs/components';

	const basicCode = `<Menu>
  <Menu.Item>Item 1</Menu.Item>
  <Menu.Item>Item 2</Menu.Item>
  <Menu.Item>Item 3</Menu.Item>
</Menu>`;
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
			importCode="import &#123; Menu &#125; from '@svelte-atoms/core/menu';"
		/>
	</Section>

	<Section title="Preset Configuration" description="Customize the menu appearance using presets">
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for Menu components by defining presets in your configuration:
			</p>
			<div class="bg-muted rounded-lg p-4">
				<pre class="text-sm overflow-x-auto"><code>{`import { createPreset } from '@svelte-atoms/core';

const preset = createPreset({
  menu: () => ({
    class: 'flex flex-col rounded-md border border-border bg-background py-1 text-popover-foreground shadow-md outline-none'
  }),
  'menu.item': () => ({
    class: 'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
  })
});`}</code></pre>
			</div>
		</div>
	</Section>

	<Section title="Examples" description="Explore different menu variations">
		<div class="space-y-8">
			<DemoExample
				title="Basic Menu"
				description="Simple menu with items"
				code={basicCode}
			>
				<Menu.List class="max-w-xs border rounded-lg">
					<Menu.Item class="px-4 py-2 hover:bg-muted">
						Home
					</Menu.Item>
					<Menu.Item class="px-4 py-2 hover:bg-muted">
						About
					</Menu.Item>
					<Menu.Item class="px-4 py-2 hover:bg-muted">
						Contact
					</Menu.Item>
				</Menu.List>
			</DemoExample>

			<DemoExample
				title="Menu with Dividers"
				description="Grouped menu items"
				code={`<Menu>
  <Menu.Item>Item 1</Menu.Item>
  <Menu.Divider />
  <Menu.Item>Item 2</Menu.Item>
</Menu>`}
			>
				<Menu.List class="max-w-xs border rounded-lg">
					<Menu.Item class="px-4 py-2 hover:bg-muted">
						New File
					</Menu.Item>
					<Menu.Item class="px-4 py-2 hover:bg-muted">
						Open File
					</Menu.Item>
					<div class="my-1 border-t"></div>
					<Menu.Item class="px-4 py-2 hover:bg-muted">
						Save
					</Menu.Item>
					<Menu.Item class="px-4 py-2 hover:bg-muted">
						Save As...
					</Menu.Item>
					<div class="my-1 border-t"></div>
					<Menu.Item class="px-4 py-2 hover:bg-muted text-red-600">
						Exit
					</Menu.Item>
				</Menu.List>
			</DemoExample>

			<DemoExample
				title="Interactive Menu"
				description="Menu with click handlers"
				code={`<Menu.Item onclick={() => alert('Clicked!')}>
  Click me
</Menu.Item>`}
			>
				<Menu.List class="max-w-xs border rounded-lg">
					<Menu.Item 
						class="px-4 py-2 hover:bg-muted cursor-pointer"
						onclick={() => alert('Profile clicked')}
					>
						Profile
					</Menu.Item>
					<Menu.Item 
						class="px-4 py-2 hover:bg-muted cursor-pointer"
						onclick={() => alert('Settings clicked')}
					>
						Settings
					</Menu.Item>
					<Menu.Item 
						class="px-4 py-2 hover:bg-muted cursor-pointer"
						onclick={() => alert('Logout clicked')}
					>
						Logout
					</Menu.Item>
				</Menu.List>
			</DemoExample>
		</div>
	</Section>

	<Section title="API Reference">
		<div class="space-y-6">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Menu Props</h3>
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
				<h3 class="text-foreground mb-3 text-lg font-semibold">Menu.Item Props</h3>
				<Props
					data={[
						{
							name: 'disabled',
							type: 'boolean',
							default: 'false',
							description: 'Disable menu item'
						},
						{
							name: 'onclick',
							type: '() => void',
							default: '-',
							description: 'Click handler'
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
