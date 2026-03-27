<script lang="ts">
	import { Popover } from '$lib/components/popover';
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
	import { popoverRootProps, popoverContentProps, popoverIndicatorProps, popoverArrowProps, popoverTriggerProps } from './props';
	import { metadata } from './shared';
	import type { DocMode } from '$docs/context/doc-mode.svelte';
	import type { Frontmatter } from '$docs/md/frontmatter';
	import { newLine } from '$docs/md/template';

	let { contentType = 'html' }: { contentType?: DocMode } = $props();

	const frontmatter: Frontmatter = {
		id: 'popover',
		title: 'Popover',
		category: 'components',
		depth: 'intermediate',
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
	prev={{ label: 'Menu', href: '/docs/components/menu' }}
	next={{ label: 'Radio', href: '/docs/components/radio' }}
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

	<DocSection title="Preset Configuration" subtitle="Customize the popover appearance using presets">
		<DocCode code={metadata.examples.preset} lang="typescript" />
	</DocSection>

	<DocSection title="Examples" subtitle="Explore different popover variations">
		<DocExample title="Basic Popover" description="Simple popover with button trigger" code={metadata.examples.basic}>
			<Popover.Root>
				<Popover.Trigger base={Button} variant="outline">Open Popover</Popover.Trigger>
				<Popover.Content class="border-border bg-background z-10 w-64 rounded-lg border p-4 shadow-lg">
					<p class="text-sm">This is a popover. It floats near its trigger element.</p>
				</Popover.Content>
			</Popover.Root>
		</DocExample>

		<DocExample title="Popover with Arrow" description="Popover with directional arrow indicator" code={metadata.examples.arrow}>
			<Popover.Root>
				<Popover.Trigger base={Button} variant="outline">Info</Popover.Trigger>
				<Popover.Content class="border-border bg-background z-10 rounded-lg border p-3 shadow-lg">
					<Popover.Arrow class="fill-background" />
					<p class="text-sm">A pointed arrow indicates the source of this popover.</p>
				</Popover.Content>
			</Popover.Root>
		</DocExample>

		<DocExample title="Popover Placement" description="Control popover position relative to trigger" code={metadata.examples.placement}>
			<div class="flex flex-wrap gap-4">
				{#each ['top', 'bottom', 'left', 'right'] as placement, i (i)}
					<Popover.Root>
						<Popover.Trigger base={Button} variant="outline" size="sm">{placement}</Popover.Trigger>
						<Popover.Content {placement} class="border-border bg-background z-10 rounded-lg border p-3 shadow-lg">
							<p class="text-sm">Placed on {placement}</p>
						</Popover.Content>
					</Popover.Root>
				{/each}
			</div>
		</DocExample>
	</DocSection>

	<DocSection title="API Reference">
		<DocOnly for="markdown">
{newLine(2)}### Popover.Root

**Preset Key:** `popover`

</DocOnly>
				<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Popover.Root

**Preset Key:** `popover`</h3></DocOnly>
		<DocProps data={popoverRootProps} />

		<DocOnly for="markdown">
{newLine(2)}### Popover.Trigger

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Popover.Trigger</h3></DocOnly>
		<DocProps data={popoverTriggerProps} />

		<DocOnly for="markdown">
{newLine(2)}### Popover.Content

**Preset Key:** `popover.content`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Popover.Content</h3></DocOnly>
		<DocProps data={popoverContentProps} />

		<DocOnly for="markdown">
{newLine(2)}### Popover.Arrow

**Preset Key:** `popover.arrow`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Popover.Arrow</h3></DocOnly>
		<DocProps data={popoverArrowProps} />

		<DocOnly for="markdown">
{newLine(2)}### Popover.Indicator

**Preset Key:** `popover.indicator`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Popover.Indicator</h3></DocOnly>
		<DocProps data={popoverIndicatorProps} />
	</DocSection>

	<DocSection title="Accessibility">
		<DocAccessibility features={metadata.accessibility} />
	</DocSection>

	<DocOnly for="markdown">
{newLine(2)}## License

MIT License
	</DocOnly>
</DocPage>
