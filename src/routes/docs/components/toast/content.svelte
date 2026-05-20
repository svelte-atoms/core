<script lang="ts">
	import {
		DocPage,
		DocSection,
		DocProps,
		DocOnly,
		DocInstallation,
		DocAccessibility,
		DocCode,
	} from '$docs/components';
	import { toastRootProps, toastTitleProps, toastDescriptionProps, toastCloseProps } from './props';
	import { metadata } from './shared';
	import Examples from './examples.svelte';
	import type { DocMode } from '$docs/context/doc-mode.svelte';
	import type { Frontmatter } from '$docs/md/frontmatter';
	import { newLine } from '$docs/md/template';

	let { contentType = 'html' }: { contentType?: DocMode } = $props();

	const frontmatter: Frontmatter = {
		id: 'toast',
		title: 'Toast',
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
	prev={{ label: 'Textarea', href: '/docs/components/textarea' }}
	next={{ label: 'Tooltip', href: '/docs/components/tooltip' }}
	{frontmatter}
>
	<DocOnly for="markdown">
		**Type**: Utility + Compound Component

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

	<DocSection title="Preset Configuration" subtitle="Customize toast appearance using preset keys">
		<DocCode code={metadata.examples.preset} lang="typescript" />
	</DocSection>

	<DocSection title="Examples" subtitle="Imperative and declarative usage patterns">
		<Examples
			{contentType}
			basicCode={metadata.examples.basic}
			declarativeCode={metadata.examples.declarative}
			autoDismissCode={metadata.examples.autoDismiss}
		/>
	</DocSection>

	<DocSection title="API Reference">
		<DocOnly for="markdown">
{newLine(2)}### Toast.Root

**Preset Key:** `toast`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Toast.Root</h3></DocOnly>
		<DocProps data={toastRootProps} />

		<DocOnly for="markdown">
{newLine(2)}### Toast.Title

**Preset Key:** `toast.title`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Toast.Title</h3></DocOnly>
		<DocProps data={toastTitleProps} />

		<DocOnly for="markdown">
{newLine(2)}### Toast.Description

**Preset Key:** `toast.description`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Toast.Description</h3></DocOnly>
		<DocProps data={toastDescriptionProps} />

		<DocOnly for="markdown">
{newLine(2)}### Toast.Close

**Preset Key:** `toast.close`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Toast.Close</h3></DocOnly>
		<DocProps data={toastCloseProps} />
	</DocSection>

	<DocSection title="Accessibility">
		<DocAccessibility features={metadata.accessibility} />
	</DocSection>
</DocPage>
