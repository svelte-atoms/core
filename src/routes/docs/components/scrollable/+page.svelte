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
		scrollableRootProps
	} from './props';
	import { metadata } from './shared';

	const { basic: basicCode, horizontal: horizontalCode, both: bothCode } = metadata.examples;

</script>

<svelte:head>
	<title>{metadata.title}</title>
	<meta name="description" content={metadata.description} />
</svelte:head>

<div class="py-8">
	<Breadcrumb items={metadata.breadcrumbs}
	/>

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
				<Scrollable.Root>
					<Scrollable.Container class="rounded border max-h-[200px]">
						<Scrollable.Content>
							<div class="space-y-4 p-4">
								{#each Array(20) as _, i}
									<p class="text-muted-foreground">Line {i + 1} of scrollable content</p>
								{/each}
							</div>
						</Scrollable.Content>
					</Scrollable.Container>
				</Scrollable.Root>
			</DemoExample>

			<DemoExample
				title="Horizontal Scroll"
				description="Horizontal scrolling container"
				code={horizontalCode}
			>
				<Scrollable.Root>
					<Scrollable.Container class="rounded border p-4">
						<Scrollable.Content>
							<div class="flex gap-4">
								{#each Array(10) as _, i}
									<div class="bg-muted rounded p-4 whitespace-nowrap">
										Item {i + 1}
									</div>
								{/each}
							</div>
						</Scrollable.Content>
					</Scrollable.Container>
				</Scrollable.Root>
			</DemoExample>

			<DemoExample
				title="Both Directions"
				description="Scroll in both directions"
				code={bothCode}
			>
				<Scrollable.Root>
					<Scrollable.Container class="rounded border max-h-[300px]">
						<Scrollable.Content>
							<div class="p-4">
								<div class="grid grid-cols-10 gap-4 min-w-[1200px]">
									{#each Array(50) as _, i}
										<div class="bg-muted rounded p-4 text-center">
											{i + 1}
										</div>
									{/each}
								</div>
							</div>
						</Scrollable.Content>
					</Scrollable.Container>
				</Scrollable.Root>
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
			features={metadata.accessibility}
		/>
	</Section.Root>

	<PageNavigation
		prev={{ label: 'Radio', href: '/docs/components/radio' }}
		next={{ label: 'Sidebar', href: '/docs/components/sidebar' }}
	/>
</div>
