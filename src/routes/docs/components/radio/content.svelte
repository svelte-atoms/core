<script lang="ts">
	import { Radio, RadioGroup } from '$lib/components/radio';
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
	import { radioProps, radioGroupProps } from './props';
	import { metadata } from './shared';
	import type { DocMode } from '$docs/context/doc-mode.svelte';
	import type { Frontmatter } from '$docs/md/frontmatter';
	import { newLine } from '$docs/md/template';

	let { contentType = 'html' }: { contentType?: DocMode } = $props();

	const frontmatter: Frontmatter = {
		id: 'radio',
		title: 'Radio',
		category: 'components',
		depth: 'beginner',
		prerequisites: [],
		related: []
	};

	let singleValue = $state<string>('');
	let groupValue = $state<string>('option1');
</script>

<DocPage
	{contentType}
	title={metadata.componentTitle}
	description={metadata.componentDescription}
	status={metadata.status}
	llms={true}
	breadcrumbs={metadata.breadcrumbs}
	prev={{ label: 'Popover', href: '/docs/components/popover' }}
	next={{ label: 'Scrollable', href: '/docs/components/scrollable' }}
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

	<DocSection title="Preset Configuration" subtitle="Customize the radio appearance using presets">
		<DocCode code={metadata.examples.preset} lang="typescript" />
	</DocSection>

	<DocSection title="Examples" subtitle="Explore different radio variations">
		<DocExample title="Basic Radio" description="Single radio button" code={metadata.examples.basic}>
			<div class="flex items-center gap-2">
				<Radio id="basic-radio" name="basic" value="yes" bind:group={singleValue} />
				<label for="basic-radio">Yes</label>
			</div>
		</DocExample>

		<DocExample title="Radio Group" description="Multiple radio buttons for single selection" code={metadata.examples.group}>
			<div class="space-y-3">
				<div class="flex items-center gap-2">
					<Radio id="opt1" name="plan" value="option1" bind:group={groupValue} />
					<label for="opt1">Option 1</label>
				</div>
				<div class="flex items-center gap-2">
					<Radio id="opt2" name="plan" value="option2" bind:group={groupValue} />
					<label for="opt2">Option 2</label>
				</div>
				<div class="flex items-center gap-2">
					<Radio id="opt3" name="plan" value="option3" bind:group={groupValue} />
					<label for="opt3">Option 3</label>
				</div>
				<p class="text-muted-foreground text-sm">Selected: {groupValue}</p>
			</div>
		</DocExample>

		<DocExample title="Disabled Radio" description="Radio button in disabled state" code={metadata.examples.disabled}>
			<div class="flex items-center gap-2">
				<Radio id="disabled-radio" name="disabled" value="yes" disabled />
				<label for="disabled-radio" class="text-muted-foreground">Disabled</label>
			</div>
		</DocExample>
	</DocSection>

	<DocSection title="API Reference">
		<DocOnly for="markdown">
{newLine(2)}### Radio Props

**Preset Key:** `radio`

</DocOnly>
				<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">Radio Props

**Preset Key:** `radio`</h3></DocOnly>
		<DocProps data={radioProps} />
	</DocSection>

	<DocSection title="Accessibility">
		<DocAccessibility features={metadata.accessibility} />
	</DocSection>

	<DocOnly for="markdown">
{newLine(2)}## License

MIT License
	</DocOnly>
</DocPage>
