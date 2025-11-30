<script lang="ts">
	import Checkbox from '$lib/components/checkbox/checkbox.svelte';
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
  import { Checkbox } from '@svelte-atoms/core/checkbox';
<\/script>

<Checkbox id="basic" />
<label for="basic">Accept terms and conditions</label>`;

	const groupCode = `<div class="space-y-3">
  <div class="flex items-center space-x-2">
    <Checkbox id="option1" />
    <label for="option1">Newsletter updates</label>
  </div>
  <div class="flex items-center space-x-2">
    <Checkbox id="option2" />
    <label for="option2">Marketing emails</label>
  </div>
  <div class="flex items-center space-x-2">
    <Checkbox id="option3" />
    <label for="option3">Product announcements</label>
  </div>
</div>`;

	const disabledCode = `<Checkbox id="disabled" disabled />
<label for="disabled">Disabled checkbox</label>`;
</script>

<svelte:head>
	<title>Checkbox - Atomic SV</title>
	<meta name="description" content="Selection control for multiple choices." />
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
	<Breadcrumb items={[{ label: 'Components', href: '/components' }, { label: 'Checkbox' }]} />

	<PageHeader
		title="Checkbox"
		description="Selection control for multiple choices. Allows users to select one or more options from a set."
		status="stable"
	/>

	<Section title="Installation">
		<Installation
			packageName="@svelte-atoms/core"
			importCode="import &#123; Checkbox &#125; from '@svelte-atoms/core/checkbox';"
		/>
	</Section>

	<Section title="Preset Configuration" description="Customize the checkbox appearance using presets">
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for Checkbox components by defining presets in your configuration:
			</p>
			<div class="bg-muted rounded-lg p-4">
				<pre class="text-sm overflow-x-auto"><code>{`import { createPreset } from '@svelte-atoms/core';

const preset = createPreset({
  checkbox: () => ({
    class: 'h-4 w-4 rounded border border-primary text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
  })
});`}</code></pre>
			</div>
		</div>
	</Section>

	<Section title="Examples" description="Explore different checkbox variations and use cases">
		<div class="space-y-8">
			<DemoExample title="Basic Checkbox" description="Simple checkbox with label" code={basicCode}>
				<div class="flex items-center space-x-2">
					<Checkbox id="basic" />
					<label for="basic" class="text-foreground cursor-pointer text-sm">
						Accept terms and conditions
					</label>
				</div>
			</DemoExample>

			<DemoExample
				title="Checkbox Group"
				description="Multiple checkboxes for selecting multiple options"
				code={groupCode}
			>
				<div class="space-y-3">
					<div class="flex items-center space-x-2">
						<Checkbox id="option1" />
						<label for="option1" class="text-foreground cursor-pointer text-sm">
							Newsletter updates
						</label>
					</div>
					<div class="flex items-center space-x-2">
						<Checkbox id="option2" />
						<label for="option2" class="text-foreground cursor-pointer text-sm">
							Marketing emails
						</label>
					</div>
					<div class="flex items-center space-x-2">
						<Checkbox id="option3" />
						<label for="option3" class="text-foreground cursor-pointer text-sm">
							Product announcements
						</label>
					</div>
				</div>
			</DemoExample>

			<DemoExample
				title="Disabled State"
				description="Checkbox in disabled state"
				code={disabledCode}
			>
				<div class="flex items-center space-x-2">
					<Checkbox id="disabled" disabled />
					<label for="disabled" class="text-muted-foreground cursor-pointer text-sm">
						Disabled checkbox
					</label>
				</div>
			</DemoExample>
		</div>
	</Section>

	<Section title="API Reference">
		<Props
			data={[
				{
					name: 'id',
					type: 'string',
					default: '-',
					description: 'Unique identifier for the checkbox'
				},
				{
					name: 'checked',
					type: 'boolean',
					default: 'false',
					description: 'Whether the checkbox is checked'
				},
				{
					name: 'disabled',
					type: 'boolean',
					default: 'false',
					description: 'Whether the checkbox is disabled'
				},
				{
					name: 'class',
					type: 'string',
					default: "''",
					description: 'Additional CSS classes to apply'
				},
				{
					name: 'onchange',
					type: 'function',
					default: '-',
					description: 'Change event handler'
				}
			]}
		/>
	</Section>

	<Section title="Accessibility">
		<AccessibilityInfo
			features={[
				'Proper semantic input element with type="checkbox"',
				'Keyboard navigation support (Space key to toggle)',
				'Focus management with visible focus indicators',
				'Screen reader compatible with proper labels',
				'Disabled state handling with aria-disabled',
				'Associated label support for larger click targets'
			]}
		/>
	</Section>

	<PageNavigation
		prev={{ label: 'Previous: Button', href: '/components/button' }}
		next={{ label: 'Back to Components', href: '/components' }}
	/>
</div>
