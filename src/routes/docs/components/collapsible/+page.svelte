<script lang="ts">
	import { Collapsible } from '$lib/components/collapsible';
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
	import { collapsibleRootProps } from './props';
	import { metadata } from './shared';

	let demoOpen = $state(false);
	let controlledOpen = $state(true);
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
			<Section.Subtitle>Customize the collapsible appearance using presets</Section.Subtitle>
		</Section.Header>
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for Collapsible components by defining presets in your
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
			<Section.Subtitle>Explore different collapsible variations</Section.Subtitle>
		</Section.Header>
		<div class="space-y-8">
			<DemoExample
				title="Basic Collapsible"
				description="Simple collapsible with toggle button"
				code={metadata.examples.basic}
			>
				<Collapsible.Root bind:open={demoOpen} class="border-border rounded-lg border">
					<Collapsible.Header
						class="hover:bg-muted/50 flex w-full items-center justify-between px-4 py-3"
					>
						<span class="text-foreground font-medium">Click to toggle</span>
						<Collapsible.Indicator>
							<svg
								class="text-muted-foreground h-5 w-5 transition-transform"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M19 9l-7 7-7-7"
								/>
							</svg>
						</Collapsible.Indicator>
					</Collapsible.Header>
					<Collapsible.Body class="">
						<div class="px-4 py-3">
							<p class="text-muted-foreground">
								This content can be shown or hidden. Collapsibles are great for organizing
								information and reducing visual clutter.
							</p>
						</div>
					</Collapsible.Body>
				</Collapsible.Root>
			</DemoExample>

			<DemoExample title="Controlled State" description="Control the open state externally">
				<div class="space-y-4">
					<Collapsible.Root bind:open={controlledOpen} class="border-border rounded-lg border">
						<Collapsible.Header
							class="hover:bg-muted/50 flex w-full items-center justify-between px-4 py-3"
						>
							<span class="text-foreground font-medium">Controlled Collapsible</span>
							<span class="text-muted-foreground text-sm">{controlledOpen ? 'Open' : 'Closed'}</span
							>
						</Collapsible.Header>
						<Collapsible.Body class="">
							<div class="px-4 py-3">
								<p class="text-muted-foreground">
									This collapsible is controlled by external state.
								</p>
							</div>
						</Collapsible.Body>
					</Collapsible.Root>
					<Button variant="primary" onclick={() => (controlledOpen = !controlledOpen)}>
						Toggle from outside
					</Button>
				</div>
			</DemoExample>
		</div>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>API Reference</Section.Title>
		</Section.Header>
		<div class="space-y-6">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Collapsible.Root Props</h3>
				<Props data={collapsibleRootProps} />
			</div>
		</div>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Accessibility</Section.Title>
		</Section.Header>
		<AccessibilityInfo
			features={[
				'Proper ARIA attributes (aria-expanded, aria-controls)',
				'Keyboard accessible (Enter/Space to toggle)',
				'Focus management with visible indicators',
				'Screen reader announcements',
				'Respects prefers-reduced-motion setting'
			]}
		/>
	</Section.Root>

	<PageNavigation
		prev={{ label: 'Card', href: '/docs/components/card' }}
		next={{ label: 'Combobox', href: '/docs/components/combobox' }}
	/>
</div>
