<script lang="ts">
	import { Select } from '$lib/components/select';
	import { Input } from '$lib/components/input';
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
	import { selectRootProps, selectItemProps, selectTriggerProps, selectSelectionsProps, selectSelectionProps } from './props';
	import { metadata } from './shared';
	import type { DocMode } from '$docs/context/doc-mode.svelte';
	import type { Frontmatter } from '$docs/md/frontmatter';
	import { newLine } from '$docs/md/template';

	let { contentType = 'html' }: { contentType?: DocMode } = $props();

	const frontmatter: Frontmatter = {
		id: 'select',
		title: 'Select',
		category: 'components',
		depth: 'beginner',
		prerequisites: [],
		related: []
	};

	let singleValue = $state<string | undefined>();
	let multiValues = $state<string[]>([]);
</script>

<DocPage
	{contentType}
	title={metadata.componentTitle}
	description={metadata.componentDescription}
	status={metadata.status}
	llms={true}
	breadcrumbs={metadata.breadcrumbs}
	prev={{ label: 'Scrollable', href: '/docs/components/scrollable' }}
	next={{ label: 'Sidebar', href: '/docs/components/sidebar' }}
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

	<DocSection title="Preset Configuration" subtitle="Customize the select appearance using presets">
		<DocCode code={metadata.examples.preset} lang="typescript" />
	</DocSection>

	<DocSection title="Examples" subtitle="Explore different select variations">
		<DocExample title="Basic Select" description="Simple dropdown select" code={metadata.examples.basic}>
			<div class="w-48">
				<Select.Root bind:value={singleValue}>
					<Select.Trigger base={Input.Root}>
						<span>{singleValue ?? 'Select an option...'}</span>
					</Select.Trigger>
					<Select.Content class="border-border bg-background mt-1 rounded-lg border shadow-lg">
						<Select.Item value="apple">Apple</Select.Item>
						<Select.Item value="banana">Banana</Select.Item>
						<Select.Item value="cherry">Cherry</Select.Item>
					</Select.Content>
				</Select.Root>
			</div>
		</DocExample>

		<DocExample title="Multiple Select" description="Select with multiple value support" code={metadata.examples.multiple}>
			<div class="w-64">
				<Select.Root bind:values={multiValues} multiple>
					<Select.Trigger base={Input.Root} class="flex h-auto min-h-10 flex-wrap items-start gap-1">
						<Select.Selections class="flex flex-wrap gap-1" />
						<Select.Placeholder>Choose fruits...</Select.Placeholder>
					</Select.Trigger>
					<Select.Content class="border-border bg-background mt-1 rounded-lg border shadow-lg">
						<Select.Item value="apple">Apple</Select.Item>
						<Select.Item value="banana">Banana</Select.Item>
						<Select.Item value="cherry">Cherry</Select.Item>
					</Select.Content>
				</Select.Root>
			</div>
		</DocExample>
	</DocSection>

	<DocSection title="API Reference">
		<DocOnly for="markdown">
{newLine(2)}### Select.Root

**Preset Key:** `select`

</DocOnly>
				<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Select.Root

**Preset Key:** `select`</h3></DocOnly>
		<DocProps data={selectRootProps} />

		<DocOnly for="markdown">
{newLine(2)}### Select.Trigger

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Select.Trigger</h3></DocOnly>
		<DocProps data={selectTriggerProps} />

		<DocOnly for="markdown">
{newLine(2)}### Select.Item

**Preset Key:** `select.item`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Select.Item</h3></DocOnly>
		<DocProps data={selectItemProps} />

		<DocOnly for="markdown">
{newLine(2)}### Select.Selections

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Select.Selections</h3></DocOnly>
		<DocProps data={selectSelectionsProps} />

		<DocOnly for="markdown">
{newLine(2)}### Select.Selection

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Select.Selection</h3></DocOnly>
		<DocProps data={selectSelectionProps} />
	</DocSection>

	<DocSection title="Accessibility">
		<DocAccessibility features={metadata.accessibility} />
	</DocSection>

	<DocOnly for="markdown">
{newLine(2)}## License

MIT License
	</DocOnly>
</DocPage>
