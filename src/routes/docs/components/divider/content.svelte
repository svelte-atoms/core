<script lang="ts">
	import { Divider } from '$lib/components/divider';
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
	import { dividerProps } from './props';
	import { metadata } from './shared';
	import type { DocMode } from '$docs/context/doc-mode.svelte';
	import type { Frontmatter } from '$docs/md/frontmatter';
	import { newLine } from '$docs/md/template';

	let { contentType = 'html' }: { contentType?: DocMode } = $props();

	const frontmatter: Frontmatter = {
		id: 'divider',
		title: 'Divider',
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
	prev={{ label: 'Dialog', href: '/docs/components/dialog' }}
	next={{ label: 'Drawer', href: '/docs/components/drawer' }}
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

	<DocSection title="Preset Configuration" subtitle="Customize the divider appearance using presets">
		<DocCode code={metadata.examples.preset} lang="typescript" />
	</DocSection>

	<DocSection title="Examples" subtitle="Explore different divider variations">
		<DocExample title="Horizontal Divider" description="Default horizontal separator" code={metadata.examples.basic}>
			<div class="w-80 space-y-4">
				<p>Content above</p>
				<Divider />
				<p>Content below</p>
			</div>
		</DocExample>

		<DocExample title="Vertical Divider" description="Vertical separator for inline content" code={metadata.examples.orientation}>
			<div class="flex h-8 items-center gap-2">
				<span>Home</span>
				<Divider vertical />
				<span>About</span>
				<Divider vertical />
				<span>Contact</span>
			</div>
		</DocExample>

		<DocExample title="Labeled Divider" description="Divider with center label" code={metadata.examples.label}>
			<div class="w-80">
				<Divider>
					<span class="px-2 text-sm">OR</span>
				</Divider>
			</div>
		</DocExample>
	</DocSection>

	<DocSection title="API Reference">
		<DocOnly for="markdown">
{newLine(2)}### Divider Props

**Preset Key:** `divider`

</DocOnly>
				<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Divider Props

**Preset Key:** `divider`</h3></DocOnly>
		<DocProps data={dividerProps} />
	</DocSection>

	<DocSection title="Accessibility">
		<DocAccessibility features={metadata.accessibility} />
	</DocSection>

	<DocOnly for="markdown">
{newLine(2)}## License

MIT License
	</DocOnly>
</DocPage>
