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

	const basicCode = `<Dropdown.Root>
  <Dropdown.Trigger>
    <button>Open Menu</button>
  </Dropdown.Trigger>
  
  <Dropdown.List>
    <Dropdown.Item>Profile</Dropdown.Item>
    <Dropdown.Item>Settings</Dropdown.Item>
    <Dropdown.Item>Logout</Dropdown.Item>
  </Dropdown.List>
</Dropdown.Root>`;

	const withIconsCode = `<Dropdown.Root>
  <Dropdown.Trigger>
    <button>Options<\/button>
  </Dropdown.Trigger>
  
  <Dropdown.List>
    <Dropdown.Item>
      Profile
    </Dropdown.Item>
    <div class="border-t my-1" />
    <Dropdown.Item>
      Logout
    </Dropdown.Item>
  </Dropdown.List>
</Dropdown.Root>`;

	let basicOpen = $state(false);
	let separatorOpen = $state(false);
</script>

<svelte:head>
	<title>Dropdown - Svelte Atoms</title>
	<meta name="description" content="Dropdown menu for actions and options." />
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
	<Breadcrumb items={[{ label: 'Components', href: '/docs/components' }, { label: 'Dropdown' }]} />

	<PageHeader
		title="Dropdown"
		description="Dropdown menu for displaying a list of actions or options. Triggered by a button click."
		status="stable"
	/>

	<Section title="Installation">
		<Installation
			packageName="@svelte-atoms/core"
			importCode="import &#123; Dropdown &#125; from '@svelte-atoms/core/dropdown';"
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
    class: 'inline-flex items-center justify-center rounded-md border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-accent transition-colors'
  }),
  'dropdown.content': () => ({
    class: 'absolute right-0 mt-2 w-56 origin-top-right rounded-md border border-border bg-background shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
  }),
  'dropdown.item': () => ({
    class: 'block w-full px-4 py-2 text-left text-sm hover:bg-accent transition-colors'
  })
});`}
			/>
		</div>
	</Section>

	<Section title="Examples" description="Explore different dropdown variations">
		<div class="space-y-8">
			<DemoExample title="Basic Dropdown" description="Simple dropdown menu" code={basicCode}>
				<Dropdown.Root bind:open={basicOpen}>
					<Dropdown.Trigger>
						<button class="rounded border px-4 py-2"> Open Menu </button>
					</Dropdown.Trigger>

					<Dropdown.List class="bg-background mt-2 min-w-[200px] rounded-lg border shadow-lg">
						<Dropdown.Item class="hover:bg-muted block px-4 py-2">Profile</Dropdown.Item>
						<Dropdown.Item class="hover:bg-muted block px-4 py-2">Settings</Dropdown.Item>
						<Dropdown.Item class="hover:bg-muted block px-4 py-2">Logout</Dropdown.Item>
					</Dropdown.List>
				</Dropdown.Root>
			</DemoExample>

			<DemoExample
				title="With Separators"
				description="Group menu items with separators"
				code={withIconsCode}
			>
				<Dropdown.Root bind:open={separatorOpen}>
					<Dropdown.Trigger>
						<button class="rounded border px-4 py-2"> User Menu </button>
					</Dropdown.Trigger>

					<Dropdown.List class="bg-background mt-2 min-w-[200px] rounded-lg border shadow-lg">
						<Dropdown.Item class="hover:bg-muted block px-4 py-2">Profile</Dropdown.Item>
						<Dropdown.Item class="hover:bg-muted block px-4 py-2">Settings</Dropdown.Item>
						<div class="border-border my-1 border-t"></div>
						<Dropdown.Item class="hover:bg-muted block px-4 py-2 text-red-600">
							Logout
						</Dropdown.Item>
					</Dropdown.List>
				</Dropdown.Root>
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
							description: 'Control open state'
						},
						{
							name: 'placement',
							type: "'bottom' | 'top' | 'left' | 'right'",
							default: "'bottom'",
							description: 'Menu position'
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
