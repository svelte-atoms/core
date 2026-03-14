<script lang="ts">
	import { Stack } from '$lib/components/stack';
	import type { StackBond } from '$lib/components/stack';
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

	const { basic: basicCode, badge: badgeCode, loading: loadingCode, zOrder: zOrderCode } = metadata.examples;

	let stackRoot = $state<any>();
	let activePage = $state('dashboard');
	const bond = $derived(stackRoot?.getBond() as StackBond | undefined);

	const pages = [
		{
			id: 'dashboard',
			label: 'Dashboard',
			icon: '⊞',
			content: { title: 'Dashboard', subtitle: 'Welcome back! Here\'s your overview.', color: 'bg-blue-500/10 border-blue-500/20' }
		},
		{
			id: 'analytics',
			label: 'Analytics',
			icon: '↗',
			content: { title: 'Analytics', subtitle: 'Traffic and engagement metrics.', color: 'bg-violet-500/10 border-violet-500/20' }
		},
		{
			id: 'settings',
			label: 'Settings',
			icon: '⚙',
			content: { title: 'Settings', subtitle: 'Configure your preferences.', color: 'bg-emerald-500/10 border-emerald-500/20' }
		},
	];

	function navigate(id: string) {
		activePage = id;
		bond?.state.bringToFront(id);
	}

	function pageOffset(i: number): number {
		const activeIdx = pages.findIndex(p => p.id === activePage);
		const rel = (i - activeIdx + pages.length) % pages.length;
		return rel === 0 ? 0 : rel;
	}

	function pageStyle(i: number): string {
		const offset = pageOffset(i);
		if (offset === 0) return 'transform: translate(0,0) scale(1); opacity: 1; z-index: 10;';
		if (offset === 1) return 'transform: translate(8px,-8px) scale(0.97); opacity: 0.7; z-index: 5;';
		return 'transform: translate(16px,-16px) scale(0.94); opacity: 0.4; z-index: 1;';
	}
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
					(<code class="bg-muted rounded px-1 text-xs">grid-template-areas: 'stack'</code>).
					Unlike absolute positioning:
				</p>
				<ul class="space-y-2 text-sm">
					<li class="flex gap-2"><span class="text-primary">✓</span> Parent container sizes to its largest child — no manual height/width needed</li>
					<li class="flex gap-2"><span class="text-primary">✓</span> DOM order is preserved for screen readers and keyboard navigation</li>
					<li class="flex gap-2"><span class="text-primary">✓</span> Programmatic z-order via <code class="bg-muted rounded px-1 text-xs">bond.state</code>: bringToFront, sendToBack, bringForward, sendBackward</li>
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

	<!-- Preset -->
	<Section.Root>
		<Section.Header>
			<Section.Title>Preset Configuration</Section.Title>
			<Section.Subtitle>Customize the stack appearance using presets</Section.Subtitle>
		</Section.Header>
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for Stack components by defining presets in your configuration:
			</p>
			<CodeBlock
				lang="typescript"
				code={metadata.examples.preset}
			/>
		</div>
	</Section.Root>

	<!-- Examples -->
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
				<Stack.Root class="inline-block w-fit">
					<Stack.Item base={Button} variant="primary">Messages</Stack.Item>
					<Stack.Item class="pointer-events-none -mr-2 -mt-2 flex justify-end">
						<span class="bg-destructive text-destructive-foreground flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold">
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
				<Stack.Root class="w-64 overflow-hidden">
					<Stack.Item base={Card.Root} class="rounded-lg border p-8">
						<h3 class="mb-2 text-lg font-bold">Content Card</h3>
						<p class="text-muted-foreground text-sm">Your content here determines the container size</p>
					</Stack.Item>
					<Stack.Item class="flex items-center justify-center rounded-lg backdrop-blur-sm">
						<div class="bg-background/90 border-border/50 rounded-lg border p-4 shadow-lg">
							<div class="text-muted-foreground text-sm">Loading…</div>
						</div>
					</Stack.Item>
				</Stack.Root>
			</DemoExample>

			<DemoExample
				title="App Shell Navigation"
				description="Sidebar + header layout where the content area is a Stack of pages — clicking a nav item brings that page to front."
				code={zOrderCode}
			>
				<!-- Mini app shell -->
				<div class="border-border bg-background overflow-hidden rounded-xl border" style="height: 320px; width: 100%; max-width: 580px;">
					<div class="flex h-full">

						<!-- Sidebar -->
						<aside class="border-border bg-muted/30 flex w-36 flex-col border-r">
							<div class="border-border border-b px-4 py-3">
								<span class="text-foreground text-sm font-semibold">MyApp</span>
							</div>
							<nav class="flex flex-col gap-0.5 p-2">
								{#each pages as page (page.id)}
									<button
										class={[
											'flex items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors',
											activePage === page.id
												? 'bg-primary/10 text-primary font-medium'
												: 'text-muted-foreground hover:bg-muted hover:text-foreground'
										]}
										onclick={() => navigate(page.id)}
									>
										<span class="text-base leading-none">{page.icon}</span>
										{page.label}
									</button>
								{/each}
							</nav>
						</aside>

						<!-- Main area -->
						<div class="flex min-w-0 flex-1 flex-col">

							<!-- App header -->
							<header class="border-border bg-background flex h-12 shrink-0 items-center border-b px-4">
								<span class="text-foreground text-sm font-medium">
									{pages.find(p => p.id === activePage)?.label}
								</span>
							</header>

							<!-- Stacked page content — cascade effect -->
							<div class="relative min-h-0 flex-1 flex items-center justify-center p-6">
								<Stack.Root bind:this={stackRoot} bind:value={activePage} class="w-full max-w-xs">
									{#each pages as page, i (page.id)}
										<Stack.Item
											id={page.id}
											class={[
												'rounded-xl border p-5 transition-all duration-300 cursor-pointer select-none',
												page.content.color,
											]}
											style={pageStyle(i)}
											onclick={() => navigate(page.id)}
										>
											<h3 class="text-foreground mb-1 text-sm font-semibold">{page.content.title}</h3>
											<p class="text-muted-foreground text-xs">{page.content.subtitle}</p>
											<div class="mt-3 grid grid-cols-2 gap-1.5">
												{#each [1, 2, 3, 4] as _ (_)}
													<div class="bg-background/60 border-border/40 rounded border p-2">
														<div class="bg-muted-foreground/20 mb-1.5 h-1.5 w-12 rounded"></div>
														<div class="bg-muted-foreground/10 h-1.5 w-8 rounded"></div>
													</div>
												{/each}
											</div>
										</Stack.Item>
									{/each}
								</Stack.Root>
							</div>

						</div>
					</div>
				</div>
			</DemoExample>

		</div>
	</Section.Root>

	<!-- API Reference -->
	<Section.Root>
		<Section.Header>
			<Section.Title>API Reference</Section.Title>
		</Section.Header>
		<div class="space-y-8">

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Stack.Root</h3>
				<p class="text-muted-foreground mb-4 text-sm">
					Container that creates the shared grid stacking context. Bind <code class="bg-muted rounded px-1 text-xs">value</code> to reactively track the topmost item id.
				</p>
				<Props data={stackRootProps} />
			</div>

			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Stack.Item</h3>
				<p class="text-muted-foreground mb-4 text-sm">
					Occupies the shared grid area. Registers with <code class="bg-muted rounded px-1 text-xs">StackState</code> on mount
					and unregisters on destroy. Use flexbox, margins, or z-index for fine-grained positioning within the cell.
				</p>
				<Props data={stackItemProps} />
			</div>

			<div>
				<h3 class="text-foreground mb-1 text-lg font-semibold">StackState methods</h3>
				<p class="text-muted-foreground mb-4 text-sm">
					Access via <code class="bg-muted rounded px-1 text-xs">bond.state</code> (where <code class="bg-muted rounded px-1 text-xs">bond = root.getBond()</code>):
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
							<tr class="border-border/50 border-b">
								<td class="text-foreground px-4 py-3 font-mono text-sm">raise(id)</td>
								<td class="text-foreground/80 px-4 py-3 text-sm">Alias for bringToFront</td>
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

	<PageNavigation />
</div>
