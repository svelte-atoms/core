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
		CodeBlock,
		DocCallout
	} from '$docs/components';
	import { Button, Card } from '$svelte-atoms/core';
	import { stackRootProps, stackItemProps } from './props';
	import { metadata } from './shared';

	const { basic: basicCode, badge: badgeCode, loading: loadingCode } = metadata.examples;
</script>

<svelte:head>
	<title>Stack - Svelte Atoms</title>
	<meta
		name="description"
		content="Layout component for layering elements on top of each other in the same space."
	/>
</svelte:head>

<div class="py-8">
	<Breadcrumb items={metadata.breadcrumbs} />

	<PageHeader
		title="Stack"
		description="Layout component for layering elements on top of each other while keeping them in the document flow. Unlike absolute positioning, Stack maintains parent container sizing based on content."
		status="stable"
	/>

	<Section.Root>
		<Section.Header>
			<Section.Title>Overview</Section.Title>
		</Section.Header>
		<DocCallout variant="info" title="Why Stack?">
			<div class="space-y-4">
				<p class="text-sm leading-relaxed">
					Stack layers multiple elements in the same visual space using CSS Grid
					<code class="bg-muted rounded px-1 text-xs">grid-template-areas: 'stack'</code>.
					Unlike absolute positioning:
				</p>
				<ul class="space-y-2 text-sm">
					<li class="flex gap-2"><span class="text-primary">✓</span> Parent container sizes to its largest child — no manual height/width needed</li>
					<li class="flex gap-2"><span class="text-primary">✓</span> DOM order is preserved for screen readers and keyboard navigation</li>
					<li class="flex gap-2"><span class="text-primary">✓</span> Programmatic z-order: bringToFront, sendToBack, bringForward, sendBackward</li>
					<li class="flex gap-2"><span class="text-primary">✓</span> <code class="bg-muted rounded px-1 text-xs">bind:value</code> tracks the topmost item id reactively</li>
				</ul>
			</div>
		</DocCallout>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Installation</Section.Title>
		</Section.Header>
		<Installation
			packageName="@svelte-atoms/core"
			importCode="import &#123; Stack &#125; from '@svelte-atoms/core/stack';"
		/>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Preset Configuration</Section.Title>
			<Section.Subtitle>Customize the stack appearance using presets</Section.Subtitle>
		</Section.Header>
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
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Examples</Section.Title>
			<Section.Subtitle>Explore different stack layering patterns</Section.Subtitle>
		</Section.Header>
		<div class="space-y-8">
			<DemoExample
				title="Image with Overlay"
				description="Layer text over an image while maintaining container size"
				code={basicCode}
			>
				<div>
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
				</div>
			</DemoExample>

			<DemoExample
				title="Button with Badge"
				description="Notification badge positioned over a button"
				code={badgeCode}
			>
				<div>
					<Stack.Root class="inline-block w-fit">
					<Stack.Item base={Button} variant="primary">Messages</Stack.Item>
					<Stack.Item class="flex justify-end -mt-2 -mr-2 pointer-events-none">
						<span class="bg-destructive text-destructive-foreground flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold">
							5
						</span>
					</Stack.Item>
				</Stack.Root>
				</div>
			</DemoExample>

			<DemoExample
				title="Loading Overlay"
				description="Show loading state over content without breaking layout"
				code={loadingCode}
			>
				<div>
					<Stack.Root class="w-64 overflow-hidden">
						<Stack.Item base={Card.Root} class="border p-8 rounded-lg">
							<h3 class="mb-2 text-lg font-bold">Content Card</h3>
							<p class="text-muted-foreground text-sm">Your content here determines the container size</p>
						</Stack.Item>
						<Stack.Item class="flex items-center justify-center backdrop-blur-xs rounded-lg">
							<div class="bg-background/90 border-border/50 rounded-lg border p-4 shadow-lg">
								<div class="text-muted-foreground text-sm">Loading…</div>
							</div>
						</Stack.Item>
					</Stack.Root>
				</div>
			</DemoExample>

			<DemoExample
				title="Programmatic Z-Order"
				description="Use getBond() to reorder layers at runtime. bind:value tracks the topmost item."
				code={zOrderCode}
			>
				<div class="flex flex-col gap-4">
					<div class="flex gap-2 flex-wrap">
						{#each items as item (item.id)}
							<button
								class={['rounded px-3 py-1 text-sm font-medium text-white transition-all', item.bg, active === item.id ? 'ring-2 ring-offset-2 ring-black scale-105' : 'opacity-60']}
								onclick={() => (active = item.id)}
							>{item.label}</button>
						{/each}
					</div>
					<Stack.Root bind:this={stackRoot} bind:value={active} class="relative h-40 max-w-64">
						{#each items as item (item.id)}
							<Stack.Item
								id={item.id}
								class={['flex cursor-pointer items-center justify-center rounded-xl text-white font-bold text-xl shadow-lg transition-all', item.bg, item.offset, active === item.id ? 'ring-4 ring-white ring-offset-2' : '']}
								onclick={() => (active = item.id)}
							>
								{item.label}
							</Stack.Item>
						{/each}
					</Stack.Root>
					<div class="flex gap-2 flex-wrap">
						<Button variant="outline" size="sm" onclick={() => bond?.bringToFront(active)}>Bring to Front</Button>
						<Button variant="outline" size="sm" onclick={() => bond?.bringForward(active)}>Forward</Button>
						<Button variant="outline" size="sm" onclick={() => bond?.sendBackward(active)}>Backward</Button>
						<Button variant="outline" size="sm" onclick={() => bond?.sendToBack(active)}>Send to Back</Button>
					</div>
				</div>
			</DemoExample>
		</div>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>API Reference</Section.Title>
		</Section.Header>
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
				<Props data={stackItemProps} />
			</div>

			<div>
				<h3 class="text-foreground mb-1 text-lg font-semibold">StackBond methods</h3>
				<p class="text-muted-foreground mb-4 text-sm">
					Retrieve via <code class="bg-muted rounded px-1 text-xs">root.getBond()</code>:
				</p>
				<div class="overflow-x-auto">
					<table class="w-full text-left">
						<thead>
							<tr class="border-border border-b">
								<th class="text-muted-foreground px-4 py-2 text-xs font-medium uppercase tracking-wide">Method</th>
								<th class="text-muted-foreground px-4 py-2 text-xs font-medium uppercase tracking-wide">Description</th>
							</tr>
						</thead>
						<tbody>
							<tr class="border-border/50 border-b">
								<td class="text-foreground px-4 py-3 font-mono text-sm">bringToFront(id)</td>
								<td class="text-foreground/80 px-4 py-3 text-sm">Move item to the highest z-index</td>
							</tr>
							<tr class="border-border/50 border-b">
								<td class="text-foreground px-4 py-3 font-mono text-sm">sendToBack(id)</td>
								<td class="text-foreground/80 px-4 py-3 text-sm">Move item to the lowest z-index</td>
							</tr>
							<tr class="border-border/50 border-b">
								<td class="text-foreground px-4 py-3 font-mono text-sm">bringForward(id)</td>
								<td class="text-foreground/80 px-4 py-3 text-sm">Increase z-index by one step</td>
							</tr>
							<tr class="border-border/50 border-b">
								<td class="text-foreground px-4 py-3 font-mono text-sm">sendBackward(id)</td>
								<td class="text-foreground/80 px-4 py-3 text-sm">Decrease z-index by one step</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
</Section.Root>

<Section.Root>
	<Section.Header>
		<Section.Title>Accessibility</Section.Title>
	</Section.Header>
	<AccessibilityInfo
		features={[
			'Semantic HTML structure',
			'Uses CSS Grid for proper layering',
			'Maintains DOM order for screen readers',
			'Works with absolute positioning and z-index',
			'Keyboard navigation preserves natural tab order'
		]}
	/>
</Section.Root>
	/>
</div>
