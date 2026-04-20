<script lang="ts">
	import { resolve } from '$app/paths';
	import {
		DocAccessibility,
		DocCode,
		DocInstallation,
		DocOnly,
		DocPage,
		DocProps,
		DocSection
	} from '$docs/components';
	import type { DocMode } from '$docs/context/doc-mode.svelte';
	import type { Frontmatter } from '$docs/md/frontmatter';
	import { newLine } from '$docs/md/template';
	import Examples from './examples.svelte';
	import { examples } from './shared';
	import {
		contextMenuRootProps,
		contextMenuTriggerProps,
		contextMenuContentProps,
		contextMenuItemProps
	} from './props';

	let { contentType = 'html' }: { contentType?: DocMode } = $props();

	const frontmatter: Frontmatter = {
		id: 'context-menu',
		title: 'Context Menu',
		category: 'components',
		depth: 'intermediate',
		prerequisites: ['dropdown-menu', 'popover'],
		related: ['menu', 'dropdown-menu', 'popover']
	};

	const presetConfigCode = `import { createPreset } from '@svelte-atoms/core';

const preset = createPreset({
  'context-menu.trigger': () => ({
    class: 'cursor-context-menu select-none'
  }),
  'context-menu.content': () => ({
    class: 'min-w-[10rem] rounded-md border bg-popover p-1 shadow-md'
  }),
  'context-menu.item': () => ({
    class: 'rounded-sm px-2 py-1.5 text-sm hover:bg-accent'
  })
});`;
</script>

<DocPage
	{contentType}
	title="Context Menu"
	description="Right-click activated menu that appears at cursor position. Ideal for contextual actions and shortcuts."
	status="stable"
	llms={true}
	breadcrumbs={[{ label: 'Components', href: '/docs/components' }, { label: 'Context Menu' }]}
	prev={{ label: 'Combobox', href: '/docs/components/combobox' }}
	next={{ label: 'DataGrid', href: '/docs/components/datagrid' }}
	{frontmatter}
>
	<DocOnly for="markdown">
		**Type**: Compound Component

		## Use Cases

		- Contextual actions at cursor position
		- Row/item actions in dense data interfaces
		- Right-click interactions without layout shift

		## Components

		- **ContextMenu.Root**: Provides shared dropdown state and positioning
		- **ContextMenu.Trigger**: Captures right-click and opens at pointer coordinates
		- **ContextMenu.Content**: Floating menu container
		- **ContextMenu.Item**: Actionable item with keyboard support
	</DocOnly>

	<DocSection title="Installation">
		<DocInstallation
			packageName="@svelte-atoms/core"
			importCode={`import { ContextMenu } from '@svelte-atoms/core/context-menu';`}
		/>
	</DocSection>

	<DocSection title="Preset Configuration" subtitle="Customize context menu styles with preset keys">
		<DocCode code={presetConfigCode} lang="typescript" />
	</DocSection>

	<DocSection title="Examples" subtitle="Basic trigger and composed patterns">
		<Examples
			{contentType}
			basicCode={examples.basic}
			buttonCode={examples.button}
			rowCode={examples.row}
		/>
	</DocSection>

	<DocSection title="API Reference">
		<DocOnly for="markdown">
{newLine(2)}### ContextMenu.Root

**Preset Key:** `context-menu`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">ContextMenu.Root</h3></DocOnly>
		<DocProps data={contextMenuRootProps} />

		<DocOnly for="markdown">
{newLine(2)}### ContextMenu.Trigger

**Preset Key:** `context-menu.trigger`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">ContextMenu.Trigger</h3></DocOnly>
		<DocProps data={contextMenuTriggerProps} />

		<DocOnly for="markdown">
{newLine(2)}### ContextMenu.Content

**Preset Key:** `context-menu.content`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">ContextMenu.Content</h3></DocOnly>
		<DocProps data={contextMenuContentProps} />

		<DocOnly for="markdown">
{newLine(2)}### ContextMenu.Item

**Preset Key:** `context-menu.item`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">ContextMenu.Item</h3></DocOnly>
		<DocProps data={contextMenuItemProps} />
	</DocSection>

	<DocSection title="Accessibility">
		<DocAccessibility
			features={[
				'Right-click or Shift+F10 opens the menu on the trigger element',
				'Arrow keys navigate menu items',
				'Enter or Space activates a focused item',
				'Escape closes the menu',
				'Tab exits the menu and returns focus to normal flow'
			]}
		/>
	</DocSection>

	<DocSection title="Related Components">
		<DocOnly for="markdown">
			- [Dropdown Menu](/docs/components/dropdown-menu): Underlying selection and item behavior reused by ContextMenu
			- [Popover](/docs/components/popover): Floating panel with positioning logic
		</DocOnly>

		<DocOnly for="html">
			<div class="grid gap-4 sm:grid-cols-2">
				<a
					href={resolve('/docs/components/dropdown-menu')}
					class="border-border hover:border-primary group rounded-lg border p-4 transition-colors"
				>
					<h4 class="group-hover:text-primary mb-1 font-semibold transition-colors">Dropdown Menu</h4>
					<p class="text-muted-foreground text-sm">
						Underlying selection and item behavior reused by ContextMenu
					</p>
				</a>
				<a
					href={resolve('/docs/components/popover')}
					class="border-border hover:border-primary group rounded-lg border p-4 transition-colors"
				>
					<h4 class="group-hover:text-primary mb-1 font-semibold transition-colors">Popover</h4>
					<p class="text-muted-foreground text-sm">Floating panel with positioning logic</p>
				</a>
			</div>
		</DocOnly>
	</DocSection>
</DocPage>
