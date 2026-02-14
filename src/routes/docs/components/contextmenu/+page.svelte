<script lang="ts">
	import { ContextMenu } from '$lib/components/contextmenu';
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
	import {
		contextmenuRootProps,
		contextmenuTriggerProps,
		contextmenuContentProps,
		contextmenuItemProps
	} from './props';

	const basicCode = `<ContextMenu.Root>
  <ContextMenu.Trigger>
    <div class="flex h-32 w-64 items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted">
      Right-click me
    </div>
  </ContextMenu.Trigger>
  <ContextMenu.List class="min-w-48 rounded-lg border bg-popover p-1 shadow-md">
    <ContextMenu.Item>Copy</ContextMenu.Item>
    <ContextMenu.Item>Paste</ContextMenu.Item>
    <ContextMenu.Divider />
    <ContextMenu.Item class="text-destructive">Delete</ContextMenu.Item>
  </ContextMenu.List>
</ContextMenu.Root>`;

	const groupedCode = `<ContextMenu.Root>
  <ContextMenu.Trigger>
    <div class="flex h-32 w-64 items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted">
      Right-click for options
    </div>
  </ContextMenu.Trigger>
  <ContextMenu.List class="min-w-48 rounded-lg border bg-popover p-1 shadow-md">
    <ContextMenu.Group>
      <ContextMenu.Title class="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
        Edit
      </ContextMenu.Title>
      <ContextMenu.Item>Cut</ContextMenu.Item>
      <ContextMenu.Item>Copy</ContextMenu.Item>
      <ContextMenu.Item>Paste</ContextMenu.Item>
    </ContextMenu.Group>
    <ContextMenu.Divider />
    <ContextMenu.Group>
      <ContextMenu.Title class="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
        Actions
      </ContextMenu.Title>
      <ContextMenu.Item>Rename</ContextMenu.Item>
      <ContextMenu.Item class="text-destructive">Delete</ContextMenu.Item>
    </ContextMenu.Group>
  </ContextMenu.List>
</ContextMenu.Root>`;

	const controlledCode = `<script lang="ts">
  let open = $state(false);
<\/script>

<ContextMenu.Root bind:open>
  <ContextMenu.Trigger>
    <div class="flex h-32 w-64 items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted">
      Right-click (State: {open ? 'open' : 'closed'})
    </div>
  </ContextMenu.Trigger>
  <ContextMenu.List class="min-w-48 rounded-lg border bg-popover p-1 shadow-md">
    <ContextMenu.Item onclick={() => alert('Action 1 clicked')}>
      Action 1
    </ContextMenu.Item>
    <ContextMenu.Item onclick={() => alert('Action 2 clicked')}>
      Action 2
    </ContextMenu.Item>
    <ContextMenu.Divider />
    <ContextMenu.Item onclick={() => (open = false)}>
      Close Menu
    </ContextMenu.Item>
  </ContextMenu.List>
</ContextMenu.Root>

<p class="text-muted-foreground mt-2 text-sm">
  Context menu is {open ? 'open' : 'closed'}
</p>`;

	const cardCode = `<ContextMenu.Root>
  <ContextMenu.Trigger>
    <div class="w-80 cursor-default rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div class="mb-4 flex items-start gap-3">
        <div class="bg-primary text-primary-foreground flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold">
          JD
        </div>
        <div>
          <h3 class="font-semibold">John Doe</h3>
          <p class="text-muted-foreground text-sm">john.doe@example.com</p>
        </div>
      </div>
      <p class="text-muted-foreground text-sm">
        Right-click this card for actions
      </p>
    </div>
  </ContextMenu.Trigger>
  <ContextMenu.List class="min-w-48 rounded-lg border bg-popover p-1 shadow-md">
    <ContextMenu.Item>View Profile</ContextMenu.Item>
    <ContextMenu.Item>Send Message</ContextMenu.Item>
    <ContextMenu.Divider />
    <ContextMenu.Item>Edit</ContextMenu.Item>
    <ContextMenu.Item class="text-destructive">Remove</ContextMenu.Item>
  </ContextMenu.List>
</ContextMenu.Root>`;

	const presetConfigCode = `import { createPreset } from '@svelte-atoms/core';

const preset = createPreset({
  'contextmenu': () => ({
    class: 'min-w-[8rem] rounded-md border bg-popover p-1 shadow-md'
  }),
  'contextmenu.trigger': () => ({
    class: 'cursor-context-menu select-none'
  }),
  'contextmenu.content': () => ({
    class: 'flex flex-col gap-0.5'
  }),
  'contextmenu.item': () => ({
    class: 'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
  })
});`;

	let open = $state(false);
</script>

<svelte:head>
	<title>ContextMenu - Svelte Atoms</title>
	<meta
		name="description"
		content="Context menu component triggered by right-click interactions."
	/>
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
	<Breadcrumb
		items={[{ label: 'Components', href: '/docs/components' }, { label: 'ContextMenu' }]}
	/>

	<PageHeader
		title="ContextMenu"
		description="Right-click activated menu that appears at cursor position. Ideal for contextual actions and shortcuts."
		status="stable"
	/>

	<Section title="Installation">
		<Installation
			packageName="@svelte-atoms/core"
			importCode="import &#123; ContextMenu &#125; from '@svelte-atoms/core/contextmenu';"
		/>
	</Section>

	<Section
		title="Preset Configuration"
		description="Customize the context menu appearance using presets"
	>
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for ContextMenu components by defining presets in your
				configuration:
			</p>
			<CodeBlock lang="typescript" code={presetConfigCode} />
		</div>
	</Section>

	<Section title="Examples" description="Explore different context menu variations">
		<div class="space-y-8">
			<DemoExample
				title="Basic Context Menu"
				description="Right-click to open the context menu"
				code={basicCode}
			>
				<ContextMenu.Root>
					<ContextMenu.Trigger>
						<div
							class="flex h-32 w-64 items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted"
						>
							Right-click me
						</div>
					</ContextMenu.Trigger>
				<ContextMenu.List class="min-w-48 rounded-lg border bg-popover p-1 shadow-md">
						<ContextMenu.Item>Copy</ContextMenu.Item>
						<ContextMenu.Item>Paste</ContextMenu.Item>
						<ContextMenu.Divider />
						<ContextMenu.Item class="text-destructive">Delete</ContextMenu.Item>
					</ContextMenu.List>
				</ContextMenu.Root>
			</DemoExample>

			<DemoExample
				title="Grouped Menu"
				description="Organize items with groups and titles"
				code={groupedCode}
			>
				<ContextMenu.Root>
					<ContextMenu.Trigger>
						<div
							class="flex h-32 w-64 items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted"
						>
							Right-click for options
						</div>
					</ContextMenu.Trigger>
				<ContextMenu.List class="min-w-48 rounded-lg border bg-popover p-1 shadow-md">
						<ContextMenu.Group>
							<ContextMenu.Title class="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
								Edit
							</ContextMenu.Title>
							<ContextMenu.Item>Cut</ContextMenu.Item>
							<ContextMenu.Item>Copy</ContextMenu.Item>
							<ContextMenu.Item>Paste</ContextMenu.Item>
						</ContextMenu.Group>
						<ContextMenu.Divider />
						<ContextMenu.Group>
							<ContextMenu.Title class="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
								Actions
							</ContextMenu.Title>
							<ContextMenu.Item>Rename</ContextMenu.Item>
							<ContextMenu.Item class="text-destructive">Delete</ContextMenu.Item>
						</ContextMenu.Group>
					</ContextMenu.List>
				</ContextMenu.Root>
			</DemoExample>

			<DemoExample
				title="Controlled State"
				description="Control menu state with bind:open"
				code={controlledCode}
			>
				<ContextMenu.Root bind:open>
					<ContextMenu.Trigger>
						<div
							class="flex h-32 w-64 items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted"
						>
							Right-click (State: {open ? 'open' : 'closed'})
						</div>
					</ContextMenu.Trigger>
				<ContextMenu.List class="min-w-48 rounded-lg border bg-popover p-1 shadow-md">
						<ContextMenu.Item onclick={() => alert('Action 1 clicked')}>
							Action 1
						</ContextMenu.Item>
						<ContextMenu.Item onclick={() => alert('Action 2 clicked')}>
							Action 2
						</ContextMenu.Item>
						<ContextMenu.Divider />
						<ContextMenu.Item onclick={() => (open = false)}>Close Menu</ContextMenu.Item>
					</ContextMenu.List>
				</ContextMenu.Root>

				<p class="text-muted-foreground mt-2 text-sm">
					Context menu is {open ? 'open' : 'closed'}
				</p>
			</DemoExample>

			<DemoExample
				title="Card with Context Menu"
				description="Real-world example with a card component"
				code={cardCode}
			>
				<ContextMenu.Root>
					<ContextMenu.Trigger>
						<div
							class="w-80 cursor-default rounded-lg border bg-card p-6 text-card-foreground shadow-sm"
						>
							<div class="mb-4 flex items-start gap-3">
								<div
									class="bg-primary text-primary-foreground flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold"
								>
									JD
								</div>
								<div>
									<h3 class="font-semibold">John Doe</h3>
									<p class="text-muted-foreground text-sm">john.doe@example.com</p>
								</div>
							</div>
							<p class="text-muted-foreground text-sm">Right-click this card for actions</p>
						</div>
					</ContextMenu.Trigger>
				<ContextMenu.List class="min-w-48 rounded-lg border bg-popover p-1 shadow-md">
						<ContextMenu.Item>View Profile</ContextMenu.Item>
						<ContextMenu.Item>Send Message</ContextMenu.Item>
						<ContextMenu.Divider />
						<ContextMenu.Item>Edit</ContextMenu.Item>
						<ContextMenu.Item class="text-destructive">Remove</ContextMenu.Item>
					</ContextMenu.List>
				</ContextMenu.Root>
			</DemoExample>
		</div>
	</Section>

	<Section title="API Reference">
		<div class="space-y-6">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">ContextMenu.Root Props</h3>
				<Props data={contextmenuRootProps} />
			</div>
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">ContextMenu.Trigger Props</h3>
				<Props data={contextmenuTriggerProps} />
			</div>
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">ContextMenu.Content Props</h3>
				<Props data={contextmenuContentProps} />
			</div>
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">ContextMenu.Item Props</h3>
				<Props data={contextmenuItemProps} />
			</div>
		</div>
	</Section>

	<Section title="Accessibility">
		<AccessibilityInfo
			features={[
				'Right-click or Shift+F10 to open the context menu on the trigger element',
				'Arrow keys to navigate between menu items',
				'Enter or Space to activate a menu item',
				'Escape to close the menu',
				'Tab moves focus out of the menu and closes it',
				'Consider providing alternative access methods for critical functionality'
			]}
		/>
	</Section>

	<Section title="Related Components">
		<div class="grid gap-4 sm:grid-cols-2">
			<a
				href="/docs/components/menu"
				class="border-border hover:border-primary group rounded-lg border p-4 transition-colors"
			>
				<h4 class="group-hover:text-primary mb-1 font-semibold transition-colors">Menu</h4>
				<p class="text-muted-foreground text-sm">
					Underlying menu component with click-triggered behavior
				</p>
			</a>
			<a
				href="/docs/components/popover"
				class="border-border hover:border-primary group rounded-lg border p-4 transition-colors"
			>
				<h4 class="group-hover:text-primary mb-1 font-semibold transition-colors">Popover</h4>
				<p class="text-muted-foreground text-sm">Floating panel with positioning logic</p>
			</a>
		</div>
	</Section>

	<PageNavigation
		prev={{ label: 'Combobox', href: '/docs/components/combobox' }}
		next={{ label: 'DataGrid', href: '/docs/components/datagrid' }}
	/>
</div>
