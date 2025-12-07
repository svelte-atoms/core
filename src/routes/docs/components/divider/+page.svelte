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
		Props
	} from '$docs/components';

	const basicCode = `<Divider />`;

	const orientationCode = `<Divider orientation="horizontal" />
<Divider orientation="vertical" />`;

	const labelCode = `<Divider>
  <span>OR</span>
</Divider>`;
</script>

<svelte:head>
	<title>Divider - Svelte Atoms</title>
	<meta name="description" content="Visual separator for content sections." />
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
	<Breadcrumb items={[{ label: 'Components', href: '/docs/components' }, { label: 'Divider' }]} />

	<PageHeader
		title="Divider"
		description="Visual separator for content sections. Creates clear boundaries between different parts of your UI."
		status="stable"
	/>

	<Section title="Installation">
		<Installation
			packageName="@svelte-atoms/core"
			importCode="import &#123; Divider &#125; from '@svelte-atoms/core/divider';"
		/>
	</Section>

	<Section
		title="Preset Configuration"
		description="Customize the divider appearance using presets"
	>
		<div class="space-y-4">
			<p class="text-muted-foreground text-sm">
				You can customize the default styles for Divider components by defining presets in your
				configuration:
			</p>
			<div class="bg-muted rounded-lg p-4">
				<pre class="overflow-x-auto text-sm"><code
						>{`import { createPreset } from '@svelte-atoms/core';

const preset = createPreset({
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
});`}</code
					></pre>
			</div>
		</div>
	</Section>

	<Section title="Examples" description="Explore different divider variations">
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
	</Section>

	<Section title="API Reference">
		<div class="space-y-6">
			<div>
				<h3 class="text-foreground mb-3 text-lg font-semibold">Divider Props</h3>
				<Props
					data={[
						{
							name: 'orientation',
							type: "'horizontal' | 'vertical'",
							default: "'horizontal'",
							description: 'Divider orientation'
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
				'Semantic hr element for horizontal dividers',
				'Proper ARIA role when needed',
				'Sufficient visual contrast',
				'Does not interfere with screen readers',
				'Decorative element properly marked'
			]}
		/>
	</Section>

	<PageNavigation
		prev={{ label: 'Dialog', href: '/docs/components/dialog' }}
		next={{ label: 'Drawer', href: '/docs/components/drawer' }}
	/>
</div>
