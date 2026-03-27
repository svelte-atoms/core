<script lang="ts">
	import { DropdownMenu } from '$lib/components/dropdown-menu';
	import { Button } from '$lib/components/button';
	import {
		DocPage,
		DocSection,
		DocExample,
		DocProps,
		DocOnly,
		DocInstallation,
		DocAccessibility,
		DocCode,
	} from '$docs/components';
	import { dropdownMenuItemProps, dropdownMenuListProps } from './props';
	import { metadata } from './shared';
	import type { DocMode } from '$docs/context/doc-mode.svelte';
	import type { Frontmatter } from '$docs/md/frontmatter';
	import { newLine } from '$docs/md/template';

	let { contentType = 'html' }: { contentType?: DocMode } = $props();

	const frontmatter: Frontmatter = {
		id: 'dropdown-menu',
		title: 'Dropdown Menu',
		category: 'components',
		depth: 'beginner',
		prerequisites: [],
		related: []
	};
</script>

<DocPage
	{contentType}
	title={metadata.componentTitle}
	description={metadata.componentDescription}
	status={metadata.status}
	llms={true}
	breadcrumbs={metadata.breadcrumbs}
	prev={{ label: 'Dropdown', href: '/docs/components/dropdown' }}
	next={{ label: 'Form', href: '/docs/components/form' }}
	{frontmatter}
>
	<DocOnly for="markdown">
		**Type**: Compound Component

		## Use Cases

		{#each metadata.useCases as uc, i (i)}
		- **{uc.title}**: {uc.description}
		{/each}

		## Components

		{#each metadata.componentsSummary as comp, i (i)}
		- **{comp.name}**: {comp.description}
		{/each}
	</DocOnly>

	<DocSection title="Installation">
		<DocInstallation packageName={metadata.packageName} importCode={metadata.importCode} />
	</DocSection>

	<DocSection title="Preset Configuration" subtitle="Customize the dropdown menu appearance using presets">
		<DocCode code={metadata.examples.preset} lang="typescript" />
	</DocSection>

	<DocSection title="Examples" subtitle="Explore different dropdown menu variations">
		<DocExample title="Basic Dropdown Menu" description="Simple menu with navigation items" code={metadata.examples.basic}>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger base={Button} variant="outline">Open Menu</DropdownMenu.Trigger>
				<DropdownMenu.Content class="border-border bg-background min-w-36 rounded-lg border shadow-lg">
					<DropdownMenu.Item>New File</DropdownMenu.Item>
					<DropdownMenu.Item>Open File</DropdownMenu.Item>
					<DropdownMenu.Item>Save</DropdownMenu.Item>
					<DropdownMenu.Item class="text-red-600">Exit</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</DocExample>

		<DocExample title="Interactive Menu" description="Menu items with click handlers" code={metadata.examples.interactive}>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger base={Button} variant="outline">User Menu</DropdownMenu.Trigger>
				<DropdownMenu.Content class="border-border bg-background min-w-36 rounded-lg border shadow-lg">
					<DropdownMenu.Item onclick={() => {}}>Profile</DropdownMenu.Item>
					<DropdownMenu.Item onclick={() => {}}>Settings</DropdownMenu.Item>
					<DropdownMenu.Item onclick={() => {}}>Logout</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</DocExample>
	</DocSection>

	<DocSection title="API Reference">
		<DocOnly for="markdown">
{newLine(2)}### DropdownMenu.Root

**Preset Key:** `dropdown-menu`

</DocOnly>
				<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">DropdownMenu.Root

**Preset Key:** `dropdown-menu`</h3></DocOnly>
		<DocProps data={dropdownMenuListProps} />

		<DocOnly for="markdown">
{newLine(2)}### DropdownMenu.Item

**Preset Key:** `dropdown-menu.item`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">DropdownMenu.Item</h3></DocOnly>
		<DocProps data={dropdownMenuItemProps} />
	</DocSection>

	<DocSection title="Accessibility">
		<DocAccessibility features={metadata.accessibility} />
	</DocSection>

	<DocOnly for="markdown">
{newLine(2)}## License

MIT License
	</DocOnly>
</DocPage>
