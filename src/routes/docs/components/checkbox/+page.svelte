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
		Props,
		CodeBlock
	} from '$docs/components';
	import { checkboxProps } from './props';
	import { metadata } from './shared';

	const { basic: basicCode, group: groupCode, disabled: disabledCode } = metadata.examples;
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

	<Section.Root>
		<Section.Header>
			<Section.Title>Installation</Section.Title>
		</Section.Header>
		<Installation
			packageName="@svelte-atoms/core"
			importCode="import &#123; Checkbox &#125; from '@svelte-atoms/core/checkbox';"
		/>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Preset Configuration</Section.Title>
			<Section.Subtitle>Customize the checkbox appearance using presets</Section.Subtitle>
		</Section.Header>
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for Checkbox components by defining presets in your
				configuration:
			</p>
			<CodeBlock
				lang="typescript"
				code={`import { setPreset } from '@svelte-atoms/core';

const preset = setPreset({
  checkbox: () => ({
    class: 'h-4 w-4 rounded border border-primary text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
  })
});`}
			/>
		</div>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Examples</Section.Title>
			<Section.Subtitle>Explore different checkbox variations and use cases</Section.Subtitle>
		</Section.Header>
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
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>API Reference</Section.Title>
		</Section.Header>
		<Props data={checkboxProps} />
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Accessibility</Section.Title>
		</Section.Header>
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
	</Section.Root>

	<PageNavigation
		prev={{ label: 'Previous: Button', href: '/components/button' }}
		next={{ label: 'Back to Components', href: '/components' }}
	/>
</div>
