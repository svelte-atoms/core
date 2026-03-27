<script lang="ts">
	import { HtmlAtom } from '$lib/components/atom';
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
	import { htmlAtomProps } from './props';
	import { metadata } from './shared';
	import type { DocMode } from '$docs/context/doc-mode.svelte';
	import type { Frontmatter } from '$docs/md/frontmatter';
	import { newLine } from '$docs/md/template';

	let { contentType = 'html' }: { contentType?: DocMode } = $props();

	const frontmatter: Frontmatter = {
		id: 'atom',
		title: 'Atom',
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
	prev={{ label: 'Back to Components', href: '/docs/components' }}
	next={{ label: 'Avatar', href: '/docs/components/avatar' }}
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

	<DocSection title="Examples" subtitle="Explore atom capabilities and composition patterns">
		<DocExample
			title="Basic Usage"
			description="Render any HTML element with the as prop"
			code={metadata.examples.basic}
		>
			<div class="flex flex-col gap-4">
				<HtmlAtom class="rounded-lg border p-4">Default div element</HtmlAtom>
				<HtmlAtom as="button" class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
					Click me
				</HtmlAtom>
			</div>
		</DocExample>

		<DocExample
			title="Variants System"
			description="Define reusable style combinations with type-safe props"
			code={metadata.examples.variants}
		>
			<div class="flex flex-wrap gap-3">
				<HtmlAtom as="button" class="rounded bg-blue-500 px-2 py-1 text-sm text-white">Small Primary</HtmlAtom>
				<HtmlAtom as="button" class="rounded bg-blue-500 px-4 py-2 text-white">Medium Primary</HtmlAtom>
				<HtmlAtom as="button" class="rounded bg-gray-500 px-4 py-2 text-white">Secondary</HtmlAtom>
			</div>
		</DocExample>
	</DocSection>

	<DocSection title="Component Composition">
		<DocCode code={metadata.examples.composition} lang="svelte" />
	</DocSection>

	<DocSection title="Animation & Transitions">
		<DocCode code={metadata.examples.animation} lang="svelte" />
	</DocSection>

	<DocSection title="Building Custom Components">
		<DocCode code={metadata.examples.customComponent} lang="svelte" />
	</DocSection>

	<DocSection title="API Reference">
		<DocOnly for="markdown">
{newLine(2)}### HtmlAtom Props

**Preset Key:** `atom`

</DocOnly>
				<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">HtmlAtom Props

**Preset Key:** `atom`</h3></DocOnly>
		<DocProps data={htmlAtomProps} />
	</DocSection>

	<DocSection title="Accessibility">
		<DocAccessibility features={metadata.accessibility} />
	</DocSection>

	<DocOnly for="markdown">
{newLine(2)}## License

MIT License
	</DocOnly>
</DocPage>
