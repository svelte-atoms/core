<script lang="ts">
	import { Breadcrumb as BreadcrumbComponent } from '$lib/components/breadcrumb';
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
	import breadcrumbProps from './props';
	import { metadata } from './shared';
	import type { DocMode } from '$docs/context/doc-mode.svelte';
	import type { Frontmatter } from '$docs/md/frontmatter';
	import { newLine } from '$docs/md/template';

	let { contentType = 'html' }: { contentType?: DocMode } = $props();

	const frontmatter: Frontmatter = {
		id: 'breadcrumb',
		title: 'Breadcrumb',
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
	prev={{ label: 'Badge', href: '/docs/components/badge' }}
	next={{ label: 'Button', href: '/docs/components/button' }}
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

	<DocSection title="Preset Configuration" subtitle="Customize the breadcrumb appearance using presets">
		<DocCode code={metadata.examples.preset} lang="typescript" />
	</DocSection>

	<DocSection title="Examples" subtitle="Explore different breadcrumb variations">
		<DocExample title="Basic Breadcrumb" description="Simple breadcrumb navigation" code={metadata.examples.basic}>
			<BreadcrumbComponent.Root>
				<BreadcrumbComponent.Item href="/">Home</BreadcrumbComponent.Item>
				<BreadcrumbComponent.Separator />
				<BreadcrumbComponent.Item href="/docs/components">Components</BreadcrumbComponent.Item>
				<BreadcrumbComponent.Separator />
				<BreadcrumbComponent.Item>Breadcrumb</BreadcrumbComponent.Item>
			</BreadcrumbComponent.Root>
		</DocExample>

		<DocExample title="Custom Separator" description="Use custom separator between items" code={metadata.examples.customSeparator}>
			<BreadcrumbComponent.Root>
				<BreadcrumbComponent.Item href="/">Home</BreadcrumbComponent.Item>
				<BreadcrumbComponent.Separator>></BreadcrumbComponent.Separator>
				<BreadcrumbComponent.Item href="/docs">Docs</BreadcrumbComponent.Item>
				<BreadcrumbComponent.Separator>></BreadcrumbComponent.Separator>
				<BreadcrumbComponent.Item>Components</BreadcrumbComponent.Item>
			</BreadcrumbComponent.Root>
		</DocExample>
	</DocSection>

	<DocSection title="API Reference">
		<DocOnly for="markdown">
{newLine(2)}### Breadcrumb.Root

**Preset Key:** `breadcrumb`

</DocOnly>
				<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Breadcrumb.Root

**Preset Key:** `breadcrumb`</h3></DocOnly>
		<DocProps data={breadcrumbProps.root} />

		<DocOnly for="markdown">
{newLine(2)}### Breadcrumb.Item

**Preset Key:** `breadcrumb.item`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Breadcrumb.Item</h3></DocOnly>
		<DocProps data={breadcrumbProps.item} />

		<DocOnly for="markdown">
{newLine(2)}### Breadcrumb.Separator

**Preset Key:** `breadcrumb.separator`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Breadcrumb.Separator</h3></DocOnly>
		<DocProps data={breadcrumbProps.separator} />
	</DocSection>

	<DocSection title="Accessibility">
		<DocAccessibility features={metadata.accessibility} />
	</DocSection>

	<DocOnly for="markdown">
{newLine(2)}## License

MIT License
	</DocOnly>
</DocPage>
