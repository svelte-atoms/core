<script lang="ts">
	import { Collapsible } from '$lib/components/collapsible';
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
	import { collapsibleRootProps, collapsibleHeaderProps, collapsibleBodyProps } from './props';
	import { metadata } from './shared';
	import type { DocMode } from '$docs/context/doc-mode.svelte';
	import type { Frontmatter } from '$docs/md/frontmatter';
	import { newLine } from '$docs/md/template';

	let { contentType = 'html' }: { contentType?: DocMode } = $props();

	const frontmatter: Frontmatter = {
		id: 'collapsible',
		title: 'Collapsible',
		category: 'components',
		depth: 'beginner',
		prerequisites: [],
		related: []
	};

	let open = $state(false);
	let controlled = $state(true);
</script>

<DocPage
	{contentType}
	title={metadata.componentTitle}
	description={metadata.componentDescription}
	status={metadata.status}
	llms={true}
	breadcrumbs={metadata.breadcrumbs}
	prev={{ label: 'Checkbox', href: '/docs/components/checkbox' }}
	next={{ label: 'Combobox', href: '/docs/components/combobox' }}
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

	<DocSection title="Preset Configuration" subtitle="Customize the collapsible appearance using presets">
		<DocCode code={metadata.examples.preset} lang="typescript" />
	</DocSection>

	<DocSection title="Examples" subtitle="Explore different collapsible variations and use cases">
		<DocExample title="Basic Collapsible" description="Simple collapsible section" code={metadata.examples.basic}>
			<div class="w-80">
				<Collapsible.Root bind:open>
					<Collapsible.Header>
						<span>Toggle Content</span>
					</Collapsible.Header>
					<Collapsible.Body>
						<p class="text-sm">This content can be shown or hidden by clicking the header.</p>
					</Collapsible.Body>
				</Collapsible.Root>
			</div>
		</DocExample>

		<DocExample title="Controlled Collapsible" description="Externally controlled open state" code={metadata.examples.controlled}>
			<div class="w-80 space-y-4">
				<Collapsible.Root bind:open={controlled}>
					<Collapsible.Header>
						<span>Controlled Collapsible</span>
						<span class="text-muted-foreground text-sm">{controlled ? 'Open' : 'Closed'}</span>
					</Collapsible.Header>
					<Collapsible.Body>
						<p class="text-sm">This collapsible is controlled by external state.</p>
					</Collapsible.Body>
				</Collapsible.Root>
				<Button onclick={() => (controlled = !controlled)} variant="outline" size="sm">
					Toggle from Outside
				</Button>
			</div>
		</DocExample>
	</DocSection>

	<DocSection title="API Reference">
		<DocOnly for="markdown">
{newLine(2)}### Collapsible.Root

**Preset Key:** `collapsible`

</DocOnly>
				<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Collapsible.Root

**Preset Key:** `collapsible`</h3></DocOnly>
		<DocProps data={collapsibleRootProps} />

		<DocOnly for="markdown">
{newLine(2)}### Collapsible.Header

**Preset Key:** `collapsible.header`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Collapsible.Header</h3></DocOnly>
		<DocProps data={collapsibleHeaderProps} />

		<DocOnly for="markdown">
{newLine(2)}### Collapsible.Body

**Preset Key:** `collapsible.body`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Collapsible.Body</h3></DocOnly>
		<DocProps data={collapsibleBodyProps} />
	</DocSection>

	<DocSection title="Accessibility">
		<DocAccessibility features={metadata.accessibility} />
	</DocSection>

	<DocOnly for="markdown">
{newLine(2)}## License

MIT License
	</DocOnly>
</DocPage>
