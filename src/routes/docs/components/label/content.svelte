<script lang="ts">
	import { Label } from '$lib/components/label';
	import { Input } from '$lib/components/input';
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
	import { labelProps } from './props';
	import { metadata } from './shared';
	import type { DocMode } from '$docs/context/doc-mode.svelte';
	import type { Frontmatter } from '$docs/md/frontmatter';
	import { newLine } from '$docs/md/template';

	let { contentType = 'html' }: { contentType?: DocMode } = $props();

	const frontmatter: Frontmatter = {
		id: 'label',
		title: 'Label',
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
	prev={{ label: 'Input', href: '/docs/components/input' }}
	next={{ label: 'Link', href: '/docs/components/link' }}
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

	<DocSection title="Preset Configuration" subtitle="Customize the label appearance using presets">
		<DocCode code={metadata.examples.preset} lang="typescript" />
	</DocSection>

	<DocSection title="Examples" subtitle="Explore label usage patterns">
		<DocExample title="Basic Label" description="Label associated with a form control" code={metadata.examples.basic}>
			<div class="space-y-2">
				<Label for="email-input">Email Address</Label>
				<Input.Root>
					<Input.Control id="email-input" type="email" placeholder="Enter email..." />
				</Input.Root>
			</div>
		</DocExample>

		<DocExample title="Required Label" description="Label with required indicator" code={metadata.examples.required}>
			<div class="space-y-2">
				<Label for="required-input" required>Name <span class="text-red-500">*</span></Label>
				<Input.Root>
					<Input.Control id="required-input" type="text" placeholder="Required field" required />
				</Input.Root>
			</div>
		</DocExample>

		<DocExample title="Disabled Label" description="Label for a disabled control" code={metadata.examples.disabled}>
			<div class="space-y-2">
				<Label for="disabled-input" class="text-muted-foreground">Disabled Field</Label>
				<Input.Root>
					<Input.Control id="disabled-input" type="text" placeholder="Disabled" disabled />
				</Input.Root>
			</div>
		</DocExample>
	</DocSection>

	<DocSection title="API Reference">
		<DocOnly for="markdown">
{newLine(2)}### Label Props

**Preset Key:** `label`

</DocOnly>
				<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Label Props

**Preset Key:** `label`</h3></DocOnly>
		<DocProps data={labelProps} />
	</DocSection>

	<DocSection title="Accessibility">
		<DocAccessibility features={metadata.accessibility} />
	</DocSection>

	<DocOnly for="markdown">
{newLine(2)}## License

MIT License
	</DocOnly>
</DocPage>
