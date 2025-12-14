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

	const basicCode = `<Scrollable height={200}>
  <div>Long content...</div>
</Scrollable>`;

	const horizontalCode = `<Scrollable direction="horizontal">
  <div class="flex gap-4">
    <div>Item 1</div>
    <div>Item 2</div>
  </div>
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

	<Section title="Installation">
		<Installation
			packageName="@svelte-atoms/core"
			importCode="import &#123; Scrollable &#125; from '@svelte-atoms/core/scrollable';"
		/>
	</Section>

	<Section
		title="Preset Configuration"
		description="Customize the scrollable appearance using presets"
	>
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for Scrollable components by defining presets in your
				configuration:
			</p>
			<CodeBlock
				lang="typescript"
				code={`import { createPreset } from '@svelte-atoms/core';

const preset = createPreset({
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
	</Section>

	<Section title="Examples" description="Explore different scrollable variations">
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
	</Section>

	<Section title="API Reference">
		<div class="space-y-6">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Scrollable Props</h3>
				<Props
					data={[
						{
							name: 'direction',
							type: "'vertical' | 'horizontal' | 'both'",
							default: "'vertical'",
							description: 'Scroll direction'
						},
						{
							name: 'height',
							type: 'number | string',
							default: 'auto',
							description: 'Container height'
						},
						{
							name: 'width',
							type: 'number | string',
							default: 'auto',
							description: 'Container width'
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
				'Keyboard scrolling (Arrow keys)',
				'Focus visible on scroll container',
				'Screen reader compatible',
				'Respects prefers-reduced-motion',
				'Touch-friendly scrolling'
			]}
		/>
	</Section>

	<PageNavigation
		prev={{ label: 'Radio', href: '/docs/components/radio' }}
		next={{ label: 'Sidebar', href: '/docs/components/sidebar' }}
	/>
</div>
