<script lang="ts">
	import { Badge } from '$lib/components/badge';
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
	import { badgeProps } from './props';
	import { metadata } from './shared';
	import type { DocMode } from '$docs/context/doc-mode.svelte';
	import type { Frontmatter } from '$docs/md/frontmatter';
	import { newLine } from '$docs/md/template';

	let { contentType = 'html' }: { contentType?: DocMode } = $props();

	const frontmatter: Frontmatter = {
		id: 'badge',
		title: 'Badge',
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
	prev={{ label: 'Avatar', href: '/docs/components/avatar' }}
	next={{ label: 'Breadcrumb', href: '/docs/components/breadcrumb' }}
	{frontmatter}
>
	<DocOnly for="markdown">
		**Type**: Simple Component

		## Use Cases

		{#each metadata.useCases as uc, i (i)}
		- **{uc.title}**: {uc.description}
		{/each}
	</DocOnly>

	<DocSection title="Installation">
		<DocInstallation packageName={metadata.packageName} importCode={metadata.importCode} />
	</DocSection>

	<DocSection title="Preset Configuration" subtitle="Customize the badge appearance using presets">
		<DocCode code={metadata.examples.preset} lang="typescript" />
	</DocSection>

	<DocSection title="Examples" subtitle="Explore different badge variations and use cases">
		<DocExample title="Basic Badge" description="Simple badge component" code={metadata.examples.basic}>
			<Badge>Default</Badge>
		</DocExample>

		<DocExample title="Badge Variants" description="Different styles for various contexts" code={metadata.examples.variants}>
			<div class="flex flex-wrap items-center gap-2">
				<Badge variant="default">Default</Badge>
				<Badge variant="primary">Primary</Badge>
				<Badge variant="success">Success</Badge>
				<Badge variant="warning">Warning</Badge>
				<Badge variant="error">Error</Badge>
			</div>
		</DocExample>

		<DocExample title="Badge Sizes" description="Different sizes for various use cases" code={metadata.examples.sizes}>
			<div class="flex items-center gap-2">
				<Badge size="sm">Small</Badge>
				<Badge size="md">Medium</Badge>
				<Badge size="lg">Large</Badge>
			</div>
		</DocExample>
	</DocSection>

	<DocSection title="API Reference">
		<DocOnly for="markdown">
{newLine(2)}### Badge Props

**Preset Key:** `badge`

</DocOnly>
				<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Badge Props

**Preset Key:** `badge`</h3></DocOnly>
		<DocProps data={badgeProps} />
	</DocSection>

	<DocSection title="Accessibility">
		<DocAccessibility features={metadata.accessibility} />
	</DocSection>

	<DocOnly for="markdown">
{newLine(2)}## License

MIT License
	</DocOnly>
</DocPage>
