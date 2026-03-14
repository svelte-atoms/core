<script lang="ts">
	import { Stack } from '$lib/components/stack';
	import type { StackBond } from '$lib/components/stack';
	import {
		PageHeader,
		Breadcrumb,
		Section,
		Installation,
		AccessibilityInfo,
		DemoExample,
		Props,
		CodeBlock,
		DocCallout
	} from '$docs/components';
	import { Button, Card } from '$svelte-atoms/core';
	import { stackRootProps, stackItemProps } from './props';
	import { metadata } from './shared';

	const { basic: basicCode, badge: badgeCode, loading: loadingCode, zOrder: zOrderCode, preset: presetCode } = metadata.examples;

	// z-order demo state
	const items = [
		{ id: 'a', label: 'A', bg: 'bg-blue-400',  offset: '' },
		{ id: 'b', label: 'B', bg: 'bg-green-400', offset: 'mt-4 ml-4' },
		{ id: 'c', label: 'C', bg: 'bg-red-400',   offset: 'mt-8 ml-8' }
	];
	let active = $state('a');
	let stackRoot = $state<any>(undefined);
	const bond = $derived(stackRoot?.getBond() as StackBond | undefined);
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

	<!-- Overview -->
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

	<!-- Installation -->
	<Section.Root>
		<Section.Header>
			<Section.Title>Installation</Section.Title>
		</Section.Header>
		<Installation
			packageName={metadata.packageName}
			importCode={metadata.importCode}
		/>
	</Section.Root>

	<!-- Examples -->
	<Section.Root>
		<Section.Header>
			<Section.Title>Examples</Section.Title>
			<Section.Subtitle>Common layering patterns</Section.Subtitle>
		</Section.Header>
		<div class="space-y-8">

			<DemoExample
				title="Image with Overlay"
				description="Layer text over an image. The container sizes to the image — no height needed on the parent."
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
				description="Notification badge over a button. The badge uses negative margins to break out of the grid cell."
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
				description="Show a loading state over content without layout shifts. The card determines the container size."
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

	<!-- Preset -->
	<Section.Root>
		<Section.Header>
			<Section.Title>Preset Configuration</Section.Title>
			<Section.Subtitle>Customize default styles via the preset system</Section.Subtitle>
		</Section.Header>
		<CodeBlock lang="typescript" code={presetCode} />
	</Section.Root>

	<!-- API Reference -->
	<Section.Root>
		<Section.Header>
			<Section.Title>API Reference</Section.Title>
		</Section.Header>
		<div class="space-y-8">
			<div>
				<h3 class="text-foreground mb-1 text-lg font-semibold">Stack.Root</h3>
				<p class="text-muted-foreground mb-4 text-sm">
					Creates the CSS Grid stacking container. Exposes <code class="bg-muted rounded px-1 text-xs">bind:value</code> (id of the topmost item)
					and <code class="bg-muted rounded px-1 text-xs">getBond()</code> for programmatic control.
				</p>
				<Props data={stackRootProps} />
			</div>

			<div>
				<h3 class="text-foreground mb-1 text-lg font-semibold">Stack.Item</h3>
				<p class="text-muted-foreground mb-4 text-sm">
					Occupies the shared grid area. Registers with <code class="bg-muted rounded px-1 text-xs">StackState</code> on mount
					and unregisters on destroy. Use flexbox, z-index, or margins for fine-grained positioning within the cell.
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

	<!-- Accessibility -->
	<Section.Root>
		<Section.Header>
			<Section.Title>Accessibility</Section.Title>
		</Section.Header>
		<AccessibilityInfo features={metadata.accessibility} />
	</Section.Root>
</div>
