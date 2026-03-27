<script lang="ts">
	import { Textarea } from '$lib/components/textarea';
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
	import { textareaRootProps, textareaInputProps } from './props';
	import { metadata } from './shared';
	import type { DocMode } from '$docs/context/doc-mode.svelte';
	import type { Frontmatter } from '$docs/md/frontmatter';
	import { newLine } from '$docs/md/template';

	let { contentType = 'html' }: { contentType?: DocMode } = $props();

	const frontmatter: Frontmatter = {
		id: 'textarea',
		title: 'Textarea',
		category: 'components',
		depth: 'beginner',
		prerequisites: [],
		related: []
	};

	let value = $state('');
</script>

<DocPage
	{contentType}
	title={metadata.componentTitle}
	description={metadata.componentDescription}
	status={metadata.status}
	llms={true}
	breadcrumbs={metadata.breadcrumbs}
	prev={{ label: 'Tabs', href: '/docs/components/tabs' }}
	next={{ label: 'Toast', href: '/docs/components/toast' }}
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

	<DocSection title="Preset Configuration" subtitle="Customize the textarea appearance using presets">
		<DocCode code={metadata.examples.preset} lang="typescript" />
	</DocSection>

	<DocSection title="Examples" subtitle="Explore different textarea variations">
		<DocExample title="Basic Textarea" description="Multi-line text input" code={metadata.examples.basic}>
			<div class="w-80">
				<Textarea.Root>
					<Textarea.Input bind:value placeholder="Type your message here..." rows={4} />
				</Textarea.Root>
			</div>
		</DocExample>

		<DocExample title="Auto-resize Textarea" description="Textarea that grows with content" code={metadata.examples.autoResize}>
			<div class="w-80">
				<Textarea.Root>
					<Textarea.Input placeholder="This textarea auto-resizes..." autoResize />
				</Textarea.Root>
			</div>
		</DocExample>

		<DocExample title="Disabled Textarea" description="Textarea in disabled state" code={metadata.examples.disabled}>
			<div class="w-80">
				<Textarea.Root>
					<Textarea.Input placeholder="Disabled textarea" disabled />
				</Textarea.Root>
			</div>
		</DocExample>
	</DocSection>

	<DocSection title="API Reference">
		<DocOnly for="markdown">
{newLine(2)}### Textarea.Root

**Preset Key:** `textarea`

</DocOnly>
				<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Textarea.Root

**Preset Key:** `textarea`</h3></DocOnly>
		<DocProps data={textareaRootProps} />

		<DocOnly for="markdown">
{newLine(2)}### Textarea.Input

**Preset Key:** `textarea.input`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Textarea.Input</h3></DocOnly>
		<DocProps data={textareaInputProps} />
	</DocSection>

	<DocSection title="Accessibility">
		<DocAccessibility features={metadata.accessibility} />
	</DocSection>

	<DocOnly for="markdown">
{newLine(2)}## License

MIT License
	</DocOnly>
</DocPage>
