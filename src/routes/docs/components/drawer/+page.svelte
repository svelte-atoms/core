<script lang="ts">
	import { animateDrawerContent, clickoutDrawer, Drawer } from '$lib/components/drawer';
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
	import { Button } from '$svelte-atoms/core';
	import {
		slideoverRootProps,
		slideoverContentProps,
		slideoverHeaderProps,
		drawerBodyProps,
		slideoverFooterProps,
		slideoverTitleProps,
		slideoverDescriptionProps,
		slideoverBackdropProps
	} from './props';
	import { metadata } from './shared';

	let rightOpen = $state(false);
	let leftOpen = $state(false);
</script>

<svelte:head>
	<title>{metadata.title}</title>
	<meta name="description" content={metadata.description} />
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
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
			<Section.Subtitle>Customize the drawer appearance using presets</Section.Subtitle>
		</Section.Header>
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for Drawer components by defining presets in your
				configuration:
			</p>
			<CodeBlock
				lang="typescript"
				code={metadata.examples.preset}
			/>
		</div>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Examples</Section.Title>
			<Section.Subtitle>Explore different drawer variations</Section.Subtitle>
		</Section.Header>
		<div class="space-y-8">
			<DemoExample
				title="Right Drawer"
				description="Default drawer sliding from right"
				code={metadata.examples.basic}
			>
				<Button
					variant="primary"
					onclick={() => {
						rightOpen = true;
					}}>Open Right Drawer</Button
				>

				<Drawer.Root bind:open={rightOpen} class="z-50">
					<Drawer.Content
						class="h-full w-80 shadow-lg"
						initial={animateDrawerContent({ duration: 0, side: 'right' })}
						animate={animateDrawerContent({ duration: 0.3, side: 'right' })}
					>
						<Drawer.Header class="border-border border-b p-4">
							<Drawer.Title class="text-foreground text-xl font-semibold">Drawer Title</Drawer.Title
							>
						</Drawer.Header>
						<Drawer.Body class="text-muted-foreground p-4">
							<p>This is a drawer sliding from the right side of the screen.</p>
							<p class="mt-4">
								Drawers are useful for navigation, filters, or showing additional details.
							</p>
						</Drawer.Body>
						<Drawer.Footer class="border-border absolute bottom-0 w-full border-t p-4">
							<button
								class="bg-primary w-full rounded px-4 py-2 text-white"
								onclick={() => (rightOpen = false)}
							>
								Close
							</button>
						</Drawer.Footer>
					</Drawer.Content>
				</Drawer.Root>
			</DemoExample>

			<DemoExample title="Left Drawer" description="Drawer from left side" code={sidesCode}>
				<Button
					variant="primary"
					onclick={() => {
						leftOpen = true;
					}}>Open Left Drawer</Button
				>

				<Drawer.Root bind:open={leftOpen}>
					<Drawer.Content class="h-full w-80 shadow-lg">
						<Drawer.Header class="border-border border-b p-4">
							<Drawer.Title class="text-foreground text-xl font-semibold">Navigation</Drawer.Title>
						</Drawer.Header>
						<div class="p-4">
							<nav class="space-y-2">
								<a href="/" class="hover:bg-muted block rounded px-3 py-2">Home</a>
								<a href="/docs" class="hover:bg-muted block rounded px-3 py-2">Docs</a>
								<a href="/components" class="hover:bg-muted block rounded px-3 py-2">Components</a>
							</nav>
						</div>
					</Drawer.Content>
				</Drawer.Root>
			</DemoExample>
		</div>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>API Reference</Section.Title>
		</Section.Header>
		<div class="space-y-6">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Drawer.Root Props</h3>
				<Props data={slideoverRootProps} />
			</div>
		</div>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Accessibility</Section.Title>
		</Section.Header>
		<AccessibilityInfo
			features={[
				'Focus trapped within drawer',
				'Escape key to close',
				'Proper ARIA attributes',
				'Returns focus on close',
				'Keyboard accessible',
				'Screen reader announcements'
			]}
		/>
	</Section.Root>

	<PageNavigation
		prev={{ label: 'Divider', href: '/docs/components/divider' }}
		next={{ label: 'Dropdown', href: '/docs/components/dropdown' }}
	/>
</div>
