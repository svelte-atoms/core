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

	const basicCode = `<script lang="ts">
  let open = $state(false);
<\/script>

<Collapsible.Root bind:open>
  <Collapsible.Trigger>
    <button>Toggle Content</button>
  </Collapsible.Trigger>
  <Collapsible.Content>
    <p>This content can be shown or hidden.</p>
  </Collapsible.Content>
</Collapsible.Root>`;

	let demoOpen = $state(false);
	let controlledOpen = $state(true);
</script>

<svelte:head>
	<title>Collapsible - Svelte Atoms</title>
	<meta name="description" content="Expandable container for showing and hiding content." />
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
	<Breadcrumb
		items={[{ label: 'Components', href: '/docs/components' }, { label: 'Collapsible' }]}
	/>

	<PageHeader
		title="Collapsible"
		description="Expandable container for showing and hiding content. Perfect for FAQs, settings, and progressive disclosure."
		status="stable"
	/>

	<Section title="Installation">
		<Installation
			packageName="@svelte-atoms/core"
			importCode="import &#123; Collapsible &#125; from '@svelte-atoms/core/collapsible';"
		/>
	</Section>

	<Section
		title="Preset Configuration"
		description="Customize the collapsible appearance using presets"
	>
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for Collapsible components by defining presets in your
				configuration:
			</p>
			<CodeBlock
				lang="typescript"
				code={`import { createPreset } from '@svelte-atoms/core';

const preset = createPreset({
  collapsible: () => ({
    class: 'w-full space-y-2'
  }),
  'collapsible.trigger': () => ({
    class: 'flex w-full items-center justify-between rounded-md border border-border bg-background px-4 py-3 text-sm font-medium hover:bg-accent transition-colors'
  }),
  'collapsible.content': () => ({
    class: 'overflow-hidden text-sm text-muted-foreground px-4 py-3 border border-t-0 rounded-b-md border-border'
  })
});`}
			/>
		</div>
	</Section>

	<Section title="Examples" description="Explore different collapsible variations">
		<div class="space-y-8">
			<DemoExample
				title="Basic Collapsible"
				description="Simple collapsible with toggle button"
				code={basicCode}
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
	</Section>

	<Section title="API Reference">
		<div class="space-y-6">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Collapsible.Root Props</h3>
				<Props data={collapsibleRootProps} />
			</div>
		</div>
	</Section>

	<Section title="Accessibility">
		<AccessibilityInfo
			features={[
				'Proper ARIA attributes (aria-expanded, aria-controls)',
				'Keyboard accessible (Enter/Space to toggle)',
				'Focus management with visible indicators',
				'Screen reader announcements',
				'Respects prefers-reduced-motion setting'
			]}
		/>
	</Section>

	<PageNavigation
		prev={{ label: 'Card', href: '/docs/components/card' }}
		next={{ label: 'Combobox', href: '/docs/components/combobox' }}
	/>
</div>
