<script lang="ts">
	import { ProgressLinear, ProgressCircular } from '$lib/components/progress';
	import {
		PageHeader,
		Breadcrumb,
		Section,
		Installation,
		AccessibilityInfo,
		PageNavigation,
		DemoExample,
		Props,
		CodeBlock
	} from '$docs/components';
	import { progressLinearProps, progressCircularProps } from './props';
	import { metadata } from './shared';

	const {
		linearBasic,
		linearIndeterminate,
		circularBasic,
		circularIndeterminate,
		compositionLabel
	} = metadata.examples;
</script>

<svelte:head>
	<title>Progress - Svelte Atoms</title>
	<meta
		name="description"
		content="Linear and circular progress indicators with determinate and indeterminate states."
	/>
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
	<Breadcrumb items={metadata.breadcrumbs} />

	<PageHeader
		title="Progress"
		description="Linear and circular progress indicators with determinate and indeterminate states."
		status="stable"
	/>

	<Section.Root>
		<Section.Header>
			<Section.Title>Installation</Section.Title>
		</Section.Header>
		<Installation
			packageName="@svelte-atoms/core"
			importCode="import &#123; ProgressLinear, ProgressCircular &#125; from '@svelte-atoms/core/progress';"
		/>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Linear Progress</Section.Title>
			<Section.Subtitle>Horizontal bar showing determinate or indeterminate progress</Section.Subtitle>
		</Section.Header>
		<div class="space-y-8">
			<DemoExample title="Basic" description="Determinate linear progress bar" code={linearBasic}>
				<div class="w-72">
					<ProgressLinear value={60} />
				</div>
			</DemoExample>

			<DemoExample
				title="Indeterminate"
				description="Animated bar for unknown completion time"
				code={linearIndeterminate}
			>
				<div class="w-72">
					<ProgressLinear value={null} />
				</div>
			</DemoExample>
		</div>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Circular Progress</Section.Title>
			<Section.Subtitle>Circular indicator for compact layouts</Section.Subtitle>
		</Section.Header>
		<div class="space-y-8">
			<DemoExample title="Basic" description="Determinate circular progress" code={circularBasic}>
				<div class="size-12">
					<ProgressCircular value={65} />
				</div>
			</DemoExample>

			<DemoExample
				title="Indeterminate"
				description="Spinning indicator for unknown duration"
				code={circularIndeterminate}
			>
				<div class="size-12">
					<ProgressCircular value={null} />
				</div>
			</DemoExample>
		</div>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Composition</Section.Title>
			<Section.Subtitle>Custom label via children snippet</Section.Subtitle>
		</Section.Header>
		<DemoExample
			title="Custom Label"
			description="Render a custom label after the progress bar using children"
			code={compositionLabel}
		>
			<div class="flex w-72 flex-col gap-1">
				<ProgressLinear value={80} />
				<span class="text-primary text-xs font-bold">80 / 100 MB</span>
			</div>
		</DemoExample>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Preset Configuration</Section.Title>
			<Section.Subtitle>Customise appearance using presets</Section.Subtitle>
		</Section.Header>
		<p class="text-muted-foreground mb-4 text-sm">
			Both components support fine-grained preset keys for the root, track, and fill layers.
		</p>
		<CodeBlock
			lang="typescript"
			code={`import { setPreset } from '@svelte-atoms/core';

setPreset({
  'progress.linear': () => ({ class: 'w-full' }),
  'progress.linear.track': () => ({ class: 'h-3 rounded-full bg-input p-0.5' }),
  'progress.linear.fill': () => ({
    class: 'h-full rounded-full bg-primary transition-[width] duration-300'
  }),
  'progress.circular': () => ({ class: 'size-12 text-primary' }),
  'progress.circular.track': () => ({ class: 'stroke-input' }),
  'progress.circular.fill': () => ({ class: 'stroke-primary' })
});`}
		/>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>API Reference</Section.Title>
		</Section.Header>
		<div class="space-y-6">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">ProgressLinear Props</h3>
				<Props data={progressLinearProps} />
			</div>
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">ProgressCircular Props</h3>
				<Props data={progressCircularProps} />
			</div>
		</div>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Accessibility</Section.Title>
		</Section.Header>
		<AccessibilityInfo features={metadata.accessibility} />
	</Section.Root>

	<PageNavigation
		prev={{ label: 'Popover', href: '/docs/components/popover' }}
		next={{ label: 'Radio', href: '/docs/components/radio' }}
	/>
</div>
