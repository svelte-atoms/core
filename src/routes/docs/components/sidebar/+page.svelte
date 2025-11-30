<script lang="ts">
	import { Sidebar } from '$lib/components/sidebar';
	import { Button } from '$lib/components/button';
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

	const basicCode = `<script lang="ts">
  let isOpen = $state(false);
<\/script>

<Sidebar bind:open={isOpen}>
  <nav>Sidebar content</nav>
</Sidebar>`;

	let leftOpen = $state(false);
	let rightOpen = $state(false);
</script>

<svelte:head>
	<title>Sidebar - Svelte Atoms</title>
	<meta name="description" content="Side navigation panel." />
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
	<Breadcrumb items={[{ label: 'Components', href: '/docs/components' }, { label: 'Sidebar' }]} />

	<PageHeader
		title="Sidebar"
		description="Collapsible navigation panel for organizing app navigation and content."
		status="stable"
	/>

	<Section title="Installation">
		<Installation
			packageName="@svelte-atoms/core"
			importCode="import &#123; Sidebar &#125; from '@svelte-atoms/core/sidebar';"
		/>
	</Section>

	<Section title="Preset Configuration" description="Customize the sidebar appearance using presets">
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for Sidebar components by defining presets in your configuration:
			</p>
			<div class="bg-muted rounded-lg p-4">
				<pre class="text-sm overflow-x-auto"><code>{`import { createPreset } from '@svelte-atoms/core';

const preset = createPreset({
  sidebar: () => ({
    class: 'fixed inset-y-0 z-50 w-64 bg-background shadow-lg transition-transform duration-300',
    variants: {
      side: {
        left: { class: 'left-0 border-r' },
        right: { class: 'right-0 border-l' }
      }
    },
    defaults: {
      side: 'left'
    }
  })
});`}</code></pre>
			</div>
		</div>
	</Section>

	<Section title="Examples" description="Explore different sidebar variations">
		<div class="space-y-8">
			<DemoExample
				title="Left Sidebar"
				description="Sidebar from the left side"
				code={basicCode}
			>
				<Button onclick={() => leftOpen = true}>
					Open Left Sidebar
				</Button>
				{#if leftOpen}
					<Sidebar 
						bind:open={leftOpen} 
						side="left"
						class="w-64 bg-background border-r p-6"
					>
						<h3 class="font-semibold mb-4">Navigation</h3>
						<nav class="space-y-2">
							<button class="block px-3 py-2 rounded hover:bg-muted w-full text-left">Home</button>
							<button class="block px-3 py-2 rounded hover:bg-muted w-full text-left">About</button>
							<button class="block px-3 py-2 rounded hover:bg-muted w-full text-left">Contact</button>
						</nav>
					</Sidebar>
				{/if}
			</DemoExample>

			<DemoExample
				title="Right Sidebar"
				description="Sidebar from the right side"
				code={`<Sidebar side="right" bind:open={rightOpen}>
  <aside>Content</aside>
</Sidebar>`}
			>
				<Button onclick={() => rightOpen = true}>
					Open Right Sidebar
				</Button>
				{#if rightOpen}
					<Sidebar 
						bind:open={rightOpen} 
						side="right"
						class="w-80 bg-background border-l p-6"
					>
						<h3 class="font-semibold mb-4">Details</h3>
						<div class="space-y-3">
							<p class="text-muted-foreground text-sm">
								Additional information and details can be displayed here.
							</p>
							<Button size="sm" variant="outline" onclick={() => rightOpen = false}>
								Close
							</Button>
						</div>
					</Sidebar>
				{/if}
			</DemoExample>
		</div>
	</Section>

	<Section title="API Reference">
		<div class="space-y-6">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Sidebar Props</h3>
				<Props
					data={[
						{
							name: 'open',
							type: 'boolean',
							default: 'false',
							description: 'Sidebar open state'
						},
						{
							name: 'side',
							type: "'left' | 'right'",
							default: "'left'",
							description: 'Sidebar position'
						},
						{
							name: 'backdrop',
							type: 'boolean',
							default: 'true',
							description: 'Show backdrop overlay'
						},
						{
							name: 'closeOnClickOutside',
							type: 'boolean',
							default: 'true',
							description: 'Close on outside click'
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
				'Keyboard navigation (Escape to close)',
				'Focus trap when open',
				'ARIA attributes for navigation',
				'Screen reader announcements',
				'Backdrop click to dismiss'
			]}
		/>
	</Section>

	<PageNavigation
		prev={{ label: 'Scrollable', href: '/docs/components/scrollable' }}
		next={{ label: 'Stack', href: '/docs/components/stack' }}
	/>
</div>
