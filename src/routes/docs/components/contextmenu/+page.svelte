<script lang="ts">
	import { Contextmenu } from '$lib/components/contextmenu';
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

	const basicCode = `<script>
  import { Contextmenu } from '@svelte-atoms/core';
<\/script>

<Contextmenu.Root>
  <Contextmenu.Trigger>
    <div>Right-click me</div>
  </Contextmenu.Trigger>

  <Contextmenu.Content>
    <Contextmenu.Item onclick={() => console.log('Edit')}>
      Edit
    </Contextmenu.Item>
    <Contextmenu.Item onclick={() => console.log('Delete')}>
      Delete
    </Contextmenu.Item>
    <Contextmenu.Item disabled>
      Disabled Action
    </Contextmenu.Item>
  </Contextmenu.Content>
</Contextmenu.Root>`;

	const nestedCode = `<Contextmenu.Root>
  <Contextmenu.Trigger>
    <div>Right-click for nested menu</div>
  </Contextmenu.Trigger>

  <Contextmenu.Content>
    <Contextmenu.Item>Copy</Contextmenu.Item>
    <Contextmenu.Item>Paste</Contextmenu.Item>
    <Contextmenu.Submenu>
      <Contextmenu.Item>More Actions</Contextmenu.Item>
      <Contextmenu.Content>
        <Contextmenu.Item>Action 1</Contextmenu.Item>
        <Contextmenu.Item>Action 2</Contextmenu.Item>
      </Contextmenu.Content>
    </Contextmenu.Submenu>
  </Contextmenu.Content>
</Contextmenu.Root>`;
</script>

<svelte:head>
	<title>Context Menu - Svelte Atoms</title>
	<meta
		name="description"
		content="Right-click context menu with customizable items and actions."
	/>
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
	<Breadcrumb
		items={[{ label: 'Components', href: '/docs/components' }, { label: 'Context Menu' }]}
	/>

	<PageHeader
		title="Context Menu"
		description="Right-click activated context menu with customizable items, keyboard navigation, and bond-based state management."
		status="stable"
	/>

	<Section title="Installation">
		<Installation
			packageName="@svelte-atoms/core"
			importCode="import &#123; Contextmenu &#125; from '@svelte-atoms/core/contextmenu';"
		/>
	</Section>

	<Section
		title="Preset Configuration"
		description="Customize the context menu appearance using presets"
	>
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for Contextmenu components by defining presets in your
				configuration:
			</p>
			<div class="bg-muted rounded-lg p-4">
				<pre class="overflow-x-auto text-sm"><code
						>{`import { createPreset } from '@svelte-atoms/core';

const preset = createPreset({
  contextmenu: () => ({
    class: 'z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md'
  }),
  'contextmenu.item': () => ({
    class: 'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
  }),
  'contextmenu.separator': () => ({
    class: '-mx-1 my-1 h-px bg-border'
  })
});`}</code
					></pre>
			</div>
		</div>
	</Section>

	<Section title="Examples" description="Explore different context menu variations">
		<div class="space-y-8">
			<DemoExample
				title="Basic Context Menu"
				description="Simple right-click menu with actions"
				code={basicCode}
			>
				<Contextmenu.Root>
					<Contextmenu.Trigger>
						<div class="border-border bg-background hover:bg-muted rounded border p-8 text-center">
							Right-click me
						</div>
					</Contextmenu.Trigger>

					<Contextmenu.Content>
						<Contextmenu.Item onclick={() => alert('Edit clicked')}>Edit</Contextmenu.Item>
						<Contextmenu.Item onclick={() => alert('Copy clicked')}>Copy</Contextmenu.Item>
						<Contextmenu.Item onclick={() => alert('Delete clicked')}>Delete</Contextmenu.Item>
						<Contextmenu.Item disabled>Disabled Action</Contextmenu.Item>
					</Contextmenu.Content>
				</Contextmenu.Root>
			</DemoExample>
		</div>
	</Section>

	<Section title="API Reference">
		<div class="space-y-6">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Contextmenu.Root Props</h3>
				<Props
					data={[
						{
							name: 'factory',
							type: '(props) => ContextmenuBond',
							default: '-',
							description: 'Custom factory function'
						},
						{
							name: 'children',
							type: 'Snippet',
							default: '-',
							description: 'Content renderer'
						}
					]}
				/>
			</div>

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Contextmenu.Trigger Props</h3>
				<Props
					data={[
						{
							name: 'as',
							type: 'string',
							default: "'div'",
							description: 'Element type to render'
						}
					]}
				/>
			</div>

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Contextmenu.Item Props</h3>
				<Props
					data={[
						{
							name: 'onclick',
							type: '() => void',
							default: '-',
							description: 'Click handler'
						},
						{
							name: 'disabled',
							type: 'boolean',
							default: 'false',
							description: 'Disabled state'
						}
					]}
				/>
			</div>
		</div>
	</Section>

	<Section title="Accessibility">
		<AccessibilityInfo
			features={[
				'Keyboard navigation support',
				'Proper ARIA attributes',
				'Focus management',
				'Position management for screen boundaries',
				'Escape key to close menu'
			]}
		/>
	</Section>

	<PageNavigation
		prev={{ label: 'Combobox', href: '/docs/components/combobox' }}
		next={{ label: 'DataGrid', href: '/docs/components/datagrid' }}
	/>
</div>
