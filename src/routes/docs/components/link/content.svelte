<script lang="ts">
	import { Link } from '$lib/components/link';
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
	import { linkProps } from './props';
	import { metadata } from './shared';
	import type { DocMode } from '$docs/context/doc-mode.svelte';
	import type { Frontmatter } from '$docs/md/frontmatter';
	import { newLine } from '$docs/md/template';

	let { contentType = 'html' }: { contentType?: DocMode } = $props();

	const frontmatter: Frontmatter = {
		id: 'link',
		title: 'Link',
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
	prev={{ label: 'Label', href: '/docs/components/label' }}
	next={{ label: 'List', href: '/docs/components/list' }}
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

	<DocSection title="Preset Configuration" subtitle="Customize the link appearance using presets">
		<DocCode code={metadata.examples.preset} lang="typescript" />
	</DocSection>

	<DocSection title="Examples" subtitle="Explore different link styles">
		<DocExample title="Basic Link" description="Standard navigation link" code={metadata.examples.basic}>
			<Link href="#">Visit our homepage</Link>
		</DocExample>

		<DocExample title="Link Variants" description="Different link visual styles" code={metadata.examples.variants}>
			<div class="flex flex-wrap gap-4">
				<Link href="#">Default Link</Link>
				<Link href="#" variant="muted">Muted Link</Link>
				<Link href="#" variant="destructive">Destructive Link</Link>
			</div>
		</DocExample>

		<DocExample title="External Link" description="Link to an external resource" code={metadata.examples.external}>
			<Link href="https://svelte.dev" target="_blank" rel="noopener noreferrer">
				Svelte Documentation ↗
			</Link>
		</DocExample>
	</DocSection>

	<DocSection title="API Reference">
		<DocOnly for="markdown">
{newLine(2)}### Link Props

**Preset Key:** `link`

</DocOnly>
				<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Link Props

**Preset Key:** `link`</h3></DocOnly>
		<DocProps data={linkProps} />
	</DocSection>

	<DocSection title="Accessibility">
		<DocAccessibility features={metadata.accessibility} />
	</DocSection>

	<DocOnly for="markdown">
{newLine(2)}## License

MIT License
	</DocOnly>
</DocPage>
