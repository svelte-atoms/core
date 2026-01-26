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
	import { Alert, Button, Card } from '$svelte-atoms/core';
	import { stackProps } from './props';

	const basicCode = `<Stack.Root class="h-64 w-64 overflow-hidden rounded-lg">
  <Stack.Item>
    <div class="h-64 w-64 bg-gradient-to-br from-blue-500 to-purple-600"></div>
  </Stack.Item>
  <Stack.Item class="flex items-end">
    <div class="w-full bg-black/50 p-4">
      <h3 class="text-lg font-bold text-white">Overlay Text</h3>
      <p class="text-sm text-white/80">Stays in document flow</p>
    </div>
  </Stack.Item>
</Stack.Root>`;

	const badgeCode = `<Stack.Root class="inline-block w-fit flex-0">
  <Stack.Item base={Button} variant="primary">Messages</Stack.Item>
  <Stack.Item class="flex justify-end" style="margin-top: -8px; margin-right: -8px;">
    <span class="bg-destructive text-destructive-foreground flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold">
      5
    </span>
  </Stack.Item>
</Stack.Root>`;

	const loadingCode = `<Stack.Root class="w-64">
  <Stack.Item base={Card.Root} class="rounded-lg border p-8">
    <h3 class="mb-2 text-lg font-bold">Content Card</h3>
    <p class="text-muted-foreground text-sm">Your content here that determines the size</p>
    <p class="text-muted-foreground mt-2 text-sm">Container sizes based on this content</p>
  </Stack.Item>
  <Stack.Item class="flex items-center justify-center">
    <div class="bg-background/90 border-border/50 rounded-lg border p-4 shadow-lg backdrop-blur-sm">
      <div class="text-muted-foreground text-sm">Loading...</div>
    </div>
  </Stack.Item>
</Stack.Root>`;
</script>

<svelte:head>
	<title>Stack - Svelte Atoms</title>
	<meta
		name="description"
		content="Layout component for layering elements on top of each other in the same space."
	/>
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
	<Breadcrumb items={[{ label: 'Components', href: '/docs/components' }, { label: 'Stack' }]} />

	<PageHeader
		title="Stack"
		description="Layout component for layering elements on top of each other while keeping them in the document flow. Unlike absolute positioning, Stack maintains parent container sizing based on content."
		status="stable"
	/>

	<Section title="Overview">
		<Alert.Root variant="info">
			<Alert.Title>Why Stack?</Alert.Title>
			<Alert.Content class="text-foreground/70">
				<div class="space-y-4">
					<p class="text-sm leading-relaxed">
						Stack allows you to layer multiple elements on top of each other while keeping them in
						the document flow. This means:
					</p>
					<ul class="space-y-2 text-sm">
						<li class="flex gap-2">
							<span class="text-primary">✓</span>
							<span>The parent container sizes based on its content (largest child)</span>
						</li>
						<li class="flex gap-2">
							<span class="text-primary">✓</span>
							<span>No need for absolute positioning or manual size calculations</span>
						</li>
						<li class="flex gap-2">
							<span class="text-primary">✓</span>
							<span>Items remain accessible in the natural DOM order</span>
						</li>
						<li class="flex gap-2">
							<span class="text-primary">✓</span>
							<span>Use z-index or DOM order to control layering</span>
						</li>
					</ul>
					<p class="text-sm leading-relaxed">
						Perfect for badges on buttons, image overlays, loading states, and any scenario where
						you need elements to occupy the same visual space without breaking document flow.
					</p>
				</div>
			</Alert.Content>
		</Alert.Root>
	</Section>

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
				code={`import { setPreset } from '@svelte-atoms/core/context';

setPreset({
  'stack.root': () => ({
    class: 'p-4' // Creates grid container
  }),
  'stack.item': () => ({
    class: '' // Each item occupies grid-area: 'stack'
  })
});

// Stack uses CSS Grid with grid-template-areas: 'stack'
// All items share the same grid area, layering naturally.
// Parent size is determined by the largest child.
// Use z-index or DOM order to control stacking order.`}
			/>
		</div>
	</Section>

	<Section title="Examples" description="Explore different stack layering patterns">
		<div class="space-y-8">
			<DemoExample
				title="Image with Overlay"
				description="Layer text over an image while maintaining container size"
				code={basicCode}
			>
				<Stack.Root class="h-64 w-64 overflow-hidden rounded-lg">
					<Stack.Item>
						<div class="h-64 w-64 bg-gradient-to-br from-blue-500 to-purple-600"></div>
					</Stack.Item>
					<Stack.Item class="flex items-end">
						<div class="w-full bg-black/50 p-4">
							<h3 class="text-lg font-bold text-white">Overlay Text</h3>
							<p class="text-sm text-white/80">Stays in document flow</p>
						</div>
					</Stack.Item>
				</Stack.Root>
			</DemoExample>

			<DemoExample
				title="Button with Badge"
				description="Notification badge positioned over a button"
				code={badgeCode}
			>
				<Stack.Root class="inline-block w-fit flex-0">
					<Stack.Item base={Button} variant="primary">Messages</Stack.Item>
					<Stack.Item class="flex justify-end" style="margin-top: -8px; margin-right: -8px;">
						<span
							class="bg-destructive text-destructive-foreground flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold"
						>
							5
						</span>
					</Stack.Item>
				</Stack.Root>
			</DemoExample>

			<DemoExample
				title="Loading Overlay"
				description="Show loading state over content without breaking layout"
				code={loadingCode}
			>
				<Stack.Root class="w-64">
					<Stack.Item base={Card.Root} class="rounded-lg border p-8">
						<h3 class="mb-2 text-lg font-bold">Content Card</h3>
						<p class="text-muted-foreground text-sm">Your content here that determines the size</p>
						<p class="text-muted-foreground mt-2 text-sm">Container sizes based on this content</p>
					</Stack.Item>
					<Stack.Item class="flex items-center justify-center">
						<div
							class="bg-background/90 border-border/50 rounded-lg border p-4 shadow-lg backdrop-blur-sm"
						>
							<div class="text-muted-foreground text-sm">Loading...</div>
						</div>
					</Stack.Item>
				</Stack.Root>
			</DemoExample>
		</div>
	</Section>

	<Section title="API Reference">
		<div class="space-y-8">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Stack.Root</h3>
				<p class="text-muted-foreground mb-4 text-sm">
					Container that creates a grid area for layering child items.
				</p>
				<Props data={stackProps} />
			</div>

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Stack.Item</h3>
				<p class="text-muted-foreground mb-4 text-sm">
					Individual item that occupies the same grid area, layering on top of siblings while
					remaining in document flow. Use flexbox, margins, or z-index for positioning control.
				</p>
				<Props
					data={[
						{
							name: 'preset',
							type: 'string',
							default: "'stack.item'",
							description: 'Preset configuration key'
						},
						{
							name: 'class',
							type: 'string',
							default: "''",
							description:
								'Additional CSS classes (use flexbox, z-index, or margins for positioning)'
						},
						{
							name: 'style',
							type: 'string',
							default: "''",
							description: 'Inline styles for fine-tuned positioning with margins'
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
				'Uses CSS Grid for proper layering',
				'Maintains DOM order for screen readers',
				'Works with absolute positioning and z-index',
				'Keyboard navigation preserves natural tab order'
			]}
		/>
	</Section>

	<PageNavigation
		prev={{ label: 'Sidebar', href: '/docs/components/sidebar' }}
		next={{ label: 'Tabs', href: '/docs/components/tabs' }}
	/>
</div>
