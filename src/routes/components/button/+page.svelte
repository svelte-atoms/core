<script lang="ts">
	import Button from '$lib/components/button/button.svelte';
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

	const buttonCode = `<script lang="ts">
  import { Button } from '@svelte-atoms/core/button';
<\/script>

<Button>Click me</Button>`;

	const variantsCode = `<Button class="bg-primary text-white hover:bg-primary/90">
  Primary Button
</Button>

<Button class="bg-secondary text-white hover:bg-secondary/90">
  Secondary Button
</Button>

<Button class="border border-border hover:bg-muted">
  Outline Button
</Button>`;

	const sizesCode = `<Button class="px-3 py-1.5 text-sm">Small</Button>
<Button class="px-4 py-2">Medium</Button>
<Button class="px-6 py-3 text-lg">Large</Button>`;

	const statesCode = `<Button disabled>Disabled Button</Button>`;
</script>

<svelte:head>
	<title>Button - Atomic SV</title>
	<meta name="description" content="Interactive button component for triggering actions." />
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
	<Breadcrumb items={[{ label: 'Components', href: '/components' }, { label: 'Button' }]} />

	<PageHeader
		title="Button"
		description="Interactive element for triggering actions. Supports various styles, sizes, and states."
		status="stable"
	/>

	<Section title="Installation">
		<Installation
			packageName="@svelte-atoms/core"
			importCode="import &#123; Button &#125; from '@svelte-atoms/core/button';"
		/>
	</Section>

	<Section title="Examples" description="Explore different button variations and use cases">
		<div class="space-y-8">
			<DemoExample
				title="Basic Button"
				description="Simple button with default styling"
				code={buttonCode}
			>
				<Button
					class="bg-primary hover:bg-primary/90 rounded-lg px-4 py-2 text-white transition-colors"
				>
					Click me
				</Button>
			</DemoExample>

			<DemoExample
				title="Button Variants"
				description="Different visual styles for various contexts"
				code={variantsCode}
			>
				<div class="flex flex-wrap gap-3">
					<Button
						class="bg-primary hover:bg-primary/90 rounded-lg px-4 py-2 text-white transition-colors"
					>
						Primary Button
					</Button>
					<Button
						class="bg-secondary hover:bg-secondary/90 rounded-lg px-4 py-2 text-white transition-colors"
					>
						Secondary Button
					</Button>
					<Button
						class="border-border hover:bg-muted rounded-lg border px-4 py-2 transition-colors"
					>
						Outline Button
					</Button>
				</div>
			</DemoExample>

			<DemoExample
				title="Button Sizes"
				description="Different sizes for various use cases"
				code={sizesCode}
			>
				<div class="flex flex-wrap items-center gap-3">
					<Button
						class="bg-primary hover:bg-primary/90 rounded-lg px-3 py-1.5 text-sm text-white transition-colors"
					>
						Small
					</Button>
					<Button
						class="bg-primary hover:bg-primary/90 rounded-lg px-4 py-2 text-white transition-colors"
					>
						Medium
					</Button>
					<Button
						class="bg-primary hover:bg-primary/90 rounded-lg px-6 py-3 text-lg text-white transition-colors"
					>
						Large
					</Button>
				</div>
			</DemoExample>

			<DemoExample
				title="Disabled State"
				description="Disabled buttons are non-interactive"
				code={statesCode}
			>
				<Button
					disabled
					class="bg-primary cursor-not-allowed rounded-lg px-4 py-2 text-white opacity-50"
				>
					Disabled Button
				</Button>
			</DemoExample>
		</div>
	</Section>

	<Section title="API Reference">
		<Props
			data={[
				{
					name: 'class',
					type: 'string',
					default: "''",
					description: 'Additional CSS classes to apply'
				},
				{
					name: 'children',
					type: 'Snippet',
					default: '-',
					description: 'Content to render inside the button'
				},
				{
					name: 'disabled',
					type: 'boolean',
					default: 'false',
					description: 'Whether the button is disabled'
				},
				{
					name: 'type',
					type: "'button' | 'submit' | 'reset'",
					default: "'button'",
					description: 'Button type attribute'
				},
				{
					name: 'onclick',
					type: 'function',
					default: '-',
					description: 'Click event handler'
				}
			]}
		/>
	</Section>

	<Section title="Accessibility">
		<AccessibilityInfo
			features={[
				'Proper semantic button element with role',
				'Keyboard navigation support (Enter and Space keys)',
				'Focus management with visible focus indicators',
				'Screen reader compatible with proper ARIA attributes',
				'Disabled state handling with aria-disabled',
				'Clear visual feedback for all interactive states'
			]}
		/>
	</Section>

	<PageNavigation
		prev={{ label: 'Back to Components', href: '/components' }}
		next={{ label: 'Next: Checkbox', href: '/components/checkbox' }}
	/>
</div>
