<script lang="ts">
	import { Stack } from '$lib/components/stack';
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
	import { stackRootProps, stackItemProps } from './props';
	import { metadata } from './shared';
	import type { DocMode } from '$docs/context/doc-mode.svelte';
	import type { Frontmatter } from '$docs/md/frontmatter';
	import { newLine } from '$docs/md/template';

	let { contentType = 'html' }: { contentType?: DocMode } = $props();

	const frontmatter: Frontmatter = {
		id: 'stack',
		title: 'Stack',
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
	prev={{ label: 'Slider', href: '/docs/components/slider' }}
	next={{ label: 'Stepper', href: '/docs/components/stepper' }}
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

	<DocSection title="Preset Configuration" subtitle="Customize the stack appearance using presets">
		<DocCode code={metadata.examples.preset} lang="typescript" />
	</DocSection>

	<DocSection title="Examples" subtitle="Explore different stack variations">
		<DocExample title="Vertical Stack" description="Items stacked vertically (default)" code={metadata.examples.vertical}>
			<div class="w-64">
				<Stack.Root>
					<Stack.Item>Item 1</Stack.Item>
					<Stack.Item>Item 2</Stack.Item>
					<Stack.Item>Item 3</Stack.Item>
				</Stack.Root>
			</div>
		</DocExample>

		<DocExample title="Horizontal Stack" description="Items arranged horizontally" code={metadata.examples.horizontal}>
			<Stack.Root direction="row" class="gap-3">
				<Stack.Item class="border-border rounded border px-3 py-2">Item A</Stack.Item>
				<Stack.Item class="border-border rounded border px-3 py-2">Item B</Stack.Item>
				<Stack.Item class="border-border rounded border px-3 py-2">Item C</Stack.Item>
			</Stack.Root>
		</DocExample>

		<DocExample title="Grid Stack" description="Items arranged in a grid" code={metadata.examples.grid}>
			<Stack.Root direction="grid" columns={3} class="gap-3">
				{#each Array.from({ length: 6 }, (_, i) => `Cell ${i + 1}`) as cell}
					<Stack.Item class="border-border rounded border p-3 text-center text-sm">{cell}</Stack.Item>
				{/each}
			</Stack.Root>
		</DocExample>
	</DocSection>

	<DocSection title="API Reference">
		<DocOnly for="markdown">
{newLine(2)}### Stack.Root

**Preset Key:** `stack`

</DocOnly>
				<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Stack.Root

**Preset Key:** `stack`</h3></DocOnly>
		<DocProps data={stackRootProps} />

		<DocOnly for="markdown">
{newLine(2)}### Stack.Item

**Preset Key:** `stack.item`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Stack.Item</h3></DocOnly>
		<DocProps data={stackItemProps} />
	</DocSection>

	<DocSection title="Accessibility">
		<DocAccessibility features={metadata.accessibility} />
	</DocSection>

	<DocOnly for="markdown">
{newLine(2)}## License

MIT License
	</DocOnly>
</DocPage>
