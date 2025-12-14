<script lang="ts">
	import { Sidebar, animateSidebarContent } from '$lib/components/sidebar';
	import { Button } from '$lib/components/button';
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
	import { sidebarRootProps, sidebarContentProps } from './props';

	const basicCode = `<script lang="ts">
  import { Sidebar, animateSidebarContent } from '@svelte-atoms/core/sidebar';
  import { Button } from '@svelte-atoms/core/button';
  
  let leftOpen = $state(false);
<\/script>

<Sidebar.Root bind:open={leftOpen}>
  <div class="flex min-h-96 w-full">
    <Sidebar.Content
      animate={animateSidebarContent({ '0': '96px', '1': '320px' })}
      class="overflow-hidden border-r p-4"
    >
      <h3 class="mb-4 font-semibold">Details</h3>
      <div class="space-y-3">
        <p class="text-muted-foreground w-40 text-sm">
          Additional information and details can be displayed here.
        </p>
        <Button 
          size="sm" 
          variant="outline" 
          onclick={() => (leftOpen = false)}
        >
          Close
        </Button>
      </div>
    </Sidebar.Content>

    <main class="flex-1 p-4">
      <Button onclick={() => (leftOpen = true)}>
        Open Left Sidebar
      </Button>
    </main>
  </div>
</Sidebar.Root>`;

	const rightCode = `<script lang="ts">
  import { Sidebar, animateSidebarContent } from '@svelte-atoms/core/sidebar';
  import { Button } from '@svelte-atoms/core/button';
  
  let rightOpen = $state(false);
<\/script>

<Sidebar.Root bind:open={rightOpen}>
  <div class="flex min-h-96 w-full">
    <main class="flex-1">
      <Button onclick={() => (rightOpen = true)}>
        Open Right Sidebar
      </Button>
    </main>

    <Sidebar.Content
      animate={animateSidebarContent({ '0': '96px', '1': '320px' })}
      class="border-l p-4"
    >
      <h3 class="mb-4 font-semibold">Details</h3>
      <div class="space-y-3">
        <p class="text-muted-foreground w-40 text-sm">
          Additional information and details can be displayed here.
        </p>
        <Button 
          size="sm" 
          variant="outline" 
          onclick={() => (rightOpen = false)}
        >
          Close
        </Button>
      </div>
    </Sidebar.Content>
  </div>
</Sidebar.Root>`;

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

	<Section
		title="Preset Configuration"
		description="Customize the sidebar appearance using presets"
	>
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for Sidebar components by defining presets in your
				configuration:
			</p>
			<CodeBlock
				lang="typescript"
				code={`import { createPreset } from '@svelte-atoms/core';

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
});`}
			/>
		</div>
	</Section>

	<Section title="Examples" description="Explore different sidebar variations">
		<div class="space-y-8">
			<DemoExample title="Left Sidebar" description="Sidebar from the left side" code={basicCode}>
				<Sidebar.Root bind:open={leftOpen}>
					<div class="flex min-h-96 w-full">
						<Sidebar.Content
							animate={animateSidebarContent({ '0': '96px', '1': '320px' })}
							class="overflow-hidden border-r p-4"
						>
							<h3 class="mb-4 font-semibold">Details</h3>
							<div class="space-y-3">
								<p class="text-muted-foreground w-40 text-sm">
									Additional information and details can be displayed here.
								</p>
								<Button size="sm" variant="outline" onclick={() => (leftOpen = false)}>Close</Button
								>
							</div>
						</Sidebar.Content>

						<main class="flex-1 p-4">
							<Button onclick={() => (leftOpen = true)}>Open Left Sidebar</Button>
						</main>
					</div>
				</Sidebar.Root>
			</DemoExample>

			<DemoExample title="Right Sidebar" description="Sidebar from the right side" code={rightCode}>
				<Sidebar.Root bind:open={rightOpen}>
					<div class="flex min-h-96 w-full">
						<main class="flex-1">
							<Button onclick={() => (rightOpen = true)}>Open Right Sidebar</Button>
						</main>

						<Sidebar.Content
							animate={animateSidebarContent({ '0': '96px', '1': '320px' })}
							class="border-l p-4"
						>
							<h3 class="mb-4 font-semibold">Details</h3>
							<div class="space-y-3">
								<p class="text-muted-foreground w-40 text-sm">
									Additional information and details can be displayed here.
								</p>
								<Button size="sm" variant="outline" onclick={() => (rightOpen = false)}
									>Close</Button
								>
							</div>
						</Sidebar.Content>
					</div>
				</Sidebar.Root>
			</DemoExample>
		</div>
	</Section>

	<Section title="API Reference">
		<div class="space-y-6">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Sidebar.Root Props</h3>
				<Props data={[...sidebarRootProps]} />
			</div>
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Sidebar.Content Props</h3>
				<Props data={[...sidebarContentProps]} />
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
