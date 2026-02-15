<script lang="ts">
	import { Scrollable } from '$lib/components/scrollable';
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
	import {
		scrollableRootProps,
		scrollableContainerProps,
		scrollableContentProps,
		scrollableTrackProps,
		scrollableThumbProps
	} from './props';
	import { metadata } from './shared';

	const { basic: basicCode, horizontal: horizontalCode } = metadata.examples;
</Scrollable>`;
</script>

<svelte:head>
	<title>Scrollable - Svelte Atoms</title>
	<meta name="description" content="Scrollable container with custom scrollbars." />
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
	<Breadcrumb
		items={[{ label: 'Components', href: '/docs/components' }, { label: 'Scrollable' }]}
	/>

	<PageHeader
		title="Scrollable"
		description="Container with custom-styled scrollbars for consistent scrolling experience across browsers."
		status="stable"
	/>

	<Section.Root>
		<Section.Header>
			<Section.Title>Installation</Section.Title>
		</Section.Header>
		<Installation
			packageName="@svelte-atoms/core"
			importCode="import &#123; Scrollable &#125; from '@svelte-atoms/core/scrollable';"
		/>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Preset Configuration</Section.Title>
			<Section.Subtitle>Customize the scrollable appearance using presets</Section.Subtitle>
		</Section.Header>
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for Scrollable components by defining presets in your
				configuration:
			</p>
			<CodeBlock
				lang="typescript"
				code={`import { setPreset } from '@svelte-atoms/core';

const preset = setPreset({
  scrollable: () => ({
    class: 'overflow-auto',
    variants: {
      direction: {
        vertical: { class: 'overflow-y-auto overflow-x-hidden' },
        horizontal: { class: 'overflow-x-auto overflow-y-hidden' },
        both: { class: 'overflow-auto' }
      }
    },
    defaults: {
      direction: 'vertical'
    }
  })
});`}
			/>
		</div>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Examples</Section.Title>
			<Section.Subtitle>Explore different scrollable variations</Section.Subtitle>
		</Section.Header>
		<div class="space-y-8">
			<DemoExample
				title="Vertical Scroll"
				description="Fixed height container with vertical scrolling"
				code={basicCode}
			>
				<Scrollable height={200} class="rounded border">
					<div class="space-y-4 p-4">
						{#each Array(20) as _, i}
							<p class="text-muted-foreground">Line {i + 1} of scrollable content</p>
						{/each}
					</div>
				</Scrollable>
			</DemoExample>

			<DemoExample
				title="Horizontal Scroll"
				description="Horizontal scrolling container"
				code={horizontalCode}
			>
				<Scrollable direction="horizontal" class="rounded border p-4">
					<div class="flex gap-4">
						{#each Array(10) as _, i}
							<div class="bg-muted rounded p-4 whitespace-nowrap">
								Item {i + 1}
							</div>
						{/each}
					</div>
				</Scrollable>
			</DemoExample>

			<DemoExample
				title="Both Directions"
				description="Scroll in both directions"
				code={`<Scrollable direction="both" height={300}>`}
			>
				<Scrollable direction="both" height={300} class="rounded border">
					<div class="p-4">
						<div class="grid grid-cols-10 gap-4" style="min-width: 1200px;">
							{#each Array(50) as _, i}
								<div class="bg-muted rounded p-4 text-center">
									{i + 1}
								</div>
							{/each}
						</div>
					</div>
				</Scrollable>
			</DemoExample>
		</div>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>API Reference</Section.Title>
		</Section.Header>
		<div class="space-y-6">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Scrollable Props</h3>
				<Props data={scrollableRootProps} />
			</div>
		</div>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Accessibility</Section.Title>
		</Section.Header>
		<AccessibilityInfo
			features={[
				'Keyboard scrolling (Arrow keys)',
				'Focus visible on scroll container',
				'Screen reader compatible',
				'Respects prefers-reduced-motion',
				'Touch-friendly scrolling'
			]}
		/>
	</Section.Root>

	<PageNavigation
		prev={{ label: 'Radio', href: '/docs/components/radio' }}
		next={{ label: 'Sidebar', href: '/docs/components/sidebar' }}
	/>
</div>
