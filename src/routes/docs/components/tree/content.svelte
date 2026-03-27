<script lang="ts">
	import { Tree } from '$lib/components/tree';
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
	import { treeRootProps, treeHeaderProps, treeBodyProps } from './props';
	import { metadata } from './shared';
	import type { DocMode } from '$docs/context/doc-mode.svelte';
	import type { Frontmatter } from '$docs/md/frontmatter';
	import { newLine } from '$docs/md/template';

	let { contentType = 'html' }: { contentType?: DocMode } = $props();

	const frontmatter: Frontmatter = {
		id: 'tree',
		title: 'Tree',
		category: 'components',
		depth: 'intermediate',
		prerequisites: [],
		related: []
	};

	let srcOpen = $state(true);
	let libOpen = $state(false);
	let rootOpen = $state(true);
</script>

<DocPage
	{contentType}
	title={metadata.componentTitle}
	description={metadata.componentDescription}
	status={metadata.status}
	llms={true}
	breadcrumbs={metadata.breadcrumbs}
	prev={{ label: 'Tooltip', href: '/docs/components/tooltip' }}
	next={{ label: 'Back to Components', href: '/docs/components' }}
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

	<DocSection title="Preset Configuration" subtitle="Customize the tree appearance using presets">
		<DocCode code={metadata.examples.preset} lang="typescript" />
	</DocSection>

	<DocSection title="Examples" subtitle="Explore different tree variations">
		<DocExample title="File Tree" description="Nested Tree.Root components — each node is a Tree.Root with Header + Body." code={metadata.examples.basic}>
			<div class="bg-muted rounded-lg p-4 text-sm">
				<Tree.Root bind:open={rootOpen}>
					<Tree.Header class="px-2 py-1">📁 project</Tree.Header>
					<Tree.Body class="ml-4 border-l pl-2">
						<Tree.Root bind:open={srcOpen}>
							<Tree.Header class="px-2 py-1">📁 src</Tree.Header>
							<Tree.Body class="ml-4 border-l pl-2">
								<Tree.Root bind:open={libOpen}>
									<Tree.Header class="px-2 py-1">📁 lib</Tree.Header>
									<Tree.Body class="ml-4 border-l pl-2">
										<div class="px-2 py-1">📄 index.ts</div>
									</Tree.Body>
								</Tree.Root>
								<div class="px-2 py-1">📄 +page.svelte</div>
							</Tree.Body>
						</Tree.Root>
						<div class="px-2 py-1">📄 package.json</div>
					</Tree.Body>
				</Tree.Root>
			</div>
		</DocExample>
	</DocSection>

	<DocSection title="API Reference">
		<DocOnly for="markdown">
{newLine(2)}### Tree.Root

**Preset Key:** `tree`

</DocOnly>
				<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Tree.Root

**Preset Key:** `tree`</h3></DocOnly>
		<DocProps data={treeRootProps} />

		<DocOnly for="markdown">
{newLine(2)}### Tree.Header

**Preset Key:** `tree.header`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Tree.Header</h3></DocOnly>
		<DocProps data={treeHeaderProps} />

		<DocOnly for="markdown">
{newLine(2)}### Tree.Body

**Preset Key:** `tree.body`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Tree.Body</h3></DocOnly>
		<DocProps data={treeBodyProps} />
	</DocSection>

	<DocSection title="Accessibility">
		<DocAccessibility features={metadata.accessibility} />
	</DocSection>

	<DocOnly for="markdown">
{newLine(2)}## License

MIT License
	</DocOnly>
</DocPage>
