<script lang="ts">
	import { Scrollable } from '$lib/components/scrollable';
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
	import { scrollableRootProps, scrollableContainerProps, scrollableContentProps, scrollableTrackProps, scrollableThumbProps } from './props';
	import { metadata } from './shared';
	import type { DocMode } from '$docs/context/doc-mode.svelte';
	import type { Frontmatter } from '$docs/md/frontmatter';
	import { newLine } from '$docs/md/template';

	let { contentType = 'html' }: { contentType?: DocMode } = $props();

	const frontmatter: Frontmatter = {
		id: 'scrollable',
		title: 'Scrollable',
		category: 'components',
		depth: 'beginner',
		prerequisites: [],
		related: []
	};

	const items = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`);
</script>

<DocPage
	{contentType}
	title={metadata.componentTitle}
	description={metadata.componentDescription}
	status={metadata.status}
	llms={true}
	breadcrumbs={metadata.breadcrumbs}
	prev={{ label: 'Radio', href: '/docs/components/radio' }}
	next={{ label: 'Select', href: '/docs/components/select' }}
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

	<DocSection title="Preset Configuration" subtitle="Customize the scrollable appearance using presets">
		<DocCode code={metadata.examples.preset} lang="typescript" />
	</DocSection>

	<DocSection title="Examples" subtitle="Explore different scrollable variations">
		<DocExample title="Vertical Scrollable" description="Custom scrollbar for vertical scrolling" code={metadata.examples.vertical}>
			<Scrollable.Root class="h-48 w-64 rounded-lg border">
				<Scrollable.Container>
					<Scrollable.Content>
						{#each items as item (item)}
							<div class="border-border border-b px-4 py-2 text-sm last:border-b-0">{item}</div>
						{/each}
					</Scrollable.Content>
				</Scrollable.Container>
				<Scrollable.Track>
					<Scrollable.Thumb />
				</Scrollable.Track>
			</Scrollable.Root>
		</DocExample>

		<DocExample title="Horizontal Scrollable" description="Custom scrollbar for horizontal scrolling" code={metadata.examples.horizontal}>
			<Scrollable.Root class="w-64 rounded-lg border" orientation="horizontal">
				<Scrollable.Container>
					<Scrollable.Content class="flex w-max gap-4 p-4">
						{#each items.slice(0, 10) as item (item)}
							<div class="border-border w-24 shrink-0 rounded border p-3 text-center text-sm">{item}</div>
						{/each}
					</Scrollable.Content>
				</Scrollable.Container>
				<Scrollable.Track orientation="horizontal">
					<Scrollable.Thumb orientation="horizontal" />
				</Scrollable.Track>
			</Scrollable.Root>
		</DocExample>
	</DocSection>

	<DocSection title="API Reference">
		<DocOnly for="markdown">
{newLine(2)}### Scrollable.Root

**Preset Key:** `scrollable`

</DocOnly>
				<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Scrollable.Root

**Preset Key:** `scrollable`</h3></DocOnly>
		<DocProps data={scrollableRootProps} />

		<DocOnly for="markdown">
{newLine(2)}### Scrollable.Container

**Preset Key:** `scrollable.container`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Scrollable.Container</h3></DocOnly>
		<DocProps data={scrollableContainerProps} />

		<DocOnly for="markdown">
{newLine(2)}### Scrollable.Content

**Preset Key:** `scrollable.content`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Scrollable.Content</h3></DocOnly>
		<DocProps data={scrollableContentProps} />

		<DocOnly for="markdown">
{newLine(2)}### Scrollable.Track

**Preset Key:** `scrollable.track`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Scrollable.Track</h3></DocOnly>
		<DocProps data={scrollableTrackProps} />

		<DocOnly for="markdown">
{newLine(2)}### Scrollable.Thumb

**Preset Key:** `scrollable.thumb`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Scrollable.Thumb</h3></DocOnly>
		<DocProps data={scrollableThumbProps} />
	</DocSection>

	<DocSection title="Accessibility">
		<DocAccessibility features={metadata.accessibility} />
	</DocSection>

	<DocOnly for="markdown">
{newLine(2)}## License

MIT License
	</DocOnly>
</DocPage>
