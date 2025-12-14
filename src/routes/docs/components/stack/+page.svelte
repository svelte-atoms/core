<script lang="ts">
	import { Stack } from '$lib/components/stack';
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

	const verticalCode = `<Stack direction="vertical" gap="md">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stack>`;

	const horizontalCode = `<Stack direction="horizontal" gap="md">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stack>`;
</script>

<svelte:head>
	<title>Stack - Svelte Atoms</title>
	<meta
		name="description"
		content="Layout component for arranging elements vertically or horizontally."
	/>
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
	<Breadcrumb items={[{ label: 'Components', href: '/docs/components' }, { label: 'Stack' }]} />

	<PageHeader
		title="Stack"
		description="Layout component for arranging elements in a vertical or horizontal stack with consistent spacing."
		status="stable"
	/>

	<Section title="Installation">
		<Installation
			packageName="@svelte-atoms/core"
			importCode="import &#123; Stack &#125; from '@svelte-atoms/core/stack';"
		/>
	</Section>

	<Section title="Preset Configuration" description="Customize the stack appearance using presets">
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for Stack components by defining presets in your
				configuration:
			</p>
			<CodeBlock
				lang="typescript"
				code={`import { createPreset } from '@svelte-atoms/core';

const preset = createPreset({
  stack: () => ({
    class: 'flex',
    variants: {
      direction: {
        vertical: { class: 'flex-col' },
        horizontal: { class: 'flex-row' }
      },
      gap: {
        none: { class: 'gap-0' },
        sm: { class: 'gap-2' },
        md: { class: 'gap-4' },
        lg: { class: 'gap-6' },
        xl: { class: 'gap-8' }
      }
    },
    defaults: {
      direction: 'vertical',
      gap: 'md'
    }
  })
});`}
			/>
		</div>
	</Section>

	<Section title="Examples" description="Explore different stack layouts">
		<div class="space-y-8">
			<DemoExample title="Vertical Stack" description="Default vertical layout" code={verticalCode}>
				<Stack direction="vertical" gap="md">
					<div class="bg-muted rounded p-4">Item 1</div>
					<div class="bg-muted rounded p-4">Item 2</div>
					<div class="bg-muted rounded p-4">Item 3</div>
				</Stack>
			</DemoExample>

			<DemoExample
				title="Horizontal Stack"
				description="Items arranged horizontally"
				code={horizontalCode}
			>
				<Stack direction="horizontal" gap="md">
					<div class="bg-muted rounded p-4">Item 1</div>
					<div class="bg-muted rounded p-4">Item 2</div>
					<div class="bg-muted rounded p-4">Item 3</div>
				</Stack>
			</DemoExample>

			<DemoExample
				title="Different Gaps"
				description="Control spacing between items"
				code={`<Stack gap="sm">Small<\/Stack>
<Stack gap="lg">Large<\/Stack>`}
			>
				<div class="space-y-6">
					<div>
						<p class="text-muted-foreground mb-2 text-sm">Small gap</p>
						<Stack direction="horizontal" gap="sm">
							<div class="bg-muted rounded p-4">Item</div>
							<div class="bg-muted rounded p-4">Item</div>
							<div class="bg-muted rounded p-4">Item</div>
						</Stack>
					</div>
					<div>
						<p class="text-muted-foreground mb-2 text-sm">Large gap</p>
						<Stack direction="horizontal" gap="lg">
							<div class="bg-muted rounded p-4">Item</div>
							<div class="bg-muted rounded p-4">Item</div>
							<div class="bg-muted rounded p-4">Item</div>
						</Stack>
					</div>
				</div>
			</DemoExample>

			<DemoExample
				title="Alignment"
				description="Control alignment of items"
				code={`<Stack align="center">Centered items<\/Stack>`}
			>
				<Stack direction="horizontal" gap="md" align="center" class="bg-muted/20 rounded p-6">
					<div class="bg-muted rounded p-2 text-xs">Small</div>
					<div class="bg-muted rounded p-4">Medium</div>
					<div class="bg-muted rounded p-8 text-lg">Large</div>
				</Stack>
			</DemoExample>
		</div>
	</Section>

	<Section title="API Reference">
		<div class="space-y-6">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Stack Props</h3>
				<Props
					data={[
						{
							name: 'direction',
							type: "'vertical' | 'horizontal'",
							default: "'vertical'",
							description: 'Stack direction'
						},
						{
							name: 'gap',
							type: "'sm' | 'md' | 'lg' | 'xl'",
							default: "'md'",
							description: 'Spacing between items'
						},
						{
							name: 'align',
							type: "'start' | 'center' | 'end'",
							default: "'start'",
							description: 'Cross-axis alignment'
						},
						{
							name: 'justify',
							type: "'start' | 'center' | 'end' | 'between'",
							default: "'start'",
							description: 'Main-axis alignment'
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
				'Semantic HTML structure',
				'Flexible layout without tables',
				'Respects reading order',
				'Works with screen readers',
				'Keyboard navigation friendly'
			]}
		/>
	</Section>

	<PageNavigation
		prev={{ label: 'Sidebar', href: '/docs/components/sidebar' }}
		next={{ label: 'Tabs', href: '/docs/components/tabs' }}
	/>
</div>
