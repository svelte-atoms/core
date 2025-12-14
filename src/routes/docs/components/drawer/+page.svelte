<script lang="ts">
	import { Drawer } from '$lib/components/drawer';
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

	const basicCode = `<script lang="ts">
  let open = $state(false);
<\/script>

<button onclick={() => open = true}>Open Drawer</button>

<Drawer.Root bind:open>
  <Drawer.Content>
    <Drawer.Header>
      <Drawer.Title>Drawer Title</Drawer.Title>
    </Drawer.Header>
    <p>Drawer content goes here.</p>
    <Drawer.Footer>
      <button onclick={() => open = false}>Close</button>
    </Drawer.Footer>
  </Drawer.Content>
</Drawer.Root>`;

	const sidesCode = `<Drawer.Root bind:open side="left">...</Drawer.Root>
<Drawer.Root bind:open side="right">...</Drawer.Root>
<Drawer.Root bind:open side="top">...</Drawer.Root>
<Drawer.Root bind:open side="bottom">...</Drawer.Root>`;

	let rightOpen = $state(false);
	let leftOpen = $state(false);
</script>

<svelte:head>
	<title>Drawer - Svelte Atoms</title>
	<meta name="description" content="Side panel that slides in from screen edge." />
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
	<Breadcrumb items={[{ label: 'Components', href: '/docs/components' }, { label: 'Drawer' }]} />

	<PageHeader
		title="Drawer"
		description="Side panel that slides in from the edge of the screen. Perfect for navigation menus and additional content."
		status="stable"
	/>

	<Section title="Installation">
		<Installation
			packageName="@svelte-atoms/core"
			importCode="import &#123; Drawer &#125; from '@svelte-atoms/core/drawer';"
		/>
	</Section>

	<Section title="Preset Configuration" description="Customize the drawer appearance using presets">
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for Drawer components by defining presets in your
				configuration:
			</p>
			<CodeBlock
				lang="typescript"
				code={`import { createPreset } from '@svelte-atoms/core';

const preset = createPreset({
  drawer: () => ({
    class: 'fixed inset-y-0 z-50 w-80 bg-background shadow-xl transition-transform duration-300',
    variants: {
      side: {
        left: { class: 'left-0' },
        right: { class: 'right-0' },
        top: { class: 'top-0 w-full h-80' },
        bottom: { class: 'bottom-0 w-full h-80' }
      }
    },
    defaults: {
      side: 'right'
    }
  })
});`}
			/>
		</div>
	</Section>

	<Section title="Examples" description="Explore different drawer variations">
		<div class="space-y-8">
			<DemoExample
				title="Right Drawer"
				description="Default drawer sliding from right"
				code={basicCode}
			>
				<button class="bg-primary rounded px-4 py-2 text-white" onclick={() => (rightOpen = true)}>
					Open Right Drawer
				</button>

				<Drawer.Root bind:open={rightOpen}>
					<Drawer.Content class="bg-background fixed top-0 right-0 h-full w-80 shadow-lg">
						<Drawer.Header class="border-border border-b p-4">
							<Drawer.Title class="text-foreground text-xl font-semibold">Drawer Title</Drawer.Title
							>
						</Drawer.Header>
						<div class="text-muted-foreground p-4">
							<p>This is a drawer sliding from the right side of the screen.</p>
							<p class="mt-4">
								Drawers are useful for navigation, filters, or showing additional details.
							</p>
						</div>
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
				<button class="bg-primary rounded px-4 py-2 text-white" onclick={() => (leftOpen = true)}>
					Open Left Drawer
				</button>

				<Drawer.Root bind:open={leftOpen} side="left">
					<Drawer.Content class="bg-background fixed top-0 left-0 h-full w-80 shadow-lg">
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
	</Section>

	<Section title="API Reference">
		<div class="space-y-6">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Drawer.Root Props</h3>
				<Props
					data={[
						{
							name: 'open',
							type: 'boolean',
							default: 'false',
							description: 'Control open state'
						},
						{
							name: 'side',
							type: "'left' | 'right' | 'top' | 'bottom'",
							default: "'right'",
							description: 'Drawer position'
						},
						{
							name: 'modal',
							type: 'boolean',
							default: 'true',
							description: 'Show backdrop overlay'
						},
						{
							name: 'closeOnEscape',
							type: 'boolean',
							default: 'true',
							description: 'Close on Escape key'
						}
					]}
				/>
			</div>
		</div>
	</Section>

	<Section title="Accessibility">
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
	</Section>

	<PageNavigation
		prev={{ label: 'Divider', href: '/docs/components/divider' }}
		next={{ label: 'Dropdown', href: '/docs/components/dropdown' }}
	/>
</div>
