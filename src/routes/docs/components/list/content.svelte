<script lang="ts">
	import { List } from '$lib/components/list';
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
	import { listRootProps, listGroupProps, listItemProps, listTitleProps, listDividerProps } from './props';
	import { metadata } from './shared';
	import type { DocMode } from '$docs/context/doc-mode.svelte';
	import type { Frontmatter } from '$docs/md/frontmatter';
	import { newLine } from '$docs/md/template';

	let { contentType = 'html' }: { contentType?: DocMode } = $props();

	const frontmatter: Frontmatter = {
		id: 'list',
		title: 'List',
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
	prev={{ label: 'Link', href: '/docs/components/link' }}
	next={{ label: 'Menu', href: '/docs/components/menu' }}
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

	<DocSection title="Preset Configuration" subtitle="Customize the list appearance using presets">
		<DocCode code={metadata.examples.preset} lang="typescript" />
	</DocSection>

	<DocSection title="Examples" subtitle="Explore different list variations">
		<DocExample title="Basic List" description="Simple list with items" code={metadata.examples.basic}>
			<div class="w-64">
				<List.Root>
					<List.Item>First item</List.Item>
					<List.Item>Second item</List.Item>
					<List.Item>Third item</List.Item>
				</List.Root>
			</div>
		</DocExample>

		<DocExample title="List with Groups" description="List with section groups and titles" code={metadata.examples.grouped}>
			<div class="w-64">
				<List.Root>
					<List.Group>
						<List.Title>Fruits</List.Title>
						<List.Item>Apple</List.Item>
						<List.Item>Banana</List.Item>
					</List.Group>
					<List.Divider />
					<List.Group>
						<List.Title>Vegetables</List.Title>
						<List.Item>Carrot</List.Item>
						<List.Item>Broccoli</List.Item>
					</List.Group>
				</List.Root>
			</div>
		</DocExample>

		<DocExample title="Clickable List" description="Interactive list items with click handlers" code={metadata.examples.clickable}>
			<div class="w-64">
				<List.Root>
					<List.Item onclick={() => {}}>Profile Settings</List.Item>
					<List.Item onclick={() => {}}>Notifications</List.Item>
					<List.Item onclick={() => {}}>Privacy</List.Item>
					<List.Divider />
					<List.Item onclick={() => {}} class="text-red-500">Sign Out</List.Item>
				</List.Root>
			</div>
		</DocExample>
	</DocSection>

	<DocSection title="API Reference">
		<DocOnly for="markdown">
{newLine(2)}### List.Root

**Preset Key:** `list`

</DocOnly>
				<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">List.Root

**Preset Key:** `list`</h3></DocOnly>
		<DocProps data={listRootProps} />

		<DocOnly for="markdown">
{newLine(2)}### List.Group

**Preset Key:** `list.group`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">List.Group</h3></DocOnly>
		<DocProps data={listGroupProps} />

		<DocOnly for="markdown">
{newLine(2)}### List.Item

**Preset Key:** `list.item`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">List.Item</h3></DocOnly>
		<DocProps data={listItemProps} />

		<DocOnly for="markdown">
{newLine(2)}### List.Title

**Preset Key:** `list.title`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">List.Title</h3></DocOnly>
		<DocProps data={listTitleProps} />

		<DocOnly for="markdown">
{newLine(2)}### List.Divider

**Preset Key:** `list.divider`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">List.Divider</h3></DocOnly>
		<DocProps data={listDividerProps} />
	</DocSection>

	<DocSection title="Accessibility">
		<DocAccessibility features={metadata.accessibility} />
	</DocSection>

	<DocOnly for="markdown">
{newLine(2)}## License

MIT License
	</DocOnly>
</DocPage>
