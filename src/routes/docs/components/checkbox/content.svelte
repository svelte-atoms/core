<script lang="ts">
	import { Checkbox } from '$lib/components/checkbox';
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
	import { checkboxProps } from './props';
	import { metadata } from './shared';
	import type { DocMode } from '$docs/context/doc-mode.svelte';
	import type { Frontmatter } from '$docs/md/frontmatter';
	import { newLine } from '$docs/md/template';

	let { contentType = 'html' }: { contentType?: DocMode } = $props();

	const frontmatter: Frontmatter = {
		id: 'checkbox',
		title: 'Checkbox',
		category: 'components',
		depth: 'beginner',
		prerequisites: [],
		related: []
	};

	let checked = $state(false);
	let indeterminate = $state(true);
	let group = $state<string[]>([]);
</script>

<DocPage
	{contentType}
	title={metadata.componentTitle}
	description={metadata.componentDescription}
	status={metadata.status}
	llms={true}
	breadcrumbs={metadata.breadcrumbs}
	prev={{ label: 'Card', href: '/docs/components/card' }}
	next={{ label: 'Collapsible', href: '/docs/components/collapsible' }}
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

	<DocSection title="Preset Configuration" subtitle="Customize the checkbox appearance using presets">
		<DocCode code={metadata.examples.preset} lang="typescript" />
	</DocSection>

	<DocSection title="Examples" subtitle="Explore different checkbox variations and use cases">
		<DocExample title="Basic Checkbox" description="Simple checkbox with label" code={metadata.examples.basic}>
			<div class="flex items-center gap-2">
				<Checkbox id="basic-demo" bind:checked />
				<label for="basic-demo">Accept terms and conditions</label>
			</div>
		</DocExample>

		<DocExample title="Checkbox Group" description="Multiple checkboxes for multi-select" code={metadata.examples.group}>
			<div class="space-y-3">
				<div class="flex items-center gap-2">
					<Checkbox id="opt1" value="newsletter" bind:group />
					<label for="opt1">Newsletter updates</label>
				</div>
				<div class="flex items-center gap-2">
					<Checkbox id="opt2" value="marketing" bind:group />
					<label for="opt2">Marketing emails</label>
				</div>
				<div class="flex items-center gap-2">
					<Checkbox id="opt3" value="products" bind:group />
					<label for="opt3">Product announcements</label>
				</div>
				<p class="text-muted-foreground text-sm">Selected: {group.join(', ') || 'none'}</p>
			</div>
		</DocExample>

		<DocExample title="Indeterminate State" description="Checkbox with indeterminate state for partial selection" code={metadata.examples.indeterminate}>
			<div class="flex items-center gap-2">
				<Checkbox bind:checked bind:indeterminate />
				<span>Partially selected</span>
			</div>
		</DocExample>

		<DocExample title="Disabled Checkbox" description="Checkbox in disabled state" code={metadata.examples.disabled}>
			<div class="flex items-center gap-2">
				<Checkbox id="disabled-demo" disabled />
				<label for="disabled-demo" class="text-muted-foreground">Disabled checkbox</label>
			</div>
		</DocExample>
	</DocSection>

	<DocSection title="API Reference">
		<DocOnly for="markdown">
{newLine(2)}### Checkbox Props

**Preset Key:** `checkbox`

</DocOnly>
				<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Checkbox Props

**Preset Key:** `checkbox`</h3></DocOnly>
		<DocProps data={checkboxProps} />
	</DocSection>

	<DocSection title="Accessibility">
		<DocAccessibility features={metadata.accessibility} />
	</DocSection>

	<DocOnly for="markdown">
{newLine(2)}## License

MIT License
	</DocOnly>
</DocPage>
