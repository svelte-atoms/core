<script lang="ts">
	import { resolve } from '$app/paths';
	import { Avatar } from '$lib/components/avatar';
	import { ContextMenu } from '$lib/components/context-menu';
	import { DataGrid } from '$lib/components/datagrid';
	import { Icon } from '$lib/components/icon';
	import { List } from '$lib/components/list';
	import CopyIcon from '$lib/icons/icon-copy.svelte';
	import CloseIcon from '$lib/icons/icon-close.svelte';
	import MoreIcon from '$lib/icons/icon-more-vert.svelte';
	import ArrowIcon from '$lib/icons/icon-arrow-down.svelte';
	import {
		PageHeader,
		Breadcrumb,
		Installation,
		AccessibilityInfo,
		PageNavigation,
		DemoExample,
		Props,
		CodeBlock
	} from '$docs/components';
	import Section from '../../../../docs/components/section.svelte';
	import {
		contextMenuRootProps,
		contextMenuTriggerProps,
		contextMenuContentProps,
		contextMenuItemProps
	} from './props';
	import { Button } from '$lib/components/button';

	const basicCode = `<ContextMenu.Root>
  <ContextMenu.Trigger>
	<div class="flex h-40 w-72 items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted text-sm font-medium">
	  Right-click to open the context menu
    </div>
  </ContextMenu.Trigger>
	<ContextMenu.Content preset="context-menu.content" class="min-w-48 rounded-lg border bg-popover shadow-md">
		<ContextMenu.Item preset="context-menu.item" class="border-none">Copy</ContextMenu.Item>
		<ContextMenu.Item preset="context-menu.item" class="border-none">Paste</ContextMenu.Item>
    <ContextMenu.Divider />
		<ContextMenu.Item preset="context-menu.item" class="border-none text-destructive">Delete</ContextMenu.Item>
  </ContextMenu.Content>
</ContextMenu.Root>`;

	const buttonCode = `<ContextMenu.Root>
	<ContextMenu.Trigger base={Button} variant="outline" class="gap-2 px-3">
		Edit Document
	</ContextMenu.Trigger>
	<ContextMenu.Content preset="context-menu.content" class="min-w-44 rounded-lg border bg-popover shadow-md">
		<ContextMenu.Item preset="context-menu.item" class="flex items-center gap-2 border-none">
			<Icon src={CopyIcon} class="size-4 text-muted-foreground" />
			Copy link
		</ContextMenu.Item>
		<ContextMenu.Item preset="context-menu.item" class="flex items-center gap-2 border-none">
			<Icon src={MoreIcon} class="size-4 text-muted-foreground" />
			Open in new tab
		</ContextMenu.Item>
		<ContextMenu.Divider />
		<ContextMenu.Item preset="context-menu.item" class="flex items-center gap-2 border-none text-destructive">
			<Icon src={CloseIcon} class="size-4" />
			Remove
		</ContextMenu.Item>
	</ContextMenu.Content>
</ContextMenu.Root>`;

	const avatarProfileCode = `<ContextMenu.Root>
	<ContextMenu.Trigger>
		<div class="flex w-full max-w-lg items-center justify-between gap-3 rounded-lg border bg-card p-3">
			<div class="flex items-center gap-3">
			<Avatar alt="Alice Chen" class="size-12 ring-2 ring-transparent transition-all hover:ring-primary" />
				<div>
					<p class="text-sm font-semibold">Alice Chen</p>
					<p class="text-muted-foreground text-xs">Design Systems Engineer</p>
				</div>
			</div>
			<span class="text-muted-foreground text-xs">Right-click teammate</span>
		</div>
	</ContextMenu.Trigger>
	<ContextMenu.Content preset="context-menu.content" class="min-w-44 rounded-lg border bg-popover shadow-md">
		<ContextMenu.Item preset="context-menu.item" class="flex items-center gap-2 border-none">
			<Icon src={CopyIcon} class="size-4 text-muted-foreground" />
			Copy profile link
		</ContextMenu.Item>
		<ContextMenu.Item preset="context-menu.item" class="flex items-center gap-2 border-none">
			<Icon src={MoreIcon} class="size-4 text-muted-foreground" />
			Send direct message
		</ContextMenu.Item>
		<ContextMenu.Item preset="context-menu.item" class="flex items-center gap-2 border-none">
			<Icon src={ArrowIcon} class="size-4 text-muted-foreground" />
			Assign as reviewer
		</ContextMenu.Item>
		<ContextMenu.Divider />
		<ContextMenu.Item preset="context-menu.item" class="flex items-center gap-2 border-none text-destructive">
			<Icon src={CloseIcon} class="size-4" />
			Remove from project
		</ContextMenu.Item>
	</ContextMenu.Content>
</ContextMenu.Root>`;

	const datagridRowCode = `<DataGrid.Root class="w-full rounded-lg border">
	<DataGrid.Header>
		<DataGrid.Row>
			<DataGrid.Column>Name</DataGrid.Column>
			<DataGrid.Column>Role</DataGrid.Column>
			<DataGrid.Column>Email</DataGrid.Column>
		</DataGrid.Row>
	</DataGrid.Header>
	<DataGrid.Body>
		{#each rows as row (row.id)}
			<ContextMenu.Root>
				<ContextMenu.Trigger
					base={DataGrid.Row}
					class="cursor-context-menu transition-colors hover:bg-muted/50 rounded-none px-8"
				>
					<DataGrid.Cell>{row.name}</DataGrid.Cell>
					<DataGrid.Cell>{row.role}</DataGrid.Cell>
					<DataGrid.Cell class="text-muted-foreground">{row.email}</DataGrid.Cell>
				</ContextMenu.Trigger>
				<ContextMenu.Content preset="context-menu.content" class="min-w-44 rounded-lg border bg-popover shadow-md">
					<div class="px-2 py-1.5">
						<p class="text-foreground text-xs font-medium">{row.name}</p>
						<p class="text-muted-foreground text-[11px]">{row.role}</p>
						<p class="text-muted-foreground text-[11px]">{row.email}</p>
					</div>
					<ContextMenu.Divider />
					<ContextMenu.Item preset="context-menu.item" class="flex items-center gap-2 border-none">Edit row</ContextMenu.Item>
					<ContextMenu.Item preset="context-menu.item" class="flex items-center gap-2 border-none">Copy email</ContextMenu.Item>
					<ContextMenu.Divider />
					<ContextMenu.Item preset="context-menu.item" class="flex items-center gap-2 border-none text-destructive">Delete row</ContextMenu.Item>
				</ContextMenu.Content>
			</ContextMenu.Root>
		{/each}
	</DataGrid.Body>
</DataGrid.Root>`;

	const listCode = `<List.Root class="border border-border p-4">
	<ContextMenu.Root>
		<ContextMenu.Trigger base={List.Item} class="border-none p-0">Backlog - Prepare release notes</ContextMenu.Trigger>
		<ContextMenu.Content preset="context-menu.content" class="min-w-52 rounded-lg border bg-popover p-1 shadow-md">
			<ContextMenu.Item preset="context-menu.item" class="flex items-center gap-2 border-none">
				<Icon src={ArrowIcon} class="size-4 text-muted-foreground" />
				Move to top
			</ContextMenu.Item>
			<ContextMenu.Item preset="context-menu.item" class="flex items-center gap-2 border-none">
				<Icon src={CopyIcon} class="size-4 text-muted-foreground" />
				Duplicate task
			</ContextMenu.Item>
			<ContextMenu.Divider />
			<ContextMenu.Item preset="context-menu.item" class="flex items-center gap-2 border-none text-destructive">
				<Icon src={CloseIcon} class="size-4" />
				Remove task
			</ContextMenu.Item>
		</ContextMenu.Content>
	</ContextMenu.Root>

	<ContextMenu.Root>
		<ContextMenu.Trigger base={List.Item} class="border-none p-0">Review PR #104</ContextMenu.Trigger>
		<ContextMenu.Content preset="context-menu.content" class="min-w-52 rounded-lg border bg-popover p-1 shadow-md">
			<ContextMenu.Item preset="context-menu.item" class="flex items-center gap-2 border-none">
				<Icon src={ArrowIcon} class="size-4 text-muted-foreground" />
				Move to top
			</ContextMenu.Item>
			<ContextMenu.Item preset="context-menu.item" class="flex items-center gap-2 border-none">
				<Icon src={CopyIcon} class="size-4 text-muted-foreground" />
				Duplicate task
			</ContextMenu.Item>
			<ContextMenu.Divider />
			<ContextMenu.Item preset="context-menu.item" class="flex items-center gap-2 border-none text-destructive">
				<Icon src={CloseIcon} class="size-4" />
				Remove task
			</ContextMenu.Item>
		</ContextMenu.Content>
	</ContextMenu.Root>

	<ContextMenu.Root>
		<ContextMenu.Trigger base={List.Item} class="border-none p-0">Ship patch release</ContextMenu.Trigger>
		<ContextMenu.Content preset="context-menu.content" class="min-w-52 rounded-lg border bg-popover p-1 shadow-md">
			<ContextMenu.Item preset="context-menu.item" class="flex items-center gap-2 border-none">
				<Icon src={ArrowIcon} class="size-4 text-muted-foreground" />
				Move to top
			</ContextMenu.Item>
			<ContextMenu.Item preset="context-menu.item" class="flex items-center gap-2 border-none">
				<Icon src={CopyIcon} class="size-4 text-muted-foreground" />
				Duplicate task
			</ContextMenu.Item>
			<ContextMenu.Divider />
			<ContextMenu.Item preset="context-menu.item" class="flex items-center gap-2 border-none text-destructive">
				<Icon src={CloseIcon} class="size-4" />
				Remove task
			</ContextMenu.Item>
		</ContextMenu.Content>
	</ContextMenu.Root>
</List.Root>`;

	let buttonAction = $state('');
	let avatarAction = $state('');
	let rows = $state([
		{ id: 1, name: 'Alice Chen', role: 'Engineer', email: 'alice@example.com' },
		{ id: 2, name: 'Bob Martinez', role: 'Designer', email: 'bob@example.com' },
		{ id: 3, name: 'Charlie Kim', role: 'Product', email: 'charlie@example.com' }
	]);
	let contextRow = $state('');
	let listAction = $state('');

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

	<Section title="Examples" description="Basic and composed context menu trigger patterns">
		<div class="space-y-8">
			<DemoExample
				title="Basic Zone"
				description="Right-click to open the context menu"
				code={basicCode}
			>
				<ContextMenu.Root>
					<ContextMenu.Trigger>
						<div
							class="flex h-40 w-72 items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted text-sm font-medium"
						>
							Right-click to open the context menu
						</div>
					</ContextMenu.Trigger>
					<ContextMenu.Content
						preset="context-menu.content"
						class="min-w-48 rounded-lg border bg-popover shadow-md"
					>
						<ContextMenu.Item preset="context-menu.item" class="border-none">Copy</ContextMenu.Item>
						<ContextMenu.Item preset="context-menu.item" class="border-none">Paste</ContextMenu.Item
						>
						<ContextMenu.Divider />
						<ContextMenu.Item preset="context-menu.item" class="border-none text-destructive">
							Delete
						</ContextMenu.Item>
					</ContextMenu.Content>
				</ContextMenu.Root>
			</DemoExample>

			<DemoExample
				title="On Button"
				description="Right-click the button to see its context menu"
				code={buttonCode}
			>
				<div class="flex flex-col items-center gap-4">
					<ContextMenu.Root>
					<ContextMenu.Trigger base={Button} variant="outline" class="gap-2 px-3">
						Edit Document
					</ContextMenu.Trigger>
						<ContextMenu.Content
							preset="context-menu.content"
							class="min-w-44 rounded-lg border bg-popover shadow-md"
						>
							<ContextMenu.Item
								preset="context-menu.item"
								class="flex items-center gap-2 border-none"
								onclick={() => (buttonAction = 'copy')}
							>
								<Icon src={CopyIcon} class="size-4 text-muted-foreground" />
								Copy link
							</ContextMenu.Item>
							<ContextMenu.Item
								preset="context-menu.item"
								class="flex items-center gap-2 border-none"
								onclick={() => (buttonAction = 'open-new-tab')}
							>
								<Icon src={MoreIcon} class="size-4 text-muted-foreground" />
								Open in new tab
							</ContextMenu.Item>
							<ContextMenu.Divider />
							<ContextMenu.Item
								preset="context-menu.item"
								class="flex items-center gap-2 border-none text-destructive"
								onclick={() => (buttonAction = 'remove')}
							>
								<Icon src={CloseIcon} class="size-4" />
								Remove
							</ContextMenu.Item>
						</ContextMenu.Content>
					</ContextMenu.Root>
					{#if buttonAction}
						<p class="text-sm">Last action: <strong>{buttonAction}</strong></p>
					{/if}
				</div>
			</DemoExample>

			<DemoExample
				title="On Team Avatar"
				description="Right-click a teammate avatar card for collaboration actions"
				code={avatarProfileCode}
			>
				<div class="flex flex-col">
					<ContextMenu.Root>
						<ContextMenu.Trigger
							class="flex w-full max-w-lg items-center justify-between gap-3 rounded-lg border border-border bg-card p-3"
						>
							<div class="flex items-center gap-3">
								<Avatar
									alt="Alice Chen"
									class="size-12 ring-2 ring-transparent transition-all hover:ring-primary"
								/>
								<div class="flex flex-col items-start">
									<p class="text-sm font-semibold">Alice Chen</p>
									<p class="text-muted-foreground text-xs">Design Systems Engineer</p>
								</div>
							</div>
						</ContextMenu.Trigger>
						<ContextMenu.Content
							preset="context-menu.content"
							class="min-w-44 rounded-lg border bg-popover shadow-md"
						>
							<ContextMenu.Item
								preset="context-menu.item"
								class="flex items-center gap-2 border-none"
								onclick={() => {
									navigator.clipboard?.writeText('/team/alice-chen');
									avatarAction = 'copied-profile-link';
								}}
							>
								<Icon src={CopyIcon} class="size-4 text-muted-foreground" />
								Copy profile link
							</ContextMenu.Item>
							<ContextMenu.Item
								preset="context-menu.item"
								class="flex items-center gap-2 border-none"
								onclick={() => (avatarAction = 'direct-message-opened')}
							>
								<Icon src={MoreIcon} class="size-4 text-muted-foreground" />
								Send direct message
							</ContextMenu.Item>
							<ContextMenu.Item
								preset="context-menu.item"
								class="flex items-center gap-2 border-none"
								onclick={() => (avatarAction = 'assigned-as-reviewer')}
							>
								<Icon src={ArrowIcon} class="size-4 text-muted-foreground" />
								Assign as reviewer
							</ContextMenu.Item>
							<ContextMenu.Divider />
							<ContextMenu.Item
								preset="context-menu.item"
								class="flex items-center gap-2 border-none text-destructive"
								onclick={() => (avatarAction = 'removed-from-project')}
							>
								<Icon src={CloseIcon} class="size-4" />
								Remove from project
							</ContextMenu.Item>
						</ContextMenu.Content>
					</ContextMenu.Root>
					{#if avatarAction}
						<p class="mt-2 text-sm text-muted-foreground">
							Last action: <strong>{avatarAction}</strong>
						</p>
					{/if}
				</div>
			</DemoExample>

			<DemoExample
				title="On DataGrid Row"
				description="Right-click any row for row-level actions"
				code={datagridRowCode}
			>
				<div class="w-full max-w-2xl flex flex-col">
					<DataGrid.Root class="w-full rounded-lg border">
						<DataGrid.Header>
							<DataGrid.Row>
								<DataGrid.Column>Name</DataGrid.Column>
								<DataGrid.Column>Role</DataGrid.Column>
								<DataGrid.Column>Email</DataGrid.Column>
							</DataGrid.Row>
						</DataGrid.Header>

						<DataGrid.Body>
							{#each rows as row (row.id)}
								<ContextMenu.Root>
									<ContextMenu.Trigger
										base={DataGrid.Row}
										class="cursor-context-menu transition-colors hover:bg-muted/50 rounded-none px-8"
									>
										<DataGrid.Cell>{row.name}</DataGrid.Cell>
										<DataGrid.Cell>{row.role}</DataGrid.Cell>
										<DataGrid.Cell class="text-muted-foreground">{row.email}</DataGrid.Cell>
									</ContextMenu.Trigger>

									<ContextMenu.Content
										preset="context-menu.content"
										class="min-w-44 rounded-lg border bg-popover shadow-md"
									>
										<div class="px-2 py-1.5">
											<p class="text-foreground text-xs font-medium">{row.name}</p>
											<p class="text-muted-foreground text-[11px]">{row.role}</p>
											<p class="text-muted-foreground text-[11px]">{row.email}</p>
										</div>
										<ContextMenu.Divider />
										<ContextMenu.Item
											preset="context-menu.item"
											class="flex items-center gap-2 border-none"
										>
											<Icon src={ArrowIcon} class="size-4 text-muted-foreground" />
											Edit row
										</ContextMenu.Item>
										<ContextMenu.Item
											preset="context-menu.item"
											class="flex items-center gap-2 border-none"
											onclick={() => navigator.clipboard?.writeText(row.email)}
										>
											<Icon src={CopyIcon} class="size-4 text-muted-foreground" />
											Copy email
										</ContextMenu.Item>
										<ContextMenu.Divider />
										<ContextMenu.Item
											preset="context-menu.item"
											class="flex items-center gap-2 border-none text-destructive"
											onclick={() => {
												rows = rows.filter((r) => r.id !== row.id);
												contextRow = row.name;
											}}
										>
											<Icon src={CloseIcon} class="size-4" />
											Delete row
										</ContextMenu.Item>
									</ContextMenu.Content>
								</ContextMenu.Root>
							{/each}
						</DataGrid.Body>
					</DataGrid.Root>
					{#if contextRow}
						<p class="mt-3 text-sm text-muted-foreground">
							Last deleted: <strong>{contextRow}</strong>
						</p>
					{/if}
				</div>
			</DemoExample>

			<DemoExample
				title="List"
				description="List item actions with icon-first context menu items"
				code={listCode}
			>
				<div class="flex flex-col">
					<List.Root class="border border-border p-4">
						<ContextMenu.Root>
							<ContextMenu.Trigger base={List.Item} class="border-none p-0"
								>Backlog - Prepare release notes</ContextMenu.Trigger
							>
							<ContextMenu.Content
								preset="context-menu.content"
								class="min-w-52 rounded-lg border bg-popover p-1 shadow-md"
							>
								<ContextMenu.Item
									preset="context-menu.item"
									class="flex items-center gap-2 border-none"
									onclick={() => (listAction = 'move-to-top')}
								>
									<Icon src={ArrowIcon} class="size-4 text-muted-foreground" />
									Move to top
								</ContextMenu.Item>
								<ContextMenu.Item
									preset="context-menu.item"
									class="flex items-center gap-2 border-none"
									onclick={() => (listAction = 'duplicate')}
								>
									<Icon src={CopyIcon} class="size-4 text-muted-foreground" />
									Duplicate task
								</ContextMenu.Item>
								<ContextMenu.Divider />
								<ContextMenu.Item
									preset="context-menu.item"
									class="flex items-center gap-2 border-none text-destructive"
									onclick={() => (listAction = 'remove')}
								>
									<Icon src={CloseIcon} class="size-4" />
									Remove task
								</ContextMenu.Item>
							</ContextMenu.Content>
						</ContextMenu.Root>

						<ContextMenu.Root>
							<ContextMenu.Trigger base={List.Item} class="border-none p-0"
								>Review PR #104</ContextMenu.Trigger
							>
							<ContextMenu.Content
								preset="context-menu.content"
								class="min-w-52 rounded-lg border bg-popover p-1 shadow-md"
							>
								<ContextMenu.Item
									preset="context-menu.item"
									class="flex items-center gap-2 border-none"
									onclick={() => (listAction = 'move-to-top')}
								>
									<Icon src={ArrowIcon} class="size-4 text-muted-foreground" />
									Move to top
								</ContextMenu.Item>
								<ContextMenu.Item
									preset="context-menu.item"
									class="flex items-center gap-2 border-none"
									onclick={() => (listAction = 'duplicate')}
								>
									<Icon src={CopyIcon} class="size-4 text-muted-foreground" />
									Duplicate task
								</ContextMenu.Item>
								<ContextMenu.Divider />
								<ContextMenu.Item
									preset="context-menu.item"
									class="flex items-center gap-2 border-none text-destructive"
									onclick={() => (listAction = 'remove')}
								>
									<Icon src={CloseIcon} class="size-4" />
									Remove task
								</ContextMenu.Item>
							</ContextMenu.Content>
						</ContextMenu.Root>

						<ContextMenu.Root>
							<ContextMenu.Trigger base={List.Item} class="border-none p-0"
								>Ship patch release</ContextMenu.Trigger
							>
							<ContextMenu.Content
								preset="context-menu.content"
								class="min-w-52 rounded-lg border bg-popover p-1 shadow-md"
							>
								<ContextMenu.Item
									preset="context-menu.item"
									class="flex items-center gap-2 border-none"
									onclick={() => (listAction = 'move-to-top')}
								>
									<Icon src={ArrowIcon} class="size-4 text-muted-foreground" />
									Move to top
								</ContextMenu.Item>
								<ContextMenu.Item
									preset="context-menu.item"
									class="flex items-center gap-2 border-none"
									onclick={() => (listAction = 'duplicate')}
								>
									<Icon src={CopyIcon} class="size-4 text-muted-foreground" />
									Duplicate task
								</ContextMenu.Item>
								<ContextMenu.Divider />
								<ContextMenu.Item
									preset="context-menu.item"
									class="flex items-center gap-2 border-none text-destructive"
									onclick={() => (listAction = 'remove')}
								>
									<Icon src={CloseIcon} class="size-4" />
									Remove task
								</ContextMenu.Item>
							</ContextMenu.Content>
						</ContextMenu.Root>
					</List.Root>

					{#if listAction}
						<p class="mt-2 text-sm text-muted-foreground">
							Last action: <strong>{listAction}</strong>
						</p>
					{/if}
				</div>
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
	</Section>

	<PageNavigation
		prev={{ label: 'Combobox', href: '/docs/components/combobox' }}
		next={{ label: 'DataGrid', href: '/docs/components/datagrid' }}
	/>
</div>
