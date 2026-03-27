<script lang="ts">
	import { Toaster, toast } from '$lib/components/toast';
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
	import { toastRootProps, toastTitleProps, toastDescriptionProps } from './props';
	import { metadata } from './shared';
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

	<DocSection title="Setup" subtitle="Add the Toaster component to your layout">
		<DocCode code={`<!-- In your +layout.svelte -->
<script>
  import { Toaster } from '@svelte-atoms/core';
<\/script>
<Toaster />`} lang="svelte" />
	</DocSection>

	<DocSection title="Preset Configuration" subtitle="Customize the toast appearance using presets">
		<DocCode code={metadata.examples.preset} lang="typescript" />
	</DocSection>

	<DocSection title="Examples" subtitle="Trigger different toast notifications">
		<DocExample title="Toast Variants" description="Different toast types for various contexts" code={metadata.examples.basic}>
			<div class="flex flex-wrap gap-3">
				<Button onclick={() => toast.default('This is a default toast message')}>Default</Button>
				<Button onclick={() => toast.success('Operation completed successfully!')}>Success</Button>
				<Button onclick={() => toast.error('Something went wrong.')}>Error</Button>
				<Button onclick={() => toast.warning('Proceed with caution.')}>Warning</Button>
				<Button onclick={() => toast.info('Here is some information.')}>Info</Button>
			</div>
		</DocExample>

		<DocExample title="Toast with Description" description="Toast with title and description" code={metadata.examples.description}>
			<Button onclick={() => toast.success('File saved', { description: 'Your document has been saved successfully.' })}>
				Toast with Description
			</Button>
		</DocExample>

		<DocExample title="Toast with Action" description="Toast containing an action button" code={metadata.examples.action}>
			<Button onclick={() => toast.default('Item deleted', {
				description: 'The item was removed.',
				action: { label: 'Undo', onClick: () => {} }
			})}>
				Toast with Action
			</Button>
		</DocExample>
	</DocSection>

	<DocSection title="API Reference">
		<DocOnly for="markdown">
{newLine(2)}### Toast.Root

**Preset Key:** `toast`

</DocOnly>
				<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Toast.Root

**Preset Key:** `toast`</h3></DocOnly>
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
	</DocSection>

	<DocSection title="Accessibility">
		<DocAccessibility features={metadata.accessibility} />
	</DocSection>

	<DocOnly for="markdown">
{newLine(2)}## License

MIT License
	</DocOnly>
</DocPage>
