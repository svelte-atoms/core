<script lang="ts">
	import { Divider } from '$lib/components/divider';
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
	import { dividerProps } from './props';
	import { metadata } from './shared';

	const { basic: basicCode, orientation: orientationCode, label: labelCode } = metadata.examples;
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
			<Section.Subtitle>Customize the divider appearance using presets</Section.Subtitle>
		</Section.Header>
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for Divider components by defining presets in your
				configuration:
			</p>
			<CodeBlock
				lang="typescript"
				code={`import { setPreset } from '@svelte-atoms/core';

const preset = setPreset({
  divider: () => ({
    class: 'border-border',
    variants: {
      orientation: {
        horizontal: { class: 'w-full border-t' },
        vertical: { class: 'h-full border-l' }
      }
    },
    defaults: {
      orientation: 'horizontal'
    }
  })
});`}
			/>
		</div>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Examples</Section.Title>
			<Section.Subtitle>Explore different divider variations</Section.Subtitle>
		</Section.Header>
		<div class="space-y-8">
			<DemoExample
				title="Horizontal Divider"
				description="Default horizontal separator"
				code={basicCode}
			>
				<div class="space-y-4">
					<p class="text-muted-foreground">Content above</p>
					<Divider />
					<p class="text-muted-foreground">Content below</p>
				</div>
			</DemoExample>

			<DemoExample
				title="Vertical Divider"
				description="Vertical separator for inline content"
				code={orientationCode}
			>
				<div class="flex items-center gap-4">
					<span>Item 1</span>
					<Divider orientation="vertical" class="h-8" />
					<span>Item 2</span>
					<Divider orientation="vertical" class="h-8" />
					<span>Item 3</span>
				</div>
			</DemoExample>

			<DemoExample
				title="Divider with Label"
				description="Divider containing text or content"
				code={labelCode}
			>
				<div class="space-y-4">
					<button class="w-full rounded border px-4 py-2">Sign in with Google</button>
					<Divider class="flex items-center">
						<span class="text-muted-foreground bg-background px-2 text-sm">OR</span>
					</Divider>
					<button class="w-full rounded border px-4 py-2">Sign in with Email</button>
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
				<h3 class="text-foreground mb-3 text-lg font-semibold">Divider Props</h3>
				<Props data={dividerProps} />
			</div>
		</div>
	</Section.Root>

	<Section.Root>
		<Section.Header>
			<Section.Title>Accessibility</Section.Title>
		</Section.Header>
		<AccessibilityInfo features={metadata.accessibility} />
	</Section.Root>

	<PageNavigation
		prev={{ label: 'Dialog', href: '/docs/components/dialog' }}
		next={{ label: 'Drawer', href: '/docs/components/drawer' }}
	/>
</div>
