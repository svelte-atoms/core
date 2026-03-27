<script lang="ts">
	import { Tooltip } from '$lib/components/tooltip';
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
	import { tooltipRootProps, tooltipTriggerProps, tooltipContentProps } from './props';
	import { metadata } from './shared';
	import type { DocMode } from '$docs/context/doc-mode.svelte';
	import type { Frontmatter } from '$docs/md/frontmatter';
	import { newLine } from '$docs/md/template';
	import { Tabs as ATabs, Tab } from '$lib/components/tabs';

	let { contentType = 'html' }: { contentType?: DocMode } = $props();

	const frontmatter: Frontmatter = {
		id: 'tooltip',
		title: 'Tooltip',
		category: 'components',
		depth: 'beginner',
		prerequisites: [],
		related: []
	};

	const placements = ['top', 'bottom', 'left', 'right'] as const;

	const apiTabs = [
		{ value: 'root',     label: 'Tooltip.Root',     props: tooltipRootProps },
		{ value: 'trigger',  label: 'Tooltip.Trigger',  props: tooltipTriggerProps },
		{ value: 'content',  label: 'Tooltip.Content',  props: tooltipContentProps },
	];
</script>

<DocPage
	{contentType}
	title={metadata.componentTitle}
	description={metadata.componentDescription}
	status={metadata.status}
	llms={true}
	breadcrumbs={metadata.breadcrumbs}
	prev={{ label: 'Toast', href: '/docs/components/toast' }}
	next={{ label: 'Tree', href: '/docs/components/tree' }}
	{frontmatter}
>
	<DocOnly for="markdown">
		**Type**: Compound Component

		## Use Cases

		{#each metadata.useCases as uc, i (i)}
		- **{uc.title}**: {uc.description}
		{/each}
	</DocOnly>

	<DocSection title="Installation">
		<DocInstallation packageName={metadata.packageName} importCode={metadata.importCode} />
	</DocSection>

	<DocSection title="Preset Configuration" subtitle="Customize the tooltip appearance using presets">
		<DocCode code={metadata.examples.preset} lang="typescript" />
	</DocSection>

	<DocSection title="Examples" subtitle="Explore different tooltip variations">
		<DocExample title="Basic Tooltip" description="Simple tooltip shown on hover." code={metadata.examples.basic}>
			<div class="flex items-center justify-center p-8">
				<Tooltip.Root>
					<Tooltip.Trigger base={Button} variant="outline">Hover me</Tooltip.Trigger>
					<Tooltip.Content class="border-border bg-popover text-popover-foreground z-50 rounded-md border px-3 py-1.5 text-sm shadow-md">
						This is a tooltip
					</Tooltip.Content>
				</Tooltip.Root>
			</div>
		</DocExample>

		<DocExample title="Tooltip Placement" description="Tooltips positioned on different sides — placement goes on Tooltip.Root." code={metadata.examples.placement}>
			<div class="flex flex-wrap items-center justify-center gap-4 p-8">
				{#each placements as placement, i (i)}
					<Tooltip.Root {placement}>
						<Tooltip.Trigger base={Button} variant="outline">{placement}</Tooltip.Trigger>
						<Tooltip.Content class="border-border bg-popover text-popover-foreground z-50 rounded-md border px-3 py-1.5 text-sm shadow-md">
							{placement} tooltip
						</Tooltip.Content>
					</Tooltip.Root>
				{/each}
			</div>
		</DocExample>

		<DocExample title="Tooltip with Arrow" description="Tooltip with a directional arrow pointing at the trigger." code={metadata.examples.arrow}>
			<div class="flex items-center justify-center p-8">
				<Tooltip.Root offset={0}>
					<Tooltip.Trigger base={Button} variant="outline">With Arrow</Tooltip.Trigger>
					<Tooltip.Content class="border-border bg-popover text-popover-foreground z-50 rounded-md border px-3 py-1.5 text-sm shadow-md">
						<Tooltip.Arrow class="fill-popover" />
						Tooltip with arrow
					</Tooltip.Content>
				</Tooltip.Root>
			</div>
		</DocExample>
	</DocSection>

	<DocSection title="API Reference">
		<DocOnly for="html">
			<ATabs.Root value={apiTabs[0].value} class="mt-2">
				<ATabs.Header class="border-b">
					{#each apiTabs as tab, i (i)}
						<Tab.Root value={tab.value}>
							<Tab.Header class="px-3 py-2 text-xs">{tab.label}</Tab.Header>
							<Tab.Body>
								<DocProps data={tab.props} />
							</Tab.Body>
						</Tab.Root>
					{/each}
				</ATabs.Header>
				<ATabs.Content class="pt-4" />
			</ATabs.Root>
		</DocOnly>

		{#each apiTabs as tab, i (i)}
			<DocOnly for="markdown">
{newLine(2)}### {tab.label}

</DocOnly>
			<DocOnly for="markdown"><DocProps data={tab.props} /></DocOnly>
		{/each}
	</DocSection>

	<DocSection title="Accessibility">
		<DocAccessibility features={metadata.accessibility} />
	</DocSection>

	<DocOnly for="markdown">
{newLine(2)}## License

MIT License
	</DocOnly>
</DocPage>
