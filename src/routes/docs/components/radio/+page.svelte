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
		Props
	} from '$docs/components';

	const basicCode = `<script lang="ts">
  let selected = $state('option1');
<\/script>

<RadioGroup bind:value={selected}>
  <Radio value="option1">Option 1<\/Radio>
  <Radio value="option2">Option 2<\/Radio>
  <Radio value="option3">Option 3<\/Radio>
<\/RadioGroup>`;

	let selected = $state('option1');
	let size = $state('medium');
</script>

<svelte:head>
	<title>Radio - Svelte Atoms</title>
	<meta name="description" content="Radio button for single selection from multiple options." />
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
	<Breadcrumb items={[{ label: 'Components', href: '/docs/components' }, { label: 'Radio' }]} />

	<PageHeader
		title="Radio"
		description="Radio buttons allow users to select a single option from a set of choices."
		status="stable"
	/>

	<Section title="Installation">
		<Installation
			packageName="@svelte-atoms/core"
			importCode="import &#123; Radio &#125; from '@svelte-atoms/core/radio';"
		/>
	</Section>

	<Section title="Preset Configuration" description="Customize the radio appearance using presets">
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for Radio components by defining presets in your
				configuration:
			</p>
			<div class="bg-muted rounded-lg p-4">
				<pre class="overflow-x-auto text-sm"><code
						>{`import { createPreset } from '@svelte-atoms/core';

const preset = createPreset({
  radio: () => ({
    class: 'h-4 w-4 rounded-full border border-primary text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
  })
});`}</code
					></pre>
			</div>
		</div>
	</Section>

	<Section title="Examples" description="Explore different radio variations">
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
	</Section>

	<Section title="API Reference">
		<div class="space-y-6">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">RadioGroup Props</h3>
				<Props
					data={[
						{
							name: 'value',
							type: 'string',
							default: "''",
							description: 'Selected value'
						},
						{
							name: 'name',
							type: 'string',
							default: '-',
							description: 'Group name'
						},
						{
							name: 'disabled',
							type: 'boolean',
							default: 'false',
							description: 'Disable all radios'
						},
						{
							name: 'class',
							type: 'string',
							default: "''",
							description: 'Additional CSS classes'
						}
					]}
				/>
			</div>
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Radio Props</h3>
				<Props
					data={[
						{
							name: 'value',
							type: 'string',
							default: "''",
							description: 'Radio value'
						},
						{
							name: 'id',
							type: 'string',
							default: '-',
							description: 'Radio ID for label association'
						},
						{
							name: 'disabled',
							type: 'boolean',
							default: 'false',
							description: 'Disable radio'
						},
						{
							name: 'class',
							type: 'string',
							default: "''",
							description: 'Additional CSS classes'
						}
					]}
				/>
			</div>
		</div>
	</Section>

	<Section title="Accessibility">
		<AccessibilityInfo
			features={[
				'Use proper grouping with fieldset/legend',
				'Associate labels with radio buttons',
				'Keyboard navigation (Arrow keys)',
				'Clear visual focus indicators',
				'Screen reader friendly'
			]}
		/>
	</Section>

	<PageNavigation
		prev={{ label: 'Popover', href: '/docs/components/popover' }}
		next={{ label: 'Scrollable', href: '/docs/components/scrollable' }}
	/>
</div>
