<script lang="ts">
	import { ContextMenu } from '$lib/components/context-menu';
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
		contextMenuRootProps,
		contextMenuTriggerProps,
		contextMenuContentProps,
		contextMenuItemProps
	} from './props';

	const basicCode = `<ContextMenu.Root>
  <ContextMenu.Trigger>
    <div class="flex h-32 w-64 items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted">
      Right-click me
    </div>
  </ContextMenu.Trigger>
	<ContextMenu.List preset="context-menu.content" class="min-w-48 rounded-lg border bg-popover p-1 shadow-md">
		<ContextMenu.Item preset="context-menu.item">Copy</ContextMenu.Item>
		<ContextMenu.Item preset="context-menu.item">Paste</ContextMenu.Item>
    <ContextMenu.Divider />
		<ContextMenu.Item preset="context-menu.item" class="text-destructive">Delete</ContextMenu.Item>
  </ContextMenu.List>
</ContextMenu.Root>`;

	const groupedCode = `<ContextMenu.Root>
  <ContextMenu.Trigger>
    <div class="flex h-32 w-64 items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted">
      Right-click for options
    </div>
  </ContextMenu.Trigger>
	<ContextMenu.List preset="context-menu.content" class="min-w-48 rounded-lg border bg-popover p-1 shadow-md">
    <ContextMenu.Group>
      <ContextMenu.Title class="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
        Edit
      </ContextMenu.Title>
			<ContextMenu.Item preset="context-menu.item">Cut</ContextMenu.Item>
			<ContextMenu.Item preset="context-menu.item">Copy</ContextMenu.Item>
			<ContextMenu.Item preset="context-menu.item">Paste</ContextMenu.Item>
    </ContextMenu.Group>
    <ContextMenu.Divider />
    <ContextMenu.Group>
      <ContextMenu.Title class="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
        Actions
      </ContextMenu.Title>
			<ContextMenu.Item preset="context-menu.item">Rename</ContextMenu.Item>
			<ContextMenu.Item preset="context-menu.item" class="text-destructive">Delete</ContextMenu.Item>
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
	<ContextMenu.List preset="context-menu.content" class="min-w-48 rounded-lg border bg-popover p-1 shadow-md">
		<ContextMenu.Item preset="context-menu.item" onclick={() => alert('Action 1 clicked')}>
      Action 1
    </ContextMenu.Item>
		<ContextMenu.Item preset="context-menu.item" onclick={() => alert('Action 2 clicked')}>
      Action 2
    </ContextMenu.Item>
    <ContextMenu.Divider />
		<ContextMenu.Item preset="context-menu.item" onclick={() => (open = false)}>
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
	<ContextMenu.List preset="context-menu.content" class="min-w-48 rounded-lg border bg-popover p-1 shadow-md">
		<ContextMenu.Item preset="context-menu.item">View Profile</ContextMenu.Item>
		<ContextMenu.Item preset="context-menu.item">Send Message</ContextMenu.Item>
    <ContextMenu.Divider />
		<ContextMenu.Item preset="context-menu.item">Edit</ContextMenu.Item>
		<ContextMenu.Item preset="context-menu.item" class="text-destructive">Remove</ContextMenu.Item>
  </ContextMenu.List>
</ContextMenu.Root>`;

	const presetConfigCode = `import { createPreset } from '@svelte-atoms/core';

const preset = createPreset({
	'context-menu.trigger': () => ({
		class: 'cursor-context-menu select-none'
  }),
	'context-menu.content': () => ({
		class: 'min-w-[8rem] rounded-md border bg-popover p-1 shadow-md flex flex-col gap-0.5'
  }),
	'context-menu.item': () => ({
    class: 'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
  })
});`;

	let open = $state(false);
</script>

<svelte:head>
	<title>Context Menu - Svelte Atoms</title>
	<meta
		name="description"
		content="Context menu component triggered by right-click interactions."
	/>
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
	<Breadcrumb
		items={[{ label: 'Components', href: '/docs/components' }, { label: 'Context Menu' }]}
	/>

	<PageHeader
		title="Context Menu"
		description="Right-click activated menu that appears at cursor position. Ideal for contextual actions and shortcuts."
		status="stable"
	/>

	<Section title="Installation">
		<Installation
			packageName="@svelte-atoms/core"
			importCode="import &#123; ContextMenu &#125; from '@svelte-atoms/core/context-menu';"
		/>
	</Section>

	<Section
		title="Preset Configuration"
		description="Customize the context menu appearance using presets"
	>
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				Trigger uses `context-menu.trigger` by default. List and item atoms are inherited from
				Dropdown, so use `preset="context-menu.content"` and `preset="context-menu.item"` when you
				want namespaced presets for this component.
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
				<ContextMenu.List preset="context-menu.content" class="min-w-48 p-1">
					<ContextMenu.Item preset="context-menu.item">Copy</ContextMenu.Item>
					<ContextMenu.Item preset="context-menu.item">Paste</ContextMenu.Item>
					<ContextMenu.Item preset="context-menu.item" class="text-destructive border-transparent">Delete</ContextMenu.Item>
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
				<ContextMenu.List preset="context-menu.content" class="min-w-48 rounded-lg border bg-popover p-1 shadow-md">
						<ContextMenu.Group>
							<ContextMenu.Title class="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
								Edit
							</ContextMenu.Title>
							<ContextMenu.Item preset="context-menu.item">Cut</ContextMenu.Item>
							<ContextMenu.Item preset="context-menu.item">Copy</ContextMenu.Item>
							<ContextMenu.Item preset="context-menu.item" class="border-transparent">Paste</ContextMenu.Item>
						</ContextMenu.Group>
						<ContextMenu.Divider />
						<ContextMenu.Group>
							<ContextMenu.Title class="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
								Actions
							</ContextMenu.Title>
							<ContextMenu.Item preset="context-menu.item">Rename</ContextMenu.Item>
							<ContextMenu.Item preset="context-menu.item" class="text-destructive border-transparent">Delete</ContextMenu.Item>
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
				<ContextMenu.List preset="context-menu.content" class="min-w-48 rounded-lg border bg-popover p-1 shadow-md">
					<ContextMenu.Item preset="context-menu.item" onclick={() => alert('Action 1 clicked')}>
							Action 1
						</ContextMenu.Item>
					<ContextMenu.Item preset="context-menu.item" onclick={() => alert('Action 2 clicked')}>
							Action 2
						</ContextMenu.Item>
					<ContextMenu.Item preset="context-menu.item" class="border-transparent" onclick={() => (open = false)}>Close Menu</ContextMenu.Item>
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
				<ContextMenu.List preset="context-menu.content" class="min-w-48 rounded-lg border bg-popover p-1 shadow-md">
					<ContextMenu.Item preset="context-menu.item">View Profile</ContextMenu.Item>
					<ContextMenu.Item preset="context-menu.item">Send Message</ContextMenu.Item>
					<ContextMenu.Item preset="context-menu.item">Edit</ContextMenu.Item>
					<ContextMenu.Item preset="context-menu.item" class="text-destructive border-transparent">Remove</ContextMenu.Item>
					</ContextMenu.List>
				</ContextMenu.Root>
			</DemoExample>
		</div>
	</Section>

	<Section title="API Reference">
		<div class="space-y-6">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">ContextMenu.Root Props</h3>
				<Props data={contextMenuRootProps} />
			</div>
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">ContextMenu.Trigger Props</h3>
				<Props data={contextMenuTriggerProps} />
			</div>
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">ContextMenu.Content Props</h3>
				<Props data={contextMenuContentProps} />
			</div>
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">ContextMenu.Item Props</h3>
				<Props data={contextMenuItemProps} />
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
				href="/docs/components/dropdown"
				class="border-border hover:border-primary group rounded-lg border p-4 transition-colors"
			>
				<h4 class="group-hover:text-primary mb-1 font-semibold transition-colors">Dropdown</h4>
				<p class="text-muted-foreground text-sm">
					Underlying selection and item behavior reused by ContextMenu
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
