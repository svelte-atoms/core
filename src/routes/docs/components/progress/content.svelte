<script lang="ts">
	import { ProgressLinear, ProgressCircular } from '$lib/components/progress';
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
	import { progressLinearProps, progressCircularProps } from './props';
	import { metadata } from './shared';
	import type { DocMode } from '$docs/context/doc-mode.svelte';
	import type { Frontmatter } from '$docs/md/frontmatter';
	import { newLine } from '$docs/md/template';

	let { contentType = 'html' }: { contentType?: DocMode } = $props();

	const frontmatter: Frontmatter = {
		id: 'progress',
		title: 'Progress',
		category: 'components',
		subcategory: 'feedback',
		depth: 'beginner',
		prerequisites: ['atoms', 'styling'],
		related: ['variants', 'preset']
	};
</script>

<DocPage
	{contentType}
	title={metadata.componentTitle}
	description={metadata.componentDescription}
	status={metadata.status}
	llms={true}
	breadcrumbs={metadata.breadcrumbs}
	prev={{ label: 'Popover', href: '/docs/components/popover' }}
	next={{ label: 'Radio', href: '/docs/components/radio' }}
	{frontmatter}
>
	<DocOnly for="markdown">
		**Type**: Simple Component

		## Use Cases

		{#each metadata.useCases as uc, i (i)}
		- **{uc.title}**: {uc.description}
		{/each}

		## Components

		- **ProgressLinear** – horizontal bar indicator. Preset key: `progress.linear`
		- **ProgressCircular** – circular / spinner indicator. Preset key: `progress.circular`
	</DocOnly>

	<DocSection title="Installation">
		<DocInstallation packageName={metadata.packageName} importCode={metadata.importCode} />
	</DocSection>

	<DocSection title="Linear Progress" subtitle="Horizontal bar showing determinate or indeterminate progress">
		<DocExample title="Basic" description="Determinate linear progress bar" code={metadata.examples.linearBasic}>
			<div class="w-72">
				<ProgressLinear value={60} />
			</div>
		</DocExample>

		<DocExample title="Indeterminate" description="Animated bar for unknown completion time" code={metadata.examples.linearIndeterminate}>
			<div class="w-72">
				<ProgressLinear value={null} />
			</div>
		</DocExample>
	</DocSection>

	<DocSection title="Circular Progress" subtitle="Circular indicator for compact layouts">
		<DocExample title="Basic" description="Determinate circular progress" code={metadata.examples.circularBasic}>
			<div class="size-12">
				<ProgressCircular value={65} />
			</div>
		</DocExample>

		<DocExample title="Indeterminate" description="Spinning indicator for unknown duration" code={metadata.examples.circularIndeterminate}>
			<div class="size-12">
				<ProgressCircular value={null} />
			</div>
		</DocExample>
	</DocSection>

	<DocSection title="Composition" subtitle="Custom label via children snippet">
		<DocExample
			title="Custom Label"
			description="Render a custom label after the progress bar using children"
			code={metadata.examples.compositionLabel}
		>
			<div class="flex w-72 flex-col gap-1">
				<ProgressLinear value={80} />
				<span class="text-primary text-xs font-bold">80 / 100 MB</span>
			</div>
		</DocExample>
	</DocSection>

	<DocSection title="Preset Configuration" subtitle="Customise appearance using presets">
		<DocCode code={metadata.examples.preset} lang="typescript" />
	</DocSection>

	<DocSection title="API Reference">
		<DocOnly for="markdown">
{newLine(2)}### ProgressLinear

**Preset Keys:** `progress.linear`, `progress.linear.track`, `progress.linear.fill`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">ProgressLinear Props</h3></DocOnly>
		<DocProps data={progressLinearProps} />

		<DocOnly for="markdown">
{newLine(2)}### ProgressCircular

**Preset Keys:** `progress.circular`, `progress.circular.track`, `progress.circular.fill`

</DocOnly>
		<DocOnly for="html"><h3 class="text-foreground mb-3 mt-6 text-lg font-semibold">ProgressCircular Props</h3></DocOnly>
		<DocProps data={progressCircularProps} />
	</DocSection>

	<DocSection title="Accessibility">
		<DocAccessibility features={metadata.accessibility} />
	</DocSection>

	<DocOnly for="markdown">
{newLine(2)}## License

MIT License
	</DocOnly>
</DocPage>
