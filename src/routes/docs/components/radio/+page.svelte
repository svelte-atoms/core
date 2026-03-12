<script lang="ts">
	import { Radio, RadioGroup } from '$lib/components/radio';
	import { Label } from '$lib/components/label';
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
	import { radioProps, radioGroupProps } from './props';
	import { metadata } from './shared';

	const { basic: basicCode } = metadata.examples;

	let selected = $state('option1');
	let size = $state('medium');
</script>

<svelte:head>
	<title>{metadata.title}</title>
	<meta name="description" content={metadata.description} />
</svelte:head>

<div class="py-8">
	<Breadcrumb items={metadata.breadcrumbs} />

	<PageHeader
		title={metadata.componentTitle}
		description={metadata.componentDescription}
		status={metadata.status}
	/>

	<Section.Root>
		<Section.Header>
			<Section.Title>Installation</Section.Title>
		</Section.Header>
		<Installation
			packageName={metadata.packageName}
			importCode={metadata.importCode}
		/>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Preset Configuration</Section.Title>
			<Section.Subtitle>Customize the radio appearance using presets</Section.Subtitle>
		</Section.Header>
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for Radio components by defining presets in your
				configuration:
			</p>
			<CodeBlock
				lang="typescript"
				code={`import { setPreset } from '@svelte-atoms/core';

const preset = setPreset({
  radio: () => ({
    class: 'h-4 w-4 rounded-full border border-primary text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
  })
});`}
			/>
		</div>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Examples</Section.Title>
			<Section.Subtitle>Explore different radio variations</Section.Subtitle>
		</Section.Header>
		<div class="space-y-8">
			<DemoExample
				title="Basic Radio Group"
				description="Simple radio button group"
				code={basicCode}
			>
				<RadioGroup bind:value={selected} class="space-y-3">
					<div class="flex items-center gap-2">
						<Radio value="option1" id="r1" />
						<Label for="r1">Option 1</Label>
					</div>
					<div class="flex items-center gap-2">
						<Radio value="option2" id="r2" />
						<Label for="r2">Option 2</Label>
					</div>
					<div class="flex items-center gap-2">
						<Radio value="option3" id="r3" />
						<Label for="r3">Option 3</Label>
					</div>
				</RadioGroup>
				<p class="text-muted-foreground mt-4 text-sm">Selected: {selected}</p>
			</DemoExample>

			<DemoExample
				title="Radio with Labels"
				description="Radio buttons with descriptive labels"
				code={`<RadioGroup bind:value={size}>
  <Radio value="small" id="s1" />
  <Label for="s1">Small<\/Label>
<\/RadioGroup>`}
			>
				<RadioGroup bind:value={size} class="space-y-3">
					<div class="flex items-center gap-2">
						<Radio value="small" id="s1" />
						<Label for="s1" class="cursor-pointer">Small</Label>
					</div>
					<div class="flex items-center gap-2">
						<Radio value="medium" id="s2" />
						<Label for="s2" class="cursor-pointer">Medium</Label>
					</div>
					<div class="flex items-center gap-2">
						<Radio value="large" id="s3" />
						<Label for="s3" class="cursor-pointer">Large</Label>
					</div>
				</RadioGroup>
				<p class="text-muted-foreground mt-4 text-sm">Selected size: {size}</p>
			</DemoExample>
		</div>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>API Reference</Section.Title>
		</Section.Header>
		<div class="space-y-6">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">RadioGroup Props</h3>
				<Props data={[...radioGroupProps]} />
			</div>
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Radio Props</h3>
				<Props data={[...radioProps]} />
			</div>
		</div>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Accessibility</Section.Title>
		</Section.Header>
		<AccessibilityInfo
			features={metadata.accessibility}
		/>
	</Section.Root>

	<PageNavigation
		prev={{ label: 'Popover', href: '/docs/components/popover' }}
		next={{ label: 'Scrollable', href: '/docs/components/scrollable' }}
	/>
</div>
